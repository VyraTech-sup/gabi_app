# Corrigir: SHA diferente do Google (app travando)

Quando o **SHA** (SHA-1 ou SHA-256) do certificado que assina o app **não é o mesmo** que está cadastrado no Google (Play Console, Firebase, Google Sign-In), o app pode travar, não fazer login ou dar erro de "assinatura inválida".

Siga os passos abaixo para **alinhar** o SHA.

---

## 1. Descobrir qual SHA o Google está esperando

Depende de onde está o erro:

- **Google Play Console** – O SHA que importa é o do certificado de **assinatura do app** (o que o usuário final usa). Se você usa **Play App Signing**, esse certificado é o da **própria Google**.
- **Firebase** ou **Google Sign-In** – Eles precisam do SHA do certificado com o qual o **APK/AAB que você instala** foi assinado (em desenvolvimento pode ser debug; em produção é o da Play ou o do EAS).

---

## 2. Obter o SHA do seu app Android (EAS / Expo)

### Opção A: Você já publicou na Play Store e usa Play App Signing

O certificado que vale é o da **Google**. Pegue o SHA assim:

1. Acesse [Google Play Console](https://play.google.com/console).
2. Selecione o app **All Mind**.
3. Vá em **Configuração** (ou **Setup**) → **Integridade do app** (ou **App integrity**) → **Assinatura do app** (ou **App signing**).
4. Na seção **Certificado de assinatura do app da Play** (certificado com que a Play distribui o app), copie:
   - **SHA-1**
   - **SHA-256**

Use **esses** SHAs em todos os lugares que pedirem “certificate fingerprint” (Firebase, APIs do Google, etc.).

### Opção B: Build EAS (ainda não na Play ou quer o SHA do upload)

O app é assinado com o **keystore do EAS** (ou o seu, se configurou um). Para ver o certificado:

1. No terminal, na pasta do app (ex.: `gabi_app/mobile`):
   ```bash
   eas credentials
   ```
2. Escolha **Android** → projeto **All Mind**.
3. Selecione o perfil (ex.: **production**).
4. Opção **Keystore** (ou **View credentials**): o EAS pode mostrar o **SHA-1** e **SHA-256** do keystore usado no build.
5. Se não mostrar, use **Download keystore** e calcule o SHA no seu PC (ver passo 2C).

### Opção C: Calcular SHA a partir do keystore (arquivo .jks ou .keystore)

Se você tem o arquivo `.jks` ou `.keystore`:

```bash
keytool -list -v -keystore seu_arquivo.keystore -alias sua_alias
```

(No Windows pode ser `keytool -list -v -keystore seu_arquivo.jks -alias sua_alias`.)

Na saída, use os valores de **SHA1** e **SHA256** que aparecem.

---

## 3. Onde cadastrar o SHA (para parar de “travar”)

### Firebase

1. [Console Firebase](https://console.firebase.google.com) → seu projeto.
2. **Configurações do projeto** (ícone de engrenagem) → **Configurações do projeto**.
3. Em **Seus apps**, selecione o app **Android** (pacote `com.vyratech.allmind`).
4. Role até **Impressões digitais do certificado SHA**.
5. Clique em **Adicionar impressão digital** e cole:
   - o **SHA-1** e
   - o **SHA-256**
   que você obteve no passo 2 (da Play **ou** do EAS, conforme o caso).
6. Salve.

Se o app usa **Google Sign-In** ou **Firebase Auth**, o SHA **precisa** estar aqui. SHA diferente = erro/travamento.

### Google Play Console (App Signing / integridade)

Aqui você **não** “cadastra” SHA manualmente para a Play; a Play **mostra** o SHA do certificado dela. O que você deve fazer é:

- Usar **o mesmo** certificado (e portanto o mesmo SHA) que a Play usa **ou** que o EAS usa ao gerar o AAB que você envia para a Play.
- Se alguém te pediu “SHA para o Google” e você colocou um SHA de outro certificado (por exemplo, de um build de desenvolvimento), troque pelo SHA correto (da Play ou do build de produção do EAS).

### Outros serviços (RevenueCat, etc.)

Se algum serviço pedir “Android certificate fingerprint” ou “SHA”, use o **mesmo** SHA que você colocou no Firebase (o da Play ou o do build EAS de produção).

---

## 4. Resumo rápido

| Situação | Onde pegar o SHA | Onde colocar |
|----------|------------------|--------------|
| App já na Play com Play App Signing | Play Console → Configuração → Integridade do app → Certificado de assinatura do app da Play | Firebase (e qualquer lugar que peça “SHA do Android”) |
| Só build EAS, ainda não na Play | `eas credentials` → Android → ver/baixar keystore e pegar SHA | Firebase (e onde mais pedir); quando publicar na Play, pode adicionar também o SHA da Play |
| SHA “diferente do Google” / app travando | Use **sempre o mesmo** SHA em todos os lugares: o da Play (produção) ou o do EAS (se for esse o build que você instala) | Firebase + qualquer tela do Google que peça certificado Android |

---

## 5. Depois de alterar o SHA

1. Salve no Firebase (e onde mais você tiver cadastrado).
2. **Baixe de novo o arquivo `google-services.json`** (Firebase → Configurações do projeto → app Android → download) e coloque no projeto se o app usar Firebase.
3. Gere um **novo build** se o SHA que você passou a usar for de outro certificado (por exemplo, antes estava com SHA de debug, agora está com SHA da Play).
4. Teste de novo; o erro de “SHA diferente do Google” deve parar quando o SHA do app e o SHA cadastrado forem os mesmos.

Se você disser em qual tela aparece o erro (Firebase, Play Console, login com Google, etc.), dá para detalhar o passo exato nessa tela.
