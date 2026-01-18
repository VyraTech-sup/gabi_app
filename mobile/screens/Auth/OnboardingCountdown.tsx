import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
 

export default function OnboardingCountdown() {
  const [count, setCount] = useState(5);
  const navigation = useNavigation();

  useEffect(() => {
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
  }, [navigation]);


  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Continue com sua</Text>
        <Text style={styles.title}>Recodificação Mental</Text>
        
        <Text style={styles.subtitle}>Recodifique sua mente</Text>

        <Text style={styles.countText}>{count}</Text>
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
  countText: {
    fontSize: 96,
    fontWeight: '300',
    color: '#C9A961',
    marginTop: 20,
    letterSpacing: 2,
  },
});
