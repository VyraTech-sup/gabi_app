/**
 * Serviço de armazenamento local usando AsyncStorage
 * Gerencia persistência de dados do usuário, preferências e estado do app
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

// Chaves de armazenamento
const STORAGE_KEYS = {
  ONBOARDING_COMPLETED: '@allmind:onboarding_completed',
  USER_DATA: '@allmind:user_data',
  IS_AUTHENTICATED: '@allmind:is_authenticated',
  IS_PREMIUM: '@allmind:is_premium',
  SUBSCRIPTION_DATA: '@allmind:subscription_data',
  LAST_STORY_DATE: '@allmind:last_story_date',
  NOTIFICATION_TIME: '@allmind:notification_time',
  FAVORITES: '@allmind:favorites',
  RECENT_PROGRAMS: '@allmind:recent_programs',
  DOWNLOADS: '@allmind:downloads',
} as const;

// Interface do usuário
export interface UserData {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isPremium: boolean;
  createdAt: string;
}

// Onboarding
export const setOnboardingCompleted = async (completed: boolean): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.ONBOARDING_COMPLETED, JSON.stringify(completed));
  } catch (error) {
    console.error('Erro ao salvar onboarding:', error);
  }
};

export const getOnboardingCompleted = async (): Promise<boolean> => {
  try {
    const value = await AsyncStorage.getItem(STORAGE_KEYS.ONBOARDING_COMPLETED);
    return value ? JSON.parse(value) : false;
  } catch (error) {
    console.error('Erro ao buscar onboarding:', error);
    return false;
  }
};

// Autenticação
export const setAuthenticated = async (isAuthenticated: boolean): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.IS_AUTHENTICATED, JSON.stringify(isAuthenticated));
  } catch (error) {
    console.error('Erro ao salvar autenticação:', error);
  }
};

export const getAuthenticated = async (): Promise<boolean> => {
  try {
    const value = await AsyncStorage.getItem(STORAGE_KEYS.IS_AUTHENTICATED);
    return value ? JSON.parse(value) : false;
  } catch (error) {
    console.error('Erro ao buscar autenticação:', error);
    return false;
  }
};

// Dados do usuário
export const saveUserData = async (userData: UserData): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
  } catch (error) {
    console.error('Erro ao salvar dados do usuário:', error);
  }
};

export const getUserData = async (): Promise<UserData | null> => {
  try {
    const value = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error('Erro ao buscar dados do usuário:', error);
    return null;
  }
};

export const clearUserData = async (): Promise<void> => {
  try {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.USER_DATA,
      STORAGE_KEYS.IS_AUTHENTICATED,
    ]);
  } catch (error) {
    console.error('Erro ao limpar dados do usuário:', error);
  }
};

// Status Premium
export const setPremiumStatus = async (isPremium: boolean): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.IS_PREMIUM, JSON.stringify(isPremium));
    // Atualiza também nos dados do usuário
    const userData = await getUserData();
    if (userData) {
      await saveUserData({ ...userData, isPremium });
    }
  } catch (error) {
    console.error('Erro ao salvar status premium:', error);
  }
};

export const getPremiumStatus = async (): Promise<boolean> => {
  try {
    const value = await AsyncStorage.getItem(STORAGE_KEYS.IS_PREMIUM);
    return value ? JSON.parse(value) : false;
  } catch (error) {
    console.error('Erro ao buscar status premium:', error);
    return false;
  }
};

// Horário de notificação
export const setNotificationTime = async (time: { hour: number; minute: number }): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.NOTIFICATION_TIME, JSON.stringify(time));
  } catch (error) {
    console.error('Erro ao salvar horário de notificação:', error);
  }
};

export const getNotificationTime = async (): Promise<{ hour: number; minute: number } | null> => {
  try {
    const value = await AsyncStorage.getItem(STORAGE_KEYS.NOTIFICATION_TIME);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error('Erro ao buscar horário de notificação:', error);
    return null;
  }
};

// Favoritos
export const addToFavorites = async (programId: string): Promise<void> => {
  try {
    const favorites = await getFavorites();
    if (!favorites.includes(programId)) {
      favorites.push(programId);
      await AsyncStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
    }
  } catch (error) {
    console.error('Erro ao adicionar favorito:', error);
  }
};

export const removeFromFavorites = async (programId: string): Promise<void> => {
  try {
    const favorites = await getFavorites();
    const filtered = favorites.filter(id => id !== programId);
    await AsyncStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(filtered));
  } catch (error) {
    console.error('Erro ao remover favorito:', error);
  }
};

export const getFavorites = async (): Promise<string[]> => {
  try {
    const value = await AsyncStorage.getItem(STORAGE_KEYS.FAVORITES);
    return value ? JSON.parse(value) : [];
  } catch (error) {
    console.error('Erro ao buscar favoritos:', error);
    return [];
  }
};

// Programas recentes
export const addToRecent = async (programId: string): Promise<void> => {
  try {
    const recent = await getRecentPrograms();
    // Remove se já existe
    const filtered = recent.filter(id => id !== programId);
    // Adiciona no início
    filtered.unshift(programId);
    // Mantém apenas os 20 mais recentes
    const limited = filtered.slice(0, 20);
    await AsyncStorage.setItem(STORAGE_KEYS.RECENT_PROGRAMS, JSON.stringify(limited));
  } catch (error) {
    console.error('Erro ao adicionar programa recente:', error);
  }
};

export const getRecentPrograms = async (): Promise<string[]> => {
  try {
    const value = await AsyncStorage.getItem(STORAGE_KEYS.RECENT_PROGRAMS);
    return value ? JSON.parse(value) : [];
  } catch (error) {
    console.error('Erro ao buscar programas recentes:', error);
    return [];
  }
};

// Downloads (apenas controle, sem download real)
export const addToDownloads = async (programId: string): Promise<void> => {
  try {
    const downloads = await getDownloads();
    if (!downloads.includes(programId)) {
      downloads.push(programId);
      await AsyncStorage.setItem(STORAGE_KEYS.DOWNLOADS, JSON.stringify(downloads));
    }
  } catch (error) {
    console.error('Erro ao adicionar download:', error);
  }
};

export const removeFromDownloads = async (programId: string): Promise<void> => {
  try {
    const downloads = await getDownloads();
    const filtered = downloads.filter(id => id !== programId);
    await AsyncStorage.setItem(STORAGE_KEYS.DOWNLOADS, JSON.stringify(filtered));
  } catch (error) {
    console.error('Erro ao remover download:', error);
  }
};

export const getDownloads = async (): Promise<string[]> => {
  try {
    const value = await AsyncStorage.getItem(STORAGE_KEYS.DOWNLOADS);
    return value ? JSON.parse(value) : [];
  } catch (error) {
    console.error('Erro ao buscar downloads:', error);
    return [];
  }
};

// Subscription Data
export const setSubscriptionData = async (data: { plan: string; status: string; startDate?: string; endDate?: string }): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.SUBSCRIPTION_DATA, JSON.stringify(data));
  } catch (error) {
    console.error('Erro ao salvar dados de assinatura:', error);
  }
};

export const getSubscriptionData = async (): Promise<{ plan: string; status: string; startDate?: string; endDate?: string } | null> => {
  try {
    const value = await AsyncStorage.getItem(STORAGE_KEYS.SUBSCRIPTION_DATA);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error('Erro ao buscar dados de assinatura:', error);
    return null;
  }
};

// Last Story Date
export const setLastStoryDate = async (date: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.LAST_STORY_DATE, date);
  } catch (error) {
    console.error('Erro ao salvar data do último Story:', error);
  }
};

export const getLastStoryDate = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(STORAGE_KEYS.LAST_STORY_DATE);
  } catch (error) {
    console.error('Erro ao buscar data do último Story:', error);
    return null;
  }
};

// Limpar todos os dados
export const clearAllData = async (): Promise<void> => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error('Erro ao limpar todos os dados:', error);
  }
};
