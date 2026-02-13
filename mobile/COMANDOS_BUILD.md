# ⚡ COMANDOS RÁPIDOS - BUILD E PUBLICAÇÃO

## 🔥 OPÇÃO RECOMENDADA: EAS Build

### 1️⃣ Build Android (AGORA)
```powershell
cd C:\dev\gabi_app\mobile
npx eas build -p android --profile production
```

**O que vai acontecer:**
- ⏱️ Build na nuvem (~15-30 min)
- ✅ Gera arquivo `.aab` automaticamente
- 📧 Link de download enviado por email
- 💾 Download também via: `eas build:list`

**Se pedir login:**
```powershell
npx eas login
```

---

### 2️⃣ Build iOS (Depois do Android)
```powershell
cd C:\dev\gabi_app\mobile
npx eas build -p ios --profile production
```

**O que vai acontecer:**
- ⏱️ Build na nuvem (~20-40 min)
- ✅ Gera arquivo `.ipa`
- 🔐 EAS cria certificados automaticamente (primeira vez)

---

## 📸 Enquanto Aguarda o Build

### Criar Screenshots (30 minutos)

**1. Iniciar app no emulador:**
```powershell
cd C:\dev\gabi_app\mobile
npm run android
```

**2. Capturar telas:**
- Emulador: `Ctrl + S` (Windows)
- Salvar 3-5 telas importantes

**3. Redimensionar (se necessário):**
- Tamanho ideal: 1080 x 2340px
- Ferramenta online: https://www.resizepixel.com/

**Telas sugeridas:**
1. Home com biblioteca de meditações
2. Player tocando meditação
3. Perfil ou tela de programas

---

## 📥 Baixar Builds Concluídos

**Via CLI:**
```powershell
# Listar builds
npx eas build:list

# Baixar último build Android
npx eas build:download --platform android --latest

# Baixar último build iOS
npx eas build:download --platform ios --latest
```

**Via Web:**
https://expo.dev → Projetos → All Mind → Builds

---

## 🤖 GOOGLE PLAY - Submissão

### Acessar Console
https://play.google.com/console

### Comandos Úteis
```powershell
# Ver status da submissão (se já submeteu antes)
# Não há CLI oficial - usar console web
```

### Checklist Rápido
- [ ] Upload `.aab`
- [ ] 2+ screenshots
- [ ] URL privacidade: `https://vyratech.github.io/allmind-privacy`
- [ ] Email: _____________
- [ ] Descrição (copiar de TEXTOS_STORES.md)
- [ ] Categoria: Saúde e fitness
- [ ] Classificação: Todos

---

## 🍎 APP STORE - Submissão

### Acessar Console
https://appstoreconnect.apple.com

### Upload do Build

**Opção A: Via Transporter (Mac App Store)**
1. Baixar app "Transporter" da Mac App Store
2. Arrastar arquivo `.ipa`
3. Aguardar upload (5-15 min)

**Opção B: Via Terminal (se tiver Xcode)**
```bash
# Após ter o .ipa
xcrun altool --upload-app --type ios --file AllMind.ipa --username SEU_EMAIL --password SENHA_APP_SPECIFIC
```

### Checklist Rápido
- [ ] Upload `.ipa` via Transporter
- [ ] 3+ tamanhos de screenshot
- [ ] URL privacidade
- [ ] Descrição (copiar de TEXTOS_STORES.md)
- [ ] Categoria: Health & Fitness
- [ ] Classificação: 4+
- [ ] Configurar in-app purchases no RevenueCat

---

## 🔍 Verificar Status do Build

**Real-time:**
```powershell
cd C:\dev\gabi_app\mobile
npx eas build:list --status=in-progress
```

**Ver logs de build ativo:**
```powershell
npx eas build:view <BUILD_ID>
```

---

## ❌ Se Build Falhar

### 1. Ver erro completo
```powershell
npx eas build:view --platform android
```

### 2. Limpar cache e tentar novamente
```powershell
npx eas build -p android --profile production --clear-cache
```

### 3. Verificar erros comuns

**"Module not found":**
```powershell
cd C:\dev\gabi_app\mobile
rm -rf node_modules
npm install --legacy-peer-deps
```

**"Invalid configuration":**
- Verificar `app.json`
- Verificar `eas.json`

**"Type errors":**
```powershell
npm run typecheck
# Corrigir erros TypeScript antes de buildar
```

---

## ⏱️ Quanto Tempo Leva?

| Etapa | Tempo |
|-------|-------|
| Iniciar build | 30 segundos |
| Build Android (EAS) | 15-30 min ⏳ |
| Build iOS (EAS) | 20-40 min ⏳ |
| Download builds | 2-5 min |
| Criar screenshots | 30 min |
| Preencher Google Play | 30 min |
| Preencher App Store | 45 min |
| **TOTAL HOJE** | **~2-3 horas** |
| | |
| Revisão Google Play | 1-3 dias ⏳ |
| Revisão App Store | 1-7 dias ⏳ |

---

## 📱 Testar Build Antes de Submeter

**Android (.aab):**
```powershell
# Instalar bundletool
# https://github.com/google/bundletool/releases

# Gerar APK a partir do AAB
java -jar bundletool.jar build-apks --bundle=app-release.aab --output=app.apks --mode=universal

# Extrair e instalar
unzip app.apks -d apks
adb install apks/universal.apk
```

**iOS (.ipa):**
- Enviar para TestFlight primeiro
- Ou usar Xcode → Window → Devices → Instalar

---

## 🎯 ORDEM DE EXECUÇÃO HOJE

```
1. ✅ npx eas build -p android --profile production
   ⏱️ Aguardar 15-30 min

2. 📸 Enquanto aguarda: Criar screenshots
   ⏱️ 30 min

3. ✅ npx eas build -p ios --profile production  
   ⏱️ Aguardar 20-40 min

4. 📥 Baixar ambos os builds
   ⏱️ 5 min

5. 🧪 Testar builds em dispositivo (opcional)
   ⏱️ 15 min

6. 🚀 Submeter Google Play
   ⏱️ 30 min

7. 🚀 Submeter App Store
   ⏱️ 45 min

TOTAL: ~3 horas de trabalho ativo
```

---

## 🆘 SUPORTE RÁPIDO

**EAS não funciona:**
- Verificar status: https://status.expo.dev/
- Docs: https://docs.expo.dev/build/introduction/

**Erro de certificado iOS:**
```powershell
npx eas credentials
# Seguir wizard para criar certificados
```

**Erro de bundle ID:**
- Já foi corrigido! Bundle ID agora é `com.vyratech.allmind`

**Build demora muito:**
- Normal! Primeira build pode levar 30-40 min
- Builds seguintes serão mais rápidas (cache)

---

## ✅ ÚLTIMA VERIFICAÇÃO

Antes de iniciar o build:

- [x] Código revisado e corrigido
- [x] URL privacidade configurada (verificar se está online!)
- [x] createTestUser() removido
- [x] Disclaimer médico presente
- [x] Botão Restaurar Compras adicionado
- [ ] Screenshots prontos (ou criar enquanto aguarda build)

---

**🚀 COMANDO PARA COMEÇAR AGORA:**

```powershell
cd C:\dev\gabi_app\mobile
npx eas build -p android --profile production
```

Boa sorte! 💪
