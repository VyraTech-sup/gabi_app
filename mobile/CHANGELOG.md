# 📏 Changelog - All Mind Mobile App

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

---

## [1.0.0] - 2026-01-11

### 🎵 Adicionado - Sistema de Áudio Real

#### PlayerScreen.tsx
- **FEAT:** Integração completa com expo-av para reprodução de áudio
- **FEAT:** Carregamento automático de áudio ao abrir tela
- **FEAT:** Controles funcionais: play, pause, skip forward (15s), skip backward (15s)
- **FEAT:** Barra de progresso interativa com toque para buscar posição
- **FEAT:** Timer em tempo real mostrando posição atual e duração total
- **FEAT:** Estados de loading e error com feedback visual
- **FEAT:** Cleanup automático ao desmontar componente
- **FEAT:** Configuração de áudio para background playback (iOS/Android)
- **FEAT:** Desabilita botões quando não há áudio ou está carregando

#### Types (index.ts)
- **FEAT:** Adicionado campo `audioSource?: any` em `Program` interface
- **FEAT:** Adicionado campo `audioSource?: any` em `Episode` interface
- **DEPRECATE:** Campo `audioUrl` mantido para compatibilidade mas marcado como deprecated

#### MockData (mockData.ts)
- **FEAT:** Programa #1 "Fé e Autocura" agora com áudio real (FÉ E AUTOCURA.opus)
- **FEAT:** Programa #2 "Áudio para Insônia" agora com áudio real (ÁUDIO PARA INSÔNIA.opus)
- **FEAT:** Episódio #1 vinculado ao arquivo ÁUDIO PARA INSÔNIA.opus
- **FEAT:** Episódio #2 vinculado ao arquivo FÉ E AUTOCURA.opus
- **CHANGE:** Títulos atualizados para corresponder aos arquivos de áudio reais

#### Documentação
- **DOCS:** Criado AUDIO_IMPLEMENTATION.md com documentação completa
- **DOCS:** Criado FINALIZATION_SUMMARY.md com sumário executivo
- **DOCS:** Atualizado README.md com seção de Sistema de Áudio
- **DOCS:** Criado CHANGELOG.md (este arquivo)

### 📊 Estatísticas
- **Arquivos modificados:** 3
- **Arquivos criados:** 3
- **Linhas adicionadas:** ~150
- **Erros TypeScript:** 0
- **Funcionalidades novas:** 9

---

## [0.9.0] - 2026-01-10

### 🎨 Adicionado - UI e Estrutura Completa

#### Componentes Criados
- **FEAT:** Button.tsx com 4 variantes (primary, secondary, outline, ghost)
- **FEAT:** Input.tsx com suporte a ícones
- **FEAT:** ProgramCard.tsx (versões vertical e horizontal)
- **FEAT:** CategoryCard.tsx com cores customizáveis
- **FEAT:** Loading.tsx para estados de carregamento
- **FEAT:** EmptyState.tsx para estados vazios

#### Telas Criadas (15 telas)
- **FEAT:** OnboardingScreen (4 slides)
- **FEAT:** LoginScreen com OAuth
- **FEAT:** RegisterScreen
- **FEAT:** HomeScreen com dashboard
- **FEAT:** ExploreScreen com busca e filtros
- **FEAT:** LibraryScreen (3 abas)
- **FEAT:** ProfileScreen com estatísticas
- **FEAT:** ProgramDetailScreen
- **FEAT:** PlayerScreen (UI mockada)
- **FEAT:** NotificationsScreen
- **FEAT:** SubscriptionScreen com paywall
- **FEAT:** SettingsScreen completo
- **FEAT:** ProgramsScreen com lista geral

#### Navegação
- **FEAT:** RootNavigator com fluxo onboarding → auth → app
- **FEAT:** MainTabNavigator com 4 abas (Home, Explore, Library, Profile)
- **FEAT:** Navegação modal para detalhes e player

#### Sistema de Tema
- **FEAT:** Criado styles/theme.ts com design system completo
- **FEAT:** Paleta All Mind (cores terrosas: #8B7355, #C9A885)
- **FEAT:** Tipografia com 9 tamanhos
- **FEAT:** Sistema de espaçamento (xs → 5xl)
- **FEAT:** Sombras pré-definidas (sm, md, lg)
- **FEAT:** Border radius consistente

#### Dados Mock
- **FEAT:** 8 programas completos em mockData.ts
- **FEAT:** 3 episódios de exemplo
- **FEAT:** 7 categorias com ícones e cores
- **FEAT:** 3 notificações
- **FEAT:** Funções helper para filtrar dados

#### TypeScript
- **FEAT:** Tipos completos para User, Program, Episode, Notification
- **FEAT:** 0 erros de compilação

---

## Formato do Changelog

Este changelog segue os princípios de [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/).

### Tipos de Mudanças
- **FEAT** - Nova funcionalidade
- **FIX** - Correção de bug
- **CHANGE** - Mudança em funcionalidade existente
- **DEPRECATE** - Funcionalidade marcada como obsoleta
- **REMOVE** - Funcionalidade removida
- **SECURITY** - Correção de vulnerabilidade
- **DOCS** - Mudanças em documentação
- **PERF** - Melhoria de performance

---

_Última atualização: 11 de Janeiro de 2026_
