const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

module.exports = (async () => {
  const config = await getDefaultConfig(__dirname);

  // Make sure .lottie files are supported by the asset resolver
  config.resolver.assetExts.push('lottie');

  // If using NativeWind, apply it after extension modification
  return withNativeWind(config, { input: './global.css' });
})();
