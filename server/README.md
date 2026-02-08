Leads Ingestion API

Serviço simples de ingestão de leads: recebe dados do frontend e encaminha para um Webhook (Zapier).

Endpoints
- `POST /api/leads` — Recebe JSON com `firstName`, `lastName`, `email`. Retorna `200 { ok: true }` em sucesso.
- `GET /health` — Retorna `200 { status: "ok" }` para readiness/liveness checks.

Variáveis de ambiente (obrigatórias)
- `FRONTEND_ORIGIN` — domínio permitido para CORS (ex.: https://app.example.com)
- `ZAPIER_WEBHOOK_URL` — URL do webhook do Zapier (manter secreta; não expor no frontend)
- `PORT` — opcional, porta do servidor (padrão `3001`)

Rodando localmente
1. Instale dependências:

```
cd server
npm install
```

2. Inicie o servidor:

```
# opção A
node leads.js

# opção B (script local)
npm run start:leads
```

Exemplos de teste (curl)

Health:
```
curl -i http://localhost:3001/health
# Esperado: 200 { "status": "ok" }
```

Enviar lead:
```
curl -X POST http://localhost:3001/api/leads \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Ana","lastName":"Silva","email":"ana@example.com"}'
```

Observações de segurança
- Nunca exponha `ZAPIER_WEBHOOK_URL` no frontend ou em logs públicos.
- Configure `FRONTEND_ORIGIN` estritamente com o domínio do frontend.
- O endpoint já possui limitação simples por IP e validação de Content-Type; para produção considere um rate limiter distribuído e autenticação adicional.

Arquivo principal
- `server/leads.js`
