import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../styles/theme';
import Svg, { Path } from 'react-native-svg';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'EnableNotifications'>;

export default function EnableNotificationsScreen() {
  const navigation = useNavigation<NavigationProp>();

  const handleEnableNotifications = () => {
    // Mock - apenas navega (sem lógica nativa)
    console.log('Notificações ativadas (mock)');
    navigation.navigate('ScheduleNotification');
  };

  const handleSkip = () => {
    navigation.navigate('ScheduleNotification');
  };

  return (
    <View style={styles.container}>
      {/* Ícone de sino */}
      <View style={styles.iconContainer}>
        <Svg width={80} height={80} viewBox="0 0 24 24" fill="none">
          <Path
            d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"
            stroke={theme.colors.text}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </View>

      {/* Conteúdo */}
      <View style={styles.content}>
        <Text style={styles.title}>Não perca seu Story diário.</Text>
        <Text style={styles.description}>
          Notificações te ajudam a permanecer comprometida com sua jornada.
        </Text>
      </View>

      {/* Botões */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.primaryButton} onPress={handleEnableNotifications}>
          <Text style={styles.primaryButtonText}>Ativar notificações</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipText}>Pular notificações</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: 24,
    paddingVertical: 60,
  },
  iconContainer: {
    alignItems: 'center',
    marginTop: 80,
    marginBottom: 40,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    fontWeight: '400',
    color: theme.colors.textLight,
    textAlign: 'center',
    lineHeight: 24,
  },
  footer: {
    gap: 16,
  },
  primaryButton: {
    backgroundColor: theme.colors.accent1,
    paddingVertical: 18,
    borderRadius: 28,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.textInverse,
  },
  skipButton: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  skipText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.textLight,
    textDecorationLine: 'underline',
  },
});
