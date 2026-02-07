import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Platform, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { theme } from '../../styles/theme';
import Button from '../../components/Button';
import { 
  requestNotificationPermissions, 
  scheduleDailyNotification, 
  cancelAllNotifications,
  setupNotificationChannel 
} from '../../services/notifications';
import { getNotificationTime, setNotificationTime as saveNotificationTime } from '../../services/storage';
import { useAuth } from '../../contexts/AuthContext';

interface SettingsScreenProps {
  navigation: {
    navigate: (screen: string, params?: Record<string, unknown>) => void;
    goBack: () => void;
  };
}

export default function SettingsScreen({ navigation }: SettingsScreenProps) {
  const { hasActiveSubscription, user, logout } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [downloadOnWifi, setDownloadOnWifi] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());

  useEffect(() => {
    loadNotificationSettings();
    setupNotificationChannel();
  }, []);

  const loadNotificationSettings = async () => {
    const savedTime = await getNotificationTime();
    if (savedTime) {
      const date = new Date();
      date.setHours(savedTime.hour, savedTime.minute);
      setSelectedTime(date);
      setNotificationsEnabled(true);
    }
  };

  const handleNotificationToggle = async (value: boolean) => {
    if (value) {
      const hasPermission = await requestNotificationPermissions();
      if (hasPermission) {
        setShowTimePicker(true);
      } else {
        Alert.alert(
          'Permissão negada',
          'Para receber lembretes, ative as notificações nas configurações do dispositivo.'
        );
      }
    } else {
      await cancelAllNotifications();
      setNotificationsEnabled(false);
    }
  };

  const handleTimeChange = async (_event: unknown, time?: Date) => {
    setShowTimePicker(Platform.OS === 'ios');
    
    if (time) {
      setSelectedTime(time);
      const hour = time.getHours();
      const minute = time.getMinutes();
      
      await scheduleDailyNotification(hour, minute);
      await saveNotificationTime({ hour, minute });
      setNotificationsEnabled(true);
      
      Alert.alert(
        'Lembrete configurado!',
        `Você receberá uma notificação diariamente às ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
      );
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Sair', 
          style: 'destructive',
          onPress: async () => {
            await logout();
            navigation.navigate('Onboarding');
          }
        },
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Deletar conta',
      'Esta ação é irreversível. Todos os seus dados serão perdidos.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Deletar', 
          style: 'destructive',
          onPress: async () => {
            await logout();
            navigation.navigate('Onboarding');
          }
        },
      ]
    );
  };

  const settingsSections = [
    {
      title: 'Notificações',
      items: [
        {
          label: 'Lembretes diários',
          type: 'toggle' as const,
          value: notificationsEnabled,
          onToggle: handleNotificationToggle,
        },
      ],
    },
    {
      title: 'Reprodução',
      items: [
        {
          label: 'Download apenas por Wi-Fi',
          type: 'toggle' as const,
          value: downloadOnWifi,
          onToggle: setDownloadOnWifi,
        },
        {
          label: 'Qualidade de áudio',
          type: 'link' as const,
          value: 'Alta',
        },
        {
          label: 'Timer de sono',
          type: 'link' as const,
        },
      ],
    },
    {
      title: 'Aparência',
      items: [
        {
          label: 'Modo escuro',
          type: 'toggle' as const,
          value: darkMode,
          onToggle: setDarkMode,
        },
        {
          label: 'Tamanho do texto',
          type: 'link' as const,
          value: 'Médio',
        },
      ],
    },
    {
      title: 'Conta',
      items: [
        {
          label: 'Editar perfil',
          type: 'link' as const,
        },
        {
          label: 'Alterar senha',
          type: 'link' as const,
        },
        {
          label: 'Privacidade',
          type: 'link' as const,
        },
        {
          label: 'Gerenciar assinatura',
          type: 'link' as const,
        },
      ],
    },
    {
      title: 'Suporte',
      items: [
        {
          label: 'Central de ajuda',
          type: 'link' as const,
        },
        {
          label: 'Relatar problema',
          type: 'link' as const,
        },
        {
          label: 'Avaliar o app',
          type: 'link' as const,
        },
        {
          label: 'Compartilhar com amigos',
          type: 'link' as const,
        },
      ],
    },
    {
      title: 'Sobre',
      items: [
        {
          label: 'Termos de uso',
          type: 'link' as const,
        },
        {
          label: 'Política de privacidade',
          type: 'link' as const,
        },
        {
          label: 'Versão',
          type: 'link' as const,
          value: '1.0.0',
        },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Configurações</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Card de Assinatura */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Assinatura</Text>
          <View style={styles.sectionContent}>
            {!hasActiveSubscription ? (
              <View style={styles.subscriptionCard}>
                <Text style={styles.noSubscriptionText}>Não há assinatura ativa</Text>
                <Text style={styles.subscriptionSubtext}>
                  Assine para continuar recebendo Stories diários
                </Text>
                <Button
                  title="Assinar"
                  onPress={() => navigation.navigate('UnlockAll Mind')}
                  variant="primary"
                  size="medium"
                  style={styles.subscribeButton}
                />
              </View>
            ) : (
              <View style={styles.subscriptionCard}>
                <Text style={styles.activeSubscriptionText}>Assinatura Ativa 👑</Text>
                <Text style={styles.subscriptionSubtext}>
                  Aproveite todos os Stories e conteúdos exclusivos
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Notificações */}
        {hasActiveSubscription && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notificações</Text>
            <View style={styles.sectionContent}>
              <View style={styles.settingItem}>
                <Text style={styles.settingLabel}>Lembretes diários</Text>
                <Switch
                  value={notificationsEnabled}
                  onValueChange={handleNotificationToggle}
                  trackColor={{
                    false: theme.colors.border,
                    true: theme.colors.primary,
                  }}
                  thumbColor={theme.colors.surface}
                />
              </View>
              
              {notificationsEnabled && (
                <>
                  <View style={[styles.settingItem, styles.settingItemBorder]}>
                    <View style={styles.settingLeft}>
                      <Text style={styles.settingLabel}>Horário</Text>
                      <Text style={styles.settingValue}>
                        {selectedTime.getHours().toString().padStart(2, '0')}:
                        {selectedTime.getMinutes().toString().padStart(2, '0')}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.settingItem}>
                    <Button
                      title="Mudar horário"
                      onPress={() => setShowTimePicker(true)}
                      variant="outline"
                      size="small"
                      style={styles.changeTimeButton}
                    />
                  </View>
                </>
              )}
            </View>
          </View>
        )}

        {/* Conta */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Conta</Text>
          <View style={styles.sectionContent}>
            <View style={styles.settingItem}>
              <Text style={styles.accountInfo}>
                Você está logado como:{'\n'}
                <Text style={styles.accountEmail}>{user?.email || 'usuario@email.com'}</Text>
              </Text>
            </View>
            <View style={[styles.settingItem, styles.settingItemBorder]}>
              <Button
                title="Deslogar"
                onPress={handleLogout}
                variant="outline"
                size="medium"
                fullWidth={true}
              />
            </View>
            <View style={styles.settingItem}>
              <Button
                title="Deletar conta"
                onPress={handleDeleteAccount}
                variant="outline"
                size="medium"
                fullWidth={true}
                style={styles.deleteButton}
                textStyle={styles.deleteButtonText}
              />
            </View>
          </View>
        </View>

        <View style={{ height: theme.spacing.xl }} />
      </ScrollView>

      {/* Time Picker */}
      {showTimePicker && (
        <DateTimePicker
          value={selectedTime}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={handleTimeChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing['3xl'],
    paddingBottom: theme.spacing.lg,
  },
  backIcon: {
    fontSize: 28,
    color: theme.colors.text,
  },
  title: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text,
  },
  section: {
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.textSecondary,
    textTransform: 'uppercase',
    paddingHorizontal: theme.spacing.xl,
    marginBottom: theme.spacing.sm,
    letterSpacing: 0.5,
  },
  sectionContent: {
    backgroundColor: theme.colors.surface,
    marginHorizontal: theme.spacing.xl,
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.md,
  },
  settingItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  settingLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: theme.spacing.md,
  },
  settingLabel: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text,
  },
  settingValue: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  chevron: {
    fontSize: 24,
    color: theme.colors.textLight,
  },
  subscriptionCard: {
    padding: theme.spacing.lg,
    alignItems: 'center',
  },
  noSubscriptionText: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
    textAlign: 'center',
  },
  activeSubscriptionText: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
    textAlign: 'center',
  },
  subscriptionSubtext: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.lg,
    textAlign: 'center',
  },
  subscribeButton: {
    minWidth: 200,
  },
  changeTimeButton: {
    flex: 1,
  },
  accountInfo: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    flex: 1,
  },
  accountEmail: {
    color: theme.colors.text,
    fontWeight: theme.typography.fontWeight.semibold,
  },
  deleteButton: {
    borderColor: theme.colors.error,
  },
  deleteButtonText: {
    color: theme.colors.error,
  },
});
