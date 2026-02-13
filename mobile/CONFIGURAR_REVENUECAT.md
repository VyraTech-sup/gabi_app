# Configurar RevenueCat – All Mind

Este guia explica como obter as chaves do RevenueCat, configurar os produtos **monthly** e **yearly** no dashboard e injetar as chaves no app (local e EAS).

---

## 1. Conta e projeto no RevenueCat

1. Acesse [RevenueCat](https://app.revenuecat.com) e crie uma conta (ou faça login).
2. Crie um **novo projeto** (ex.: "All Mind").
3. Adicione os apps:
   - **iOS:** App Store Connect App → Bundle ID: `com.vyratech.allmind`
   - **Android:** Google Play App → Package: `com.vyratech.allmind`
4. Conecte às lojas (Shared Secret da Apple, Service Account do Google) conforme o guia do RevenueCat.

---

## 2. Obter as chaves públicas (API Keys)

1. No dashboard RevenueCat, abra o projeto **All Mind**.
2. **iOS:** em **Apps** → seu app iOS → aba **API Keys**. Copie a **Public API Key** (começa com `appl_`).
3. **Android:** em **Apps** → seu app Android → aba **API Keys**. Copie a **Public API Key** (começa com `goog_`).

Guarde essas duas chaves; você vai usá-las no passo 5.

---

## 3. Produtos nas lojas (App Store Connect e Play Console)

Antes de configurar ofertas no RevenueCat, os produtos precisam existir nas lojas:

- **App Store Connect:** In-App Purchase → Subscriptions → criar assinaturas com Product ID:
  - `com.vyratech.allmind.monthly` (mensal)
  - `com.vyratech.allmind.yearly` (anual)
- **Google Play Console:** Monetização → Produtos → Assinaturas → criar com os mesmos IDs:
  - `com.vyratech.allmind.monthly`
  - `com.vyratech.allmind.yearly`

No RevenueCat você vai **vincular** esses produtos às ofertas.

---

## 4. Oferta e pacotes no RevenueCat (monthly / yearly)

1. No RevenueCat: **Products** → **Offerings**.
2. Use a oferta **Current** (ou crie uma, ex.: "default").
3. Na oferta, adicione **Packages**:
   - **Identifier:** `monthly`  
     Produto: selecione/vincule `com.vyratech.allmind.monthly`.
   - **Identifier:** `yearly`  
     Produto: selecione/vincule `com.vyratech.allmind.yearly`

Os identificadores **monthly** e **yearly** são os que o app usa na paywall (UnlockAlmaSense). Se usar outros nomes, o app ainda pode funcionar usando o “primeiro pacote disponível”, mas o ideal é manter `monthly` e `yearly`.

---

## 5. Colocar as chaves no app

### Desenvolvimento local (Expo)

1. Na pasta **mobile**, copie o exemplo de env:
   ```bash
   cp .env.example .env
   ```
2. Edite o `.env` e preencha com as chaves que você copiou no passo 2:
   ```env
   EXPO_PUBLIC_REVENUE_CAT_IOS_KEY=appl_xxxxxxxxxxxx
   EXPO_PUBLIC_REVENUE_CAT_ANDROID_KEY=goog_xxxxxxxxxxxx
   ```
3. Reinicie o bundler (`npx expo start`). As variáveis `EXPO_PUBLIC_*` são carregadas automaticamente pelo Expo.

O arquivo `.env` não é commitado (está no `.gitignore`).

### Builds EAS (preview/production)

As chaves precisam ser **segredos** no EAS para não ficarem no repositório.

1. Instale o EAS CLI e faça login:
   ```bash
   npm i -g eas-cli
   eas login
   ```
2. No diretório do app (por exemplo `gabi_app/mobile`), crie os segredos com os **mesmos nomes** das variáveis:
   ```bash
   eas secret:create --name EXPO_PUBLIC_REVENUE_CAT_IOS_KEY --value "appl_xxxxxxxxxxxx" --scope project
   eas secret:create --name EXPO_PUBLIC_REVENUE_CAT_ANDROID_KEY --value "goog_xxxxxxxxxxxx" --scope project
   ```
   Substitua `appl_...` e `goog_...` pelas chaves reais.

3. Nos próximos builds (`eas build -p ios` / `eas build -p android`), o EAS injeta essas variáveis no ambiente; o `App.tsx` usa elas em `Purchases.configure({ apiKey })`.

---

## 6. Conferir no app

- **Local:** rodar o app (iOS/Android), abrir a paywall “Desbloqueie All Mind”, tocar em **Assinar** e (em sandbox) **Restaurar Compras**.
- **EAS:** depois de configurar os segredos, gerar um build de preview/production e testar compra e restauração em dispositivo.

---

## Resumo rápido

| Onde              | O que fazer |
|-------------------|-------------|
| RevenueCat        | Projeto + apps iOS/Android; oferta com packages `monthly` e `yearly` ligados aos produtos das lojas. |
| App Store Connect | Produtos `com.vyratech.allmind.monthly` e `.yearly`. |
| Play Console      | Mesmos product IDs. |
| Local             | `.env` com `EXPO_PUBLIC_REVENUE_CAT_IOS_KEY` e `EXPO_PUBLIC_REVENUE_CAT_ANDROID_KEY`. |
| EAS               | `eas secret:create` para os dois nomes acima. |

Depois disso, as chaves estão configuradas e os produtos/offerings batem com **monthly** e **yearly** no app.
