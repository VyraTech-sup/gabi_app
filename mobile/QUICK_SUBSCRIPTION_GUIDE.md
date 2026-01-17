# 🚀 GUIA RÁPIDO - SISTEMA DE ASSINATURA

## 🎯 Como Testar Localmente

### 1. Iniciar o App
```bash
cd mobile
npm start
```

### 2. Simular Usuário SEM Assinatura (Padrão)

Ao fazer login pela primeira vez, o usuário NÃO terá assinatura ativa.

**O que você verá:**
- ✅ Banner vermelho: "Sua avaliação gratuita expirou"
- ✅ Stories bloqueados com cadeado
- ✅ Card grande: "Desbloqueie sua jornada completa"
- ✅ Settings mostra: "Não há assinatura ativa"

### 3. Assinar

**Passo a passo:**
1. Na Home, clique em **"Assinar"** no card grande
2. Você será levado para a tela de paywall (UnlockAlmaSense)
3. Escolha um plano (Mensal ou Anual)
4. Clique em **"Assinar"**
5. ✅ Assinatura ativada automaticamente (mock)

### 4. Verificar Assinatura Ativa

Após assinar, você verá:
- ✅ Banner vermelho removido
- ✅ Stories desbloqueados
- ✅ Home mostra: "Você é Premium!"
- ✅ Settings mostra notificações e horário

### 5. Testar Regra de Story Diário

**Primeiro Story do dia:**
1. Clique em um Story na Home
2. Story estará **desbloqueado**
3. Inicie e complete o Story
4. ✅ Story marcado como assistido

**Segundo Story no mesmo dia:**
1. Tente iniciar outro Story
2. Você verá **cadeado** e texto "Disponível amanhã"
3. Alert: "Você já assistiu o Story de hoje"

### 6. Deslogar

Para testar novamente:
1. Vá em **Configurações**
2. Role até **Conta**
3. Clique em **"Deslogar"**
4. Confirme
5. Você voltará para o onboarding

---

## 🔄 Resetar para Estado Inicial

### Método 1: Botão RESET (Dev)
1. Na tela de MentalRecordingChoice
2. Clique no botão vermelho **"RESET"** no canto superior esquerdo
3. ✅ Todo o AsyncStorage será limpo

### Método 2: Manual
```bash
# No console do Expo
# Aperte 'd' para abrir o menu
# Selecione "Clear AsyncStorage"
```

---

## 📱 Telas para Testar

### 1. Home
- [ ] Banner de trial expirado (sem assinatura)
- [ ] Card de assinatura (sem assinatura)
- [ ] Banner premium (com assinatura)
- [ ] Navegação para UnlockAlmaSense

### 2. UnlockAlmaSense (Paywall)
- [ ] Título "Desbloqueie AlmaSense"
- [ ] Lista de benefícios com checks
- [ ] Cards de preview dos Stories
- [ ] Seleção de plano (mensal/anual)
- [ ] Botão "Assinar"
- [ ] Link "código promocional"
- [ ] Links de termos e privacidade

### 3. Settings
- [ ] Card de assinatura no topo
- [ ] Botão "Assinar" (sem assinatura)
- [ ] Notificações visíveis (com assinatura)
- [ ] Email do usuário
- [ ] Botões de Deslogar e Deletar conta

### 4. MentalRecordingChoice (Story)
- [ ] Cadeado visível (sem assinatura)
- [ ] Overlay com "Assinatura necessária"
- [ ] Desbloqueado (com assinatura, 1º do dia)
- [ ] Bloqueado (com assinatura, já assistiu)

---

## 🧪 Casos de Teste

### Caso 1: Novo Usuário
```
Login → Home (trial expirado) → Clique Story → Alert assinatura
→ UnlockAlmaSense → Assinar → Home premium
```

### Caso 2: Usuário Premium (1º Story)
```
Login → Home → Clique Story → Desbloqueado → Assistir
→ Completo → StoryCompleted
```

### Caso 3: Usuário Premium (2º Story)
```
Login → Home → Clique Story → Bloqueado "Disponível amanhã"
→ Alert "já assistiu hoje"
```

### Caso 4: Logout e Re-login
```
Settings → Deslogar → Onboarding → Re-login
→ Estado mantido (assinatura + último Story)
```

---

## 🐛 Debug

### Ver estado de assinatura no console:
```typescript
// No AuthContext, adicione temporariamente:
console.log('hasActiveSubscription:', hasActiveSubscription);
console.log('subscriptionPlan:', subscriptionPlan);
console.log('lastStoryDate:', lastStoryDate);
```

### Ver AsyncStorage:
```bash
# Expo Developer Tools
# Vá em "AsyncStorage" e veja os valores salvos
```

### Forçar assinatura ativa:
```typescript
// No AuthContext, altere loadPersistedState():
setSubscriptionStatus('active');
setSubscriptionPlan('yearly');
```

---

## ✅ Checklist Final

Antes de enviar para produção:

- [ ] Integrar `react-native-iap` ou `expo-in-app-purchases`
- [ ] Configurar IDs de produto no App Store Connect
- [ ] Configurar IDs de produto no Google Play Console
- [ ] Testar compra real em dispositivo físico (iOS)
- [ ] Testar compra real em dispositivo físico (Android)
- [ ] Testar restauração de compras
- [ ] Atualizar URLs de termos e privacidade
- [ ] Remover botão "RESET" da produção
- [ ] Configurar preços finais (R$ 29,90 / R$ 399,00)

---

## 🎉 Tudo Pronto!

O sistema está 100% funcional para desenvolvimento e testes.

Para ativar pagamentos reais, siga as instruções em:
📄 `SUBSCRIPTION_IMPLEMENTATION.md` - Seção "INTEGRAÇÃO PENDENTE"
