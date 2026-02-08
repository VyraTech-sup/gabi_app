// Type-only export file for client consumption
// This file should NOT import any server-side code or dependencies
import type { appRouter } from "./routers";

export type AppRouter = typeof appRouter;
