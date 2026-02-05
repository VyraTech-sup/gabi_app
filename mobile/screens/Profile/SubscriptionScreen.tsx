import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { theme } from '../../styles/theme';
import Button from '../../components/Button';
import Purchases from 'react-native-purchases';
import { setSubscriptionData, setPremiumStatus, setTrialUsed } from '../../services/storage';

interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  features: PlanFeature[];
  popular?: boolean;
}

const plans: Plan[] = [
  {
    id: 'trimestral',
    name: 'Trimestral',
    price: 'R$ 49,00',
    period: '/trimestre',
    features: [
      { text: 'Acesso ilimitado a todo conteúdo', included: true },
      { text: 'Downloads offline', included: true },
      { text: 'Sem anúncios', included: true },
      { text: 'Conteúdo exclusivo Premium', included: true },
      { text: 'Novos programas toda semana', included: true },
    ],
  },
  {
    id: 'semestral',
    name: 'Semestral',
    price: 'R$ 39,00',
    period: '/semestre',
    popular: true,
    features: [
      { text: 'Acesso ilimitado a todo conteúdo', included: true },
      { text: 'Downloads offline', included: true },
      { text: 'Sem anúncios', included: true },
      { text: 'Conteúdo exclusivo Premium', included: true },
      { text: 'Novos programas toda semana', included: true },
    ],
  },
  {
    id: 'anual',
    name: 'Anual',
    price: 'R$ 29,00',
    period: '/ano',
    features: [
      { text: 'Acesso ilimitado a todo conteúdo', included: true },
      { text: 'Downloads offline', included: true },
      { text: 'Sem anúncios', included: true },
      { text: 'Conteúdo exclusivo Premium', included: true },
      { text: 'Novos programas toda semana', included: true },
    ],
  },
];

interface SubscriptionScreenProps {
  navigation: {
    navigate: (screen: string, params?: Record<string, unknown>) => void;
    goBack: () => void;
  };
}

export default function SubscriptionScreen({ navigation }: SubscriptionScreenProps) {
  const [selectedPlan, setSelectedPlan] = useState('semestral');
  const [availablePackages, setAvailablePackages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const offerings = await Purchases.getOfferings();
        const packages = offerings?.current?.availablePackages ?? [];
        if (mounted) setAvailablePackages(packages);
      } catch (err) {
        console.warn('Erro ao carregar ofertas:', err);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  const confirmAndBuy = () => {
    Alert.alert(
      '7 dias grátis',
      'Você terá 7 dias grátis. Após o período, a cobrança será iniciada automaticamente. Deseja continuar?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Continuar', onPress: () => handleBuy() },
      ]
    );
  };

  const handleBuy = async () => {
    if (availablePackages.length === 0) {
      Alert.alert('Erro', 'Nenhuma oferta disponível no momento. Tente novamente mais tarde.');
      return;
    }

    // Por simplicidade, usamos a primeira package disponível.
    const pkg = availablePackages[0];
    setIsLoading(true);
    try {
      const purchase = await Purchases.purchasePackage(pkg);
      const customerInfo = await Purchases.getCustomerInfo();
      // Tente encontrar entitlement ativo (nome comum: 'premium')
      const entitlements = customerInfo?.entitlements?.active ?? {};
      const keys = Object.keys(entitlements);
      if (keys.length > 0) {
        const ent = entitlements[keys[0]];
        // Atualiza storage local com dados de assinatura retornados pela RevenueCat
        await setSubscriptionData({
          plan: pkg.product?.productId?.includes('year') ? 'yearly' : 'monthly',
          status: 'active',
          startDate: ent?.latestPurchaseDate ?? new Date().toISOString(),
          endDate: ent?.expirationDate ?? undefined,
        });
        await setPremiumStatus(true);
        await setTrialUsed(true);
        Alert.alert('Sucesso', 'Assinatura ativada. Aproveite seu acesso!');
        navigation.goBack();
      } else {
        Alert.alert('Compra incompleta', 'Compra finalizada, mas não encontramos uma assinatura ativa.');
      }
    } catch (e: any) {
      if (e.userCancelled) {
        // usuário cancelou
      } else {
        console.warn('Erro na compra:', e);
        Alert.alert('Erro', 'Erro ao processar compra. Tente novamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Assinatura</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={styles.hero}>
          <Text style={styles.heroIcon}>👑</Text>
          <Text style={styles.heroTitle}>Desbloqueie todo o potencial</Text>
          <Text style={styles.heroSubtitle}>
            Acesso ilimitado a meditações, cursos e todo conteúdo premium
          </Text>
        </View>

        {/* Plans */}
        <View style={styles.plansContainer}>
          {plans.map((plan) => (
            <TouchableOpacity
              key={plan.id}
              style={[
                styles.planCard,
                selectedPlan === plan.id && styles.planCardSelected,
              ]}
              onPress={() => setSelectedPlan(plan.id)}
            >
              {plan.popular && (
                <View style={styles.popularBadge}>
                  <Text style={styles.popularText}>MAIS POPULAR</Text>
                </View>
              )}
              
              <View style={styles.planHeader}>
                <Text style={styles.planName}>{plan.name}</Text>
                <View style={styles.planPrice}>
                  <Text style={styles.planPriceAmount}>{plan.price}</Text>
                  <Text style={styles.planPricePeriod}>{plan.period}</Text>
                </View>
              </View>

              <View style={styles.planFeatures}>
                {plan.features.map((feature, index) => (
                  <View key={index} style={styles.planFeature}>
                    <Text style={styles.planFeatureIcon}>
                      {feature.included ? '✓' : '✗'}
                    </Text>
                    <Text style={styles.planFeatureText}>{feature.text}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.planRadio}>
                <View
                  style={[
                    styles.radio,
                    selectedPlan === plan.id && styles.radioSelected,
                  ]}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Benefits */}
        <View style={styles.benefits}>
          <Text style={styles.benefitsTitle}>Por que assinar?</Text>
          <View style={styles.benefitsList}>
            {[
              { icon: '🎧', text: 'Mais de 1.000 meditações guiadas' },
              { icon: '📚', text: 'Cursos completos de mindfulness' },
              { icon: '🌙', text: 'Histórias e sons para dormir melhor' },
              { icon: '💆', text: 'Programas anti-ansiedade e estresse' },
              { icon: '📥', text: 'Ouça offline, onde quiser' },
              { icon: '✨', text: 'Novos conteúdos semanalmente' },
            ].map((benefit, index) => (
              <View key={index} style={styles.benefitItem}>
                <Text style={styles.benefitIcon}>{benefit.icon}</Text>
                <Text style={styles.benefitText}>{benefit.text}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={{ height: theme.spacing.xl }} />
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <Button
          title={isLoading ? 'Processando...' : 'Assinar agora'}
          onPress={handleBuy}
          fullWidth={true}
        />
        <Text style={styles.footerText}>
          Cancele quando quiser. Sem taxas de cancelamento.
        </Text>
      </View>
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
  hero: {
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl,
    marginBottom: theme.spacing.xl,
  },
  heroIcon: {
    fontSize: 80,
    marginBottom: theme.spacing.md,
  },
  heroTitle: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  heroSubtitle: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: theme.typography.lineHeight.relaxed * theme.typography.fontSize.base,
  },
  plansContainer: {
    paddingHorizontal: theme.spacing.xl,
    marginBottom: theme.spacing.xl,
  },
  planCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    borderWidth: 2,
    borderColor: theme.colors.border,
    position: 'relative',
  },
  planCardSelected: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primaryLight,
  },
  popularBadge: {
    position: 'absolute',
    top: -12,
    alignSelf: 'center',
    backgroundColor: theme.colors.accent1,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
  },
  popularText: {
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text,
  },
  planHeader: {
    marginBottom: theme.spacing.md,
  },
  planName: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  planPrice: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  planPriceAmount: {
    fontSize: theme.typography.fontSize['3xl'],
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.primary,
  },
  planPricePeriod: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textSecondary,
    marginLeft: theme.spacing.xs,
  },
  planFeatures: {
    marginBottom: theme.spacing.md,
  },
  planFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  planFeatureIcon: {
    fontSize: 16,
    color: theme.colors.primary,
    marginRight: theme.spacing.sm,
    width: 20,
  },
  planFeatureText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text,
    flex: 1,
  },
  planRadio: {
    position: 'absolute',
    top: theme.spacing.lg,
    right: theme.spacing.lg,
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: theme.colors.border,
  },
  radioSelected: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primary,
  },
  benefits: {
    paddingHorizontal: theme.spacing.xl,
  },
  benefitsTitle: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  benefitsList: {},
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  benefitIcon: {
    fontSize: 24,
    marginRight: theme.spacing.md,
  },
  benefitText: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text,
    flex: 1,
  },
  footer: {
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  footerText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: theme.spacing.sm,
  },
});
