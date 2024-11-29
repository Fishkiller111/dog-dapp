import { protectedProcedure } from "../../trpc";
import { db } from "database";

export const balanceInquiry = protectedProcedure.query(
  async ({ ctx: { user } }) => {
    // 查询可提现余额 (WITHDRAW_UNPAID)
    const withdrawableBalance = await db.score.aggregate({
      where: {
        userId: user.id,
        Status: "WITHDRAW_UNPAID",
      },
      _sum: {
        Token: true,
      },
    });

    // 查询提现中余额 (WITHDRAW_PENDING)
    const pendingBalance = await db.score.aggregate({
      where: {
        userId: user.id,
        Status: "WITHDRAW_PENDING",
      },
      _sum: {
        Token: true,
      },
    });

    // 查询已提现余额 (WITHDRAW_COMPLETE)
    const completedBalance = await db.score.aggregate({
      where: {
        userId: user.id,
        Status: "WITHDRAW_COMPLETE",
      },
      _sum: {
        Token: true,
      },
    });

    return {
      withdrawable: withdrawableBalance._sum.Token || 0, // 可提现余额
      pending: pendingBalance._sum.Token || 0, // 提现中余额
      completed: completedBalance._sum.Token || 0, // 已提现余额
    };
  },
);

export const withdrawBalance = protectedProcedure.mutation(
  async ({ ctx: { user } }) => {
    try {
      // 1. 首先查询所有未提现的记录列表
      const withdrawableScores = await db.score.findMany({
        where: {
          userId: user.id,
          Status: "WITHDRAW_UNPAID",
        },
        select: {
          id: true,
          Token: true,
        },
      });

      // 2. 计算总额
      const totalWithdrawable = withdrawableScores.reduce(
        (sum, score) => sum + score.Token,
        0,
      );

      // 3. 检查是否达到最小提现额度
      const minWithdrawAmount =
        Number(process.env.MIN_WITHDRAW_AMOUNT || 21) || 21;
      if (totalWithdrawable < minWithdrawAmount) {
        throw new Error(
          "Insufficient balance. Minimum withdrawal amount is 21 tokens.",
        );
      }

      console.log(`User ${user.id} is withdrawing ${totalWithdrawable} tokens`);
      console.log(`Affected records count: ${withdrawableScores.length}`);

      // TODO:
      // 1. 调用实际的提现API
      // 2. 记录提现交易记录
      // 3. 发送提现通知
      // 4. 添加提现限制（比如每日提现次数限制）

      // 4. 获取所有需要更新的记录ID
      const scoreIds = withdrawableScores.map((score) => score.id);

      // 5. 使用事务来确保数据一致性
      await db.$transaction(async (prisma) => {
        // 首先将状态改为提现中
        await prisma.score.updateMany({
          where: {
            id: {
              in: scoreIds,
            },
            // 双重检查，确保只更新未提现的记录
            Status: "WITHDRAW_UNPAID",
          },
          data: {
            Status: "WITHDRAW_PENDING",
          },
        });

        // 1、查询用户的钱包地址
        const userInfo = await db.user.findUnique({
          where: {
            id: user.id,
          },
          select: {
            walletAddress: true,
          },
        });
        if (!userInfo || !userInfo.walletAddress) {
          throw new Error("User wallet address not found");
        }
        const walletAddress = userInfo.walletAddress;
        // 异步调用提现API
        // GATEWAY_URL
        const gatewayUrl = process.env.GATEWAY_URL || "http://localhost:5200";
        fetch(`${gatewayUrl}/transfer`, {
          headers: {
            accept: "application/json",
            "content-type": "application/json",
          },
          body: JSON.stringify({
            to: walletAddress,
            amount: totalWithdrawable,
          }),
          method: "POST",
        })
          .then((res) => res.json())
          .catch((error) => {
            console.log("Error transferring tokens:", error);
          });

        // 模拟处理时间
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // 然后将状态改为提现完成
        await prisma.score.updateMany({
          where: {
            id: {
              in: scoreIds,
            },
            // 双重检查，确保只更新提现中的记录
            Status: "WITHDRAW_PENDING",
          },
          data: {
            Status: "WITHDRAW_COMPLETE",
          },
        });
      });

      return {
        success: true,
        message: "Withdrawal completed successfully",
        amount: totalWithdrawable,
        processedRecords: withdrawableScores.length,
      };
    } catch (error) {
      // 错误处理
      if (error instanceof Error) {
        throw new TypeError(`Withdrawal failed: ${error.message}`);
      }
      throw new Error("An unexpected error occurred during withdrawal");
    }
  },
);
