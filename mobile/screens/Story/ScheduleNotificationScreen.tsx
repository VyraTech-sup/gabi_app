import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../styles/theme';
import Svg, { Path } from 'react-native-svg';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'ScheduleNotification'>;

export default function ScheduleNotificationScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [selectedHour, setSelectedHour] = useState(8);
  const [selectedMinute, setSelectedMinute] = useState(0);

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  const handleSave = () => {
    // Mock - apenas navega (sem criar notificação real)
    console.log(`Notificação agendada para ${selectedHour}:${selectedMinute.toString().padStart(2, '0')} (mock)`);
    navigation.navigate('NotificationConfirmed', { hour: selectedHour, minute: selectedMinute });
  };

  return (
    <View style={styles.container}>
      {/* Ícone de sino */}
      <View style={styles.iconContainer}>
        <Svg width={60} height={60} viewBox="0 0 24 24" fill="none">
          <Path
            d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"
            stroke={theme.colors.text}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </View>

      {/* Conteúdo */}
      <View style={styles.content}>
        <Text style={styles.title}>Escolha um horário para seu Story diário</Text>
        <Text style={styles.description}>Vamos te avisar quando seu Story estiver disponível.</Text>

        {/* Pickers */}
        <View style={styles.pickerContainer}>
          {/* Picker de Horas */}
          <View style={styles.pickerColumn}>
            <Text style={styles.pickerLabel}>Hora</Text>
            <ScrollView style={styles.picker} showsVerticalScrollIndicator={false}>
              {hours.map((hour) => (
                <TouchableOpacity
                  key={hour}
                  style={[styles.pickerItem, selectedHour === hour && styles.pickerItemSelected]}
                  onPress={() => setSelectedHour(hour)}
                >
                  <Text
                    style={[styles.pickerText, selectedHour === hour && styles.pickerTextSelected]}
                  >
                    {hour.toString().padStart(2, '0')}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Picker de Minutos */}
          <View style={styles.pickerColumn}>
            <Text style={styles.pickerLabel}>Minuto</Text>
            <ScrollView style={styles.picker} showsVerticalScrollIndicator={false}>
              {minutes.map((minute) => (
                <TouchableOpacity
                  key={minute}
                  style={[styles.pickerItem, selectedMinute === minute && styles.pickerItemSelected]}
                  onPress={() => setSelectedMinute(minute)}
                >
                  <Text
                    style={[styles.pickerText, selectedMinute === minute && styles.pickerTextSelected]}
                  >
                    {minute.toString().padStart(2, '0')}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </View>

      {/* Botão */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Salvar notificações</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: 24,
    paddingVertical: 60,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    fontWeight: '400',
    color: theme.colors.textLight,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
  },
  pickerColumn: {
    alignItems: 'center',
  },
  pickerLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.textSecondary,
    marginBottom: 12,
  },
  picker: {
    height: 200,
    width: 80,
  },
  pickerItem: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  pickerItemSelected: {
    backgroundColor: theme.colors.accent1,
    borderRadius: 8,
  },
  pickerText: {
    fontSize: 20,
    fontWeight: '400',
    color: theme.colors.textSecondary,
  },
  pickerTextSelected: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.textInverse,
  },
  footer: {
    paddingTop: 24,
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
