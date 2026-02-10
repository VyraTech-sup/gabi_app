import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from 'react-native';

import { useAuth } from '../contexts/AuthContext';
import { theme } from '../styles/theme';
import { RootStackParamList } from './types';

import OnboardingScreen from '../screens/Auth/OnboardingScreen';
import SocialAuthScreen from '../screens/Auth/SocialAuthScreen';
import MentalRecordingChoiceScreen from '../screens/MentalRecording/MentalRecordingChoiceScreen';
import PreparationScreen from '../screens/MentalRecording/PreparationScreen';
import AudioPlayerScreen from '../screens/MentalRecording/AudioPlayerScreen';

import StoryCompletedScreen from '../screens/Story/StoryCompletedScreen';
import EnableNotificationsScreen from '../screens/Story/EnableNotificationsScreen';
import ScheduleNotificationScreen from '../screens/Story/ScheduleNotificationScreen';
import NotificationConfirmedScreen from '../screens/Story/NotificationConfirmedScreen';
import ContinueJourneyScreen from '../screens/Story/ContinueJourneyScreen';

import MainTabNavigator from './MainTabNavigator';
import AccessGrantedScreen from '../screens/AccessGrantedScreen';
import MusicScreen from '../screens/MusicScreen';
import ProgramDetailScreen from '../screens/Programs/ProgramDetailScreen';
import ProgramsScreen from '../screens/Programs/ProgramsScreen';
import PlayerScreen from '../screens/Player/PlayerScreen';
import NotificationsScreen from '../screens/Profile/NotificationsScreen';
import SubscriptionScreen from '../screens/Profile/SubscriptionScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.colors.background,
        }}
      >
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Onboarding">

        {/* 01️⃣ Onboarding (slides, cadastro, login) */}
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />

        {/* 02️⃣ Lista dos áudios/programas */}
        <Stack.Screen name="Programs" component={ProgramsScreen} />

        {/* 03️⃣ Inicie sua reprogramação mental */}
        <Stack.Screen name="MentalRecordingChoice" component={MentalRecordingChoiceScreen} />

        {/* 04️⃣ Para uma melhor experiência use fone de ouvidos */}
        <Stack.Screen name="Preparation" component={PreparationScreen} />

        {/* 05️⃣ Player do áudio selecionado */}
        <Stack.Screen name="AudioPlayer" component={AudioPlayerScreen} />

        {/* 06️⃣ Parabéns por terminar */}
        <Stack.Screen name="StoryCompleted" component={StoryCompletedScreen} />

        {/* 07️⃣ Vinculação com a conta Google/Apple */}
        <Stack.Screen name="SocialAuth" component={SocialAuthScreen} />

        {/* 08️⃣ Cobrança e 7 dias gratuitos */}
        <Stack.Screen name="Subscription" component={SubscriptionScreen} />

        {/* 09️⃣ Liberado o acesso ao Aplicativo */}
        <Stack.Screen name="AccessGranted" component={AccessGrantedScreen} />

        {/* 10️⃣ Home, detalhes dos áudios, avaliações, comentários */}
        <Stack.Screen name="Main" component={MainTabNavigator} />
        <Stack.Screen name="ProgramDetail" component={ProgramDetailScreen} />

        {/* 11️⃣ Aba de Músicas */}
        <Stack.Screen name="Music" component={MusicScreen} />

        {/* Extras internos do app */}
        <Stack.Screen name="Player" component={PlayerScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="EnableNotifications" component={EnableNotificationsScreen} />
        <Stack.Screen name="ScheduleNotification" component={ScheduleNotificationScreen} />
        <Stack.Screen name="NotificationConfirmed" component={NotificationConfirmedScreen} />
        <Stack.Screen name="ContinueJourney" component={ContinueJourneyScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
