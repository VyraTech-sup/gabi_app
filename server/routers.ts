import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { createPresignedUrl } from "./_core/aws/s3.ts";
import { z } from "zod";

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  upload: router({
    getUploadUrl: publicProcedure
      .input(
        z.object({
          fileName: z.string(),
          contentType: z.string(),
        })
      )
      .mutation(async ({ input }) => {
        const key = `audios/${input.fileName}`;
        const url = await createPresignedUrl(key, input.contentType);

        return { url, key };
      }),
  }),
});

export type AppRouter = typeof appRouter;
