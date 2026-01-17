import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { Audio, AVPlaybackStatus } from 'expo-av';
import { theme } from '../../styles/theme';
import { mockPrograms, mockEpisodes } from '../../data/mockData';

const { width } = Dimensions.get('window');

interface PlayerScreenProps {
  route: {
    params: {
      programId: string;
      episodeId?: string;
    };
  };
  navigation: {
    goBack: () => void;
  };
}

export default function PlayerScreen({ route, navigation }: PlayerScreenProps) {
  const { programId, episodeId } = route.params;
  const program = mockPrograms.find(p => p.id === programId);
  const episode = episodeId ? mockEpisodes.find(e => e.id === episodeId) : null;
  
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Carregar e configurar áudio
  useEffect(() => {
    let isMounted = true;

    async function loadAudio() {
      try {
        // Configurar modo de áudio - simplified para Expo Go
        try {
          await Audio.setAudioModeAsync({
            playsInSilentModeIOS: true,
          });
        } catch (audioModeError) {
          console.warn('Erro ao configurar modo de áudio:', audioModeError);
          // Continua mesmo se falhar - não é crítico
        }

        const currentContent = episode || program;
        
        // Validação robusta de conteúdo
        if (!currentContent) {
          console.error('Conteúdo não encontrado');
          if (isMounted) {
            setIsLoading(false);
            Alert.alert('Erro', 'Conteúdo não encontrado');
          }
          return;
        }

        if (!currentContent.audioSource) {
          console.warn('AudioSource não disponível para:', currentContent.title);
          if (isMounted) {
            setIsLoading(false);
            Alert.alert('Áudio não disponível', 'Este conteúdo ainda não possui áudio local. Em breve estará disponível.');
          }
          return;
        }

        // Criar e carregar sound object
        const { sound: newSound } = await Audio.Sound.createAsync(
          currentContent.audioSource,
          { shouldPlay: false },
          onPlaybackStatusUpdate
        );

        if (isMounted) {
          setSound(newSound);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Erro ao carregar áudio:', error);
        if (isMounted) {
          setIsLoading(false);
          Alert.alert('Erro', 'Não foi possível carregar o áudio. Verifique sua conexão e tente novamente.');
        }
      }
    }

    loadAudio();

    // Cleanup
    return () => {
      isMounted = false;
      if (sound) {
        sound.unloadAsync().catch(err => console.error('Erro ao descarregar áudio:', err));
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [programId, episodeId]);

  // Atualizar status de reprodução
  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      setCurrentTime(status.positionMillis / 1000);
      setDuration(status.durationMillis ? status.durationMillis / 1000 : 0);
      setIsPlaying(status.isPlaying);

      // Reiniciar quando terminar
      if (status.didJustFinish && !status.isLooping) {
        sound?.setPositionAsync(0);
        setIsPlaying(false);
      }
    }
  };

  // Controles de reprodução
  const togglePlayPause = async () => {
    if (!sound) return;

    try {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
    } catch (error) {
      console.error('Erro ao reproduzir/pausar:', error);
    }
  };

  const skipForward = async () => {
    if (!sound) return;
    try {
      const status = await sound.getStatusAsync();
      if (status.isLoaded) {
        const newPosition = Math.min(status.positionMillis + 15000, status.durationMillis || 0);
        await sound.setPositionAsync(newPosition);
      }
    } catch (error) {
      console.error('Erro ao avançar:', error);
    }
  };

  const skipBackward = async () => {
    if (!sound) return;
    try {
      const status = await sound.getStatusAsync();
      if (status.isLoaded) {
        const newPosition = Math.max(status.positionMillis - 15000, 0);
        await sound.setPositionAsync(newPosition);
      }
    } catch (error) {
      console.error('Erro ao retroceder:', error);
    }
  };

  const seekTo = async (position: number) => {
    if (!sound || !duration) return;
    try {
      await sound.setPositionAsync(position * duration * 1000);
    } catch (error) {
      console.error('Erro ao buscar posição:', error);
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? currentTime / duration : 0;

  const currentContent = episode || program;
  if (!currentContent) {
    return (
      <View style={styles.container}>
        <Text>Conteúdo não encontrado</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.headerIcon}>↓</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Em reprodução</Text>
        <TouchableOpacity>
          <Text style={styles.headerIcon}>⋯</Text>
        </TouchableOpacity>
      </View>

      {/* Cover Art */}
      <View style={styles.coverContainer}>
        <Image
          source={{ uri: currentContent.coverImage }}
          style={styles.coverArt}
        />
      </View>

      {/* Track Info */}
      <View style={styles.info}>
        <Text style={styles.title}>{currentContent.title}</Text>
        <Text style={styles.artist}>{program?.instructor || 'All Mind'}</Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <TouchableOpacity 
          style={styles.progressBar}
          activeOpacity={0.8}
          onPress={(e) => {
            const locationX = e.nativeEvent.locationX;
            const barWidth = width * 0.85;
            const position = locationX / barWidth;
            seekTo(position);
          }}
        >
          <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
        </TouchableOpacity>
        <View style={styles.timeContainer}>
          <Text style={styles.time}>{formatTime(currentTime)}</Text>
          <Text style={styles.time}>{formatTime(duration)}</Text>
        </View>
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlButton} disabled={true}>
          <Text style={styles.controlIcon}>🔀</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.controlButton}
          onPress={skipBackward}
          disabled={!sound || isLoading}
        >
          <Text style={styles.controlIconLarge}>⏮️</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.playButton}
          onPress={togglePlayPause}
          disabled={!sound || isLoading}
        >
          <Text style={styles.playIcon}>
            {isLoading ? '⏳' : (isPlaying ? '⏸️' : '▶️')}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.controlButton}
          onPress={skipForward}
          disabled={!sound || isLoading}
        >
          <Text style={styles.controlIconLarge}>⏭️</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.controlButton} disabled={true}>
          <Text style={styles.controlIcon}>🔁</Text>
        </TouchableOpacity>
      </View>

      {/* Additional Controls */}
      <View style={styles.additionalControls}>
        <TouchableOpacity style={styles.additionalButton}>
          <Text style={styles.additionalIcon}>❤️</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.additionalButton}>
          <Text style={styles.additionalIcon}>💤</Text>
          <Text style={styles.additionalText}>Timer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.additionalButton}>
          <Text style={styles.additionalIcon}>📥</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing['3xl'],
    marginBottom: theme.spacing.xl,
  },
  headerIcon: {
    fontSize: 28,
    color: theme.colors.text,
  },
  headerTitle: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textSecondary,
    fontWeight: theme.typography.fontWeight.medium,
  },
  coverContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  coverArt: {
    width: width * 0.85,
    height: width * 0.85,
    borderRadius: theme.borderRadius.xl,
    backgroundColor: theme.colors.border,
    ...theme.shadows.lg,
  },
  info: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  title: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.xs,
  },
  artist: {
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.textSecondary,
  },
  progressContainer: {
    marginBottom: theme.spacing.xl,
  },
  progressBar: {
    height: 4,
    backgroundColor: theme.colors.border,
    borderRadius: theme.borderRadius.full,
    overflow: 'hidden',
    marginBottom: theme.spacing.sm,
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.primary,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  time: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
    gap: theme.spacing.lg,
  },
  controlButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlIcon: {
    fontSize: 24,
  },
  controlIconLarge: {
    fontSize: 36,
  },
  playButton: {
    width: 72,
    height: 72,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.md,
  },
  playIcon: {
    fontSize: 32,
  },
  additionalControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  additionalButton: {
    alignItems: 'center',
  },
  additionalIcon: {
    fontSize: 24,
    marginBottom: theme.spacing.xs,
  },
  additionalText: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textSecondary,
  },
});
