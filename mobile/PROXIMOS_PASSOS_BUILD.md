# 🚀 PRÓXIMOS PASSOS - BUILD E PUBLICAÇÃO

**Status:** ✅ Código pronto para build  
**Data:** 10 de fevereiro de 2026

---

## ✅ ITEM CONCLUÍDO

### Botão "Restaurar Compras" Adicionado

**Arquivo:** [screens/Profile/SubscriptionScreen.tsx](screens/Profile/SubscriptionScreen.tsx)

**O que foi implementado:**
- ✅ Função `handleRestore()` usando RevenueCat API
- ✅ Botão visível no footer da tela de assinatura
- ✅ Mensagens de sucesso/erro apropriadas
- ✅ Loading state durante restauração
- ✅ Atualização automática do status premium após restaurar

**Compliance:** Atende requisito obrigatório da Apple App Store.

---

## 📱 PRÓXIMO PASSO: BUILD FINAL

### Opção 1: Build via EAS (Recomendado)

**Android:**
```bash
cd mobile
npx eas build -p android --profile production
```

**iOS:**
```bash
cd mobile
npx eas build -p ios --profile production
```

**Vantagens:**
- ✅ Build na nuvem (não depende da sua máquina)
- ✅ Configuração automática de certificados
- ✅ Mais confiável para primeira submissão

**Desvantagens:**
- ⏱️ Pode demorar 15-30 minutos
- 💰 Uso de créditos EAS (mas tem plano grátis)

---

### Opção 2: Build Local

**Pré-requisito:** Executar prebuild primeiro
```bash
cd mobile
npx expo prebuild --clean
```

**Android:**
```bash
cd mobile/android
.\gradlew bundleRelease
```

**iOS (requer macOS + Xcode):**
```bash
cd mobile/ios
xcodebuild -workspace AllMind.xcworkspace -scheme AllMind -configuration Release archive
```

**Vantagens:**
- ⚡ Mais rápido se funcionar
- 🆓 Gratuito

**Desvantagens:**
- 🔧 Requer configuração local
- ❌ Histórico de falhas neste projeto

---

## 📊 CHECKLIST PRÉ-BUILD

Antes de iniciar o build, confirme:

### Código
- [x] URL privacidade configurada
- [x] Bundle IDs corretos
- [x] Permissões não duplicadas
- [x] createTestUser() removido
- [x] Textos sem alegações médicas
- [x] Disclaimer médico presente
- [x] Trial com termos claros
- [x] Botão Restaurar Compras adicionado

### Assets (VERIFICAR MANUALMENTE)
- [ ] **Política de privacidade ACESSÍVEL** em `https://vyratech.github.io/allmind-privacy`
- [ ] Ícone 1024x1024 sem transparência (Android)
- [ ] Ícone 1024x1024 com transparência (iOS)
- [ ] Splash screen não pixelizado
- [ ] Adaptive icon funcional (Android)

### Screenshots (CRIAR ANTES DE SUBMETER)
- [ ] Mínimo 2 screenshots Android (1080 x 2340px)
- [ ] Mínimo 3 screenshots iOS (vários tamanhos)

---

## 🎯 APÓS BUILD BEM-SUCEDIDO

### Arquivos Gerados

**Android:**
- `mobile/android/app/build/outputs/bundle/release/app-release.aab` (AAB)
- ou `.apk` se gerou APK

**iOS:**
- `.ipa` file

---

## 📤 SUBMISSÃO GOOGLE PLAY

### 1. Acessar Console
https://play.google.com/console

### 2. Criar Novo App (Primeira vez)
- Clicar em "Criar app"
- Nome: **All Mind**
- Idioma padrão: Português (Brasil)
- Categoria: Saúde e fitness
- Tipo: App

### 3. Upload do Bundle
- Produção → Criar nova versão
- Upload do arquivo `.aab`
- Nome da versão: `1.0.0`
- Notas da versão:
```
🎉 Lançamento inicial do All Mind

✨ Recursos principais:
• 50+ meditações guiadas em português
• Programas estruturados de 7-21 dias
• Reprodução em background
• Modo offline
• Acompanhamento de progresso

🎁 Trial de 7 dias grátis

Bem-vindo à sua jornada de bem-estar!
```

### 4. Preenchimento Obrigatório

**Conteúdo do app:**
- [ ] Política de privacidade (URL): `https://vyratech.github.io/allmind-privacy`
- [ ] Categoria: Saúde e fitness
- [ ] Email de contato: ___________
- [ ] Declaração de IA: **Não usa IA generativa**

**Segurança de dados:**
- [x] Coleta email/nome
- [x] Coleta dados de uso
- [x] Compras in-app
- [ ] Finalidade: Funcionalidade, personalização
- [ ] Compartilhamento: RevenueCat, Expo

**Classificação etária:**
- [ ] Selecionar: **Todos** ou **PEGI 3**

**Screenshots:**
- [ ] Upload mínimo 2 screenshots (1080 x 2340px)

**Descrição:**
Usar textos de [TEXTOS_STORES.md](TEXTOS_STORES.md)

### 5. Revisar e Enviar
- Revisar todas seções
- Clicar "Enviar para revisão"
- **Prazo:** 1-3 dias úteis

---

## 🍎 SUBMISSÃO APP STORE

### 1. Acessar App Store Connect
https://appstoreconnect.apple.com

### 2. Criar Novo App (Primeira vez)
- Clicar "+"
- Nome: **All Mind**
- Idioma principal: Português (Brasil)
- Bundle ID: `com.vyratech.allmind`
- SKU: `allmind-1`
- Acesso: Completo

### 3. Upload via Xcode ou Transporter

**Opção A - Xcode:**
```bash
# Após build bem-sucedido
# Window → Organizer → Archives → Upload to App Store
```

**Opção B - Transporter App:**
- Download: Mac App Store
- Arrastar `.ipa` → Upload

### 4. Preenchimento Obrigatório

**Informações do app:**
- [ ] Nome: All Mind
- [ ] Subtítulo (30 chars): Bem-estar e qualidade de vida
- [ ] Categoria: Health & Fitness
- [ ] Palavras-chave: meditação,mindfulness,sono,relaxamento,bem-estar

**Classificação etária:**
- [ ] Selecionar: **4+**

**Privacidade:**
- [ ] URL: `https://vyratech.github.io/allmind-privacy`
- [ ] Tipo de dados: Email, nome, uso do app
- [ ] Não rastreia usuários

**Screenshots:**
- [ ] 6.7" Display (1290 x 2796px) - obrigatório
- [ ] 6.5" Display (1284 x 2778px) - obrigatório
- [ ] 5.5" Display (1242 x 2208px) - obrigatório

**Descrição:**
Usar textos de [TEXTOS_STORES.md](TEXTOS_STORES.md)

**O que há de novo (v1.0):**
```
🎉 Lançamento inicial

• 50+ meditações guiadas
• Programas de 7-21 dias
• Reprodução em background
• Modo offline
• 7 dias grátis para testar

Bem-vindo à sua jornada de autocuidado!
```

### 5. In-App Purchases

**⚠️ IMPORTANTE:** Configurar produtos antes de submeter:
- [ ] Produto mensal: `com.vyratech.allmind.monthly`
- [ ] Produto anual: `com.vyratech.allmind.yearly`
- [ ] Configurar no RevenueCat também

### 6. Build para Revisão
- [ ] Selecionar build enviado via Transporter/Xcode
- [ ] Adicionar informações de exportação (sem criptografia)
- [ ] Selecionar "Enviar para revisão"

**Prazo:** 1-7 dias (primeira submissão pode levar mais)

---

## ⏱️ TIMELINE ESPERADA

| Atividade | Tempo Estimado |
|-----------|----------------|
| Build Android (EAS) | 15-30 min |
| Build iOS (EAS) | 20-40 min |
| Criar screenshots | 30 min |
| Preencher Google Play | 30 min |
| Preencher App Store | 45 min |
| **TOTAL TRABALHO** | **~3 horas** |
| | |
| Revisão Google Play | 1-3 dias |
| Revisão App Store | 1-7 dias |
| **TOTAL ATÉ PUBLICAÇÃO** | **2-10 dias** |

---

## 🐛 TROUBLESHOOTING

### Build falha com "duplicate permissions"
✅ **JÁ CORRIGIDO** - Permissões duplicadas removidas

### Build falha com "invalid bundle identifier"
✅ **JÁ CORRIGIDO** - Bundle ID sem espaço

### Screenshots rejeitados
- Verificar resolução exata
- Não usar molduras de dispositivo (apenas conteúdo)
- Evitar texto muito pequeno

### Rejeição por política de privacidade
- Confirmar URL acessível em navegador anônimo
- Verificar se contém todas seções obrigatórias

### Rejeição por alegações médicas
✅ **JÁ CORRIGIDO** - Textos ajustados para bem-estar

---

## 📞 SUPORTE

**EAS Build:**
- Documentação: https://docs.expo.dev/build/introduction/
- Status: https://status.expo.dev/

**Google Play Console:**
- Ajuda: https://support.google.com/googleplay/android-developer
- Políticas: https://play.google.com/about/developer-content-policy/

**App Store Connect:**
- Ajuda: https://developer.apple.com/help/app-store-connect/
- Guidelines: https://developer.apple.com/app-store/review/guidelines/

---

## ✅ CHECKLIST FINAL

Antes de clicar "Enviar para revisão":

- [ ] Build testado em dispositivo físico
- [ ] Compras in-app funcionam (ou modo teste configurado)
- [ ] URL privacidade acessível
- [ ] Screenshots corretos
- [ ] Textos revisados (sem erros de português)
- [ ] Email de suporte válido
- [ ] Classificação etária apropriada
- [ ] Declaração de dados completa

---

**Próxima ação:** Iniciar build com `npx eas build -p android --profile production`
