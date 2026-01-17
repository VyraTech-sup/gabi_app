/**
 * Serviço de notificações locais usando expo-notifications
 * Gerencia agendamento e exibição de notificações push locais
 */

import { Platform } from 'react-native';
import * as ExpNotifications from 'expo-notifications';

// Mock para Expo Go - notificações requerem development build
let Notifications: typeof ExpNotifications | null = null;

try {
  Notifications = require('expo-notifications');
  // Configurar como as notificações devem ser tratadas quando o app está em foreground
  if (Notifications) {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
        shouldShowBanner: true,
        shouldShowList: true,
      }),
    });
  }
} catch (error) {
  console.warn('expo-notifications not available in Expo Go - usando mock');
}

/**
 * Solicita permissão para enviar notificações
 */
export const requestNotificationPermissions = async (): Promise<boolean> => {
  try {
    if (!Notifications) {
      console.log('Notificações não disponíveis no Expo Go');
      return false;
    }
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    return finalStatus === 'granted';
  } catch (error) {
    console.error('Erro ao solicitar permissões de notificação:', error);
    return false;
  }
};

/**
 * Agenda notificação diária no horário especificado
 */
export const scheduleDailyNotification = async (
  hour: number,
  minute: number,
  title: string = 'Hora da sua meditação',
  body: string = 'Reserve alguns minutos para cuidar do seu bem-estar'
): Promise<string | null> => {
  try {
    if (!Notifications) {
      console.log('Notificações não disponíveis no Expo Go');
      return 'mock-notification-id';
    }
    
    // Cancela notificações anteriores
    await Notifications.cancelAllScheduledNotificationsAsync();
    
    // Agenda nova notificação
    const trigger = {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour,
      minute,
    } as ExpNotifications.DailyTriggerInput;
    
    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
        data: { type: 'daily_reminder' },
      },
      trigger,
    });
    
    return notificationId;
  } catch (error) {
    console.error('Erro ao agendar notificação:', error);
    return null;
  }
};

/**
 * Cancela todas as notificações agendadas
 */
export const cancelAllNotifications = async (): Promise<void> => {
  try {
    if (!Notifications) {
      console.log('Notificações não disponíveis no Expo Go');
      return;
    }
    await Notifications.cancelAllScheduledNotificationsAsync();
  } catch (error) {
    console.error('Erro ao cancelar notificações:', error);
  }
};

/**
 * Obtém todas as notificações agendadas
 */
export const getScheduledNotifications = async (): Promise<ExpNotifications.NotificationRequest[]> => {
  try {
    if (!Notifications) {
      console.log('Notificações não disponíveis no Expo Go');
      return [];
    }
    return await Notifications.getAllScheduledNotificationsAsync();
  } catch (error) {
    console.error('Erro ao buscar notificações agendadas:', error);
    return [];
  }
};

/**
 * Envia notificação imediata (para testes)
 */
export const sendImmediateNotification = async (
  title: string,
  body: string
): Promise<string | null> => {
  try {
    if (!Notifications) {
      console.log('Notificações não disponíveis no Expo Go');
      return null;
    }
    
    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
      },
      trigger: null, // Envia imediatamente
    });
    
    return notificationId;
  } catch (error) {
    console.error('Erro ao enviar notificação imediata:', error);
    return null;
  }
};

/**
 * Configura canal de notificação (Android)
 */
export const setupNotificationChannel = async (): Promise<void> => {
  if (Platform.OS === 'android') {
    try {
      if (!Notifications) {
        console.log('Notificações não disponíveis no Expo Go');
        return;
      }
      
      await Notifications.setNotificationChannelAsync('default', {
        name: 'Lembretes All Mind',
        importance: Notifications.AndroidImportance.HIGH,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#8B7355',
        sound: 'default',
      });
    } catch (error) {
      console.error('Erro ao configurar canal de notificação:', error);
    }
  }
};

/**
 * Remove badge de notificações (iOS)
 */
export const clearNotificationBadge = async (): Promise<void> => {
  try {
    if (!Notifications) {
      console.log('Notificações não disponíveis no Expo Go');
      return;
    }
    await Notifications.setBadgeCountAsync(0);
  } catch (error) {
    console.error('Erro ao limpar badge:', error);
  }
};
