#!/usr/bin/env node
/**
 * Garante que index.js existe no diretório do projeto (EAS Build).
 * Escreve em __dirname/.. e em process.cwd() para cobrir qualquer cwd do EAS.
 */
const fs = require('fs');
const path = require('path');

const content = `import { registerRootComponent } from 'expo';
import App from './App';

registerRootComponent(App);
`;

function ensure(dir) {
  const indexPath = path.join(dir, 'index.js');
  if (!fs.existsSync(indexPath)) {
    fs.writeFileSync(indexPath, content, 'utf8');
    console.log('ensure-index: index.js criado em', dir);
    return true;
  }
  return false;
}

// 1) CWD = onde npm install rodou (no EAS é sempre a raiz do app)
const cwd = process.cwd();
if (fs.existsSync(path.join(cwd, 'package.json'))) {
  ensure(cwd);
}

// 2) Diretório do package (parent de scripts/) para cobrir hooks com cwd diferente
const scriptDir = path.resolve(__dirname, '..');
ensure(scriptDir);

// Falhar se em nenhum dos dois existir index.js (evita bundle sem entry)
const inCwd = fs.existsSync(path.join(cwd, 'index.js'));
const inScriptDir = fs.existsSync(path.join(scriptDir, 'index.js'));
if (!inCwd && !inScriptDir) {
  console.error('ensure-index: ERRO - index.js não criado em', cwd, 'nem em', scriptDir);
  process.exit(1);
}
