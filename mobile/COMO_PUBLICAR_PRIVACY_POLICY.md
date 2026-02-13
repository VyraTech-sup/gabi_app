# 🚀 Como Publicar Política de Privacidade (5 minutos)

## Opções Rápidas (Gratuitas)

### 1. GitHub Pages (RECOMENDADO)
**Mais rápido e profissional**

1. Crie repositório público: `allmind-privacy`
2. Ative GitHub Pages nas configurações
3. Adicione arquivo `index.md` com a política
4. URL final: `https://vyratech.github.io/allmind-privacy`

**Passos:**
```bash
# 1. Criar repositório no GitHub
# 2. Clonar e adicionar arquivo
git clone https://github.com/vyratech/allmind-privacy
cd allmind-privacy
cp ../PRIVACY_POLICY_TEMPLATE.md index.md
git add index.md
git commit -m "Add privacy policy"
git push

# 3. GitHub > Settings > Pages > Source: main branch
```

---

### 2. Google Sites
**Interface visual, sem código**

1. Acesse: https://sites.google.com
2. Clique em "Criar"
3. Cole o texto da política
4. Publique
5. URL: `https://sites.google.com/view/allmind-privacy`

---

### 3. Notion (Público)
**Super rápido**

1. Crie página no Notion
2. Cole a política
3. Clique "Share" > "Publish to web"
4. Copie URL pública

---

### 4. Vercel/Netlify
**Para desenvolvedores**

1. Crie arquivo `index.html` com a política
2. Deploy via CLI ou GitHub
3. URL customizado gratuito

---

## ⚡ Solução Imediata (1 minuto)

Use serviços de documentos online:

### Google Docs
1. Crie documento com a política
2. Arquivo > Compartilhar > Obter link
3. Configurar: "Qualquer pessoa com o link pode visualizar"
4. Copie o link

⚠️ **Menos profissional**, mas aceito pelas stores.

---

## ✅ APÓS PUBLICAR

1. Copie a URL final
2. Abra `app.json`
3. Substitua:
```json
"privacyPolicy": "SUA_URL_AQUI"
```

4. Verifique se abre no navegador
5. Teste em modo anônimo/incógnito

---

## 📱 Adicionar nos Consoles

### Google Play Console
1. App content > Privacy Policy
2. Cole a URL
3. Salve

### App Store Connect
1. App Information
2. Privacy Policy URL
3. Save

---

## ⚠️ Checklist Final

- [ ] URL pública e acessível
- [ ] Sem necessidade de login
- [ ] Texto correto e personalizado
- [ ] Email de contato atualizado
- [ ] Data de última atualização
- [ ] Testado em navegador anônimo

---

## 🎯 Exemplo de URL Final no app.json

```json
{
  "expo": {
    "name": "All Mind",
    "slug": "all-mind",
    "privacyPolicy": "https://vyratech.github.io/allmind-privacy",
    ...
  }
}
```

---

**Dica:** GitHub Pages é a melhor opção - profissional, gratuito, versionado, e você mantém controle total.
