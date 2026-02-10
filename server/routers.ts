import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { createPresignedUrl } from "./_core/aws/s3.ts";
import { z } from "zod";
import * as db from "./db";
import { sdk } from "./_core/sdk";
import { ONE_YEAR_MS } from "@shared/const";

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
    
    register: publicProcedure
      .input(
        z.object({
          email: z.string().email(),
          password: z.string().min(6),
          name: z.string().optional(),
          phone: z.string().optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        const result = await db.createUserWithPassword({
          email: input.email,
          password: input.password,
          name: input.name,
          phone: input.phone,
        });

        if (!result.success) {
          throw new Error(result.error || "Failed to create account");
        }

        // Buscar o usuário criado para obter todos os dados
        const user = await db.getUserById(result.userId!);
        if (!user) {
          throw new Error("Failed to retrieve created user");
        }

        // Criar sessão usando o ID do usuário como openId temporário
        const sessionToken = await sdk.createSessionToken(user.id.toString(), {
          name: user.name || user.email || "",
          expiresInMs: ONE_YEAR_MS,
        });

        // Definir cookie de sessão
        const cookieOptions = getSessionCookieOptions(ctx.req);
        ctx.res.cookie(COOKIE_NAME, sessionToken, { 
          ...cookieOptions, 
          maxAge: ONE_YEAR_MS 
        });

        return { 
          success: true, 
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
          }
        };
      }),

    login: publicProcedure
      .input(
        z.object({
          email: z.string().email(),
          password: z.string(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        const result = await db.authenticateUser(input.email, input.password);

        if (!result.success || !result.user) {
          throw new Error(result.error || "Invalid credentials");
        }

        // Criar sessão usando o ID do usuário como openId
        const sessionToken = await sdk.createSessionToken(result.user.id.toString(), {
          name: result.user.name || result.user.email || "",
          expiresInMs: ONE_YEAR_MS,
        });

        // Definir cookie de sessão
        const cookieOptions = getSessionCookieOptions(ctx.req);
        ctx.res.cookie(COOKIE_NAME, sessionToken, { 
          ...cookieOptions, 
          maxAge: ONE_YEAR_MS 
        });

        return { 
          success: true, 
          user: {
            id: result.user.id,
            name: result.user.name,
            email: result.user.email,
          }
        };
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
