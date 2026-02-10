export type RootStackParamList = {
    SocialAuth: undefined;
    AccessGranted: undefined;
    Music: undefined;
    Settings: undefined;
  // Intro
  Intro: undefined;
  
  // Auth
  Onboarding: undefined;
  CreateAccount: undefined;
  SuccessAccount: undefined;
  OnboardingCountdown: undefined;
  Login: undefined;
  Register: undefined;
  
  // Mental Recording
  MentalRecordingChoice: undefined;
  Preparation: undefined;
  AudioPlayer: { audioId?: string; audioTitle?: string; audioFile?: string };
  
  // Story Flow
  StoryCompleted: undefined;
  EnableNotifications: undefined;
  ScheduleNotification: undefined;
  NotificationConfirmed: { hour: number; minute: number };
  ContinueJourney: undefined;
  
  // Main
  Main: undefined;
  
  // Programs
  Programs: undefined;
  ProgramDetail: { programId: string };
  
  // Player
  Player: { programId: string; episodeId: string };
  AudioLibrary: undefined;
  
  // Profile
  Notifications: undefined;
  Subscription: undefined;
  UnlockAll Mind: undefined;
  
  // Settings
  Settings: undefined;
  
  // Explore
  Explore: { category?: string };
};

export type MainTabParamList = {
  Home: undefined;
  Explore: { category?: string };
  Library: undefined;
  Profile: undefined;
  Programs: undefined;
};
