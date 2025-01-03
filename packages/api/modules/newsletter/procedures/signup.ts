import { z } from "zod";
import { publicProcedure } from "../../trpc/trpc";

export const signup = publicProcedure
  .input(
    z.object({
      email: z.string(),
    }),
  )
  .mutation(async ({ input: { email } }) => {
    // @ts-expect-error - sendEmail is auto-imported
    return await sendEmail({
      to: email,
      templateId: "newsletterSignup",
      context: {},
    });
  });
