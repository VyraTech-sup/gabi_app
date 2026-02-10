import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../styles/theme';
import Button from '../../components/Button';
import Icon from '../../components/Icon';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'SuccessAccount'>;

export default function SuccessAccountScreen() {
  const navigation = useNavigation<NavigationProp>();

  const handleEnterApp = () => {
    // Navegar para o fluxo principal (Home via MainTabNavigator)
    navigation.reset({
      index: 0,
      routes: [{ name: 'Main' }],
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Ícone de Sucesso */}
        <View style={styles.iconContainer}>
          <Icon name="check-circle" size={120} color={theme.colors.success} />
        </View>

        {/* Texto de Confirmação */}
        <Text style={styles.title}>Conta criada com sucesso!</Text>
        <Text style={styles.subtitle}>
          Bem-vindo ao All Mind. Sua jornada de transformação começa agora.
        </Text>

        {/* Botão para Entrar */}
        <Button
          title="Entrar no aplicativo"
          onPress={handleEnterApp}
          fullWidth={true}
          style={styles.enterButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  iconContainer: {
    marginBottom: theme.spacing['2xl'],
  },
  title: {
    fontSize: 28,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing['2xl'],
    paddingHorizontal: theme.spacing.lg,
  },
  enterButton: {
    marginTop: theme.spacing.xl,
  },
});
