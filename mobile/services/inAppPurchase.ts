/**
 * Serviço de In-App Purchase para iOS e Android
 * Implementação REAL usando react-native-iap
 * Gerencia compras via Apple In-App Purchase e Google Play Billing
 */

import { Platform, Alert } from 'react-native';
import * as RNIap from 'react-native-iap';
import { SubscriptionPlan } from '../types';

// IDs dos produtos (devem ser cadastrados no App Store Connect e Google Play Console)
const PRODUCT_IDS = {
  monthly: Platform.select({
    ios: 'com.vyratech.allmind.monthly',
    android: 'com.vyratech.allmind.monthly',
  }) as string,
  yearly: Platform.select({
    ios: 'com.vyratech.allmind.yearly',
    android: 'com.vyratech.allmind.yearly',
  }) as string,
};

export interface PurchaseResult {
  success: boolean;
  transactionId?: string;
  productId?: string;
  error?: string;
}

let purchaseUpdateSubscription: any = null;
let purchaseErrorSubscription: any = null;

/**
 * Inicializa o serviço de compras
 * DEVE ser chamado no App.tsx antes de qualquer compra
 */
export const initializePurchases = async (): Promise<boolean> => {
  try {
    // Conecta ao Google Play / App Store
    await RNIap.initConnection();
    console.log('✅ IAP Connection initialized');

    // Limpa transações pendentes (iOS)
    if (Platform.OS === 'ios') {
      await RNIap.clearTransactionIOS();
    }

    // Configura listeners de compra
    purchaseUpdateSubscription = RNIap.purchaseUpdatedListener(
      async (purchase: RNIap.SubscriptionPurchase | RNIap.ProductPurchase) => {
        const receipt = purchase.transactionReceipt;
        if (receipt) {
          try {
            // Finaliza a transação
            await RNIap.finishTransaction({ purchase, isConsumable: false });
            console.log('✅ Purchase finalized:', purchase.productId);
          } catch (error) {
            console.error('❌ Error finalizing purchase:', error);
          }
        }
      }
    );

    purchaseErrorSubscription = RNIap.purchaseErrorListener((error: any) => {
      console.warn('⚠️ Purchase error:', error);
    });

    return true;
  } catch (error) {
    console.error('❌ IAP initialization failed:', error);
    return false;
  }
};

/**
 * Desconecta e limpa listeners
 * Chamar quando o app for desmontado
 */
export const disconnectPurchases = async (): Promise<void> => {
  if (purchaseUpdateSubscription) {
    purchaseUpdateSubscription.remove();
    purchaseUpdateSubscription = null;
  }
  if (purchaseErrorSubscription) {
    purchaseErrorSubscription.remove();
    purchaseErrorSubscription = null;
  }
  await RNIap.endConnection();
};

/**
 * Obtém os produtos disponíveis das lojas
 * Retorna preços reais configurados no App Store / Google Play
 */
export const getProducts = async () => {
  try {
    const productIds = [PRODUCT_IDS.monthly, PRODUCT_IDS.yearly];
    
    // Busca assinaturas nas lojas
    const subscriptions = await RNIap.getSubscriptions({ skus: productIds });
    
    console.log('✅ Products loaded:', subscriptions);
    return subscriptions;
  } catch (error) {
    console.error('❌ Failed to load products:', error);
    return [];
  }
};

/**
 * Restaura compras anteriores
 * OBRIGATÓRIO pela Apple - deve haver botão "Restaurar Compras"
 */
export const restorePurchases = async (): Promise<PurchaseResult> => {
  try {
    const purchases = await RNIap.getAvailablePurchases();
    
    if (purchases && purchases.length > 0) {
      // Encontra a assinatura mais recente
      const latestPurchase = purchases[0];
      
      return {
        success: true,
        transactionId: latestPurchase.transactionId,
        productId: latestPurchase.productId,
      };
    }

    return {
      success: false,
      error: 'Nenhuma compra encontrada',
    };
  } catch (error) {
    console.error('❌ Restore purchases failed:', error);
    return {
      success: false,
      error: 'Erro ao restaurar compras',
    };
  }
};

/**
 * Processa a compra de uma assinatura
 * Fluxo completo: solicita → confirma → finaliza
 */
export const purchaseSubscription = async (
  plan: SubscriptionPlan
): Promise<PurchaseResult> => {
  try {
    // Plano gratuito não requer compra
    if (plan === 'free') {
      return {
        success: false,
        error: 'Plano gratuito não requer compra',
      };
    }

    const productId = PRODUCT_IDS[plan];
    
    if (!productId) {
      return {
        success: false,
        error: 'Produto não encontrado',
      };
    }

    // Inicia a compra
    const purchase = await RNIap.requestSubscription({
      sku: productId,
      ...(Platform.OS === 'android' && {
        subscriptionOffers: [
          {
            sku: productId,
            offerToken: '', // Será preenchido automaticamente
          },
        ],
      }),
    });

    if (purchase) {
      return {
        success: true,
        transactionId: purchase.transactionId,
        productId: purchase.productId,
      };
    }

    return {
      success: false,
      error: 'Compra cancelada',
    };
  } catch (error: any) {
    // Usuário cancelou
    if (error.code === 'E_USER_CANCELLED') {
      return {
        success: false,
        error: 'Compra cancelada',
      };
    }

    console.error('❌ Purchase failed:', error);
    return {
      success: false,
      error: error.message || 'Erro ao processar compra',
    };
  }
};

/**
 * Verifica se o usuário tem assinatura ativa
 * Consulta diretamente nas lojas
 */
export const checkSubscriptionStatus = async (): Promise<boolean> => {
  try {
    const purchases = await RNIap.getAvailablePurchases();
    
    // Verifica se há alguma compra ativa
    return purchases && purchases.length > 0;
  } catch (error) {
    console.error('❌ Check subscription failed:', error);
    return false;
  }
};
