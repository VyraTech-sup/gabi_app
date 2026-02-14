#!/usr/bin/env node
/**
 * Garante entrypoints no diretório do projeto (EAS Build).
 * Escreve em __dirname/.. e em process.cwd() para cobrir qualquer cwd do EAS.
 */
const fs = require('fs');
const path = require('path');

const indexContent = `import { registerRootComponent } from 'expo';
import App from './App';

registerRootComponent(App);
`;

const entryContent = `import { registerRootComponent } from 'expo';
import App from '../App';

registerRootComponent(App);
`;

function ensureFile(filePath, content) {
  const fileDir = path.dirname(filePath);
  if (!fs.existsSync(fileDir)) {
    fs.mkdirSync(fileDir, { recursive: true });
  }
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('ensure-entry: criado', filePath);
    return;
  }
  console.log('ensure-entry: já existe', filePath);
}

function ensureEntrypoints(baseDir) {
  const indexPath = path.join(baseDir, 'index.js');
  const entryPath = path.join(baseDir, 'scripts', 'entry.js');
  ensureFile(indexPath, indexContent);
  ensureFile(entryPath, entryContent);
}

// 1) CWD = onde npm install rodou (no EAS é sempre a raiz do app)
const cwd = process.cwd();
if (fs.existsSync(path.join(cwd, 'package.json'))) {
  ensureEntrypoints(cwd);
}

// 2) Diretório do package (parent de scripts/) para cobrir hooks com cwd diferente
const scriptDir = path.resolve(__dirname, '..');
ensureEntrypoints(scriptDir);

// Falhar se em nenhum dos dois existir os entrypoints (evita bundle sem entry)
const inCwd = fs.existsSync(path.join(cwd, 'index.js'));
const entryInCwd = fs.existsSync(path.join(cwd, 'scripts', 'entry.js'));
const inScriptDir = fs.existsSync(path.join(scriptDir, 'index.js'));
const entryInScriptDir = fs.existsSync(path.join(scriptDir, 'scripts', 'entry.js'));

if ((!inCwd && !inScriptDir) || (!entryInCwd && !entryInScriptDir)) {
  console.error(
    'ensure-entry: ERRO - entrypoints não confirmados.',
    JSON.stringify({ cwd, scriptDir, inCwd, inScriptDir, entryInCwd, entryInScriptDir })
  );
  process.exit(1);
}

console.log(
  'ensure-entry: OK',
  JSON.stringify({ cwd, scriptDir, inCwd, inScriptDir, entryInCwd, entryInScriptDir })
);
