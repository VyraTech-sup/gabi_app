# ✅ CHECKLIST PRÉ-PUBLICAÇÃO - ALL MIND

## 🚨 CRÍTICO (90% das rejeições)

### 1. POLÍTICA DE PRIVACIDADE
- [ ] **URL AUSENTE** - Criar e hospedar política de privacidade
- [ ] Adicionar URL no `app.json` (campo `privacy`)
- [ ] Verificar se URL está acessível publicamente
- [ ] Política deve cobrir:
  - ✅ Coleta de email/nome (autenticação)
  - ✅ Uso de notificações push
  - ✅ Compras in-app/assinaturas
  - ✅ Dados armazenados localmente

**Exemplo de URL para adicionar:**
```json
"privacy": "https://vyratech.com/privacy-policy"
```

---

### 2. DECLARAÇÃO DE DADOS (Google Play Console)

#### Dados que o APP COLETA:
- [x] **Informações pessoais**
  - Email
  - Nome do usuário
  
- [x] **Atividade no app**
  - Progresso de meditações
  - Áudios reproduzidos
  - Assinaturas/compras
  
- [x] **Identificadores de dispositivo**
  - Push notification tokens

#### Finalidade dos dados:
- [x] Funcionalidade do app
- [x] Personalização
- [x] Gerenciamento de conta

#### Compartilhamento:
- [x] RevenueCat (processamento de pagamentos)
- [x] Expo (notificações push)

---

### 3. DECLARAÇÃO DE IA
- [ ] **NÃO usa IA generativa** - Apenas áudios pré-gravados
- [ ] Marcar "Não" na pergunta sobre IA no console

---

### 4. CONTA DE DESENVOLVEDOR
- [ ] Conta Google Play verificada (Vyratech)
- [ ] Conta Apple Developer ativa
- [ ] Certificados de assinatura configurados

---

## 📱 ASSETS OBRIGATÓRIOS

### Ícones (✅ PRONTOS)
- [x] `icon.png` (1024x1024)
- [x] `adaptive-icon.png` (Android)
- [x] `splash-icon.png`

### Screenshots (⚠️ VERIFICAR)
**Google Play Console:**
- [ ] 2 screenshots mínimo (até 8)
- [ ] Resolução: 16:9 ou 9:16
- [ ] Formatos: JPEG ou PNG 24-bit
- [ ] Tamanhos sugeridos:
  - Phone: 1080 x 1920px
  - 7" Tablet: 1200 x 1920px
  - 10" Tablet: 1920 x 1200px

**App Store Connect:**
- [ ] Screenshots por tamanho de tela:
  - 6.7" (iPhone 15 Pro Max): 1290 x 2796px
  - 6.5" (iPhone 14 Plus): 1284 x 2778px
  - 5.5" (iPhone 8 Plus): 1242 x 2208px

---

## 📝 TEXTOS DA LOJA

### Descrição Curta (80 caracteres)
```
Meditação guiada e áudios para bem-estar mental e qualidade de vida
```

### Descrição Longa
- [ ] Destacar principais recursos:
  - ✅ Biblioteca de áudios de meditação
  - ✅ Programas estruturados
  - ✅ Reprodução em background
  - ✅ Interface intuitiva
  - ✅ Modo offline
  
- [ ] Explicar assinaturas e trial
- [ ] Mencionar suporte a português

### Palavras-chave (App Store)
```
meditação, mindfulness, bem-estar, saúde mental, ansiedade, sono, relaxamento
```

---

## 🔐 CONFIGURAÇÕES TÉCNICAS

### app.json - Verificar:
- [x] Bundle ID: `com.vyratech.allmind`
- [x] Version: `1.0.0`
- [x] versionCode/buildNumber: `1`
- [x] Permissões declaradas (WAKE_LOCK)
- [ ] **privacy URL** (ADICIONAR)

### EAS Build
- [x] Profile production configurado
- [x] EAS Project ID: `db76ce10-369f-4780-95fc-113782270fe4`

---

## 🎯 CLASSIFICAÇÃO ETÁRIA

**Google Play:**
- [ ] Selecionar: **PEGI 3** ou **Todos**
- [ ] Justificar: App de bem-estar, sem conteúdo sensível

**App Store:**
- [ ] Selecionar: **4+** (sem restrições)

---

## 💰 INFORMAÇÕES DE MONETIZAÇÃO

### Google Play Console:
- [x] Contém anúncios: **NÃO**
- [x] Compras no app: **SIM**
  - [ ] Listar produtos:
    - Trial 7 dias
    - Assinatura mensal
    - Assinatura anual

### App Store Connect:
- [x] In-App Purchases configurados no RevenueCat
- [ ] Verificar IDs dos produtos no App Store Connect

---

## 🚀 CHECKLIST FINAL ANTES DE SUBMETER

### Build
- [ ] Build production gerado com sucesso
- [ ] APK/AAB testado em dispositivo físico
- [ ] IPA testado via TestFlight

### Funcional
- [ ] Login/cadastro funcionando
- [ ] Reprodução de áudio em background
- [ ] Compras in-app/assinaturas
- [ ] Notificações push (se habilitadas)

### Conteúdo
- [ ] Todos os textos em português correto
- [ ] Sem placeholder "Lorem Ipsum"
- [ ] Links funcionando (se houver)

### Legal
- [ ] Termos de uso preparados
- [ ] Política de privacidade publicada
- [ ] Informações de contato corretas

---

## ⚠️ PROBLEMAS COMUNS QUE CAUSAM REJEIÇÃO

1. **Permissões não justificadas**
   - ✅ WAKE_LOCK está justificado (áudio em background)

2. **Dados coletados não declarados**
   - ⚠️ Revisar seção "Declaração de Dados" acima

3. **Política de privacidade ausente/inválida**
   - 🚨 **URGENTE**: Criar e adicionar URL

4. **Screenshots de baixa qualidade**
   - ⚠️ Verificar resolução e nitidez

5. **Descrição genérica ou enganosa**
   - ⚠️ Evitar promessas médicas/terapêuticas não comprovadas

---

## 📞 INFORMAÇÕES DE CONTATO

**Para incluir no console:**
- [ ] Email de suporte: _____________
- [ ] Site: _____________
- [ ] Telefone (opcional): _____________

---

## 🎯 PRÓXIMOS PASSOS SUGERIDOS

1. **URGENTE**: Criar política de privacidade
2. Gerar screenshots de qualidade
3. Preparar textos da loja (descrição, o que há de novo)
4. Configurar produtos in-app no console
5. Fazer build final de produção
6. Testar exaustivamente
7. Submeter para revisão

---

**Tempo estimado de aprovação:**
- Google Play: 1-3 dias úteis
- App Store: 1-2 dias úteis (primeira submissão pode levar mais)

**Dica:** Submeta primeiro no Google Play (mais rápido) para identificar problemas antes do App Store.
