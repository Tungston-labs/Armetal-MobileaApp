// metro.config.js
const { getDefaultConfig } = require("expo/metro-config"); 
// const { getDefaultConfig } = require("metro-config"); // For bare RN

const config = getDefaultConfig(__dirname);

config.transformer = {
  ...config.transformer,
  babelTransformerPath: require.resolve("react-native-svg-transformer"),
};

config.resolver.assetExts = config.resolver.assetExts.filter(ext => ext !== "svg");
config.resolver.sourceExts = [...config.resolver.sourceExts, "svg"];

module.exports = config;
