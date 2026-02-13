import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Purchases from 'react-native-purchases';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../styles/theme';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import { useAuth } from '../../contexts/AuthContext';
import { setSubscriptionData, setPremiumStatus } from '../../services/storage';
import { PRIVACY_POLICY_URL, TERMS_OF_USE_URL } from '../../constants';

interface UnlockAlmaSenseScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList>;
}

function planFromProductId(productId: string): 'monthly' | 'yearly' {
  return productId?.toLowerCase().includes('year') ? 'yearly' : 'monthly';
}

export default function UnlockAlmaSenseScreen({ navigation }: UnlockAlmaSenseScreenProps) {
  const { activateSubscription } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('yearly');
  const [isProcessing, setIsProcessing] = useState(false);
  const [packages, setPackages] = useState<{ monthly?: { identifier: string; product?: { identifier?: string } }; yearly?: { identifier: string; product?: { identifier?: string } } }>({});

  useEffect(() => {
    let mounted = true;
    Purchases.getOfferings()
      .then((offerings) => {
        if (!mounted) return;
        const all = offerings?.current?.availablePackages ?? [];
        const monthly = all.find((p) => p.identifier === 'monthly' || p.product?.identifier?.toLowerCase().includes('monthly'));
        const yearly = all.find((p) => p.identifier === 'yearly' || p.product?.identifier?.toLowerCase().includes('yearly'));
        setPackages({ monthly, yearly });
      })
      .catch(() => {});
    return () => { mounted = false; };
  }, []);

  const applyPurchaseAndNavigate = async (plan: 'monthly' | 'yearly') => {
    await setSubscriptionData({
      plan,
      status: 'active',
      startDate: new Date().toISOString(),
      endDate: plan === 'yearly' ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    });
    await setPremiumStatus(true);
    await activateSubscription(plan);
    Alert.alert(
      'Assinatura ativada! 🎉',
      'Agora você tem acesso completo ao All Mind',
      [{ text: 'Começar', onPress: () => navigation.navigate('Main') }]
    );
  };

  const handleSubscribe = async () => {
    try {
      setIsProcessing(true);
      const pkg = selectedPlan === 'yearly' ? packages.yearly : packages.monthly;
      const toPurchase = pkg ?? (await Purchases.getOfferings()).current?.availablePackages?.[0];
      if (!toPurchase) {
        Alert.alert('Erro', 'Nenhuma oferta disponível no momento. Tente novamente mais tarde.');
        return;
      }
      const { customerInfo } = await Purchases.purchasePackage(toPurchase as Parameters<typeof Purchases.purchasePackage>[0]);
      const ent = Object.values(customerInfo?.entitlements?.active ?? {})[0] as { productIdentifier?: string } | undefined;
      const plan = ent?.productIdentifier ? planFromProductId(ent.productIdentifier) : selectedPlan;
      await applyPurchaseAndNavigate(plan);
    } catch (e: unknown) {
      const err = e as { userCancelled?: boolean };
      if (err?.userCancelled) return;
      Alert.alert(
        'Erro',
        'Não foi possível processar seu pagamento. Tente novamente.'
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRestore = async () => {
    try {
      setIsProcessing(true);
      const customerInfo = await Purchases.restorePurchases();
      const active = customerInfo?.entitlements?.active ?? {};
      const ent = Object.values(active)[0] as { productIdentifier?: string; expirationDate?: string; latestPurchaseDate?: string } | undefined;
      if (ent) {
        const plan = planFromProductId(ent.productIdentifier ?? '');
        await setSubscriptionData({
          plan,
          status: 'active',
          startDate: ent.latestPurchaseDate ?? new Date().toISOString(),
          endDate: ent.expirationDate,
        });
        await setPremiumStatus(true);
        await activateSubscription(plan);
        Alert.alert('Compras restauradas', 'Sua assinatura foi restaurada com sucesso.', [
          { text: 'OK', onPress: () => navigation.navigate('Main') },
        ]);
      } else {
        Alert.alert('Nenhuma compra encontrada', 'Não encontramos assinaturas ativas para restaurar.');
      }
    } catch {
      Alert.alert('Erro', 'Não foi possível restaurar suas compras. Tente novamente.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePromoCode = () => {
    Alert.alert(
      'Código Promocional',
      'Esta funcionalidade estará disponível em breve.',
      [{ text: 'OK' }]
    );
  };

  const openTerms = () => Linking.openURL(TERMS_OF_USE_URL);
  const openPrivacy = () => Linking.openURL(PRIVACY_POLICY_URL);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color={theme.colors.text} />
        </TouchableOpacity>
      </View>

      {/* Título */}
      <View style={styles.titleSection}>
        <Text style={styles.title}>Desbloqueie{'\n'}All Mind</Text>
      </View>

      {/* Benefícios */}
      <View style={styles.benefitsSection}>
        <BenefitItem text="Um Story diário" />
        <BenefitItem text="Story diário arquivado" />
        <BenefitItem text="Biblioteca de Recodificação Mental" />
        <BenefitItem text="Gradualmente desbloquear Recodificações Mentais" />
      </View>

      {/* Stories Preview (Cards) */}
      <View style={styles.storiesPreview}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.storiesScroll}>
          <StoryPreviewCard number={1} />
          <StoryPreviewCard number={2} />
          <StoryPreviewCard number={3} />
        </ScrollView>
      </View>

      {/* CTA Text */}
      <Text style={styles.ctaText}>Gostou do que viu até agora?</Text>

      {/* Planos */}
      <View style={styles.plansSection}>
        <PlanCard
          title="Mensal"
          price="R$ 29,90"
          period="/ mês"
          subtitle="Renovação automática mensal"
          isSelected={selectedPlan === 'monthly'}
          onPress={() => setSelectedPlan('monthly')}
        />
        
        <PlanCard
          title="Anual"
          price="R$ 299,90"
          period="/ ano"
          subtitle="Renovação automática anual"
          isSelected={selectedPlan === 'yearly'}
          onPress={() => setSelectedPlan('yearly')}
          badge="Economize 16%"
        />
      </View>

      {/* Compliance Text */}
      <View style={styles.complianceSection}>
        <Text style={styles.complianceText}>
          A assinatura renova automaticamente até o cancelamento. 
          Cancele a qualquer momento em Ajustes → Assinaturas (iOS) ou 
          Google Play → Assinaturas (Android). Sem reembolso após consumo do conteúdo.
        </Text>
      </View>

      {/* Botão Assinar */}
      <View style={styles.subscribeSection}>
        <Button
          title={isProcessing ? "Processando..." : "Assinar"}
          onPress={handleSubscribe}
          variant="primary"
          size="large"
          fullWidth={true}
          loading={isProcessing}
          disabled={isProcessing}
        />
        <TouchableOpacity
          onPress={handleRestore}
          disabled={isProcessing}
          style={styles.restoreButton}
        >
          <Text style={styles.restoreText}>Restaurar Compras</Text>
        </TouchableOpacity>
      </View>

      {/* Link Código Promocional */}
      <TouchableOpacity onPress={handlePromoCode} style={styles.promoLink}>
        <Text style={styles.promoLinkText}>Eu tenho um código promocional</Text>
      </TouchableOpacity>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={openTerms}>
          <Text style={styles.footerLink}>Termos de Uso</Text>
        </TouchableOpacity>
        <Text style={styles.footerSeparator}>•</Text>
        <TouchableOpacity onPress={openPrivacy}>
          <Text style={styles.footerLink}>Política de Privacidade</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: theme.spacing['3xl'] }} />
    </ScrollView>
  );
}

// Componente de Benefício
function BenefitItem({ text }: { text: string }) {
  return (
    <View style={styles.benefitItem}>
      <Icon name="check" size={20} color={theme.colors.text} />
      <Text style={styles.benefitText}>{text}</Text>
    </View>
  );
}

// Componente de Story Preview Card
function StoryPreviewCard({ number }: { number: number }) {
  return (
    <View style={styles.storyCard}>
      <Text style={styles.storyNumber}>{number}</Text>
      <Text style={styles.storyLabel}>Story</Text>
    </View>
  );
}

// Componente de Plano
interface PlanCardProps {
  title: string;
  price: string;
  period: string;
  subtitle: string;
  isSelected: boolean;
  onPress: () => void;
  badge?: string;
}

function PlanCard({ title, price, period, subtitle, isSelected, onPress, badge }: PlanCardProps) {
  return (
    <TouchableOpacity
      style={[styles.planCard, isSelected && styles.planCardSelected]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {badge && (
        <View style={styles.planBadge}>
          <Text style={styles.planBadgeText}>{badge}</Text>
        </View>
      )}
      
      <View style={styles.planHeader}>
        <Text style={styles.planTitle}>{title}</Text>
        <View style={styles.planRadio}>
          {isSelected && <View style={styles.planRadioInner} />}
        </View>
      </View>
      
      <View style={styles.planPricing}>
        <Text style={styles.planPrice}>{price}</Text>
        <Text style={styles.planPeriod}>{period}</Text>
      </View>
      
      <Text style={styles.planSubtitle}>{subtitle}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.secondaryLight, // Fundo rosé
  },
  header: {
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing['3xl'],
    paddingBottom: theme.spacing.md,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: theme.borderRadius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleSection: {
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.lg,
  },
  title: {
    fontSize: theme.typography.fontSize['4xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text,
    lineHeight: theme.typography.fontSize['4xl'] * 1.1,
  },
  benefitsSection: {
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.lg,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  benefitText: {
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.text,
    marginLeft: theme.spacing.md,
    flex: 1,
  },
  storiesPreview: {
    paddingVertical: theme.spacing.lg,
  },
  storiesScroll: {
    paddingHorizontal: theme.spacing.xl,
  },
  storyCard: {
    width: 120,
    height: 160,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
    ...theme.shadows.md,
  },
  storyNumber: {
    fontSize: theme.typography.fontSize['3xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text,
  },
  storyLabel: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  ctaText: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text,
    textAlign: 'center',
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.xl,
  },
  plansSection: {
    paddingHorizontal: theme.spacing.xl,
    marginBottom: theme.spacing.lg,
  },
  planCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    borderWidth: 2,
    borderColor: 'transparent',
    position: 'relative',
  },
  planCardSelected: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderColor: theme.colors.primary,
  },
  planBadge: {
    position: 'absolute',
    top: -10,
    right: theme.spacing.lg,
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.full,
  },
  planBadgeText: {
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  planTitle: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text,
  },
  planRadio: {
    width: 24,
    height: 24,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  planRadioInner: {
    width: 12,
    height: 12,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.primary,
  },
  planPricing: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: theme.spacing.xs,
  },
  planPrice: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text,
  },
  planPeriod: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textSecondary,
    marginLeft: theme.spacing.xs,
  },
  planSubtitle: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  subscribeSection: {
    paddingHorizontal: theme.spacing.xl,
    marginBottom: theme.spacing.lg,
  },
  restoreButton: {
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
    marginTop: theme.spacing.sm,
  },
  restoreText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.primary,
    fontWeight: theme.typography.fontWeight.medium,
    textDecorationLine: 'underline',
  },
  complianceSection: {
    paddingHorizontal: theme.spacing.xl,
    marginBottom: theme.spacing.lg,
  },
  complianceText: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 16,
  },
  promoLink: {
    alignSelf: 'center',
    marginBottom: theme.spacing.xl,
  },
  promoLinkText: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.primary,
    textDecorationLine: 'underline',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
  },
  footerLink: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    textDecorationLine: 'underline',
  },
  footerSeparator: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    marginHorizontal: theme.spacing.md,
  },
});
