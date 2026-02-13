# Gestão de risco EAS – por ponto de sucesso do build

Cada um dos fatores que incorporam o sucesso do build, com risco, mitigação e status.

---

## 1. Pasta (rodar build de `mobile/`)

| Item | Detalhe |
|------|--------|
| **O que é** | O comando `eas build` deve ser executado de dentro de `mobile/`, não da raiz do repo. |
| **Risco** | Se rodar da raiz, o EAS pode enviar o monorepo inteiro; o Metro não acha `index.js` (ele está em `mobile/`) e o build falha na fase "Bundle JavaScript". |
| **Estado atual** | Não existe `eas.json` na raiz (só em `mobile/`), então ao rodar da raiz o EAS pode ainda assim usar config da raiz e enviar contexto errado. |
| **Mitigação** | Sempre `cd mobile` antes de `eas build`. Pré-build não consegue garantir “quem está rodando” – é checklist manual. |
| **Check automatizado** | Script verifica que **não** existe `eas.json` na raiz (assim o build deve ser disparado de `mobile/` com `eas.json` de lá). |
| **Checklist** | [ ] Abri o terminal na pasta `c:\dev\gabi_app\mobile` antes de rodar `eas build`. |

---

## 2. Conta (gabiartz)

| Item | Detalhe |
|------|--------|
| **O que é** | O EAS deve estar logado na conta **gabiartz** (e o projeto apontar para o projeto correto). |
| **Risco** | Build na conta errada gasta cota da conta errada; AAB pode ficar incompatível com a Play/App Store do projeto certo. |
| **Estado atual** | `app.json` tem `owner: "gabiartz"` e `extra.eas.projectId` do projeto Gabiartz. |
| **Mitigação** | Antes do build: `eas whoami` e confirmar que mostra **gabiartz**. Se não, `eas login` e escolher gabiartz. |
| **Check automatizado** | Não (exige rodar `eas whoami`; o script não altera sessão do usuário). |
| **Checklist** | [ ] Rodei `eas whoami` e o resultado é **gabiartz**. |

---

## 3. Entry point (`index.js` + `main`)

| Item | Detalhe |
|------|--------|
| **O que é** | Deve existir `index.js` na raiz de `mobile/` e `package.json` com `"main": "index.js"`. |
| **Risco** | Sem isso o Metro não acha o entry; build falha na fase "Bundle JavaScript". |
| **Estado atual** | `index.js` existe e chama `registerRootComponent(App)`; `package.json` tem `"main": "index.js"`. |
| **Mitigação** | Não remover nem renomear `index.js`; não alterar `main` no `package.json`. |
| **Check automatizado** | Sim. Pré-build verifica existência de `index.js` e `pkg.main === "index.js"`. |
| **Checklist** | [ ] Pré-build passou (inclui este check). |

---

## 4. app.json (projectId, owner, updates.url)

| Item | Detalhe |
|------|--------|
| **O que é** | `extra.eas.projectId` = `7f055645-77e6-4435-88dd-cc7e4f084b45`; `owner` = `gabiartz`; `updates.url` deve conter esse projectId. |
| **Risco** | projectId/owner errados → build no projeto/conta errados; updates.url errada → OTA updates não entregam ou vão para outro app. |
| **Estado atual** | projectId e updates.url corretos; owner = gabiartz. |
| **Mitigação** | Não alterar esses campos ao trocar de conta; ao clonar repo, conferir se projectId/owner/url batem com o projeto EAS correto. |
| **Check automatizado** | Sim. Pré-build verifica projectId, updates.url e owner. |
| **Checklist** | [ ] Pré-build passou (inclui estes checks). |

---

## 5. runtimeVersion (bare = string fixa)

| Item | Detalhe |
|------|--------|
| **O que é** | No bare workflow (existe pasta `android/`), `runtimeVersion` em `app.json` tem de ser uma **string** (ex.: `"1.0.0"`), nunca `{"policy": "appVersion"}`. |
| **Risco** | Com policy no bare, o EAS falha com: "runtime version policies are not supported... You must set your runtime version manually." |
| **Estado atual** | `"runtimeVersion": "1.0.0"` (string). |
| **Mitigação** | Ao subir a versão do app (ex.: 1.1.0), alterar também `runtimeVersion` para `"1.1.0"` para OTA bater com a versão certa. |
| **Check automatizado** | Sim. Pré-build (com pasta `android/`) verifica que é string e não object com policy. |
| **Risco extra** | Se `runtimeVersion` ficar desalinhado de `expo.version`, OTA pode não aplicar em algumas versões instaladas. |
| **Checklist** | [ ] Pré-build passou. [ ] Se mudou a versão do app, atualizei `runtimeVersion` para o mesmo valor. |

---

## 6. Assets obrigatórios

| Item | Detalhe |
|------|--------|
| **O que é** | Arquivos referenciados em `app.json` devem existir em `mobile/assets/`: icon.png, splash-icon.png, adaptive-icon.png, favicon.png. |
| **Risco** | Asset ausente → build ou prebuild pode falhar; ícone/splash quebrados na loja. |
| **Estado atual** | Todos presentes (pré-build verifica). |
| **Mitigação** | Não remover esses arquivos; ao trocar ícones, manter os nomes ou atualizar referências em `app.json`. |
| **Check automatizado** | Sim. Pré-build verifica os quatro assets. |
| **Checklist** | [ ] Pré-build passou (inclui este check). |

---

## 7. eas.json só em mobile/

| Item | Detalhe |
|------|--------|
| **O que é** | Deve existir `eas.json` em `mobile/` e **não** deve existir `eas.json` na raiz do repositório. |
| **Risco** | `eas.json` na raiz → EAS pode interpretar a raiz como projeto, enviar contexto errado e não achar `index.js`. |
| **Estado atual** | `eas.json` só em `mobile/`; raiz sem `eas.json`. |
| **Mitigação** | Se precisar de config EAS na raiz para algo (ex.: monorepo), usar outro nome (ex.: `eas.monorepo.json`). |
| **Check automatizado** | Sim. Pré-build verifica ausência na raiz e existência em `mobile/`. |
| **Checklist** | [ ] Pré-build passou (inclui estes checks). |

---

## 8. Bundle (Metro sem erros)

| Item | Detalhe |
|------|--------|
| **O que é** | O bundle JavaScript deve gerar sem erro (imports resolvidos, sem syntax error, módulos existentes). |
| **Risco** | Build falha na fase "Bundle JavaScript" (ex.: "Unable to resolve module..."). |
| **Estado atual** | Validado com `npx expo export --platform android` (passou). |
| **Mitigação** | Antes de cada build: rodar `npx expo export --platform android`. Se falhar, corrigir o erro indicado (arquivo/módulo) e rodar de novo. |
| **Check automatizado** | Não no pré-build (export leva ~1 min). Pode ser passo opcional ou script separado. |
| **Checklist** | [ ] Rodei `npx expo export --platform android` e concluiu sem erro. |

---

## 9. Dependências (install sem erro)

| Item | Detalhe |
|------|--------|
| **O que é** | `npm install` (ou `npm ci` se houver lockfile) em `mobile/` deve concluir sem erro. |
| **Risco** | Build falha na fase "Install dependencies" (rede, lockfile corrompido, versão de Node incompatível). |
| **Estado atual** | Monorepo: `package-lock.json` na raiz; `mobile/` pode usar dependências da raiz. EAS costuma rodar install a partir de `mobile/`. |
| **Mitigação** | Testar localmente: de `mobile/` rodar `npm install` (ou, se aplicável, `npm ci`). Resolver erros antes do build. |
| **Check automatizado** | Não no pré-build (install demora e altera node_modules). Checklist manual. |
| **Checklist** | [ ] Já rodei `npm install` em `mobile/` recentemente sem erro (ou confio no lockfile da raiz). |

---

## 10. Credenciais Android

| Item | Detalhe |
|------|--------|
| **O que é** | EAS precisa de credenciais Android (keystore/upload key) para assinar o AAB. Podem ser "remote" (Expo guarda) ou "local". |
| **Risco** | Keystore errada ou expirada → build falha na fase de signing ou AAB rejeitado na Play. |
| **Estado atual** | Build anterior usou "Using remote Android credentials" e "Using Keystore from configuration: Build Credentials Ks54suyOCX (default)". |
| **Mitigação** | Manter uso de credenciais remotas no EAS; se mudar para local, configurar em `eas credentials`. Não assinar o AAB localmente com outra chave para subir na Play. |
| **Check automatizado** | Não (credenciais estão no servidor EAS). |
| **Checklist** | [ ] Não alterei credenciais Android no EAS; ou configurei corretamente em `eas credentials` se for local. |

---

## Extras que afetam sucesso/qualidade

| Ponto | Risco | Mitigação |
|-------|--------|-----------|
| **package vs applicationId** | `app.json` tem `android.package`; no bare o que vale é `applicationId` em `android/app/build.gradle`. Se forem diferentes, pode haver confusão (EAS avisa que ignora app.json). | Manter iguais: `com.vyratech.allmind`. Pré-build pode verificar. |
| **RevenueCat em produção** | App chama `Purchases.configure`; sem env vars no EAS, compra/restore pode não funcionar (app não quebra, mas feature não funciona). | Definir no EAS (Secrets) `EXPO_PUBLIC_REVENUE_CAT_ANDROID_KEY` e `EXPO_PUBLIC_REVENUE_CAT_IOS_KEY` para o profile production. |
| **Tamanho do archive** | Archive 1.1 GB → upload lento ou timeout. | `.easignore` com `builds/`, `assets/backup/`, `*.md`; considerar `dist/` e vídeos pesados em `assets/onboarding/` se não forem necessários no build. |
| **versionCode no app.json** | Com `appVersionSource: "remote"`, o EAS ignora `versionCode` do app.json (usa valor remoto). Aviso no build. | Opcional: remover `versionCode` do `app.json` para evitar confusão. |

---

## Resumo – o que o pré-build cobre

- Entry: index.js + main  
- app.json: projectId, updates.url, owner  
- runtimeVersion: string no bare  
- Assets: icon, splash-icon, adaptive-icon, favicon  
- eas.json: só em mobile/, não na raiz  
- App.tsx existe  

## O que é só manual

- Rodar o build de `mobile/`  
- `eas whoami` = gabiartz  
- `npx expo export --platform android` antes do build  
- Dependências (npm install ok)  
- Credenciais EAS  
- RevenueCat secrets se usar em produção  
- Alinhar runtimeVersion ao subir versão do app  

---

## Ordem prática antes de cada build

1. `cd c:\dev\gabi_app\mobile`  
2. `eas whoami` → gabiartz  
3. `node scripts/pre-build-check.js` → todos os checks passando  
4. `npx expo export --platform android` → sem erro  
5. `eas build -p android --profile production`  

Documento relacionado: `EAS_PROBLEMAS_POSSIVEIS.md`.
