import { z } from "zod";
import { protectedProcedure } from "../../trpc";
import { TRPCError } from "@trpc/server";

export const generateProductNames = protectedProcedure
  .input(
    z.object({
      audio: z.string(),
    }),
  )
  .output(
    z.object({
      result: z.string(),
      probability: z.number(),
    }),
  )
  .query(async ({ input: { audio }, ctx: { user } }) => {
    console.log(111111, user);

    try {
      // 下载音频文件
      return {
        result: "test",
        probability: 0.5,
      };
    } catch (error) {
      throw new TRPCError({
        code: "TIMEOUT",
        message: "AI service request timed out",
      });
    }
  });
