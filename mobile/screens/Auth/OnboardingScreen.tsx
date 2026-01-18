import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions, Platform, TouchableOpacity, Animated } from 'react-native';
import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Svg, Path } from 'react-native-svg';
import { theme } from '../../styles/theme';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/Button';

const { width, height } = Dimensions.get('window');

export default function OnboardingScreen() {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(5);
  const [showCountdown, setShowCountdown] = useState(false);
  const navigation = useNavigation();
  const { completeOnboarding } = useAuth();
  const videoRef = useRef<Video>(null);
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (showCountdown) {
      // Rotação infinita da flor
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        })
      ).start();

      // Contagem regressiva
      const timer = setInterval(() => {
        setCount((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            setTimeout(() => {
              completeOnboarding();
              navigation.reset({
                index: 0,
                routes: [{ name: 'MentalRecordingChoice' as never }],
              });
            }, 1000);
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [showCountdown, navigation, completeOnboarding, rotateAnim]);

  const handleContinue = () => {
    setShowCountdown(true);
  };

  if (step === 1) {
    return (
      <ImageBackground
        source={require('../../assets/onboarding/allmind-intro.jpg')}
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
            <source src={require('../../assets/onboarding/onboarding-02-video.mp4')} type="video/mp4" />
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
    
    // ensure video plays when entering step 2 and advances when finishes
    useEffect(() => {
      const play = async () => {
        try {
          if (videoRef.current) {
            // start playback
            // @ts-ignore -- Expo Video methods
            await videoRef.current.playAsync?.();
          }
        } catch (e) {
          // silent
        }
      };

      const pause = async () => {
        try {
          if (videoRef.current) {
            // @ts-ignore
            await videoRef.current.pauseAsync?.();
          }
        } catch (e) {
          // silent
        }
      };

      if (step === 2) {
        play();
      } else {
        pause();
      }

      return () => { pause(); };
    }, [step]);

    const handlePlaybackStatus = (status: AVPlaybackStatus) => {
      // advance when video finished
      // some status shapes may not have didJustFinish
      // @ts-ignore
      if (status && (status as any).didJustFinish) {
        setStep(3);
      }
    };

    return (
      <View style={styles.fullScreen}>
        <Video
          ref={videoRef}
          source={require('../../assets/onboarding/onboarding-02-video.mp4')}
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

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  if (showCountdown) {
    return (
      <View style={styles.countdownContainer}>
        <View style={styles.countdownContent}>
          <Text style={styles.countdownTitle}>Continue com sua</Text>
          <Text style={styles.countdownTitle}>Recodificação Mental</Text>
          
          <Text style={styles.countdownSubtitle}>Recodifique sua mente</Text>

          <Animated.View style={[styles.flowerContainer, { transform: [{ rotate: spin }] }]}>
            <Svg width="200" height="200" viewBox="0 0 200 200">
              <Path
                d="M100,40 L110,60 L130,50 L120,70 L140,80 L120,90 L130,110 L110,100 L100,120 L90,100 L70,110 L80,90 L60,80 L80,70 L70,50 L90,60 Z M100,60 L105,75 L120,70 L110,85 L125,95 L110,100 L120,115 L105,110 L100,125 L95,110 L80,115 L90,100 L75,95 L90,85 L80,70 L95,75 Z"
                fill="none"
                stroke="#C9A961"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Path
                d="M100,70 L103,80 L113,77 L108,87 L118,92 L108,97 L113,107 L103,104 L100,114 L97,104 L87,107 L92,97 L82,92 L92,87 L87,77 L97,80 Z"
                fill="none"
                stroke="#C9A961"
                strokeWidth="2"
              />
            </Svg>
            
            <View style={styles.countContainer}>
              <Text style={styles.countText}>{count}</Text>
            </View>
          </Animated.View>
        </View>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require('../../assets/onboarding/onboarding-03-content.jpg')}
      style={styles.fullScreen}
      resizeMode="cover"
    >
      <LinearGradient
        colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)']}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <View style={styles.footer}>
            <TouchableOpacity onPress={() => setStep(2)} style={styles.backButton}>
              <Text style={styles.backArrow}>←</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={handleContinue} style={styles.continueButton}>
              <Text style={styles.continueText}>CONTINUAR →</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
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
  countdownContainer: {
    flex: 1,
    backgroundColor: '#0F2430',
    justifyContent: 'center',
    alignItems: 'center',
  },
  countdownContent: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  countdownTitle: {
    fontSize: 28,
    fontWeight: '300',
    color: '#E8DCC4',
    textAlign: 'center',
    letterSpacing: 1,
  },
  countdownSubtitle: {
    fontSize: 18,
    fontWeight: '400',
    color: '#C9A961',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 60,
    letterSpacing: 0.5,
  },
  flowerContainer: {
    position: 'relative',
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countText: {
    fontSize: 64,
    fontWeight: '300',
    color: '#C9A961',
  },
});

