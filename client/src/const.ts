export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

// Generate login URL at runtime so redirect URI reflects the current origin.
export const getLoginUrl = () => {
  const rawPortal = import.meta.env.VITE_OAUTH_PORTAL_URL || '';
  const appId = import.meta.env.VITE_APP_ID || '';

  if (!rawPortal) {
    console.warn('VITE_OAUTH_PORTAL_URL não definida - login desabilitado');
    return '#';
  }

  if (!appId) {
    console.warn('VITE_APP_ID não definida - login desabilitado');
    return '#';
  }

  const redirectUri = `${window.location.origin}/api/oauth/callback`;
  const state = btoa(redirectUri);

  const url = new URL('/app-auth', rawPortal);
  url.searchParams.set('appId', appId);
  url.searchParams.set('redirectUri', redirectUri);
  url.searchParams.set('state', state);
  url.searchParams.set('type', 'signIn');

  return url.toString();
};
