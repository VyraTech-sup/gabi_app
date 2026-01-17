import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../styles/theme';
import Svg, { Path, Circle } from 'react-native-svg';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'NotificationConfirmed'>;
type RouteParams = RouteProp<RootStackParamList, 'NotificationConfirmed'>;

export default function NotificationConfirmedScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteParams>();
  
  const { hour = 8, minute = 0 } = route.params || {};

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('ContinueJourney');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  const formatTime = () => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${period}`;
  };

  return (
    <View style={styles.container}>
      {/* Ícone de sino central */}
      <View style={styles.iconContainer}>
        <Svg width={100} height={100} viewBox="0 0 24 24" fill="none">
          <Circle cx="12" cy="12" r="10" stroke={theme.colors.accent1} strokeWidth={2} opacity={0.3} />
          <Path
            d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"
            stroke={theme.colors.text}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </View>

      {/* Horário */}
      <Text style={styles.timeText}>{formatTime()}</Text>

      {/* Texto de confirmação */}
      <Text style={styles.confirmText}>Notificação criada</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundDark,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  iconContainer: {
    marginBottom: 32,
  },
  timeText: {
    fontSize: 48,
    fontWeight: '300',
    color: theme.colors.text,
    marginBottom: 16,
    letterSpacing: 2,
  },
  confirmText: {
    fontSize: 18,
    fontWeight: '400',
    color: theme.colors.textSecondary,
  },
});
