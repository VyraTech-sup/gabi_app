import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../styles/theme';
import { useAuth } from '../../contexts/AuthContext';
import Svg, { Circle, G, Path, Polygon } from 'react-native-svg';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'AudioPlayer'>;

export default function AudioPlayerScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { markStoryWatched } = useAuth();
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    loadAudio();
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const loadAudio = async () => {
    try {
      const { sound: newSound } = await Audio.Sound.createAsync(
        require('../../assets/fe_autocura.opus'),
        { shouldPlay: false },
        onPlaybackStatusUpdate
      );
      setSound(newSound);
    } catch (error) {
      console.error('Erro ao carregar áudio:', error);
    }
  };

  const onPlaybackStatusUpdate = (status: any) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis);
      setDuration(status.durationMillis || 0);
      setIsPlaying(status.isPlaying);
      
      // Quando o áudio terminar, marcar Story como assistido e navegar
      if (status.didJustFinish) {
        markStoryWatched();
        navigation.navigate('StoryCompleted');
      }
    }
  };

  const handlePlayPause = async () => {
    if (!sound) return;

    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
  };

  const handleSkipBackward = async () => {
    if (!sound) return;
    const newPosition = Math.max(0, position - 10000);
    await sound.setPositionAsync(newPosition);
  };

  const handleSkipForward = async () => {
    if (!sound) return;
    const newPosition = Math.min(duration, position + 10000);
    await sound.setPositionAsync(newPosition);
  };

  const formatTime = (millis: number) => {
    const totalSeconds = Math.floor(millis / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      {/* Botões de navegação */}
      <View style={styles.headerButtons}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.goBack()}>
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
            <Path d="M19 12H5M12 19l-7-7 7-7" stroke={theme.colors.text} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navButton} 
          onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Main' }] })}
        >
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
            <Path d="M18 6L6 18M6 6l12 12" stroke={theme.colors.text} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        </TouchableOpacity>
      </View>

      {/* Ilustração grande da cabeça abstrata */}
      <View style={styles.illustrationContainer}>
        <Svg width={240} height={240} viewBox="0 0 240 240">
          <G>
            {/* Cabeça abstrata em partículas - versão grande */}
            <Circle cx="120" cy="60" r="12" fill="#FFFFFF" opacity={0.7} />
            <Circle cx="95" cy="75" r="9" fill="#CCDCE5" opacity={0.8} />
            <Circle cx="145" cy="75" r="9" fill="#CCDCE5" opacity={0.8} />
            <Circle cx="120" cy="88" r="14" fill="#FFFFFF" opacity={0.9} />
            <Circle cx="80" cy="100" r="10" fill="#A0B5C0" opacity={0.7} />
            <Circle cx="160" cy="100" r="10" fill="#A0B5C0" opacity={0.7} />
            <Circle cx="120" cy="115" r="16" fill="#FFFFFF" opacity={1} />
            <Circle cx="100" cy="130" r="11" fill="#CCDCE5" opacity={0.8} />
            <Circle cx="140" cy="130" r="11" fill="#CCDCE5" opacity={0.8} />
            <Circle cx="120" cy="145" r="13" fill="#A0B5C0" opacity={0.7} />
            <Circle cx="88" cy="155" r="9" fill="#CCDCE5" opacity={0.6} />
            <Circle cx="152" cy="155" r="9" fill="#CCDCE5" opacity={0.6} />
            <Circle cx="120" cy="165" r="10" fill="#FFFFFF" opacity={0.7} />
            <Circle cx="105" cy="178" r="8" fill="#A0B5C0" opacity={0.6} />
            <Circle cx="135" cy="178" r="8" fill="#A0B5C0" opacity={0.6} />
            <Circle cx="120" cy="190" r="9" fill="#CCDCE5" opacity={0.5} />
            
            {/* Partículas adicionais ao redor */}
            <Circle cx="60" cy="120" r="6" fill="#A0B5C0" opacity={0.4} />
            <Circle cx="180" cy="120" r="6" fill="#A0B5C0" opacity={0.4} />
            <Circle cx="70" cy="145" r="5" fill="#CCDCE5" opacity={0.3} />
            <Circle cx="170" cy="145" r="5" fill="#CCDCE5" opacity={0.3} />
            <Circle cx="90" cy="85" r="5" fill="#FFFFFF" opacity={0.4} />
            <Circle cx="150" cy="85" r="5" fill="#FFFFFF" opacity={0.4} />
          </G>
        </Svg>
      </View>

      {/* Tempo do áudio */}
      <Text style={styles.timeText}>{formatTime(position)}</Text>

      {/* Barra de progresso */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill,
              { width: duration > 0 ? `${(position / duration) * 100}%` : '0%' }
            ]} 
          />
        </View>
        <View style={styles.progressTimeContainer}>
          <Text style={styles.progressTime}>{formatTime(position)}</Text>
          <Text style={styles.progressTime}>{formatTime(duration)}</Text>
        </View>
      </View>

      {/* Controles de áudio */}
      <View style={styles.controls}>
        {/* Botão voltar 10s */}
        <TouchableOpacity style={styles.controlButton} onPress={handleSkipBackward}>
          <Svg width={32} height={32} viewBox="0 0 24 24" fill="none">
            <Path d="M11 19l-7-7 7-7M4 12h16" stroke={theme.colors.text} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
          <Text style={styles.controlLabel}>10s</Text>
        </TouchableOpacity>

        {/* Botão play/pause */}
        <TouchableOpacity style={styles.playButton} onPress={handlePlayPause}>
          {isPlaying ? (
            <Svg width={48} height={48} viewBox="0 0 24 24" fill={theme.colors.text}>
              <Path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </Svg>
          ) : (
            <Svg width={48} height={48} viewBox="0 0 24 24" fill={theme.colors.text}>
              <Polygon points="5 3 19 12 5 21 5 3" />
            </Svg>
          )}
        </TouchableOpacity>

        {/* Botão avançar 10s */}
        <TouchableOpacity style={styles.controlButton} onPress={handleSkipForward}>
          <Svg width={32} height={32} viewBox="0 0 24 24" fill="none">
            <Path d="M13 5l7 7-7 7M20 12H4" stroke={theme.colors.text} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
          <Text style={styles.controlLabel}>10s</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'space-between',
    paddingVertical: 80,
    paddingHorizontal: 24,
  },
  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  navButton: {
    padding: 8,
  },
  illustrationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  timeText: {
    fontSize: 48,
    fontWeight: '300',
    color: theme.colors.text,
    textAlign: 'center',
    letterSpacing: 2,
  },
  progressContainer: {
    width: '100%',
    paddingHorizontal: 32,
    marginTop: 24,
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.accent1,
    borderRadius: 2,
  },
  progressTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  progressTime: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 40,
    paddingBottom: 40,
  },
  controlButton: {
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.9,
  },
  controlLabel: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginTop: 4,
  },
  playButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
});
