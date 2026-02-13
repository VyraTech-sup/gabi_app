#!/usr/bin/env node
/**
 * Garante que index.js existe no diretório do projeto (EAS Build).
 * Se estiver ausente no archive, cria com o conteúdo correto.
 */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const indexPath = path.join(root, 'index.js');
const content = `import { registerRootComponent } from 'expo';
import App from './App';

registerRootComponent(App);
`;

if (!fs.existsSync(indexPath)) {
  fs.writeFileSync(indexPath, content, 'utf8');
  console.log('ensure-index: index.js criado (estava ausente no archive).');
} else {
  console.log('ensure-index: index.js já existe.');
}
