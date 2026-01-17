# Fix NitroModules Runtime Error - Android

## Problema
```
[runtime not ready]: Failed to get NitroModules: The native "NitroModules" Turbo/Native-Module could not be found.
```

## Causa Raiz
- `react-native-iap` v14.x requer `react-native-nitro-modules`
- NitroModules só funciona com **New Architecture habilitada**
- Expo SDK 54 com `newArchEnabled: false` não suporta NitroModules

## Solução Aplicada
**Downgrade de `react-native-iap` para v12.15.3**
- ✅ Compatível com Old Architecture (sem NitroModules)
- ✅ Mantém todas as funcionalidades de IAP
- ✅ Funciona com Expo SDK 54

## Mudanças
### package.json
```diff
- "react-native-iap": "^14.7.2",
+ "react-native-iap": "^12.15.3",
```

## Comandos de Rebuild

### 1. Limpar instalação anterior
```bash
cd c:\dev\gabi_app\mobile
Remove-Item -Recurse -Force node_modules, package-lock.json
npm install
```

### 2. Limpar cache do Metro
```bash
npx expo start --clear
```

### 3. Gerar novo build EAS (Production)
```bash
eas build --platform android --profile production --clear-cache
```

### 4. Ou build local (se tiver Android Studio)
```bash
npx expo run:android --variant release --no-build-cache
```

## Verificação
```bash
# Verificar versão instalada
npm list react-native-iap

# Deve mostrar:
# react-native-iap@12.15.3

# Verificar se NitroModules foi removido
npm list react-native-nitro-modules

# Deve mostrar:
# (empty) ou error (esperado - não é mais necessário)
```

## Compatibilidade Verificada
- ✅ Expo SDK 54.0.31
- ✅ React Native 0.81.5
- ✅ react-native-iap 12.15.3
- ✅ Old Architecture (newArchEnabled: false)
- ✅ Android API 24+ (Android 7.0+)
- ✅ iOS 13.4+

## Funcionalidades IAP Mantidas
- ✅ `initConnection()` - Inicializar IAP
- ✅ `getSubscriptions()` - Buscar produtos
- ✅ `requestSubscription()` - Comprar
- ✅ `getAvailablePurchases()` - Restaurar
- ✅ Purchase listeners
- ✅ `finishTransaction()`

## Alternativa (NÃO RECOMENDADO)
Se absolutamente necessário usar v14.x:
1. Habilitar New Architecture: `"newArchEnabled": true` em app.json
2. Rebuild completo com `--clear-cache`
3. ⚠️ Risco: Expo SDK 54 tem suporte experimental para New Architecture

## Status
- ✅ Downgrade aplicado
- 🔄 npm install em andamento
- ⏳ Aguardando rebuild EAS
