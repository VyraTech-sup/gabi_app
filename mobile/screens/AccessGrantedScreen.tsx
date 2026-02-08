import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AccessGrantedScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Acesso Liberado!</Text>
      <Text style={styles.subtitle}>Bem-vindo ao aplicativo. Aproveite sua experiência!</Text>
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
    textAlign: 'center',
  },
});
