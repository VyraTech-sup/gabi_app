/**
 * Tipos e interfaces do aplicativo (sincronizado com mobile)
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
  lastStoryDate?: string;
}

export interface Program {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  category: ProgramCategory;
  duration: number; // em segundos
  isPremium: boolean;
  audioUrl?: string;
  audioSource?: string; // web usa string para URLs
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
  audioUrl?: string;
  audioSource?: string;
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

export interface Review {
  id: string;
  programId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number; // 1-5
  comment: string;
  experience: string;
  createdAt: string;
  likes: number;
}

export interface ProgramRating {
  programId: string;
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
}

// Music (para a aba de músicas)
export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  coverImage: string;
  duration: number;
  category: 'relaxamento' | 'foco' | 'sono' | 'energia' | 'meditacao';
  isPremium: boolean;
  audioSource?: string;
  plays: number;
}
