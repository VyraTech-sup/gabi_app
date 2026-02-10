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
// Provide a safe fetch wrapper that rejects on non-2xx responses with readable text
const safeFetch: typeof fetch = async (input: RequestInfo, init?: RequestInit) => {
  const res = await fetch(input, init)
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`HTTP ${res.status} ${res.statusText}: ${text}`)
  }
  return res
}

const fetchImpl = API_OK ? safeFetch : async () => {
  throw new Error('VITE_API_URL is not configured or invalid; blocking tRPC calls')
}

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: API_OK ? `${API_BASE}/api/trpc` : 'about:blank',
      credentials: 'include', // Importante para cookies
      fetch: fetchImpl as any,
    }),
  ],
});
