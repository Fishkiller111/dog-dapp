import * as path from "node:path";
import * as fs from "node:fs";

import fetch from "node-fetch";
import { z } from "zod";
import { protectedProcedure } from "../../trpc";
import { TRPCError } from "@trpc/server";
import { db } from "database";

import { TaskStatus, TaskType } from "@prisma/client"; // 或者从你定义这些枚举的地方导入

export const generateProductNames = protectedProcedure
  .input(
    z.object({
      audio: z.string(),
    }),
  )
  .output(
    z.object({
      result: z.boolean(),
      score: z.number(),
    }),
  )
  .query(async ({ input: { audio }, ctx: { user } }) => {
    // 1. 查询评分记录和任务记录，确定用户还有的评分次数
    let scoreTotalCount = 10; // 每个用户的默认评分次数
    // 查询已经评分的次数
    const scoreCount = await db.score.count({
      where: {
        // 用户ID
        userId: user.id,
        // UTC时间，0时～24时
        createdAt: {
          gte: new Date(new Date().setUTCHours(0, 0, 0, 0)),
          lt: new Date(new Date().setUTCHours(24, 0, 0, 0)),
        },
      },
    });
    // 查询任务记录
    const taskCount = await db.task.count({
      where: {
        userId: user.id,
        status: TaskStatus.DONE, // 使用枚举值
        OR: [
          // 对于每日任务（签到和分享），只统计今天完成的
          {
            type: {
              in: [
                TaskType.DAILY_CHECKIN,
                TaskType.SHARE_DISCORD,
                TaskType.SHARE_TELEGRAM,
              ],
            },
            createdAt: {
              gte: new Date(new Date().setUTCHours(0, 0, 0, 0)),
              lt: new Date(new Date().setUTCHours(24, 0, 0, 0)),
            },
          },
          // 对于永久任务（加入Discord和Telegram），只要是今天完成的就统计
          {
            type: {
              in: [TaskType.JOIN_DISCORD, TaskType.JOIN_TELEGRAM],
            },
            createdAt: {
              gte: new Date(new Date().setUTCHours(0, 0, 0, 0)),
              lt: new Date(new Date().setUTCHours(24, 0, 0, 0)),
            },
          },
        ],
      },
    });
    scoreTotalCount = scoreTotalCount + taskCount - scoreCount;

    if (scoreTotalCount <= 0) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "No permission to process audio file",
      });
    }
    const uploadDir = path.join(process.cwd(), "../../.temp");
    const filePath = path.join(uploadDir, audio);

    try {
      // 检查文件是否存在
      if (!fs.existsSync(filePath)) {
        throw new Error("File not found");
      }

      // 读取文件
      const fileBuffer = fs.readFileSync(filePath);

      // 创建 FormData
      const formData = new FormData();

      // 创建 Blob 并添加到 FormData
      // const blob = new Blob([fileBuffer], { type: "audio/wav" }); // 根据实际音频类型调整
      // formData.append("file", blob, path.basename(filePath));
      formData.append("file", new Blob([fileBuffer]), "filename.wav");

      // 发送请求到 Python FastAPI 服务器
      // process.env.AI_API_URL
      const apiUrl = process.env.AI_API_URL || "http://localhost:8000";

      const response = await fetch(`${apiUrl}/predict`, {
        method: "POST",
        body: formData as any,
      }).catch((error) => {
        console.log(error);
      });
      if (!response) {
        throw new Error("No response from AI server");
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // 特殊处理，针对子网未上线做处理
      // const data = await response.json();
      const tempData = await response.json();
      const data = {
        result: tempData.result,
        // 是狗叫就随机给1～5分，非狗叫就给0分
        score:
          tempData.result === "非狗叫" ? 0 : Math.floor(Math.random() * 5) + 1,
      };
      const res = await db.score
        .create({
          data: {
            userId: user.id,
            score: data.score,
          },
        })
        .catch((error) => {
          console.error(error);
        });

      return {
        result: tempData.result === "非狗叫",
        score: data.score,
      };
    } catch (error) {
      console.error("Error:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to process audio file",
      });
    } finally {
      // 在finally块中删除文件，确保无论成功还是失败都会执行
      try {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      } catch (deleteError) {
        console.error("Error deleting temporary file:", deleteError);
        // 不抛出删除文件的错误，因为主要操作已经完成
      }
    }
  });

export const getRemainingScoreCount = protectedProcedure
  .output(
    z.object({
      remaining: z.number(),
      total: z.number(),
      used: z.number(),
      taskBonus: z.number(),
    }),
  )
  .query(async ({ ctx: { user } }) => {
    const scoreTotalCount = 10; // 每个用户的默认评分次数

    // 查询已经评分的次数
    const scoreCount = await db.score.count({
      where: {
        userId: user.id,
        createdAt: {
          gte: new Date(new Date().setUTCHours(0, 0, 0, 0)),
          lt: new Date(new Date().setUTCHours(24, 0, 0, 0)),
        },
      },
    });

    // 查询任务记录获取额外次数
    const taskCount = await db.task.count({
      where: {
        userId: user.id,
        status: TaskStatus.DONE,
        OR: [
          // 对于每日任务（签到和分享），只统计今天完成的
          {
            type: {
              in: [
                TaskType.DAILY_CHECKIN,
                TaskType.SHARE_DISCORD,
                TaskType.SHARE_TELEGRAM,
              ],
            },
            createdAt: {
              gte: new Date(new Date().setUTCHours(0, 0, 0, 0)),
              lt: new Date(new Date().setUTCHours(24, 0, 0, 0)),
            },
          },
          // 对于永久任务（加入Discord和Telegram），只要是今天完成的就统计
          {
            type: {
              in: [TaskType.JOIN_DISCORD, TaskType.JOIN_TELEGRAM],
            },
            createdAt: {
              gte: new Date(new Date().setUTCHours(0, 0, 0, 0)),
              lt: new Date(new Date().setUTCHours(24, 0, 0, 0)),
            },
          },
        ],
      },
    });

    // 计算总可用次数和剩余次数
    const totalCount = scoreTotalCount + taskCount;
    const remainingCount = totalCount - scoreCount;

    return {
      remaining: Math.max(0, remainingCount), // 确保不会返回负数
      total: totalCount, // 总次数（基础次数+任务奖励）
      used: scoreCount, // 已使用次数
      taskBonus: taskCount, // 任务奖励次数
    };
  });
