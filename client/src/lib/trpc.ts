import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../../../server/routers';

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      // Allow overriding the API base URL via Vite env var for deployments
      // e.g. set VITE_API_URL to https://api.example.com (no trailing slash)
      url: (import.meta.env.VITE_API_URL || '') + '/api/trpc',
      credentials: 'include', // Importante para cookies
    }),
  ],
});
