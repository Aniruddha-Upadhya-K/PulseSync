import { createTRPCRouter } from "~/server/api/trpc";
import { userRouter } from "./routers/user.router";
import { chatRouter } from "./routers/chat.router";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  chat: chatRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
