import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Svg, Path } from 'react-native-svg';

export default function OnboardingCountdown() {
  const [count, setCount] = useState(5);
  const navigation = useNavigation();
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
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
            navigation.reset({
              index: 0,
              routes: [{ name: 'Main' as never }],
            });
          }, 1000);
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigation, rotateAnim]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Continue com sua</Text>
        <Text style={styles.title}>Recodificação Mental</Text>
        
        <Text style={styles.subtitle}>Recodifique sua mente</Text>

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F2430',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '300',
    color: '#E8DCC4',
    textAlign: 'center',
    letterSpacing: 1,
  },
  subtitle: {
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
