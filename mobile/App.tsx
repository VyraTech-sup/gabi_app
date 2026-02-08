import React, { useEffect } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import RootNavigator from './navigation/RootNavigator';
import { createTestUser } from './services/storage';
import Purchases from 'react-native-purchases';

export default function App() {
  useEffect(() => {
    // Initialize RevenueCat (replace with your PUBLIC API key via env)
    try {
      const key = process.env.REVENUECAT_API_KEY || 'REVENUECAT_API_KEY_HERE';
      Purchases.setup(key);
    } catch (err) {
      console.warn('RevenueCat init failed', err);
    }

    createTestUser();
  }, []);

  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}
