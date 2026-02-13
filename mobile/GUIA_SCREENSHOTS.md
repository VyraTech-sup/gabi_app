# 📸 Guia de Screenshots para Stores

## 🎯 Requisitos por Plataforma

### Google Play Store
- **Mínimo**: 2 screenshots
- **Máximo**: 8 screenshots
- **Formato**: JPEG ou PNG 24-bit
- **Orientação**: Retrato ou paisagem
- **Aspect ratio**: 16:9 ou 9:16

**Tamanhos recomendados:**
- Phone: **1080 x 2340px** (9:19.5)
- 7" Tablet: 1200 x 1920px
- 10" Tablet: 1920 x 1200px

### Apple App Store
- **Mínimo**: 1 screenshot por tamanho de tela
- **Formatos**: JPG ou PNG

**Tamanhos obrigatórios:**
- 6.7" Display (iPhone 15 Pro Max): **1290 x 2796px**
- 6.5" Display (iPhone 14 Plus): 1284 x 2778px
- 5.5" Display (iPhone 8 Plus): 1242 x 2208px

---

## 🚀 Como Criar Screenshots de Qualidade

### Método 1: Emulador/Simulador (RECOMENDADO)

#### Android Studio
```bash
# 1. Iniciar emulador com resolução correta
# AVD Manager > Create Virtual Device > Pixel 6 Pro

# 2. No app rodando, pressione:
# Ctrl + S (Windows/Linux)
# Cmd + S (Mac)

# Screenshots salvos em:
# C:\Users\SEU_USUARIO\.android\avd\[DEVICE_NAME].avd\screenshots
```

#### iOS Simulator
```bash
# 1. Iniciar simulador
npx expo run:ios

# 2. Capturar tela:
# Cmd + S

# Screenshots salvos em:
# ~/Desktop
```

### Método 2: Dispositivo Real

#### Android
```bash
# Conectar via USB e rodar:
adb shell screencap -p /sdcard/screenshot.png
adb pull /sdcard/screenshot.png
```

#### iOS
1. Conectar iPhone via cabo
2. Abrir Xcode > Window > Devices and Simulators
3. Selecionar dispositivo > "Take Screenshot"

---

## 🎨 Telas Recomendadas para Capturar

### Prioridade ALTA (incluir sempre):
1. **Home/Tela Principal** - Primeira impressão
2. **Biblioteca de Áudios** - Mostrar conteúdo
3. **Player de Meditação** - Funcionalidade principal
4. **Programas** - Valor agregado

### Prioridade MÉDIA:
5. **Perfil/Progresso** - Engajamento
6. **Tela de Assinatura** - Transparência sobre monetização

### Evite:
- Telas de login/cadastro (genéricas)
- Telas de erro
- Configurações técnicas

---

## ✨ Dicas de Qualidade

### Design
- ✅ Usar dados reais, não "Lorem ipsum"
- ✅ Modo claro (melhor visualização)
- ✅ Barra de status limpa (sem notificações)
- ✅ Alto contraste e cores vibrantes

### Conteúdo
- ✅ Textos legíveis mesmo em thumbnails pequenos
- ✅ Mostrar features únicas do app
- ✅ Variedade de telas (não repetir)

### Técnico
- ✅ Sem recortes ou bordas brancas
- ✅ Resolução nativa (não redimensionar depois)
- ✅ PNG para qualidade máxima

---

## 🛠️ Ferramentas para Otimização

### Adicionar molduras/contexto (opcional)
- **Figma** (gratuito): Templates de app screenshots
- **MockUPhone**: https://mockuphone.com
- **Smartmockups**: https://smartmockups.com

### Compressão (manter qualidade)
- **TinyPNG**: https://tinypng.com
- **ImageOptim** (Mac)
- **Squoosh**: https://squoosh.app

---

## 📋 Checklist de Screenshots

### Antes de capturar:
- [ ] App em versão production (sem DEV mode)
- [ ] Dados de exemplo realistas
- [ ] Bateria cheia e hora limpa (11:11 ou similar)
- [ ] Wi-Fi conectado
- [ ] Modo não-perturbe ativado

### Após capturar:
- [ ] Verificar resolução correta
- [ ] Renomear arquivos de forma organizada
  - `01_home.png`
  - `02_library.png`
  - `03_player.png`
- [ ] Testar visualização em tamanho reduzido
- [ ] Salvar backup em alta resolução

---

## 🎯 Template de Nomes

```
screenshots/
├── android/
│   ├── phone/
│   │   ├── 01_home_1080x2340.png
│   │   ├── 02_library_1080x2340.png
│   │   └── 03_player_1080x2340.png
│   └── tablet/
│       └── ...
└── ios/
    ├── 6.7inch/
    │   ├── 01_home_1290x2796.png
    │   └── ...
    └── 6.5inch/
        └── ...
```

---

## ⚡ Comando Rápido para Redimensionar

Se capturou em tamanho errado:

```bash
# Usando ImageMagick
magick convert input.png -resize 1080x2340! output.png

# Em lote
magick mogrify -resize 1080x2340! *.png
```

---

## 📱 Exemplo de Sequência Ideal (Google Play)

1. **Home** - Logo + "Explore meditações guiadas"
2. **Biblioteca** - Grid de áudios com capas bonitas
3. **Player** - Meditação tocando com timer
4. **Programas** - Programa de 7 dias estruturado
5. **Progresso** - Estatísticas de uso

**Total**: 5 screenshots (suficiente e atraente)

---

## ⚠️ Erros Comuns

❌ Capturar com debug banner visível
❌ Texto muito pequeno
❌ Telas vazias ou com "Nenhum item"
❌ Misturar orientações (retrato + paisagem)
❌ Comprimir demais (pixelização)
❌ Incluir informações sensíveis/pessoais

---

**Dica Final**: As primeiras 2-3 screenshots são as mais importantes - aparecem na busca. Invista tempo nelas!
