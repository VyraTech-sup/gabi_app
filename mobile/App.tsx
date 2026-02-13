import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import Purchases from 'react-native-purchases';
import { AuthProvider } from './contexts/AuthContext';
import RootNavigator from './navigation/RootNavigator';

function RevenueCatInit() {
  useEffect(() => {
    const iosKey = process.env.EXPO_PUBLIC_REVENUE_CAT_IOS_KEY;
    const androidKey = process.env.EXPO_PUBLIC_REVENUE_CAT_ANDROID_KEY;
    const apiKey = Platform.OS === 'ios' ? iosKey : androidKey;
    if (apiKey) {
      Purchases.configure({ apiKey });
    }
  }, []);
  return null;
}

export default function App() {
  return (
    <AuthProvider>
      <RevenueCatInit />
      <RootNavigator />
    </AuthProvider>
  );
}
