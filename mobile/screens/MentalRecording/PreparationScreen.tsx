import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../styles/theme';
import Svg, { Circle, G, Path } from 'react-native-svg';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Preparation'>;

export default function PreparationScreen() {
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    // Auto-navega após 4 segundos
    const timer = setTimeout(() => {
      navigation.navigate('AudioPlayer');
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigation]);

  const handleTap = () => {
    navigation.navigate('AudioPlayer');
  };

  return (
    <TouchableWithoutFeedback onPress={handleTap}>
      <View style={styles.container}>
        {/* Botão voltar */}
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
            <Path d="M19 12H5M12 19l-7-7 7-7" stroke={theme.colors.text} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        </TouchableOpacity>

        {/* Ícone central pequeno */}
        <View style={styles.iconContainer}>
          <Svg width={100} height={100} viewBox="0 0 100 100">
            <G>
              {/* Versão menor da cabeça abstrata */}
              <Circle cx="50" cy="25" r="5" fill="#FFFFFF" opacity={0.7} />
              <Circle cx="40" cy="32" r="4" fill="#CCDCE5" opacity={0.8} />
              <Circle cx="60" cy="32" r="4" fill="#CCDCE5" opacity={0.8} />
              <Circle cx="50" cy="38" r="6" fill="#FFFFFF" opacity={0.9} />
              <Circle cx="35" cy="45" r="4" fill="#A0B5C0" opacity={0.7} />
              <Circle cx="65" cy="45" r="4" fill="#A0B5C0" opacity={0.7} />
              <Circle cx="50" cy="50" r="7" fill="#FFFFFF" opacity={1} />
              <Circle cx="42" cy="57" r="5" fill="#CCDCE5" opacity={0.8} />
              <Circle cx="58" cy="57" r="5" fill="#CCDCE5" opacity={0.8} />
              <Circle cx="50" cy="63" r="5" fill="#A0B5C0" opacity={0.7} />
              <Circle cx="38" cy="67" r="4" fill="#CCDCE5" opacity={0.6} />
              <Circle cx="62" cy="67" r="4" fill="#CCDCE5" opacity={0.6} />
              <Circle cx="50" cy="72" r="4" fill="#A0B5C0" opacity={0.7} />
              <Circle cx="45" cy="78" r="3" fill="#CCDCE5" opacity={0.6} />
              <Circle cx="55" cy="78" r="3" fill="#CCDCE5" opacity={0.6} />
            </G>
          </Svg>
        </View>

        {/* Texto centralizado */}
        <Text style={styles.text}>Para uma melhor experiência, use</Text>
        <Text style={styles.text}>fones de ouvidos, feche seus olhos</Text>
        <Text style={styles.text}>e se permita relaxar em presença.</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 24,
    zIndex: 10,
    padding: 8,
  },
  iconContainer: {
    marginBottom: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: '400',
    color: theme.colors.text,
    textAlign: 'center',
    lineHeight: 28,
  },
});
