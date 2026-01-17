/**
 * Tipos e interfaces do aplicativo
 */

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isPremium: boolean;
  createdAt: string;
}

export type SubscriptionPlan = 'free' | 'monthly' | 'yearly';
export type SubscriptionStatus = 'active' | 'canceled' | 'expired' | 'trial_expired';

export interface SubscriptionData {
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  startDate?: string;
  endDate?: string;
  lastStoryDate?: string; // Data do último Story assistido
}

export interface Program {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  category: ProgramCategory;
  duration: number; // em segundos
  isPremium: boolean;
  audioUrl?: string; // URL remota (deprecated)
  audioSource?: number; // require() retorna número (asset module)
  videoUrl?: string;
  tags: string[];
  instructor?: string;
  episodeCount?: number;
}

export type ProgramCategory = 
  | 'meditation'
  | 'mindfulness'
  | 'sleep'
  | 'breathing'
  | 'music'
  | 'stories'
  | 'courses';

export interface Episode {
  id: string;
  programId: string;
  title: string;
  description: string;
  coverImage: string;
  duration: number;
  audioUrl?: string; // URL remota (deprecated)
  audioSource?: number; // require() retorna número (asset module)
  videoUrl?: string;
  episodeNumber: number;
  isPremium: boolean;
}

export interface Playlist {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  programs: Program[];
  createdBy: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'reminder' | 'achievement';
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}

export interface UserProgress {
  userId: string;
  programId: string;
  episodeId?: string;
  progress: number; // 0-100
  completedAt?: string;
  lastWatchedAt: string;
}

export interface Subscription {
  id: string;
  userId: string;
  plan: 'free' | 'monthly' | 'yearly';
  status: 'active' | 'canceled' | 'expired';
  startDate: string;
  endDate?: string;
  price: number;
}

// Navigation types
export type RootStackParamList = {
  Onboarding: undefined;
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Explore: undefined;
  Library: undefined;
  Profile: undefined;
};

export type HomeStackParamList = {
  HomeScreen: undefined;
  ProgramDetail: { programId: string };
  Player: { programId: string; episodeId?: string };
  Category: { category: ProgramCategory };
};

export type ProfileStackParamList = {
  ProfileScreen: undefined;
  Settings: undefined;
  Notifications: undefined;
  Subscription: undefined;
};
