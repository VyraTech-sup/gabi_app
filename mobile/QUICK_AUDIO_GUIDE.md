# 🚀 Guia Rápido - Sistema de Áudio All Mind

## ⚡ Início Rápido

### Testar o Player de Áudio

1. **Iniciar o app:**
   ```bash
   cd mobile
   npm start
   ```

2. **Navegar até o player:**
   - Abra a tela Home
   - Toque no card "Fé e Autocura" OU "Áudio para Insônia"
   - Pressione o botão de Play
   - O PlayerScreen abre com o áudio carregado

3. **Usar os controles:**
   - **▶️ Play** - Inicia reprodução
   - **⏸️ Pause** - Pausa reprodução
   - **⏮️ -15s** - Retrocede 15 segundos
   - **⏭️ +15s** - Avança 15 segundos
   - **Barra de progresso** - Toque em qualquer ponto para buscar

---

## 📁 Arquivos de Áudio Disponíveis

| Arquivo | Localização | Duração | Programa Vinculado |
|---------|-------------|---------|-------------------|
| FÉ E AUTOCURA.opus | `mobile/assets/` | 15 min | Programa #1 |
| ÁUDIO PARA INSÔNIA.opus | `mobile/assets/` | 60 min | Programa #2 |

---

## 🎯 Como Adicionar Novos Áudios

### Passo 1: Adicionar arquivo
Copie seu arquivo de áudio para `mobile/assets/`:
```bash
cp seu-audio.opus mobile/assets/
```

### Passo 2: Atualizar mockData.ts
```typescript
// Em mobile/data/mockData.ts

export const mockPrograms: Program[] = [
  {
    id: '3',
    title: 'Seu Novo Programa',
    // ... outros campos
    audioSource: require('../assets/seu-audio.opus'),
    duration: 1200, // duração em segundos
  },
  // ...
];
```

### Passo 3: Testar
Navegue até o programa e pressione play!

---

## 🔧 Formatos Suportados

| Formato | Compatibilidade | Recomendado |
|---------|-----------------|-------------|
| .opus | ✅ iOS/Android | ⭐ Melhor compressão |
| .mp3 | ✅ iOS/Android | ⭐ Máxima compatibilidade |
| .m4a | ✅ iOS/Android | ✅ Boa qualidade |
| .aac | ✅ iOS/Android | ✅ Streaming |

---

## 🐛 Solução de Problemas

### Áudio não carrega
**Sintoma:** Tela do player mostra loading infinito

**Soluções:**
1. Verifique se `audioSource` está definido no mockData
2. Confirme que o arquivo existe em `mobile/assets/`
3. Verifique o caminho do require()
4. Reinicie o Metro bundler: `npm start --reset-cache`

### Erro ao tocar play
**Sintoma:** Alert "Erro ao carregar áudio"

**Soluções:**
1. Verifique formato do arquivo (deve ser .opus, .mp3, .m4a ou .aac)
2. Verifique permissões de áudio no dispositivo
3. Teste em dispositivo real (emulador pode ter limitações)

### Progresso não atualiza
**Sintoma:** Barra de progresso estática

**Soluções:**
1. Verifique se `onPlaybackStatusUpdate` está sendo chamado
2. Confirme que `duration` não é 0 ou undefined
3. Reinicie o app

---

## 📱 Testando em Dispositivos

### Android (via Expo Go)
```bash
npm run android
```
Ou escaneie o QR code com Expo Go app.

### iOS (via Expo Go)
```bash
npm run ios
```
Ou escaneie o QR code com Câmera nativa.

### Dicas:
- **Background playback** funciona em dispositivo real
- **Fones de ouvido** melhoram a experiência
- **Modo silencioso** (iOS) - áudio toca normalmente

---

## 🎨 Personalizando o Player

### Mudar cores
Edite `mobile/styles/theme.ts`:
```typescript
export const theme = {
  colors: {
    primary: '#SUA_COR',     // Cor dos botões e progresso
    background: '#SUA_COR',   // Fundo da tela
    // ...
  },
};
```

### Mudar tempo de skip
Edite `mobile/screens/Player/PlayerScreen.tsx`:
```typescript
const skipForward = async () => {
  // Mudar 15000 para outro valor (em milissegundos)
  const newPosition = Math.min(status.positionMillis + 30000, ...); // 30s
};
```

---

## 📚 Referências

- **expo-av Docs:** https://docs.expo.dev/versions/latest/sdk/audio/
- **Implementação detalhada:** [AUDIO_IMPLEMENTATION.md](./AUDIO_IMPLEMENTATION.md)
- **Changelog completo:** [CHANGELOG.md](./CHANGELOG.md)
- **Documentação geral:** [README.md](./README.md)

---

## 💡 Dicas Avançadas

### Streaming de URLs remotas
```typescript
// Em vez de require(), use URL:
audioSource: { uri: 'https://exemplo.com/audio.mp3' }
```

### Habilitar loop
```typescript
await Audio.Sound.createAsync(
  audioSource,
  { shouldPlay: false, isLooping: true }  // ✨ Loop enabled
);
```

### Ajustar volume
```typescript
await sound.setVolumeAsync(0.5); // 50% volume
```

### Obter informações de metadata
```typescript
const status = await sound.getStatusAsync();
console.log(status.uri, status.durationMillis);
```

---

## ✅ Checklist de Teste

Antes de fazer deploy, teste:

- [ ] Play/pause funciona
- [ ] Skip forward/backward funciona
- [ ] Barra de progresso é interativa
- [ ] Timer atualiza em tempo real
- [ ] Áudio termina e reseta para início
- [ ] Cleanup ocorre ao voltar para tela anterior
- [ ] Loading state aparece durante carregamento
- [ ] Error state aparece em caso de falha
- [ ] Background playback funciona (dispositivo real)
- [ ] Modo silencioso permite reprodução (iOS)

---

## 🆘 Suporte

Se encontrar problemas:

1. Verifique [AUDIO_IMPLEMENTATION.md](./AUDIO_IMPLEMENTATION.md)
2. Consulte [expo-av docs](https://docs.expo.dev/versions/latest/sdk/audio/)
3. Abra issue no repositório

---

**Versão:** 1.0.0  
**Última atualização:** 11/01/2026  

🎵 **Boa audição!**
