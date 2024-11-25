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
    let scoreTotalCount = 3; // 每个用户的默认评分次数
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
        status: TaskStatus.DOEN, // 使用枚举值
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
      const blob = new Blob([fileBuffer], { type: "audio/wav" }); // 根据实际音频类型调整
      formData.append("file", blob, path.basename(filePath));

      // 发送请求到 Python FastAPI 服务器
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        body: formData as any,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      db.score
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
        result: data.result,
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
