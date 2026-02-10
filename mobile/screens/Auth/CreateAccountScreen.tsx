import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../styles/theme';
import Input from '../../components/Input';
import Button from '../../components/Button';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'CreateAccount'>;

// Webhook fixo do Zapier
const ZAPIER_WEBHOOK = 'https://hooks.zapier.com/hooks/catch/24026668/ue90sb1/';

export default function CreateAccountScreen() {
  const navigation = useNavigation<NavigationProp>();
  
  // Estados do formulário
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Validação e envio
  const handleCreateAccount = async () => {
    // Validar campos
    if (!name.trim()) {
      Alert.alert('Erro', 'Por favor, preencha seu nome');
      return;
    }

    if (!email.trim()) {
      Alert.alert('Erro', 'Por favor, preencha seu email');
      return;
    }

    if (!password.trim()) {
      Alert.alert('Erro', 'Por favor, preencha sua senha');
      return;
    }

    // Validação básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Erro', 'Por favor, insira um email válido');
      return;
    }

    // Enviar para Zapier
    setLoading(true);
    try {
      const response = await fetch(ZAPIER_WEBHOOK, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          created_at: new Date().toISOString(),
          source: 'all_mind_app',
        }),
      });

      // Zapier geralmente retorna 200 mesmo sem corpo de resposta
      if (response.ok || response.status === 200) {
        // Sucesso - navegar para tela de confirmação
        navigation.navigate('SuccessAccount');
      } else {
        throw new Error('Erro ao criar conta');
      }
    } catch (error) {
      console.error('Erro ao criar conta:', error);
      Alert.alert(
        'Erro',
        'Não foi possível criar sua conta. Tente novamente.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Criar Conta</Text>
          <Text style={styles.subtitle}>Preencha seus dados para começar</Text>
        </View>

        <View style={styles.form}>
          {/* Input Nome */}
          <Input
            placeholder="Nome completo"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            editable={!loading}
          />

          {/* Input Email */}
          <Input
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            editable={!loading}
          />

          {/* Input Senha */}
          <Input
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            autoCapitalize="none"
            editable={!loading}
          />

          {/* Botão Criar Conta */}
          <Button
            title={loading ? 'Criando...' : 'Criar conta'}
            onPress={handleCreateAccount}
            loading={loading}
            fullWidth={true}
            style={styles.createButton}
          />

          {/* Loading Indicator */}
          {loading && (
            <ActivityIndicator
              size="large"
              color={theme.colors.primary}
              style={styles.loadingIndicator}
            />
          )}

          {/* Link para voltar */}
          <Button
            title="Voltar"
            onPress={() => navigation.goBack()}
            variant="outline"
            fullWidth={true}
            disabled={loading}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: theme.spacing.xl,
    justifyContent: 'center',
  },
  header: {
    marginBottom: theme.spacing['2xl'],
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  form: {
    gap: theme.spacing.lg,
  },
  createButton: {
    marginTop: theme.spacing.md,
  },
  loadingIndicator: {
    marginVertical: theme.spacing.md,
  },
});
