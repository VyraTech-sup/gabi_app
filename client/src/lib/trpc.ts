import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../../../server/routers';

// Read API base from Vite env
const API_BASE = String(import.meta.env.VITE_API_URL || '').trim();
const API_OK = API_BASE.length > 0 && API_BASE.startsWith('https://');
if (!API_OK) {
  // Defensive logging to help spot misconfiguration in production
  // eslint-disable-next-line no-console
  console.error(
    '[trpc] VITE_API_URL is not set or invalid. Set VITE_API_URL to the full API origin (https://...). tRPC calls will be blocked.'
  );
}

export const API_BASE_URL = API_BASE;
export const isApiAvailable = API_OK;

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: API_OK ? `${API_BASE}/api/trpc` : 'about:blank',
      credentials: 'include', // Importante para cookies
    }),
  ],
});
