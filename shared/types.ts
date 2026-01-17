/**
 * Unified type exports
 * Import shared types from this single entry point.
 */

export type * from "../drizzle/schema";
export * from "./_core/errors";

// Application-specific types
export interface UserProfile {
  id: number;
  name: string | null;
  email: string | null;
  role: "user" | "admin";
  createdAt: Date;
}

export interface SubscriptionStatus {
  id: number;
  planType: "TRIAL" | "MONTHLY" | "ANNUAL";
  status: "ACTIVE" | "CANCELED" | "EXPIRED";
  startDate: Date;
  endDate: Date;
}

export interface ContentWithProgress {
  id: number;
  programId: number;
  title: string;
  description: string | null;
  mediaType: "AUDIO" | "VIDEO";
  durationSeconds: number;
  cdnUrl: string | null;
  orderInProgram: number;
  isPremium: boolean;
  progress?: {
    currentTime: number;
    isCompleted: boolean;
    isDownloaded: boolean;
  };
}

export interface HomeData {
  dailyStorie: ContentWithProgress | null;
  continueListening: ContentWithProgress[];
  recommendations: Array<{
    id: number;
    title: string;
    coverImageUrl: string | null;
    totalContentCount: number;
  }>;
  progressPercentage: number;
}

export interface PlayerState {
  contentId: number | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  speed: number;
  isLoading: boolean;
}
