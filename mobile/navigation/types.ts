export type RootStackParamList = {
  // Intro
  Intro: undefined;
  
  // Auth
  Onboarding: undefined;
  OnboardingCountdown: undefined;
  Login: undefined;
  Register: undefined;
  
  // Mental Recording
  MentalRecordingChoice: undefined;
  Preparation: undefined;
  AudioPlayer: undefined;
  
  // Story Flow
  StoryCompleted: undefined;
  EnableNotifications: undefined;
  ScheduleNotification: undefined;
  NotificationConfirmed: { hour: number; minute: number };
  ContinueJourney: undefined;
  
  // Main
  Main: undefined;
  
  // Programs
  ProgramDetail: { programId: string };
  
  // Player
  Player: { programId: string; episodeId: string };
  
  // Profile
  Notifications: undefined;
  Subscription: undefined;
  UnlockAlmaSense: undefined;
  
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
