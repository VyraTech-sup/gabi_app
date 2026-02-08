#!/usr/bin/env node
/**
 * send_expo_push.js
 * Simple bulk sender for Expo Push Notifications.
 * Usage: node send_expo_push.js <tokens_file>
 * tokens_file: plain text file with one Expo push token per line
 *
 * Behavior:
 * - Reads tokens from file (or STDIN if not provided)
 * - Batches up to 100 messages per request (Expo limit)
 * - Sends batches sequentially with a small concurrency and backoff on 429/5xx
 */

const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

const EXPO_ENDPOINT = 'https://exp.host/--/api/v2/push/send';
const BATCH_SIZE = 100;
const CONCURRENCY = 2; // number of batches in flight

function sleep(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

async function sendBatch(messages, attempt = 1) {
  try {
    const res = await fetch(EXPO_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(messages),
      timeout: 30_000,
    });

    if (res.status === 429 || res.status >= 500) {
      // rate limited or server error
      const backoff = Math.min(60000, 1000 * Math.pow(2, attempt));
      console.warn(`Expo returned ${res.status} — backing off ${backoff}ms (attempt ${attempt})`);
      await sleep(backoff);
      return sendBatch(messages, attempt + 1);
    }

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Expo push send failed ${res.status}: ${text}`);
    }

    const json = await res.json();
    return json;
  } catch (err) {
    if (attempt < 5) {
      const backoff = 1000 * Math.pow(2, attempt);
      console.warn(`Send error, retrying in ${backoff}ms:`, err.message || err);
      await sleep(backoff);
      return sendBatch(messages, attempt + 1);
    }
    throw err;
  }
}

async function main() {
  const tokensFile = process.argv[2];

  let tokens = [];
  if (tokensFile) {
    const filePath = path.resolve(process.cwd(), tokensFile);
    if (!fs.existsSync(filePath)) {
      console.error('Tokens file not found:', filePath);
      process.exit(2);
    }
    const content = fs.readFileSync(filePath, 'utf8');
    tokens = content.split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
  } else {
    // read from stdin
    const stdin = fs.readFileSync(0, 'utf8');
    tokens = stdin.split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
  }

  if (!tokens.length) {
    console.error('No tokens provided');
    process.exit(1);
  }

  // Build messages
  const title = process.env.PUSH_TITLE || 'Novo áudio disponível 🎧';
  const body = process.env.PUSH_BODY || 'Já tem conteúdo novo pra você no app. Vem ouvir agora.';

  const messages = tokens.map((token) => ({
    to: token,
    title,
    body,
    sound: 'default',
    data: { type: 'new_audio' },
  }));

  // chunk into batches
  const batches = [];
  for (let i = 0; i < messages.length; i += BATCH_SIZE) {
    batches.push(messages.slice(i, i + BATCH_SIZE));
  }

  console.log(`Sending ${messages.length} notifications in ${batches.length} batch(es)`);

  const results = [];

  // simple concurrency pool
  let idx = 0;
  const workers = new Array(Math.min(CONCURRENCY, batches.length)).fill(0).map(async () => {
    while (true) {
      const i = idx;
      idx += 1;
      if (i >= batches.length) return;
      const batch = batches[i];
      console.log(`Sending batch ${i + 1}/${batches.length} (${batch.length} messages)`);
      try {
        const res = await sendBatch(batch);
        results.push({ batch: i, ok: true, response: res });
        // small pause between batches to reduce rate-limit risk
        await sleep(250);
      } catch (err) {
        results.push({ batch: i, ok: false, error: String(err) });
        console.error(`Batch ${i + 1} failed:`, err.message || err);
      }
    }
  });

  await Promise.all(workers);

  console.log('All done. Summary:');
  const okCount = results.filter((r) => r.ok).length;
  const failCount = results.filter((r) => !r.ok).length;
  console.log(`  succeeded batches: ${okCount}`);
  console.log(`  failed batches: ${failCount}`);

  // Write a small report
  const report = { totalMessages: messages.length, batches: results };
  const out = path.resolve(process.cwd(), 'send_expo_push_report.json');
  fs.writeFileSync(out, JSON.stringify(report, null, 2));
  console.log('Report written to', out);
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
