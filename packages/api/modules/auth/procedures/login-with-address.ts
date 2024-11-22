import { createSession, createSessionCookie, generateSessionToken } from "auth";
import { UserSchema, UserRoleSchema, db } from "database";
import { setCookie } from "h3";
import { z } from "zod";
import { publicProcedure } from "../../trpc";

export const loginWithAddress = publicProcedure
  .input(
    z.object({
      walletAddress: z.string().min(8).max(255),
    }),
  )
  .output(
    z.object({
      user: UserSchema.pick({
        id: true,
        walletAddress: true,
        name: true,
        role: true,
        avatarUrl: true,
      }),
    }),
  )
  .mutation(async ({ input: { walletAddress }, ctx: { event } }) => {
    let user = await db.user.findUnique({
      where: {
        walletAddress,
      },
    });

    // 不存在则创建
    if (!user) {
      user = await db.user.create({
        data: {
          walletAddress,
          role: UserRoleSchema.Values.USER,
        },
      });
    }

    const sessionToken = await generateSessionToken();

    await createSession(sessionToken, user.id);

    const sessionCookie = createSessionCookie(sessionToken);

    if (event) {
      setCookie(
        event,
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    }

    return {
      user,
    };
  });
