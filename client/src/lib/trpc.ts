import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@/types/AppRouter";

export const trpc = createTRPCReact<AppRouter>();
