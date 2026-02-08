import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { theme } from '../../styles/theme';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Icon from '../../components/Icon';

interface LoginScreenProps {
  navigation: {
    navigate: (screen: string) => void;
  };
}

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, signInWithGoogle } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível fazer login');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível autenticar com Google');
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
          <Icon name="meditation" size={64} color={theme.colors.text} />
          <Text style={styles.title}>Bem-vindo de volta</Text>
          <Text style={styles.subtitle}>Entre para continuar sua jornada</Text>
        </View>

        <View style={styles.form}>
          <Input
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />

          <Input
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            autoCapitalize="none"
            autoComplete="password"
          />

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
          </TouchableOpacity>

          <Button
            title="Entrar"
            onPress={handleLogin}
            loading={loading}
            fullWidth={true}
          />

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>ou</Text>
            <View style={styles.dividerLine} />
          </View>

          <Button
            title="Entrar com Google"
            onPress={handleGoogleLogin}
            variant="outline"
            fullWidth={true}
            loading={loading}
          />

          <Button
            title="Continuar com Apple"
            onPress={() => {}}
            variant="outline"
            fullWidth={true}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Ainda não tem conta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.footerLink}>Criar conta</Text>
          </TouchableOpacity>
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
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing['4xl'],
    paddingBottom: theme.spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing['3xl'],
  },
  logo: {
    fontSize: 80,
    marginBottom: theme.spacing.lg,
  },
  title: {
    fontSize: theme.typography.fontSize['3xl'],
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textSecondary,
  },
  form: {
    gap: theme.spacing.md,
    marginBottom: theme.spacing.xl,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
  },
  forgotPasswordText: {
    color: theme.colors.primary,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: theme.spacing.md,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.border,
  },
  dividerText: {
    marginHorizontal: theme.spacing.md,
    color: theme.colors.textLight,
    fontSize: theme.typography.fontSize.sm,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 'auto',
  },
  footerText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.fontSize.base,
  },
  footerLink: {
    color: theme.colors.primary,
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.semibold,
  },
});
