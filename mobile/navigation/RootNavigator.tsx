import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import OnboardingScreen from '../screens/Auth/OnboardingScreen';
import MentalRecordingChoiceScreen from '../screens/MentalRecording/MentalRecordingChoiceScreen';
import PreparationScreen from '../screens/MentalRecording/PreparationScreen';
import AudioPlayerScreen from '../screens/MentalRecording/AudioPlayerScreen';
import StoryCompletedScreen from '../screens/Story/StoryCompletedScreen';
import EnableNotificationsScreen from '../screens/Story/EnableNotificationsScreen';
import ScheduleNotificationScreen from '../screens/Story/ScheduleNotificationScreen';
import NotificationConfirmedScreen from '../screens/Story/NotificationConfirmedScreen';
import ContinueJourneyScreen from '../screens/Story/ContinueJourneyScreen';
import MainTabNavigator from './MainTabNavigator';
import ProgramDetailScreen from '../screens/Programs/ProgramDetailScreen';
import PlayerScreen from '../screens/Player/PlayerScreen';
import NotificationsScreen from '../screens/Profile/NotificationsScreen';
import SubscriptionScreen from '../screens/Profile/SubscriptionScreen';
import UnlockAlmaSenseScreen from '../screens/Profile/UnlockAlmaSenseScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';
import { theme } from '../styles/theme';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const { isLoading, hasCompletedOnboarding } = useAuth();

  // Mostra loading enquanto carrega estado persistido
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background }}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{ headerShown: false }}
        initialRouteName={hasCompletedOnboarding ? "Main" : "Onboarding"}
      >
        {!hasCompletedOnboarding ? (
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        ) : (
          <>
            <Stack.Screen name="Main" component={MainTabNavigator} />
            <Stack.Screen name="MentalRecordingChoice" component={MentalRecordingChoiceScreen} />
            <Stack.Screen name="Preparation" component={PreparationScreen} />
            <Stack.Screen name="AudioPlayer" component={AudioPlayerScreen} />
            <Stack.Screen name="StoryCompleted" component={StoryCompletedScreen} />
            <Stack.Screen name="EnableNotifications" component={EnableNotificationsScreen} />
            <Stack.Screen name="ScheduleNotification" component={ScheduleNotificationScreen} />
            <Stack.Screen name="NotificationConfirmed" component={NotificationConfirmedScreen} />
            <Stack.Screen name="ContinueJourney" component={ContinueJourneyScreen} />
            <Stack.Screen name="ProgramDetail" component={ProgramDetailScreen} />
            <Stack.Screen name="Player" component={PlayerScreen} />
            <Stack.Screen name="Notifications" component={NotificationsScreen} />
            <Stack.Screen name="Subscription" component={SubscriptionScreen} />
            <Stack.Screen name="UnlockAlmaSense" component={UnlockAlmaSenseScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
