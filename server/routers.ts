import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { authApiRouter } from "./authRouter";
import { backtestApiRouter } from "./backtestRouter";
import { fociRouter } from "./fociRouter";
import { newsflowRouter } from "./newsflowRouter";
import { stockRouter } from "./stockRouter";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
    // Local auth routes are handled via Express API, not tRPC
  }),
  stock: stockRouter,
  // Backtest routes are handled via Express API, not tRPC
  foci: fociRouter,
  newsflow: newsflowRouter,
});

export type AppRouter = typeof appRouter;
