import { z } from "zod";
import { protectedProcedure } from "../../trpc";

import { TaskStatus, TaskType } from "@prisma/client"; // 或者从你定义这些枚举的地方导入
import { db } from "database";

export const submitTasks = protectedProcedure
  .input(
    z.object({
      taskType: z.nativeEnum(TaskType), // 使用传入的任务类型
    }),
  )
  .mutation(async ({ input: { taskType }, ctx: { user } }) => {
    const userId = user.id;

    // 定义永久任务类型数组
    const permanentTasks = [
      TaskType.JOIN_DISCORD,
      TaskType.JOIN_TELEGRAM,
    ] as const;

    // 使用类型谓词函数来检查是否为永久任务
    const isPermanentTask = (type: TaskType): boolean => {
      return permanentTasks.includes(type as (typeof permanentTasks)[number]);
    };
    // 如果是永久性任务，检查是否已经完成过
    if (isPermanentTask) {
      const existingTask = await db.task.findUnique({
        where: {
          userId_type: {
            userId,
            type: taskType,
          },
        },
      });

      if (existingTask) {
        throw new Error("Task already completed");
      }
    }

    // 如果是每日任务，检查今天是否已经完成
    if (!isPermanentTask) {
      const todayTask = await db.task.findFirst({
        where: {
          userId,
          type: taskType,
          createdAt: {
            gte: new Date(new Date().setUTCHours(0, 0, 0, 0)),
            lt: new Date(new Date().setUTCHours(24, 0, 0, 0)),
          },
        },
      });

      if (todayTask) {
        throw new Error("Task already completed");
      }
    }

    // 创建新的任务记录
    const task = await db.task.create({
      data: {
        userId,
        type: taskType,
        status: TaskStatus.DOEN,
      },
    });
    if (!task) {
      throw new Error("Failed to create task");
    }

    return task;
  });
