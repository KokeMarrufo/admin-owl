import { createTRPCRouter } from "@/server/api/trpc";
import { customerRouter } from "./routers/customer";

export const appRouter = createTRPCRouter({
  customer: customerRouter,
});

export type AppRouter = typeof appRouter;
