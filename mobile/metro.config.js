const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Adicionar .opus como asset reconhecido
config.resolver.assetExts.push('opus');

module.exports = config;
