/**
 * Context de Autenticação
 * Gerencia estado global de autenticação, onboarding e dados do usuário
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { signInWithGoogle } from '../services/googleAuth';
import {
  getUserData,
  saveUserData,
  clearUserData,
  getOnboardingCompleted,
  setOnboardingCompleted,
  getAuthenticated,
  setAuthenticated,
  setPremiumStatus,
  getSubscriptionData,
  setSubscriptionData,
  getLastStoryDate,
  setLastStoryDate,
  getTrialUsed,
  setTrialUsed,
  UserData,
} from '../services/storage';
import { SubscriptionPlan, SubscriptionStatus } from '../types';

interface AuthContextData {
  // Estado
  isLoading: boolean;
  hasCompletedOnboarding: boolean;
  isAuthenticated: boolean;
  user: UserData | null;
  hasActiveSubscription: boolean;
  subscriptionPlan: SubscriptionPlan;
  subscriptionStatus: SubscriptionStatus;
  lastStoryDate: string | null;
  
  // Ações
  completeOnboarding: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<UserData>) => Promise<void>;
  upgradeToPremium: () => Promise<void>;
  activateSubscription: (plan: SubscriptionPlan) => Promise<void>;
  markStoryWatched: () => Promise<void>;
  canWatchTodayStory: () => boolean;
  signInWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasCompletedOnboarding, setHasCompletedOnboardingState] = useState(false);
  const [isAuthenticated, setIsAuthenticatedState] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [subscriptionPlan, setSubscriptionPlan] = useState<SubscriptionPlan>('free');
  const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionStatus>('trial_expired');
  const [lastStoryDate, setLastStoryDateState] = useState<string | null>(null);

  const hasActiveSubscription = subscriptionStatus === 'active';

  // Carregar estado persistido ao iniciar
  useEffect(() => {
    loadPersistedState();
  }, []);

  const loadPersistedState = async () => {
    try {
      setIsLoading(true);
      
      const [onboardingCompleted, authenticated, userData, subData, lastStory] = await Promise.all([
        getOnboardingCompleted(),
        getAuthenticated(),
        getUserData(),
        getSubscriptionData(),
        getLastStoryDate(),
      ]);
      
      setHasCompletedOnboardingState(onboardingCompleted);
      setIsAuthenticatedState(authenticated);
      setUser(userData);
      setLastStoryDateState(lastStory);
      
      if (subData) {
        setSubscriptionPlan(subData.plan as SubscriptionPlan);
        setSubscriptionStatus(subData.status as SubscriptionStatus);
      }
    } catch (error) {
      console.error('Erro ao carregar estado:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const completeOnboarding = async () => {
    try {
      await setOnboardingCompleted(true);
      setHasCompletedOnboardingState(true);
    } catch (error) {
      console.error('Erro ao completar onboarding:', error);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      // Simulação de login local (sem backend)
      // Em produção, validar com API usando o password
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const _password = password; // Reservado para validação futura com backend
      const mockUser: UserData = {
        id: '1',
        name: email.split('@')[0],
        email,
        isPremium: false,
        createdAt: new Date().toISOString(),
      };
      
      await saveUserData(mockUser);
      await setAuthenticated(true);
      
      setUser(mockUser);
      setIsAuthenticatedState(true);
      // Inicia trial automaticamente ao registrar, se disponível
      try {
        await startTrial();
      } catch (err) {
        // não bloquear o fluxo de registro se o trial falhar
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw new Error('Erro ao fazer login');
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      // Simulação de registro local (sem backend)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const _password = password; // Reservado para criação de conta futura com backend
      const mockUser: UserData = {
        id: Date.now().toString(),
        name,
        email,
        isPremium: false,
        createdAt: new Date().toISOString(),
      };
      
      await saveUserData(mockUser);
      await setAuthenticated(true);
      
      setUser(mockUser);
      setIsAuthenticatedState(true);
    } catch (error) {
      console.error('Erro ao registrar:', error);
      throw new Error('Erro ao criar conta');
    }
  };

  const logout = async () => {
    try {
      await clearUserData();
      setUser(null);
      setIsAuthenticatedState(false);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const updateUser = async (userData: Partial<UserData>) => {
    try {
      if (!user) return;
      
      const updatedUser = { ...user, ...userData };
      await saveUserData(updatedUser);
      setUser(updatedUser);
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
    }
  };

  const upgradeToPremium = async () => {
    try {
      await setPremiumStatus(true);
      if (user) {
        const updatedUser = { ...user, isPremium: true };
        await saveUserData(updatedUser);
        setUser(updatedUser);
      }
    } catch (error) {
      console.error('Erro ao atualizar para premium:', error);
    }
  };

  const activateSubscription = async (plan: SubscriptionPlan) => {
    try {
      const startDate = new Date().toISOString();
      const endDate = plan === 'yearly' 
        ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
        : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
      
      const subData = {
        plan,
        status: 'active',
        startDate,
        endDate,
      };
      
      await setSubscriptionData(subData);
      await setPremiumStatus(true);
      
      setSubscriptionPlan(plan);
      setSubscriptionStatus('active');
      
      if (user) {
        const updatedUser = { ...user, isPremium: true };
        await saveUserData(updatedUser);
        setUser(updatedUser);
      }
    } catch (error) {
      console.error('Erro ao ativar assinatura:', error);
    }
  };

  const startTrial = async (): Promise<boolean> => {
    try {
      const alreadyUsed = await getTrialUsed();
      if (alreadyUsed) return false;

      const startDate = new Date();
      const endDate = new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000);

      const subData = {
        plan: 'free' as SubscriptionPlan,
        status: 'active' as SubscriptionStatus,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      };

      await setSubscriptionData(subData);
      await setPremiumStatus(true);
      await setTrialUsed(true);

      setSubscriptionPlan('free');
      setSubscriptionStatus('active');

      if (user) {
        const updatedUser = { ...user, isPremium: true };
        await saveUserData(updatedUser);
        setUser(updatedUser);
      }

      return true;
    } catch (error) {
      console.error('Erro ao iniciar trial:', error);
      return false;
    }
  };

  const markStoryWatched = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      await setLastStoryDate(today);
      setLastStoryDateState(today);
    } catch (error) {
      console.error('Erro ao marcar Story assistido:', error);
    }
  };

  const canWatchTodayStory = (): boolean => {
    if (!hasActiveSubscription) return false;
    
    const today = new Date().toISOString().split('T')[0];
    return lastStoryDate !== today;
  };

  // Login Google OAuth
  const signInWithGoogleHandler = async () => {
    try {
      const result = await signInWithGoogle();
      const googleUser = {
        id: result.user.email, // ou outro identificador único
        name: result.user.name,
        email: result.user.email,
        isPremium: false,
        createdAt: new Date().toISOString(),
        avatar: result.user.picture,
      };
      await saveUserData(googleUser);
      await setAuthenticated(true);
      setUser(googleUser);
      setIsAuthenticatedState(true);
    } catch (error) {
      console.error('Erro no login Google:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        hasCompletedOnboarding,
        isAuthenticated,
        user,
        hasActiveSubscription,
        subscriptionPlan,
        subscriptionStatus,
        lastStoryDate,
        completeOnboarding,
        login,
        register,
        logout,
        updateUser,
        upgradeToPremium,
        activateSubscription,
        markStoryWatched,
        canWatchTodayStory,
        signInWithGoogle: signInWithGoogleHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};
