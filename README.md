# All Mind Mobile App

**Aplicativo mobile exclusivo para Android e iOS**

## 📱 Sobre o Projeto

Este é um aplicativo React Native desenvolvido com Expo para plataformas móveis (Android e iOS). O projeto foi convertido para ser **100% mobile**, removendo completamente a versão web.

## 🏗️ Estrutura do Projeto

```
gabi_app/
├── mobile/              # Aplicativo React Native (código-fonte principal)
├── server/              # Backend API (tRPC, Express)
├── shared/              # Código compartilhado entre mobile e server
├── android/             # Configurações nativas Android
├── drizzle/             # Database schema e migrations
└── expo/                # Configurações base do Expo
```

## 🚀 Como Executar

### Requisitos
- Node.js 18+
- npm ou yarn
- Expo CLI
- Android Studio (para Android) ou Xcode (para iOS/macOS)

### Instalação

```bash
# Instalar dependências da raiz
npm install

# Instalar dependências do mobile
cd mobile
npm install
```

### Executar o App

```bash
cd mobile
npm start
```

Então:
- Pressione `a` para Android
- Pressione `i` para iOS (apenas macOS)
- Escaneie o QR code com Expo Go

## 📦 Build para Produção

### Android

```bash
cd mobile
eas build -p android --profile production
```

### iOS

```bash
cd mobile
eas build -p ios --profile production
```

## 📋 Documentação

- **[mobile/README.md](mobile/README.md)** - Documentação técnica completa do app
- **[PUBLICATION_CHECKLIST.md](PUBLICATION_CHECKLIST.md)** - Checklist para publicação nas lojas
- **[EXECUTIVE_PUBLICATION_SUMMARY.md](EXECUTIVE_PUBLICATION_SUMMARY.md)** - Resumo executivo do status de publicação
- **[EXECUTIVE_SUMMARY.md](EXECUTIVE_SUMMARY.md)** - Visão geral do projeto

## ⚠️ Importante

### URLs Obrigatórias para Publicação

Antes de publicar nas lojas, você **DEVE** criar e hospedar:

1. **Privacy Policy** (Política de Privacidade)
   - URL atual: `https://example.com/privacy` (placeholder)
   - Atualizar em: `mobile/screens/Profile/UnlockAlmaSenseScreen.tsx`

2. **Terms of Service** (Termos de Serviço)
   - URL atual: `https://example.com/terms` (placeholder)
   - Atualizar em: `mobile/screens/Profile/UnlockAlmaSenseScreen.tsx`

Essas URLs são **obrigatórias** pela App Store e Google Play Store.

## 🛠️ Tecnologias

- **React Native** - Framework mobile
- **Expo** - Plataforma de desenvolvimento
- **TypeScript** - Linguagem principal
- **React Navigation** - Navegação
- **tRPC** - API type-safe
- **Drizzle ORM** - Database ORM
- **Express** - Backend server

## 🔧 Scripts Disponíveis

```bash
# Mobile (executar dentro de /mobile)
npm start          # Inicia Expo development server
npm run android    # Executa no Android
npm run ios        # Executa no iOS
npm run typecheck  # Verifica tipos TypeScript
npm run lint       # Executa linter
npm run validate   # Typecheck + Lint
```

## 📝 Notas

- Este projeto **não possui mais versão web**
- O servidor (`/server`) é apenas uma API backend para o mobile
- Todas as configurações de build estão em `mobile/eas.json`
- O aplicativo usa Expo managed workflow

## 🚀 Próximos Passos para Publicação

1. ✅ Contratar Apple Developer Program ($99/ano)
2. ✅ Contratar Google Play Developer ($25 taxa única)
3. ✅ Criar e hospedar Privacy Policy e Terms of Service
4. ✅ Capturar screenshots do app em diferentes tamanhos
5. ✅ Configurar In-App Purchases nos consoles
6. ✅ Fazer builds de produção
7. ✅ Submeter para revisão nas lojas

## 📞 Suporte

Para mais informações sobre o projeto, consulte a documentação em `/mobile/README.md`.

---

**Status:** ✅ Pronto para desenvolvimento e publicação mobile
**Última atualização:** Fevereiro 2026
