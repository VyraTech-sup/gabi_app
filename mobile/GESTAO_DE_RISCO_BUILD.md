# Gestão de risco – build EAS (All Mind)

Antes de rodar `eas build`, use este documento e o script de pré-build para reduzir falhas e não gastar cota à toa.

---

## 1. Riscos mapeados e mitigação

| # | Risco | Impacto | Probabilidade | Mitigação | Status |
|---|--------|---------|---------------|------------|--------|
| 1 | **Entry point (`index.js`) não encontrado no EAS** | Build falha na fase "Bundle JavaScript" | Média | Rodar build sempre de `mobile/`; não ter `eas.json` na raiz do repo (evitar upload da raiz). Script verifica existência de `index.js`. | ✅ eas.json raiz renomeado |
| 2 | **URL de OTA updates apontando para projeto errado** | Updates não entregam ou vão para app errado | Alta | `app.json` → `updates.url` deve usar o mesmo `projectId` do `extra.eas.projectId`. | ✅ Corrigido para 7f055645... |
| 3 | **Variáveis de ambiente ausentes no EAS** | RevenueCat não configura; app pode quebrar se depender delas | Média | Definir no dashboard EAS (Project → Secrets) `EXPO_PUBLIC_REVENUE_CAT_IOS_KEY` e `EXPO_PUBLIC_REVENUE_CAT_ANDROID_KEY` para o profile usado. App já trata key ausente (não quebra). | ⚠️ Configurar no EAS se usar RevenueCat |
| 4 | **Assets referenciados em `app.json` inexistentes** | Build ou prebuild falha | Média | Script verifica `icon.png`, `splash-icon.png`, `adaptive-icon.png`, `favicon.png` em `./assets/`. | Script pré-build |
| 5 | **Bundle Metro falha (imports quebrados, syntax)** | Build falha na fase "Bundle JavaScript" | Média | Rodar localmente `npx expo export --platform android` antes de subir. Script pode rodar isso. | Script pré-build |
| 6 | **`package.json` sem `main` ou `main` errado** | Metro não acha o entry point | Baixa | Manter `"main": "index.js"`. Script verifica. | Script pré-build |
| 7 | **Tamanho do archive (upload lento, timeout)** | Build demora ou falha no upload | Média | `.easignore` em `mobile/` exclui `builds/`, `assets/backup/`, `*.md`. Não subir raiz do monorepo. | ✅ .easignore configurado |
| 8 | **Conta/projeto errado (vyratech vs gabiartz)** | Build gasta cota da conta errada ou gera AAB incompatível | Alta | Rodar sempre de `mobile/` com `eas login` na conta certa. `app.json` com `owner` e `extra.eas.projectId` corretos. | ✅ owner: gabiartz, projectId alinhado |
| 9 | **android.versionCode no app.json com remote version** | Aviso no build; possível confusão de versão | Baixa | Remover `versionCode` do `app.json` se version source for "remote". | Opcional |
| 10 | **TypeScript/ESLint com erro** | Pode indicar código que quebra em runtime | Média | Rodar `npm run typecheck` e `npm run lint` antes do build. Script pode incluir. | Script pré-build |

---

## 2. Checklist manual antes do build

- [ ] Estou na pasta `C:\dev\gabi_app\mobile` (não na raiz do repo).
- [ ] `eas whoami` mostra a conta correta (ex.: gabiartz).
- [ ] Rodei o script de pré-build: `node scripts/pre-build-check.js` (ou `npm run prebuild-check`).
- [ ] `npx expo export --platform android` concluiu sem erro.
- [ ] Se usar RevenueCat em produção: variáveis no EAS (production) estão definidas.
- [ ] Não há `eas.json` na raiz do repositório (ou está renomeado, ex.: `eas.monorepo.json`).

---

## 3. Quando algo der errado

1. **Build falhou na "Bundle JavaScript"**  
   Abra o log do build no expo.dev, expanda essa fase e copie a primeira linha de erro (ex.: "Unable to resolve module..."). Corrija o módulo/arquivo indicado e rode o script de pré-build de novo antes do próximo build.

2. **Build falhou em "Install dependencies"**  
   Verifique `package.json` e lockfile (package-lock.json ou yarn.lock) no repo; teste localmente `npm ci` ou `yarn install` na pasta `mobile/`.

3. **Upload muito lento ou timeout**  
   Revise `.easignore` para excluir mais pastas (ex.: áudios pesados em dev); confirme que o build está sendo disparado de `mobile/` e não da raiz.

4. **AAB rejeitado na Play Store (assinatura)**  
   Use sempre o AAB gerado pelo EAS (não assinar localmente com outra chave). Se mudou de conta (Gabiartz), pode ser necessário pedir reset da chave de upload no Play Console.

---

## 4. Script de pré-build

Execute antes de cada build (de uma das pastas):

```bash
# De dentro de mobile/:
cd C:\dev\gabi_app\mobile
node scripts/pre-build-check.js

# Ou da raiz do repo:
cd C:\dev\gabi_app
npm run prebuild-check
```

Se tudo passar, pode rodar `eas build -p android --profile production` com mais segurança.
