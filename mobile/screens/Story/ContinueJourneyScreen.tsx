import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../styles/theme';
import Svg, { Path, Circle } from 'react-native-svg';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'ContinueJourney'>;

export default function ContinueJourneyScreen() {
  const navigation = useNavigation<NavigationProp>();

  const handleAppleSignIn = () => {
    // Mock - apenas navega (sem login real)
    console.log('Apple Sign In (mock)');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Main' }],
    });
  };

  const openTerms = () => {
    Linking.openURL('https://allmind.app/terms');
  };

  const openPrivacy = () => {
    Linking.openURL('https://allmind.app/privacy');
  };

  return (
    <View style={styles.container}>
      {/* Ícone decorativo */}
      <View style={styles.iconContainer}>
        <Svg width={120} height={120} viewBox="0 0 120 120">
          <Circle cx="60" cy="60" r="50" fill={theme.colors.textInverse} opacity={0.2} />
          <Circle cx="60" cy="60" r="35" fill={theme.colors.textInverse} opacity={0.4} />
          <Circle cx="60" cy="60" r="20" fill={theme.colors.textInverse} opacity={0.6} />
        </Svg>
      </View>

      {/* Conteúdo */}
      <View style={styles.content}>
        <Text style={styles.title}>Continue sua jornada</Text>
        <Text style={styles.description}>Acompanhe o progresso da sua jornada</Text>
      </View>

      {/* Botões */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.mockAppleButton} onPress={handleAppleSignIn}>
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="white">
            <Path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
          </Svg>
          <Text style={styles.mockAppleButtonText}>Entrar com Apple</Text>
        </TouchableOpacity>

        {/* Links legais */}
        <View style={styles.legalContainer}>
          <TouchableOpacity onPress={openTerms}>
            <Text style={styles.legalText}>Termos de uso</Text>
          </TouchableOpacity>
          <Text style={styles.legalSeparator}> e </Text>
          <TouchableOpacity onPress={openPrivacy}>
            <Text style={styles.legalText}>Política de Privacidade</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.accent1,
    paddingHorizontal: 24,
    paddingVertical: 60,
  },
  iconContainer: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: theme.colors.textInverse,
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 18,
    fontWeight: '400',
    color: theme.colors.textInverse,
    textAlign: 'center',
    opacity: 0.8,
    lineHeight: 26,
  },
  footer: {
    gap: 20,
  },
  mockAppleButton: {
    backgroundColor: '#000000',
    paddingVertical: 16,
    borderRadius: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  mockAppleButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  legalContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  legalText: {
    fontSize: 14,
    fontWeight: '400',
    color: theme.colors.textInverse,
    textDecorationLine: 'underline',
  },
  legalSeparator: {
    fontSize: 14,
    fontWeight: '400',
    color: theme.colors.textInverse,
  },
});
