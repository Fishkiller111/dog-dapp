import { z } from "zod";
import { protectedProcedure } from "../../trpc";

import { TaskStatus, TaskType } from "@prisma/client"; // 或者从你定义这些枚举的地方导入
import { db } from "database";

export const submitTasks = protectedProcedure
  .input(
    z.object({
      taskType: z.nativeEnum(TaskType),
    }),
  )
  .mutation(async ({ input: { taskType }, ctx: { user } }) => {
    const userId = user.id;

    // 定义任务类型分组
    const PERMANENT_TASKS = [
      TaskType.JOIN_DISCORD,
      TaskType.JOIN_TELEGRAM,
    ] as const;

    // 获取美国东部时间的今天的开始和结束时间
    const getUSDayRange = () => {
      const now = new Date();
      // 将当前时间转换为美国东部时间
      const usDate = new Date(
        now.toLocaleString("en-US", { timeZone: "America/New_York" }),
      );

      const startOfDay = new Date(usDate);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(usDate);
      endOfDay.setHours(23, 59, 59, 999);

      // 转换回 UTC 时间进行数据库查询
      return {
        start: new Date(startOfDay),
        end: new Date(endOfDay),
      };
    };

    const isPermanentTask = PERMANENT_TASKS.includes(
      taskType as (typeof PERMANENT_TASKS)[number],
    );

    if (isPermanentTask) {
      // 检查永久任务是否已完成
      const existingTask = await db.task.findFirst({
        where: {
          userId,
          type: taskType,
          status: TaskStatus.DONE,
        },
      });

      if (existingTask) {
        throw new Error("This permanent task has already been completed");
      }
    } else {
      // 检查每日任务在今天是否已完成
      const { start: dayStart, end: dayEnd } = getUSDayRange();
      const todayTask = await db.task.findFirst({
        where: {
          userId,
          type: taskType,
          status: TaskStatus.DONE,
          createdAt: {
            gte: dayStart,
            lte: dayEnd,
          },
        },
      });

      if (todayTask) {
        throw new Error("This daily task has already been completed today");
      }
    }

    // 创建新的任务记录
    const task = await db.task.create({
      data: {
        userId,
        type: taskType,
        status: TaskStatus.DONE, // 修正拼写错误：DONE -> DONE
      },
    });

    return {
      success: true,
      task,
    };
  });

export const getTaskStatusList = protectedProcedure.query(
  async ({ ctx: { user } }) => {
    const userId = user.id;

    // 定义任务类型分组
    const PERMANENT_TASKS = [
      TaskType.JOIN_DISCORD,
      TaskType.JOIN_TELEGRAM,
    ] as const;
    const DAILY_TASKS = [
      TaskType.DAILY_CHECKIN,
      TaskType.SHARE_DISCORD,
      TaskType.SHARE_TELEGRAM,
    ] as const;

    // 获取美国东部时间的今天的开始和结束时间
    const getUSDayRange = () => {
      const now = new Date();
      // 将当前时间转换为美国东部时间
      const usDate = new Date(
        now.toLocaleString("en-US", { timeZone: "America/New_York" }),
      );

      const startOfDay = new Date(usDate);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(usDate);
      endOfDay.setHours(23, 59, 59, 999);

      // 转换回 UTC 时间进行数据库查询
      return {
        start: new Date(startOfDay),
        end: new Date(endOfDay),
      };
    };

    try {
      // 获取永久任务状态
      const permanentTasksStatus = await db.task.findMany({
        where: {
          userId,
          type: {
            in: PERMANENT_TASKS as any,
          },
          status: TaskStatus.DONE,
        },
        select: {
          type: true,
        },
      });

      // 获取每日任务状态
      const { start: dayStart, end: dayEnd } = getUSDayRange();
      const dailyTasksStatus = await db.task.findMany({
        where: {
          userId,
          type: {
            in: DAILY_TASKS as any,
          },
          status: TaskStatus.DONE,
          createdAt: {
            gte: dayStart,
            lte: dayEnd,
          },
        },
        select: {
          type: true,
        },
      });

      // 创建已完成任务的集合，用于快速查找
      const completedPermanentTasks = new Set(
        permanentTasksStatus.map((task) => task.type),
      );
      const completedDailyTasks = new Set(
        dailyTasksStatus.map((task) => task.type),
      );

      // 生成状态列表
      const taskStatusList = Object.values(TaskType).map((taskType) => ({
        type: taskType,
        status: PERMANENT_TASKS.includes(
          taskType as (typeof PERMANENT_TASKS)[number],
        )
          ? completedPermanentTasks.has(taskType)
            ? TaskStatus.DONE
            : TaskStatus.PENDING
          : completedDailyTasks.has(taskType)
          ? TaskStatus.DONE
          : TaskStatus.PENDING,
      }));

      return taskStatusList;
    } catch (error) {
      console.error("Error getting task status list:", error);
      throw new Error("Failed to get task status list");
    }
  },
);
