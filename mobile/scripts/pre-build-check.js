#!/usr/bin/env node
/**
 * Pré-build check – All Mind
 * Rode antes de `eas build` para reduzir risco de falha e gastar cota à toa.
 * Uso: node scripts/pre-build-check.js   ou   npm run prebuild-check
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
let hasError = false;

function ok(msg) {
  console.log('  \x1b[32m✓\x1b[0m', msg);
}

function fail(msg) {
  console.log('  \x1b[31m✗\x1b[0m', msg);
  hasError = true;
}

function warn(msg) {
  console.log('  \x1b[33m!\x1b[0m', msg);
}

function fileExists(rel) {
  const p = path.join(ROOT, rel);
  return fs.existsSync(p);
}

function readJson(rel) {
  const p = path.join(ROOT, rel);
  if (!fs.existsSync(p)) return null;
  try {
    return JSON.parse(fs.readFileSync(p, 'utf8'));
  } catch (e) {
    return null;
  }
}

console.log('\n--- Pré-build check (EAS) ---\n');

// 1. Entry point
if (fileExists('index.js')) {
  ok('index.js existe');
} else {
  fail('index.js não encontrado (entry point do Metro)');
}

// 2. package.json main
const pkg = readJson('package.json');
if (pkg && pkg.main === 'index.js') {
  ok('package.json "main" = "index.js"');
} else {
  fail('package.json deve ter "main": "index.js"');
}

// 3. app.json – projectId e updates
const appJson = readJson('app.json');
const expo = appJson && (appJson.expo || appJson);
if (expo) {
  const projectId = expo.extra?.eas?.projectId;
  const updatesUrl = expo.updates?.url;
  const expectedId = '7f055645-77e6-4435-88dd-cc7e4f084b45';
  if (projectId === expectedId) {
    ok('app.json extra.eas.projectId correto (Gabiartz)');
  } else {
    fail(`app.json extra.eas.projectId deve ser ${expectedId} (atual: ${projectId || 'ausente'})`);
  }
  if (updatesUrl && updatesUrl.includes(expectedId)) {
    ok('app.json updates.url aponta para o projeto correto');
  } else if (updatesUrl) {
    warn('app.json updates.url pode estar com projectId antigo – verifique');
  }
  if (expo.owner === 'gabiartz') {
    ok('app.json owner = gabiartz');
  } else {
    warn(`app.json owner = "${expo.owner}" (esperado: gabiartz)`);
  }
  // Bare workflow: runtimeVersion deve ser string, não policy
  const hasAndroidDir = fs.existsSync(path.join(ROOT, 'android'));
  const rv = expo.runtimeVersion;
  if (hasAndroidDir) {
    if (typeof rv === 'string' && rv.length > 0) {
      ok('runtimeVersion é string (bare workflow OK)');
      if (expo.version && rv !== expo.version) {
        warn(`runtimeVersion ("${rv}") diferente de expo.version ("${expo.version}"); alinhe para OTA.`);
      }
    } else if (rv && typeof rv === 'object' && rv.policy) {
      fail('Bare workflow não suporta runtimeVersion com policy. Use string, ex.: "1.0.0"');
    } else {
      warn('runtimeVersion ausente ou inválido; EAS pode falhar no build');
    }
  }
} else {
  fail('app.json não encontrado ou inválido');
}

// 3b. Android: package (app.json) === applicationId (build.gradle)
const buildGradlePath = path.join(ROOT, 'android', 'app', 'build.gradle');
if (expo && expo.android && fileExists('android/app/build.gradle')) {
  try {
    const gradleContent = fs.readFileSync(buildGradlePath, 'utf8');
    const applicationIdMatch = gradleContent.match(/applicationId\s+['"]([^'"]+)['"]/);
    const applicationId = applicationIdMatch ? applicationIdMatch[1] : null;
    const appPackage = expo.android.package || null;
    if (applicationId && appPackage) {
      if (applicationId === appPackage) {
        ok('android.package (app.json) = applicationId (build.gradle)');
      } else {
        warn(`android.package ("${appPackage}") ≠ applicationId no build.gradle ("${applicationId}"); no bare o EAS usa o do gradle.`);
      }
    }
  } catch (e) {
    warn('Não foi possível ler android/app/build.gradle para conferir applicationId.');
  }
}

// 4. Assets referenciados
const assets = [
  'assets/icon.png',
  'assets/splash-icon.png',
  'assets/adaptive-icon.png',
  'assets/favicon.png',
];
const missingAssets = assets.filter((a) => !fileExists(a));
if (missingAssets.length === 0) {
  ok('Assets obrigatórios presentes');
} else {
  missingAssets.forEach((a) => fail(`Asset ausente: ${a}`));
}

// 5. eas.json na raiz deve ter projectRoot: "mobile"
const rootEas = path.join(ROOT, '..', 'eas.json');
if (fs.existsSync(rootEas)) {
  try {
    const rootEasJson = JSON.parse(fs.readFileSync(rootEas, 'utf8'));
    const build = rootEasJson.build || {};
    const base = build.base || {};
    const prod = build.production || {};
    const projectRoot = base.projectRoot || prod.projectRoot;
    if (projectRoot === 'mobile') {
      ok('eas.json na raiz tem projectRoot: "mobile" (build usará mobile/)');
    } else {
      warn('eas.json na raiz existe; defina projectRoot: "mobile" nos profiles para o build usar mobile/');
    }
  } catch (e) {
    warn('eas.json na raiz existe; verifique se tem projectRoot: "mobile"');
  }
} else {
  ok('Nenhum eas.json na raiz (rode eas build de dentro de mobile/)');
}

if (fileExists('eas.json')) {
  ok('eas.json presente em mobile/');
} else {
  fail('eas.json não encontrado em mobile/');
}

// 5b. .easignore reduz archive (builds/ e dist/)
const easignorePath = path.join(ROOT, '.easignore');
if (fs.existsSync(easignorePath)) {
  const easignoreContent = fs.readFileSync(easignorePath, 'utf8');
  if (easignoreContent.includes('builds/')) {
    ok('.easignore exclui builds/');
  } else {
    warn('.easignore não exclui builds/; archive pode ficar grande.');
  }
  if (!easignoreContent.includes('dist/')) {
    warn('.easignore não exclui dist/; adicione dist/ para reduzir archive.');
  }
} else {
  warn('.easignore ausente; archive pode ficar grande.');
}

// 6. App.tsx existe
if (fileExists('App.tsx')) {
  ok('App.tsx existe');
} else {
  fail('App.tsx não encontrado');
}

console.log('');
if (hasError) {
  console.log('\x1b[31mAlguns checks falharam. Corrija antes de rodar eas build.\x1b[0m\n');
  process.exit(1);
}

console.log('\x1b[32mTodos os checks passaram.\x1b[0m');
console.log('Recomendado: rode "npx expo export --platform android" antes do build para validar o bundle.\n');
process.exit(0);
