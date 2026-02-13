const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// 🔒 TRAVA o Metro APENAS no mobile
config.watchFolders = [
  path.resolve(__dirname),
];

config.resolver.blockList = [
  // Bloqueia tudo fora do mobile
  /server\/.*/,
  /drizzle\/.*/,
  /shared\/.*/,
  /expo\/.*/,
];

module.exports = config;
