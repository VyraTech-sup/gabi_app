// Google OAuth service - Needs to be updated to new expo-auth-session API
// Currently disabled until API migration is complete

export async function signInWithGoogle() {
  // TODO: Atualizar para nova API do expo-auth-session
  // const result = await AuthSession.startAsync({ authUrl: AUTH_URL });
  throw new Error('Google Auth needs to be updated to new expo-auth-session API');

  // if (result.type !== 'success' || !result.params.access_token) {
  //   throw new Error('Falha na autenticação Google');
  // }

  // // Busca dados do usuário
  // const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
  //   headers: { Authorization: `Bearer ${result.params.access_token}` },
  // });
  // const user = await userInfoRes.json();

  // return {
  //   accessToken: result.params.access_token,
  //   user: {
  //     name: user.name,
  //     email: user.email,
  //     picture: user.picture,
  //   },
  // };
}
