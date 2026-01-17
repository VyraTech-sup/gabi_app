import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../styles/theme';
import Svg, { Circle, Path } from 'react-native-svg';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'StoryCompleted'>;

export default function StoryCompletedScreen() {
  const navigation = useNavigation<NavigationProp>();

  const handleContinue = () => {
    navigation.navigate('EnableNotifications');
  };

  return (
    <LinearGradient
      colors={[theme.colors.backgroundDark, theme.colors.background, theme.colors.primaryLight]}
      style={styles.container}
    >
      {/* Ícone do app no topo esquerdo */}
      <View style={styles.header}>
        <Svg width={40} height={40} viewBox="0 0 40 40">
          <Circle cx="20" cy="20" r="18" fill={theme.colors.accent1} opacity={0.3} />
          <Circle cx="20" cy="20" r="12" fill={theme.colors.accent1} opacity={0.6} />
          <Circle cx="20" cy="20" r="6" fill={theme.colors.accent1} />
        </Svg>
      </View>

      {/* Conteúdo central */}
      <View style={styles.content}>
        <Text style={styles.title}>Story concluído!</Text>
        <Text style={styles.subtitle}>Você alcançou a sua meta do dia.</Text>
      </View>

      {/* Botão no rodapé */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingLeft: 24,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '400',
    color: theme.colors.textLight,
    textAlign: 'center',
    lineHeight: 26,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  button: {
    backgroundColor: theme.colors.accent1,
    paddingVertical: 18,
    borderRadius: 28,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.textInverse,
  },
});
