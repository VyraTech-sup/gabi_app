# Problemas possíveis em relação ao EAS Build

Lista de tudo que pode falhar ou gerar aviso no EAS, com status e como corrigir.

---

## 1. Já corrigidos / mitigados

| Problema | O que era | Status |
|----------|------------|--------|
| **runtimeVersion com policy no bare** | `"runtimeVersion": {"policy": "appVersion"}` não é suportado quando existe pasta `android/`. | ✅ Corrigido: `"runtimeVersion": "1.0.0"` (string fixa). |
| **Entry point (index.js)** | EAS não acha o entry do Metro. | ✅ Verificado pelo pré-build; build sempre de `mobile/`. |
| **projectId / updates.url** | OTA updates apontando para projeto errado. | ✅ `extra.eas.projectId` e `updates.url` com `7f055645-...`. |
| **owner / conta** | Build na conta errada ou AAB incompatível. | ✅ `owner: gabiartz`; rodar `eas whoami` antes. |
| **Assets obrigatórios** | icon, splash, adaptive-icon, favicon. | ✅ Verificado pelo pré-build. |
| **eas.json na raiz** | Upload da raiz do monorepo, index.js não encontrado. | ✅ Nenhum `eas.json` na raiz. |
| **.easignore** | Archive gigante, upload lento/timeout. | ✅ Exclui `builds/`, `assets/backup/`, `*.md`. |

---

## 2. Avisos atuais (não impedem o build)

| Problema | Mensagem / causa | Ação recomendada |
|----------|-------------------|-------------------|
| **versionCode no app.json com appVersionSource remote** | EAS diz que `android.versionCode` no app config é ignorado quando version source é "remote". | Opcional: remover `"versionCode": 1` do `app.json` para evitar confusão. EAS usa o valor remoto (auto-increment) mesmo. |
| **android.package no app.json ignorado** | "Specified value for android.package in app.json is ignored because an android directory was detected." | Normal no bare: o que vale é o `applicationId` em `android/app/build.gradle`. Não é erro. |
| **Archive 1.1 GB** | "Your project archive is 1.1 GB. You can reduce its size...". | Melhorar `.easignore`: ver secção 4 abaixo. |
| **Variáveis de ambiente** | "No environment variables with visibility Plain text and Sensitive found for production". | Só importa se o app usar (ex.: RevenueCat). Se usar, configurar Secrets no dashboard EAS. |

---

## 3. Riscos que podem causar falha no próximo build

| # | Risco | Onde verificar | Mitigação |
|---|--------|----------------|------------|
| 1 | **runtimeVersion desatualizado** | `app.json` → `runtimeVersion` | Ao subir versão do app (ex.: 1.1.0), alterar também para `"1.1.0"` para OTA bater certo. |
| 2 | **Bundle JavaScript (Metro)** | Imports quebrados, syntax, módulo não encontrado. | Rodar `npx expo export --platform android` antes do build. |
| 3 | **Install dependencies** | `package.json` / lockfile incompatível ou corrupto. | Testar localmente `npm ci` em `mobile/`. |
| 4 | **Credenciais Android** | Keystore/upload key errada ou expirada. | EAS usa "remote" (Expo); se mudar para local, configurar em `eas credentials`. |
| 5 | **RevenueCat em produção** | App chama RevenueCat sem key. | Definir no EAS (Secrets) `EXPO_PUBLIC_REVENUE_CAT_ANDROID_KEY` (e iOS se for o caso). |
| 6 | **Conflito package / applicationId** | `app.json` diz um package, `build.gradle` outro. | Manter iguais: `com.vyratech.allmind` em ambos (EAS usa o do native). |
| 7 | **Falta de índice (index.js)** | Apagar ou mover `index.js`. | Pré-build verifica; não apagar. |
| 8 | **package.json sem "main": "index.js"** | Metro não acha o entry. | Pré-build verifica. |

---

## 4. Reduzir tamanho do archive (evitar timeout de upload)

O archive estava **1.1 GB**. O `.easignore` já exclui:

- `builds/`, `assets/backup/`, `*.md`

Você pode adicionar (se não forem necessários no build):

- `assets/onboarding/*.mp4` (vídeos grandes) ou pasta inteira se não forem usados no build
- `dist/` (saída do `expo export` local)
- Outras pastas de arte/backup/áudio pesado

Exemplo de linhas para `.easignore`:

```
dist/
# Opcional, só se onboarding não for usado no build:
# assets/onboarding/
```

---

## 5. Bare workflow – regras específicas

Por existir a pasta `android/` (e possivelmente `ios/`), o projeto é **bare workflow**. Nesse modo:

- **runtimeVersion**: tem de ser **string fixa** (ex.: `"1.0.0"`). Não usar `{"policy": "appVersion"}`.
- **versionCode (Android)**: EAS pode ignorar o do `app.json` e usar o valor remoto (auto-increment). O que vale em runtime é o do `android/app/build.gradle` até o EAS sobrescrever.
- **package / applicationId**: o que vale é o de `android/app/build.gradle` (`applicationId`), não o de `app.json`.
- **Build sempre de `mobile/`**: não rodar `eas build` da raiz do monorepo.

---

## 6. Checklist rápido antes de cada build

- [ ] Estou em `mobile/` (não na raiz).
- [ ] `eas whoami` = gabiartz.
- [ ] `node scripts/pre-build-check.js` passou.
- [ ] `npx expo export --platform android` passou (recomendado).
- [ ] Se subiu a versão do app, atualizei `runtimeVersion` em `app.json` para o mesmo valor (ex.: 1.0.0 → 1.1.0).
- [ ] Se usar RevenueCat em produção: secrets configurados no EAS para o profile usado.

---

## 7. Referências

- [EAS Build – Build configuration](https://docs.expo.dev/build-reference/build-configuration)
- [EAS Build – Troubleshooting](https://docs.expo.dev/build-reference/troubleshooting)
- [Runtime versions (OTA)](https://docs.expo.dev/eas-update/runtime-versions)
- Doc local: `GESTAO_DE_RISCO_BUILD.md`
- **Gestão de risco por ponto:** `GESTAO_RISCO_EAS_POR_PONTO.md` (cada fator de sucesso do build com risco e mitigação)
