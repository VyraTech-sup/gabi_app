# 📋 Checklist de Publicação - App Store & Play Store

## 🍎 App Store (iOS)

### Pré-requisitos
- [ ] Conta de desenvolvedor Apple ($99/ano)
- [ ] Xcode instalado (apenas macOS)
- [ ] Certificados e perfis de provisionamento configurados

### 1. Preparação do App

#### Assets e Metadados
- [ ] **Ícone do app:** 1024x1024px (sem transparência)
- [ ] **Screenshots:** iPhone (6.5", 5.5") e iPad (12.9")
- [ ] **Preview videos:** Opcional, mas recomendado
- [ ] **Nome do app:** "All Mind" (único na App Store)
- [ ] **Subtitle:** Até 30 caracteres
- [ ] **Keywords:** Meditação, Mindfulness, Sono, Bem-estar

#### Informações Obrigatórias
- [ ] **Descrição completa:** O que é, benefícios, funcionalidades
- [ ] **What's New:** Texto da versão 1.0.0
- [ ] **Categoria primária:** Health & Fitness
- [ ] **Categoria secundária:** Lifestyle
- [ ] **Classificação etária:** 4+ (nenhum conteúdo adulto)
- [ ] **Informações de privacidade:** URL da política de privacidade
- [ ] **Suporte:** URL ou email de contato

### 2. Build e Configuração

```bash
# 1. Configurar app.json
{
  "expo": {
    "ios": {
      "bundleIdentifier": "com.All Mind.app",
      "buildNumber": "1",
      "infoPlist": {
        "UIBackgroundModes": ["audio"]
      }
    }
  }
}

# 2. Fazer build
eas build --platform ios

# 3. Submit para App Store
eas submit --platform ios
```

### 3. App Store Connect

- [ ] Criar app no App Store Connect
- [ ] Preencher todas as informações obrigatórias
- [ ] Upload do build via EAS ou Xcode
- [ ] Adicionar screenshots
- [ ] Configurar In-App Purchases (se houver)
- [ ] Configurar preço e disponibilidade
- [ ] Revisar e submeter para análise

### 4. Política de Privacidade

**Obrigatório para apps com conta de usuário**

Incluir:
- [ ] Quais dados coletamos (email, nome)
- [ ] Como usamos os dados
- [ ] Onde armazenamos (AsyncStorage local)
- [ ] Compartilhamento com terceiros (nenhum atualmente)
- [ ] Direitos do usuário (acesso, exclusão)

### 5. Tempo de Aprovação
- **Primeira submissão:** 1-7 dias
- **Atualizações:** 1-3 dias
- **Possíveis rejeições:** Falta de funcionalidade, bugs, violação de guidelines

---

## 🤖 Google Play Store (Android)

### Pré-requisitos
- [ ] Conta Google Play Console ($25 taxa única)
- [ ] Chaves de assinatura do app (keystore)

### 1. Preparação do App

#### Assets e Metadados
- [ ] **Ícone do app:** 512x512px (PNG com transparência opcional)
- [ ] **Feature Graphic:** 1024x500px (banner principal)
- [ ] **Screenshots:** Mínimo 2, até 8 (telefone, tablet)
- [ ] **Nome do app:** "All Mind" (único na Play Store)
- [ ] **Descrição curta:** Até 80 caracteres
- [ ] **Descrição completa:** Até 4000 caracteres

#### Informações Obrigatórias
- [ ] **Categoria:** Saúde e fitness
- [ ] **Classificação de conteúdo:** Questionário obrigatório
- [ ] **Política de privacidade:** URL obrigatória
- [ ] **Email de contato:** Visível publicamente

### 2. Build e Configuração

```bash
# 1. Configurar app.json
{
  "expo": {
    "android": {
      "package": "com.All Mind.app",
      "versionCode": 1,
      "permissions": [
        "AUDIO_SETTINGS",
        "RECEIVE_BOOT_COMPLETED",
        "VIBRATE",
        "WAKE_LOCK"
      ]
    }
  }
}

# 2. Fazer build (AAB - Android App Bundle)
eas build --platform android

# 3. Submit para Play Store
eas submit --platform android
```

### 3. Google Play Console

- [ ] Criar app no Play Console
- [ ] Preencher ficha da loja
- [ ] Upload do AAB/APK
- [ ] Configurar distribuição (países, dispositivos)
- [ ] Configurar preço e disponibilidade
- [ ] Responder questionário de classificação de conteúdo
- [ ] Revisar e publicar

### 4. Permissões Especiais

**Permissões que exigem declaração:**
- [ ] **AUDIO_SETTINGS:** Para reprodução de áudio em background
- [ ] **WAKE_LOCK:** Para manter tela ligada durante meditação

**Justificar uso de cada permissão na declaração**

### 5. Tempo de Aprovação
- **Primeira submissão:** Algumas horas a 3 dias
- **Atualizações:** Algumas horas
- **Análise contínua:** Google pode revisar app a qualquer momento

---

## 🔐 Segurança e Compliance

### LGPD / GDPR
- [ ] Implementar opt-in para coleta de dados
- [ ] Permitir exclusão de conta e dados
- [ ] Informar sobre cookies/tracking (se houver)
- [ ] Consentimento explícito para marketing

### Acessibilidade
- [ ] Testar com leitores de tela (TalkBack, VoiceOver)
- [ ] Labels descritivos em botões e imagens
- [ ] Contraste adequado (WCAG 2.1)
- [ ] Suporte para fontes maiores

### Performance
- [ ] Tempo de inicialização < 5s
- [ ] Tamanho do APK/IPA < 100MB
- [ ] Funciona offline (nosso app funciona!)
- [ ] Bateria: não drena excessivamente

---

## 📱 Testes Antes da Publicação

### Funcionalidades Essenciais
- [ ] Onboarding completa sem erros
- [ ] Login/registro funciona
- [ ] Player reproduz áudio corretamente
- [ ] Notificações são agendadas
- [ ] Navegação sem crashes
- [ ] Logout limpa dados

### Dispositivos
- [ ] **iOS:** iPhone 12+, iPad
- [ ] **Android:** Pixel, Samsung Galaxy, tablets

### Casos Extremos
- [ ] Sem conexão à internet
- [ ] Permissões negadas
- [ ] Memória baixa
- [ ] Interrupções (chamadas, alarmes)
- [ ] Multitarefa (background/foreground)

---

## 🚀 Pós-Publicação

### Monitoramento
- [ ] Configurar analytics (Firebase, Amplitude)
- [ ] Crash reporting (Sentry, Crashlytics)
- [ ] Revisar avaliações e comentários
- [ ] Responder feedback de usuários

### Atualizações
- [ ] Planejar roadmap de features
- [ ] Corrigir bugs reportados
- [ ] Melhorias de performance
- [ ] Novos conteúdos (áudios, programas)

### Marketing
- [ ] Website/landing page
- [ ] Redes sociais (Instagram, TikTok)
- [ ] Press kit para mídia
- [ ] ASO (App Store Optimization)

---

## 📊 Métricas de Sucesso

### Primeiros 30 dias
- [ ] X downloads
- [ ] Retenção D1, D7, D30
- [ ] Taxa de conversão onboarding
- [ ] Avaliação média > 4.0

### 90 dias
- [ ] Crescimento mensal > 20%
- [ ] Usuários ativos diários (DAU)
- [ ] Tempo médio de sessão
- [ ] Programas mais populares

---

## ⚠️ Erros Comuns a Evitar

### App Store
- ❌ Falta de funcionalidade (app muito simples)
- ❌ Crashes durante review
- ❌ UI inconsistente ou confusa
- ❌ Falta de informações de privacidade
- ❌ Uso incorreto de APIs do iOS

### Play Store
- ❌ APK não assinado corretamente
- ❌ Permissões desnecessárias sem justificativa
- ❌ Conteúdo enganoso ou spam
- ❌ Violação de políticas de família (se classificado como app infantil)

---

## 📞 Recursos Úteis

### Documentação Oficial
- **Apple:** https://developer.apple.com/app-store/review/guidelines/
- **Google:** https://support.google.com/googleplay/android-developer/

### Ferramentas Expo
- **EAS Build:** https://docs.expo.dev/build/introduction/
- **EAS Submit:** https://docs.expo.dev/submit/introduction/

### Suporte
- **Expo Discord:** Comunidade ativa
- **Stack Overflow:** Perguntas técnicas
- **Apple Developer Forums**
- **Android Developer Support**

---

## ✅ Checklist Final

Antes de submeter:
- [ ] Versão final testada extensivamente
- [ ] Screenshots de alta qualidade
- [ ] Descrições revisadas e sem erros
- [ ] Política de privacidade publicada
- [ ] Suporte técnico disponível (email)
- [ ] Build de produção gerado (não debug)
- [ ] Todas as permissões justificadas
- [ ] App funciona offline
- [ ] Sem logs de desenvolvimento no console

**Boa sorte na publicação! 🚀**
