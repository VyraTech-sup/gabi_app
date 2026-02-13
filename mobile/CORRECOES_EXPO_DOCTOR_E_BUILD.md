# Correções após falha do build (Expo Doctor + index.js)

Resumo do que foi corrigido e o que você precisa fazer para o próximo build passar.

---

## 1. Erro crítico: "Unable to resolve module .../index.js"

**Causa:** O build foi disparado **da raiz do repositório** (`c:\dev\gabi_app`) em vez de **de dentro de `mobile/`**.  
Quando o build sobe da raiz, o archive contém a pasta `mobile/` como subpasta; no servidor EAS o Metro roda com cwd `.../build/mobile/` mas o conteúdo enviado pode não ter `index.js` na raiz desse contexto (ou o archive é montado de forma que o entry point não está onde o Metro espera).

**O que fazer:**  
**Sempre rodar o build de dentro de `mobile/`:**

```powershell
cd c:\dev\gabi_app\mobile
eas build -p android --profile production
```

Não rode `eas build` da raiz (`c:\dev\gabi_app`). Assim o archive terá `index.js`, `App.tsx`, `package.json` etc. na raiz e o Metro acha o entry.

---

## 2. Expo Doctor – correções aplicadas

### 2.1 Schema do app.json (corrigido)

- Removidos campos que o schema do Expo não aceita no nível atual:
  - `privacy`, `privacyPolicy` (movido o link para `extra.privacyPolicyUrl`)
  - Em `android`: `minSdkVersion`, `targetSdkVersion`, `compileSdkVersion` (no bare workflow isso já está em `android/app/build.gradle`)

### 2.2 Canal EAS Update (corrigido)

- Em `eas.json` foram adicionados `channel` em cada profile:
  - `development` → `"channel": "development"`
  - `preview` → `"channel": "preview"`
  - `production` → `"channel": "production"`  
Assim o build não fica com "channel is not specified" e o EAS Update funciona.

### 2.3 Lock file (corrigido)

- Foi gerado `package-lock.json` em `mobile/` com `npm install --legacy-peer-deps --package-lock-only`.  
O Expo Doctor deixa de reclamar de "No lock file detected".

### 2.4 .easignore – bare workflow (corrigido)

- Adicionado em `mobile/.easignore`: `android/.gradle/`  
(evita enviar cache do Gradle e alinha com a recomendação do expo doctor para projetos não-CNG.)

---

## 3. Avisos que podem continuar (opcional)

### 3.1 "Packages match versions required by Expo SDK"

- Expo sugere: `react-native-web` ^0.21.0 (você tem 0.19.13) e `typescript` ~5.9.2 (você tem 5.3.3).  
- Para alinhar (opcional):  
  `npx expo install --check` e depois instalar as versões sugeridas.  
- Se houver conflito de peer deps, pode ser necessário `npm install --legacy-peer-deps` após ajustar versões.

### 3.2 "App config fields that may not be synced in a non-CNG project" (1 check que ainda falha)

- É **esperado** em bare workflow: você tem pasta `android/` e também config em `app.json`. O doctor avisa que o EAS não vai “sincronizar” essas props (orientation, icon, splash, etc.) porque o projeto já é nativo – e está tudo bem.  
- **Não** adicione `/android` ao `.easignore` (isso é para quem usa CNG/Prebuild e quer que o EAS recrie a pasta android). No seu caso você **não** usa CNG; quer manter o `android/` atual.  
- Já foi adicionado apenas `android/.gradle/` no `.easignore`.  
- Esse 1 check que ainda falha no doctor pode ser ignorado no bare workflow.

---

## 4. Ordem recomendada antes do próximo build

1. **Sempre de dentro de `mobile/`:**
   ```powershell
   cd c:\dev\gabi_app\mobile
   ```
2. `eas whoami` → **gabiartz**
3. `node scripts/pre-build-check.js` → todos os checks passando
4. `npx expo export --platform android` → validar bundle
5. `eas build -p android --profile production`

---

## 5. Resumo

| Item                         | Status   |
|-----------------------------|----------|
| Rodar build de `mobile/`    | **Você** (sempre) |
| app.json schema             | Corrigido |
| eas.json channels           | Corrigido |
| package-lock.json em mobile | Corrigido |
| .easignore android/.gradle  | Corrigido |
| Versões de pacotes (expo)   | Opcional |

O ponto que mais impacta o sucesso do build é **rodar `eas build` de dentro de `mobile/`** para o archive conter `index.js` na raiz e o Metro resolver o módulo corretamente.
