import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../styles/theme';
import { useAuth } from '../../contexts/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Svg, { Circle, G, Path } from 'react-native-svg';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'MentalRecordingChoice'>;

export default function MentalRecordingChoiceScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { hasActiveSubscription, canWatchTodayStory, lastStoryDate } = useAuth();
  const [isLocked, setIsLocked] = useState(false);
  const [isWatchedToday, setIsWatchedToday] = useState(false);

  useEffect(() => {
    checkStoryStatus();
  }, [hasActiveSubscription, lastStoryDate]);

  const checkStoryStatus = () => {
    const today = new Date().toISOString().split('T')[0];
    const watchedToday = lastStoryDate === today;
    
    setIsWatchedToday(watchedToday);
    
    // Bloquear se não tem assinatura OU já assistiu hoje
    if (!hasActiveSubscription) {
      setIsLocked(true);
    } else if (watchedToday) {
      setIsLocked(true);
    } else {
      setIsLocked(false);
    }
  };

  const handleStartRecording = () => {
    if (!hasActiveSubscription) {
      Alert.alert(
        'Assinatura necessária',
        'Assine para desbloquear o Story de hoje e todo o conteúdo exclusivo.',
        [
          { text: 'Cancelar', style: 'cancel' },
          { 
            text: 'Assinar', 
            onPress: () => navigation.navigate('UnlockAlmaSense')
          },
        ]
      );
      return;
    }

    if (isWatchedToday) {
      Alert.alert(
        'Story já assistido',
        'Você já assistiu o Story de hoje. Volte amanhã para um novo Story!',
        [{ text: 'OK' }]
      );
      return;
    }

    navigation.navigate('Preparation');
  };

  const handleSkip = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Main' }],
    });
  };

  const handleReset = async () => {
    try {
      // Limpar AsyncStorage
      await AsyncStorage.clear();
      console.log('AsyncStorage cleared');
      
      // Forçar reload completo
      if (typeof window !== 'undefined') {
        // Web: reload forçado ignorando cache
        window.location.href = window.location.href.split('?')[0] + '?t=' + Date.now();
      }
    } catch (error) {
      console.error('Erro ao resetar:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Botão fechar */}
      <TouchableOpacity style={styles.closeButton} onPress={handleSkip}>
        <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
          <Path d="M18 6L6 18M6 6l12 12" stroke={theme.colors.text} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
      </TouchableOpacity>

      {/* Botão RESET (temporário para dev) */}
      <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
        <Text style={styles.resetText}>RESET</Text>
      </TouchableOpacity>

      {/* Título no topo */}
      <View style={styles.header}>
        <Text style={styles.title}>Escolha sua</Text>
        <Text style={styles.title}>Recodificação</Text>
        <Text style={styles.title}>Mental</Text>
      </View>

      {/* Card central */}
      <View style={[styles.card, isLocked && styles.cardLocked]}>
        {/* Cadeado (se bloqueado) */}
        {isLocked && (
          <View style={styles.lockOverlay}>
            <Svg width={48} height={48} viewBox="0 0 24 24" fill="none">
              <Path d="M19 11h-1V7c0-2.757-2.243-5-5-5S8 4.243 8 7v4H7c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-8c0-1.103-.897-2-2-2zM10 7c0-1.654 1.346-3 3-3s3 1.346 3 3v4h-6V7z" fill={theme.colors.text} />
            </Svg>
            <Text style={styles.lockText}>
              {!hasActiveSubscription ? 'Assinatura necessária' : 'Disponível amanhã'}
            </Text>
          </View>
        )}

        {/* Ilustração de cabeça abstrata */}
        <View style={styles.imageContainer}>
          <Svg width={180} height={180} viewBox="0 0 180 180">
            <G opacity={isLocked ? 0.3 : 1}>
              {/* Círculos representando partículas - cabeça abstrata */}
              <Circle cx="90" cy="50" r="8" fill="#4A6A7C" opacity={0.7} />
              <Circle cx="70" cy="60" r="6" fill="#5A7A8C" opacity={0.8} />
              <Circle cx="110" cy="60" r="6" fill="#5A7A8C" opacity={0.8} />
              <Circle cx="90" cy="70" r="10" fill="#3A5A6C" opacity={0.9} />
              <Circle cx="60" cy="80" r="7" fill="#4A6A7C" opacity={0.7} />
              <Circle cx="120" cy="80" r="7" fill="#4A6A7C" opacity={0.7} />
              <Circle cx="90" cy="90" r="12" fill="#2D4A57" opacity={1} />
              <Circle cx="75" cy="100" r="8" fill="#3A5A6C" opacity={0.8} />
              <Circle cx="105" cy="100" r="8" fill="#3A5A6C" opacity={0.8} />
              <Circle cx="90" cy="110" r="9" fill="#4A6A7C" opacity={0.7} />
              <Circle cx="65" cy="115" r="6" fill="#5A7A8C" opacity={0.6} />
              <Circle cx="115" cy="115" r="6" fill="#5A7A8C" opacity={0.6} />
              <Circle cx="90" cy="125" r="7" fill="#3A5A6C" opacity={0.7} />
              <Circle cx="80" cy="135" r="5" fill="#4A6A7C" opacity={0.6} />
              <Circle cx="100" cy="135" r="5" fill="#4A6A7C" opacity={0.6} />
              <Circle cx="90" cy="145" r="6" fill="#5A7A8C" opacity={0.5} />
            </G>
          </Svg>
        </View>

        {/* Texto do programa */}
        <Text style={[styles.programTitle, isLocked && styles.programTitleLocked]}>
          Relacionamento Consigo
        </Text>
        <Text style={[styles.programTitle, isLocked && styles.programTitleLocked]}>
          Mesma - Intro
        </Text>

        {/* Badge de duração */}
        <View style={styles.badge}>
          <Text style={styles.badgeText}>12 min</Text>
        </View>

        {/* Botão principal */}
        <TouchableOpacity 
          style={[styles.primaryButton, isLocked && styles.primaryButtonLocked]} 
          onPress={handleStartRecording}
        >
          <Text style={styles.primaryButtonText}>
            {isLocked ? (isWatchedToday ? 'Assistir novamente' : 'Desbloquear') : 'Iniciar Recodificação Mental'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Link para pular */}
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>Pular Recodificação Mental</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  closeButton: {
    position: 'absolute',
    top: 60,
    right: 24,
    zIndex: 10,
    padding: 8,
  },
  resetButton: {
    position: 'absolute',
    top: 60,
    left: 24,
    zIndex: 10,
    padding: 8,
    backgroundColor: 'rgba(231, 76, 60, 0.8)',
    borderRadius: 8,
  },
  resetText: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.text,
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: theme.colors.text,
    lineHeight: 38,
  },
  card: {
    backgroundColor: '#D4B5A8',
    borderRadius: 24,
    paddingVertical: 40,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginBottom: 24,
    position: 'relative',
  },
  cardLocked: {
    opacity: 0.8,
  },
  lockOverlay: {
    position: 'absolute',
    top: 20,
    right: 20,
    alignItems: 'center',
    zIndex: 10,
    backgroundColor: 'rgba(45, 74, 87, 0.9)',
    padding: 16,
    borderRadius: 12,
  },
  lockText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.text,
    marginTop: 8,
    textAlign: 'center',
  },
  imageContainer: {
    marginBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  programTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D4A57',
    textAlign: 'center',
    lineHeight: 24,
  },
  programTitleLocked: {
    opacity: 0.5,
  },
  badge: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    marginTop: 16,
    marginBottom: 24,
  },
  badgeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D4A57',
  },
  primaryButton: {
    backgroundColor: '#2D4A57',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 28,
    width: '100%',
    alignItems: 'center',
  },
  primaryButtonLocked: {
    backgroundColor: '#5A7A8C',
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  skipButton: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  skipText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    textDecorationLine: 'underline',
  },
});
