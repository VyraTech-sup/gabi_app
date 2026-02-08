import * as AuthSession from 'expo-auth-session';
import Constants from 'expo-constants';

const CLIENT_ID = Constants?.expoConfig?.extra?.googleClientId;
const REDIRECT_URI = AuthSession.makeRedirectUri({ useProxy: true });
const SCOPE = 'profile email';
const RESPONSE_TYPE = 'token';
const AUTH_URL =
  `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}` +
  `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
  `&response_type=${RESPONSE_TYPE}` +
  `&scope=${encodeURIComponent(SCOPE)}`;

export async function signInWithGoogle() {
  // Abre o fluxo OAuth do Google
  const result = await AuthSession.startAsync({ authUrl: AUTH_URL });

  if (result.type !== 'success' || !result.params.access_token) {
    throw new Error('Falha na autenticação Google');
  }

  // Busca dados do usuário
  const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
    headers: { Authorization: `Bearer ${result.params.access_token}` },
  });
  const user = await userInfoRes.json();

  return {
    accessToken: result.params.access_token,
    user: {
      name: user.name,
      email: user.email,
      picture: user.picture,
    },
  };
}
