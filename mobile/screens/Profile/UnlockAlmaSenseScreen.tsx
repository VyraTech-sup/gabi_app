import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../styles/theme';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import { useAuth } from '../../contexts/AuthContext';
import { purchaseSubscription } from '../../services/inAppPurchase';

interface UnlockAlmaSenseScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList>;
}

export default function UnlockAlmaSenseScreen({ navigation }: UnlockAlmaSenseScreenProps) {
  const { activateSubscription } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('yearly');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubscribe = async () => {
    try {
      setIsProcessing(true);
      
      // Processar compra com Apple/Google In-App Purchase
      const result = await purchaseSubscription(selectedPlan);
      
      if (result.success) {
        // Ativar assinatura
        await activateSubscription(selectedPlan);
        
        Alert.alert(
          'Assinatura ativada! 🎉',
          'Agora você tem acesso completo ao AlmaSense',
          [
            {
              text: 'Começar',
              onPress: () => navigation.navigate('Main'),
            },
          ]
        );
      } else {
        Alert.alert(
          'Erro na assinatura',
          result.error || 'Não foi possível processar seu pagamento. Tente novamente.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Erro ao processar assinatura:', error);
      Alert.alert(
        'Erro',
        'Ocorreu um erro ao processar sua assinatura. Tente novamente.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePromoCode = () => {
    // TODO: Implementar tela de código promocional
    console.log('Abrir tela de código promocional');
  };

  const openTerms = () => {
    Linking.openURL('https://www.example.com/terms');
  };

  const openPrivacy = () => {
    Linking.openURL('https://www.example.com/privacy');
  };

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
        <Text style={styles.title}>Desbloqueie{'\n'}AlmaSense</Text>
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
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.storiesScroll}>
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
          subtitle="Cancele a qualquer momento"
          isSelected={selectedPlan === 'monthly'}
          onPress={() => setSelectedPlan('monthly')}
        />
        
        <PlanCard
          title="Anual"
          price="R$ 399,00"
          period="/ ano"
          subtitle="Cancele a qualquer momento"
          isSelected={selectedPlan === 'yearly'}
          onPress={() => setSelectedPlan('yearly')}
          badge="Melhor valor"
        />
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
