import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function SocialAuthScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vincule sua conta</Text>
      <Text style={styles.subtitle}>Conecte com Google ou Apple para continuar</Text>
      {/* Botões de autenticação social */}
      <Button title="Entrar com Google" onPress={() => {}} />
      <Button title="Entrar com Apple" onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3A5A6C',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 32,
    textAlign: 'center',
  },
});
