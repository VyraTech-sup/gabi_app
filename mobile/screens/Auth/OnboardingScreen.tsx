import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions, Platform, TouchableOpacity } from 'react-native';
import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av';
import { Audio } from 'expo-av';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../styles/theme';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/Button';
import Svg, { Path, Polygon } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

export default function OnboardingScreen() {
  const [step, setStep] = useState(1);
  const navigation = useNavigation();
  const { completeOnboarding } = useAuth();
  const videoRef = useRef<Video>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  // Controle de vídeos para step 2 e 5
  useEffect(() => {
    const playVideo = async () => {
      try {
        if (videoRef.current) {
          await videoRef.current.playAsync?.();
        }
      } catch (e) {
        // silent
      }
    };

    const pauseVideo = async () => {
      try {
        if (videoRef.current) {
          await videoRef.current.pauseAsync?.();
        }
      } catch (e) {
        // silent
      }
    };

    if (step === 2 || step === 5) {
      playVideo();
    } else {
      pauseVideo();
    }

    return () => { pauseVideo(); };
  }, [step]);

  // Controle de áudio para step 8
  useEffect(() => {
    const loadAudio = async () => {
      try {
        const { sound: newSound } = await Audio.Sound.createAsync(
          require('../../assets/mentalidade_mudancas.mp3.mp4'),
          { shouldPlay: false },
          (status: any) => {
            if (status.isLoaded) {
              setPosition(status.positionMillis);
              setDuration(status.durationMillis || 0);
              setIsPlaying(status.isPlaying);
              
              if (status.didJustFinish) {
                handleContinue();
              }
            }
          }
        );
        setSound(newSound);
      } catch (error) {
        console.error('Erro ao carregar áudio:', error);
      }
    };

    if (step === 8) {
      loadAudio();
    }
    
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [step]);

  // Áudio - Carregar e gerenciar
  const loadAudio = async () => {
    try {
      const { sound: newSound } = await Audio.Sound.createAsync(
        require('../../assets/mentalidade_mudancas.mp3.mp4'),
        { shouldPlay: false },
        (status: any) => {
          if (status.isLoaded) {
            setPosition(status.positionMillis);
            setDuration(status.durationMillis || 0);
            setIsPlaying(status.isPlaying);
            
            if (status.didJustFinish) {
              handleContinue();
            }
          }
        }
      );
      setSound(newSound);
    } catch (error) {
      console.error('Erro ao carregar áudio:', error);
    }
  };

  useEffect(() => {
    if (step === 8) {
      loadAudio();
    }
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [step]);

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

  const handleContinue = () => {
    completeOnboarding();
    navigation.reset({
      index: 0,
      routes: [{ name: 'MentalRecordingChoice' as never }],
    });
  };

  const handlePlaybackStatus = (status: AVPlaybackStatus) => {
    if (status && (status as any).didJustFinish) {
      if (step === 2) {
        setStep(3);
      } else if (step === 5) {
        setStep(6);
      }
    }
  };

  // Tela 1 - Imagem
  if (step === 1) {
    return (
      <ImageBackground
        source={require('../../assets/onboarding/allmind-tela1.png')}
        style={styles.fullScreen}
        resizeMode="cover"
      >
        <View style={styles.navControls}>
          <TouchableOpacity onPress={() => setStep(2)} style={styles.navButton}>
            <Text style={styles.navText}>→</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }

  // Tela 2 - Vídeo
  if (step === 2) {
    if (Platform.OS === 'web') {
      return (
        <View style={styles.fullScreen}>
          <video
            autoPlay
            muted
            playsInline
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          >
            <source src={require('../../assets/onboarding/allmind-tela2.mp4')} type="video/mp4" />
          </video>
          <View style={styles.navControls}>
            <TouchableOpacity onPress={() => setStep(1)} style={styles.navButton}>
              <Text style={styles.navText}>←</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setStep(3)} style={styles.navButton}>
              <Text style={styles.navText}>→</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.fullScreen}>
        <Video
          ref={videoRef}
          source={require('../../assets/onboarding/allmind-tela2.mp4')}
          style={[styles.fullScreen, { backgroundColor: '#000' }]}
          resizeMode={ResizeMode.COVER}
          isLooping={false}
          shouldPlay={true}
          isMuted={true}
          useNativeControls={false}
          onPlaybackStatusUpdate={handlePlaybackStatus}
          onError={(error) => { console.warn('Onboarding video error:', error); }}
          onLoad={() => { console.log('Onboarding video loaded'); }}
          progressUpdateIntervalMillis={1000}
        />
        <View style={styles.navControls}>
          <TouchableOpacity onPress={async () => { try { await videoRef.current?.pauseAsync(); } catch {} setStep(1); }} style={styles.navButton}>
            <Text style={styles.navText}>←</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={async () => { try { await videoRef.current?.pauseAsync(); } catch {} setStep(3); }} style={styles.navButton}>
            <Text style={styles.navText}>→</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Tela 3 - Imagem
  if (step === 3) {
    return (
      <ImageBackground
        source={require('../../assets/onboarding/allmind-tela3.png')}
        style={styles.fullScreen}
        resizeMode="cover"
      >
        <View style={styles.content}>
          <View style={styles.footer}>
            <TouchableOpacity onPress={() => setStep(2)} style={styles.backButton}>
              <Text style={styles.backArrow}>←</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => setStep(4)} style={styles.continueButton}>
              <Text style={styles.continueText}>CONTINUAR →</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  }

  // Tela 4 - Imagem
  if (step === 4) {
    return (
      <ImageBackground
        source={require('../../assets/onboarding/allmind-tela4.png')}
        style={styles.fullScreen}
        resizeMode="cover"
      >
        <View style={styles.content}>
          <View style={styles.footer}>
            <TouchableOpacity onPress={() => setStep(3)} style={styles.backButton}>
              <Text style={styles.backArrow}>←</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => setStep(5)} style={styles.continueButton}>
              <Text style={styles.continueText}>Iniciar Story 1</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  }

  // Tela 5 - Imagem
  if (step === 5) {
    return (
      <ImageBackground
        // source={require('../../assets/onboarding/allmind-tela5.png')}
        style={styles.fullScreen}
        resizeMode="cover"
      >
        <View style={styles.navControls}>
          <TouchableOpacity onPress={() => setStep(4)} style={styles.navButton}>
            <Text style={styles.navText}>←</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setStep(6)} style={styles.navButton}>
            <Text style={styles.navText}>→</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }

  // Tela 6 - Escolha sua Recodificação Mental
  if (step === 6) {
    return (
      <View style={styles.choiceContainer}>
        {/* Título */}
        <Text style={styles.choiceTitle}>Escolha sua</Text>
        <Text style={styles.choiceTitle}>Recodificação</Text>
        <Text style={styles.choiceTitle}>Mental</Text>

        {/* Card */}
        <View style={styles.choiceCard}>
          {/* Texto do programa */}
          <Text style={styles.choiceProgramText}>Mentalidade e Mudanças</Text>

          {/* Badge duração */}
          <View style={styles.choiceBadge}>
            <Text style={styles.choiceBadgeText}>26:41</Text>
          </View>

          {/* Botão Iniciar */}
          <TouchableOpacity style={styles.choiceStartButton} onPress={() => setStep(7)}>
            <Text style={styles.choiceStartButtonText}>Iniciar Recodificação Mental</Text>
          </TouchableOpacity>
        </View>

        {/* Link Pular */}
        <TouchableOpacity onPress={() => setStep(7)}>
          <Text style={styles.choiceSkipText}>Pular Recodificação Mental</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Tela 7 - Imagem final com botão Continuar
  if (step === 7) {
    return (
      <ImageBackground
        source={require('../../assets/onboarding/allmind-tela6.png')}
        style={styles.fullScreen}
        resizeMode="cover"
      >
        <View style={styles.content}>
          <View style={styles.footer}>
            <TouchableOpacity onPress={() => setStep(6)} style={styles.backButton}>
              <Text style={styles.backArrow}>←</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => setStep(8)} style={styles.continueButton}>
              <Text style={styles.continueText}>CONTINUAR →</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  }

  // Tela 8 - Audio Player
  if (step === 8) {
    return (
    <View style={styles.audioPlayerContainer}>
      {/* Tempo do áudio */}
      <Text style={styles.audioTimeText}>{formatTime(position)} / {formatTime(duration)}</Text>

      {/* Controles de áudio */}
      <View style={styles.audioControls}>
        {/* Botão voltar 10s */}
        <TouchableOpacity onPress={handleSkipBackward} style={styles.audioControlButton}>
          <Svg width={40} height={40} viewBox="0 0 24 24" fill="none">
            <Polygon points="11,5 5,12 11,19" fill="#FFFFFF" />
            <Polygon points="18,5 12,12 18,19" fill="#FFFFFF" />
          </Svg>
        </TouchableOpacity>

        {/* Botão Play/Pause */}
        <TouchableOpacity onPress={handlePlayPause} style={styles.audioPlayButton}>
          {isPlaying ? (
            <Svg width={60} height={60} viewBox="0 0 24 24" fill="none">
              <Path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" fill="#FFFFFF" />
            </Svg>
          ) : (
            <Svg width={60} height={60} viewBox="0 0 24 24" fill="none">
              <Path d="M8 5v14l11-7L8 5z" fill="#FFFFFF" />
            </Svg>
          )}
        </TouchableOpacity>

        {/* Botão avançar 10s */}
        <TouchableOpacity onPress={handleSkipForward} style={styles.audioControlButton}>
          <Svg width={40} height={40} viewBox="0 0 24 24" fill="none">
            <Polygon points="13,5 19,12 13,19" fill="#FFFFFF" />
            <Polygon points="6,5 12,12 6,19" fill="#FFFFFF" />
          </Svg>
        </TouchableOpacity>
      </View>

      {/* Controles de navegação */}
      <View style={styles.navControls}>
        <TouchableOpacity onPress={() => setStep(7)} style={styles.navButton}>
          <Text style={styles.navText}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleContinue} style={styles.navButton}>
          <Text style={styles.navText}>→</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  }
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingVertical: theme.spacing['2xl'],
    paddingHorizontal: theme.spacing.xl,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  backButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    fontSize: 32,
    color: '#FFFFFF',
  },
  continueButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueText: {
    fontSize: 20,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary,
  },
  navControls: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    zIndex: 10,
  },
  navButton: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navText: {
    fontSize: 28,
    color: '#000',
  },
  choiceContainer: {
    flex: 1,
    backgroundColor: '#3A5A6C',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  choiceTitle: {
    fontSize: 44,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
    textAlign: 'center',
  },
  choiceCard: {
    backgroundColor: '#C9BA85',
    borderRadius: 24,
    padding: 32,
    marginTop: 30,
    marginBottom: 35,
    alignItems: 'center',
    minHeight: 450,
  },
  choiceImageContainer: {
    width: '100%',
    height: 220,
    marginBottom: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  choiceImage: {
    width: 160,
    height: 160,
    backgroundColor: '#E8DCC4',
    borderRadius: 80,
  },
  choiceProgramText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#3A5A6C',
    textAlign: 'center',
    marginTop: 100,
  },
  choiceBadge: {
    backgroundColor: '#3A5A6C',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 20,
    marginBottom: 28,
  },
  choiceBadgeText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  choiceStartButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  choiceStartButtonText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#3A5A6C',
    textAlign: 'center',
  },
  choiceSkipText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  audioPlayerContainer: {
    flex: 1,
    backgroundColor: '#3A5A6C',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  audioTimeText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 60,
  },
  audioControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 30,
  },
  audioControlButton: {
    padding: 15,
  },
  audioPlayButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});