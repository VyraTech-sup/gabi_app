import React, { useEffect } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import RootNavigator from './navigation/RootNavigator';
import { initializePurchases, disconnectPurchases } from './services/inAppPurchase';

export default function App() {
  useEffect(() => {
    // Inicializa In-App Purchase ao montar o app
    initializePurchases();

    // Cleanup ao desmontar
    return () => {
      disconnectPurchases();
    };
  }, []);

  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}