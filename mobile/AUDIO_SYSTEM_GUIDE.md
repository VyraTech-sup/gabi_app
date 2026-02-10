# Sistema de Áudios - Guia de Uso

## 📋 Visão Geral

O sistema de áudios foi refatorado para ser **100% dinâmico e escalável**. Agora você pode adicionar novos áudios sem alterar código, apenas configurando arquivos.

## 🎯 Arquivos Principais

### 1. **Biblioteca de Áudios** (`mobile/data/audioLibrary.ts`)
Centraliza toda a configuração dos áudios.

### 2. **Tela de Biblioteca** (`mobile/screens/Library/AudioLibraryScreen.tsx`)
Exibe os áudios disponíveis em grid.

### 3. **Player de Áudio** (`mobile/screens/MentalRecording/AudioPlayerScreen.tsx`)
Reproduz os áudios com controles e suporte a background.

---

## ✅ Áudios Ativos (Lista Oficial)

| Ordem | Título | Arquivo | Status |
|-------|--------|---------|--------|
| 1 | Vença o Medo de Errar | `venca_medo_errar.opus` | ⏸️ Inativo (arquivo não existe) |
| 2 | Ative Fé e Autocura | `ativefeeautocura.mp3.opus` | ✅ Ativo |
| 3 | Elimine a Insônia | `elimineainsonia.mp3.opus` | ✅ Ativo |
| 4 | Vença a Ansiedade | `venca_ansiedade.opus` | ⏸️ Inativo (arquivo não existe) |
| 5 | Se Abra Para Mudanças | `seabraparamudanças.mp3.mp4` | ✅ Ativo |
| 6 | Ative a Felicidade | `ativeafelicidade.mp3.m4a` | ✅ Ativo |
| 7 | Fortaleça a Autoconfiança | `fortaleçaaautoconfiança.mp3.wav` | ✅ Ativo |
| 8 | Acredite em Você | `acredite_em_voce.opus` | ⏸️ Inativo (arquivo não existe) |

---

## 🚀 Como Adicionar um Novo Áudio

### Passo 1: Adicionar o Arquivo
Coloque o arquivo de áudio na pasta:
```
mobile/assets/
```

**Exemplo:** `venca_medo_errar.opus`

### Passo 2: Configurar no Sistema
Edite `mobile/data/audioLibrary.ts`:

#### 2.1 - Adicionar na lista `AUDIO_LIBRARY`:
```typescript
{
  id: '9',  // Próximo ID disponível
  title: 'Novo Áudio Incrível',
  fileName: 'novo_audio.opus',  // Nome EXATO do arquivo
  order: 9,  // Ordem de exibição
  active: true,  // true = visível, false = oculto
  description: 'Descrição do áudio'
}
```

#### 2.2 - Adicionar o require na função `getAudioSource`:
```typescript
export function getAudioSource(fileName: string): any {
  const audioSources: { [key: string]: any } = {
    // ... áudios existentes ...
    'novo_audio.opus': require('../assets/novo_audio.opus'),
  };
  
  return audioSources[fileName] || null;
}
```

### Passo 3: Pronto!
O áudio aparecerá automaticamente na biblioteca. ✨

---

## 🎮 Funcionalidades do Player

### Controles
- ▶️ **Play/Pause**
- ⏪ **Voltar 10 segundos**
- ⏩ **Avançar 10 segundos**
- 📊 **Barra de progresso**
- ⏱️ **Tempo atual e total**

### Background Audio
O player está configurado para:
- ✅ Continuar tocando com tela bloqueada
- ✅ Tocar em segundo plano
- ✅ Exibir controles no sistema operacional
- ✅ Ignorar modo silencioso (iOS)

---

## 🔧 Estrutura de Dados

### Interface AudioItem
```typescript
interface AudioItem {
  id: string;              // ID único
  title: string;           // Título exibido
  fileName: string;        // Nome do arquivo em assets/
  order: number;           // Ordem de exibição
  active: boolean;         // Visível ou não
  description?: string;    // Descrição opcional
}
```

### Funções Utilitárias

#### `getActiveAudios()`
Retorna apenas áudios ativos, ordenados por `order`.

```typescript
const audios = getActiveAudios();
// [{ id: '2', title: 'Ative Fé e Autocura', ... }, ...]
```

#### `getAudioById(id)`
Busca um áudio específico pelo ID.

```typescript
const audio = getAudioById('2');
// { id: '2', title: 'Ative Fé e Autocura', ... }
```

#### `getAudioSource(fileName)`
Retorna o require() do arquivo de áudio.

```typescript
const source = getAudioSource('ativefeeautocura.mp3.opus');
// require('../assets/ativefeeautocura.mp3.opus')
```

#### `audioFileExists(fileName)`
Verifica se o arquivo existe.

```typescript
const exists = audioFileExists('novo_audio.opus');
// true ou false
```

---

## 🧹 Limpeza Realizada

### Removidos
- ❌ Áudios hardcoded no `AudioPlayerScreen`
- ❌ Meditações genéricas do `mockData.ts`
- ❌ Referências a arquivos antigos que não existem mais

### Mantidos
- ✅ `mockData.ts` para programas/episódios (uso futuro)
- ✅ `mockMusicTracks` para aba de músicas

---

## 📱 Navegação

Para abrir a biblioteca de áudios:
```typescript
navigation.navigate('AudioLibrary');
```

Para abrir o player de um áudio:
```typescript
navigation.navigate('AudioPlayer', { audioId: '2' });
```

---

## 🎨 Interface da Biblioteca

### Layout
- Grid de 2 colunas
- Cards com:
  - Ícone de play
  - Ordem numérica (badge)
  - Título
  - Descrição

### Cores
- Background: `theme.colors.background`
- Cards: `rgba(74, 106, 124, 0.3)`
- Texto: Branco com opacidade variável

---

## ⚠️ Importante

1. **Nome do arquivo deve ser EXATO**
   - Maiúsculas/minúsculas importam
   - Extensão completa necessária
   - Caracteres especiais preservados

2. **Ordem dos áudios**
   - Use a propriedade `order` para definir sequência
   - Não precisa ser sequencial (1, 2, 3...)
   - Pode ter gaps (1, 5, 10...)

3. **Ativar/Desativar**
   - `active: true` = áudio visível
   - `active: false` = áudio oculto (útil para testes)

4. **IDs únicos**
   - Cada áudio deve ter um ID diferente
   - Use strings: '1', '2', '3'...

---

## 🔮 Próximos Passos Sugeridos

1. **Integração com API**
   - Buscar lista de áudios do backend
   - Armazenar em cache local

2. **Download Offline**
   - Permitir baixar áudios para uso offline
   - Gerenciar armazenamento local

3. **Progresso do Usuário**
   - Salvar posição de reprodução
   - Marcar áudios como "ouvidos"

4. **Favoritos**
   - Permitir marcar áudios favoritos
   - Lista separada de favoritos

---

## 📞 Suporte

Se tiver dúvidas ou problemas:
1. Verifique se o arquivo existe em `mobile/assets/`
2. Confirme se o nome no `fileName` está correto
3. Valide se adicionou o `require()` em `getAudioSource()`
4. Confira os logs do console para erros

---

**Última atualização:** 10/02/2026
**Versão:** 2.0 - Sistema Dinâmico
