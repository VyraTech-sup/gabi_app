# ✅ CHECKLIST FINAL PRÉ-SUBMISSÃO

**Use este checklist para garantir que nada foi esquecido antes de submeter às lojas.**

---

## 🔴 CRÍTICO - Fazer AGORA

### 1. Verificar URL de Privacidade
```
[ ] Abrir: https://vyratech.github.io/allmind-privacy
[ ] Confirmar que carrega sem erro 404
[ ] Verificar conteúdo em português
[ ] Menciona "All Mind" e "Vyratech"
```

**Se não funcionar:**
- Seguir `COMO_PUBLICAR_PRIVACY_POLICY.md`
- Usar template em `PRIVACY_POLICY_TEMPLATE.md`

---

### 2. Criar Screenshots
```
[ ] Android: 2+ screenshots (1080 x 2340px)
[ ] iOS: 3+ screenshots (vários tamanhos)
```

**Telas sugeridas:**
1. Home com biblioteca de meditações
2. Player tocando áudio
3. Perfil/programas
4. Assinatura
5. Explore

**Ferramentas:**
- Captura: Emulador Android / iOS Simulator
- Redimensionar: https://www.resizepixel.com/
- Guia completo: `GUIA_SCREENSHOTS.md`

---

### 3. Build de Produção
```
[ ] cd C:\dev\gabi_app\mobile
[ ] npx eas build -p android --profile production
[ ] Aguardar ~15-30 min
[ ] Baixar .aab
[ ] npx eas build -p ios --profile production
[ ] Aguardar ~20-40 min
[ ] Baixar .ipa
```

**Se falhar:**
- Ver `COMANDOS_BUILD.md` → Troubleshooting
- Usar build na nuvem (EAS) ao invés de local

---

## 🟡 IMPORTANTE - Verificar

### 4. Revenue Cat API Keys
```
[ ] Verificar se já está configurado
[ ] Se não: criar conta em revenuecat.com
[ ] Adicionar API keys ao projeto
```

**Onde verificar:**
- Código: buscar por `Purchases.configure`
- Se não encontrar: talvez precise adicionar

---

### 5. Testar Funcionalidades
```
[ ] Criar conta
[ ] Fazer login
[ ] Ouvir meditação
[ ] Testar assinatura (sandbox)
[ ] Clicar "Restaurar Compras"
[ ] Verificar disclaimer visível
```

---

## 🟢 OPCIONAL - Melhorias

### 6. Console.logs em Produção
```
[ ] Envolver console.log em __DEV__
[ ] 28 ocorrências encontradas
```

**Tempo:** ~45 minutos  
**Impacto:** Não bloqueante, mas recomendado

---

## 📝 SUBMISSÃO GOOGLE PLAY

### Preparar Listagem
```
[ ] Título: "All Mind"
[ ] Descrição curta (copiar de TEXTOS_STORES.md)
[ ] Descrição completa (copiar de TEXTOS_STORES.md)
[ ] Categoria: Saúde e fitness
[ ] Classificação: Todos
```

### Upload do Build
```
[ ] Acessar play.google.com/console
[ ] Criar novo app (se primeira vez)
[ ] Upload do .aab
[ ] Adicionar screenshots
[ ] Preencher Data Safety
   - Coleta email e nome (obrigatório para login)
   - Não compartilha com terceiros
   - Dados criptografados em trânsito
```

### Política e Compliance
```
[ ] URL privacidade: https://vyratech.github.io/allmind-privacy
[ ] Email de contato: ____________
[ ] Aceitar termos
[ ] Submeter para revisão
```

**Tempo de aprovação:** 1-3 dias

---

## 🍎 SUBMISSÃO APP STORE

### Preparar Listagem
```
[ ] Nome: "All Mind"
[ ] Subtítulo (copiar de TEXTOS_STORES.md)
[ ] Descrição (copiar de TEXTOS_STORES.md)
[ ] Categoria: Health & Fitness
[ ] Classificação: 4+
```

### Upload do Build
```
[ ] Baixar app "Transporter" (Mac App Store)
[ ] Arrastar .ipa para Transporter
[ ] Aguardar upload (~5-15 min)
[ ] Acessar appstoreconnect.apple.com
[ ] Selecionar build na aba "Builds"
```

### Screenshots e Mídia
```
[ ] 6.5" Display (iPhone 14 Pro Max): 3+ screenshots
[ ] 5.5" Display (iPhone 8 Plus): 3+ screenshots
[ ] iPad Pro (12.9"): 2+ screenshots (opcional)
```

### Privacy Nutrition Labels
```
[ ] Data Types Collected:
   - Contact Info → Email address (para login)
   - Contact Info → Name (para perfil)
[ ] Data linked to user: Yes
[ ] Data used for tracking: No
[ ] Third-party tracking: No
```

### In-App Purchases
```
[ ] Verificar produtos no App Store Connect
[ ] Conectar com Revenue Cat
[ ] Testar compra em sandbox
[ ] Ativar "Restore Purchases" (já implementado!)
```

### Compliance
```
[ ] Privacy Policy URL: https://vyratech.github.io/allmind-privacy
[ ] Content Rights: Você possui os direitos
[ ] Advertising Identifier: No
[ ] Export Compliance: No (não usa criptografia)
```

**Tempo de aprovação:** 1-7 dias

---

## ✅ VERIFICAÇÃO FINAL

Antes de clicar "Submeter":

```
[ ] URL privacidade funciona
[ ] Screenshots bonitos e representativos
[ ] Build instalou em dispositivo físico
[ ] Testou criar conta e fazer login
[ ] Testou ouvir uma meditação
[ ] Botão "Restaurar Compras" aparece
[ ] Disclaimer médico visível no onboarding
[ ] Textos sem erros de português
[ ] Versão: 1.0.0
[ ] Bundle ID: com.vyratech.allmind (sem espaços!)
```

---

## 📊 PROGRESSO

**Status atual:**
- [x] Auditoria completa
- [x] Correções aplicadas
- [x] Documentação criada
- [ ] URL privacidade verificada
- [ ] Screenshots criados
- [ ] Build de produção gerado
- [ ] Submissão Google Play
- [ ] Submissão App Store

**Próximo passo:** Verificar URL privacidade (5 min)

---

## 🎯 META

**Objetivo:** App aprovado nas duas lojas em 7 dias

**Timeline:**
- **Hoje:** Verificações finais + Build
- **Amanhã:** Submeter Google Play + App Store
- **2-3 dias:** Aprovação Google Play
- **5-7 dias:** Aprovação App Store

---

## 📞 EM CASO DE REJEIÇÃO

### Google Play
**Motivo comum:** Data safety incorreto
**Solução:** Revisar declaração de dados coletados

### App Store
**Motivo comum:** Privacy policy inacessível
**Solução:** Verificar URL https://vyratech.github.io/allmind-privacy

**Outros motivos:** Ver `AUDITORIA_FINAL_AUTOMATIZADA.md` → Seção Suporte

---

**Boa sorte! 🚀**

Você está 95% pronto para aprovação.
Faltam apenas 3 ações manuais (URL, screenshots, build).
