const { withAndroidManifest, withMainApplication, withDangerousMod } =
  require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

module.exports = function withLocationNative(config) {
  const pkg = 'com.anonymous.Rekory'; 

  // Copy Kotlin files
  config = withDangerousMod(config, [
    'android',
    async (config) => {
      const srcDir = path.join(
        config.modRequest.projectRoot,
        'android-native'
      );

      const destDir = path.join(
        config.modRequest.platformProjectRoot,
        'app/src/main/java',
        ...pkg.split('.')
      );

      fs.mkdirSync(destDir, { recursive: true });

      ['LocationService.kt', 'LocationModule.kt', 'MyAppPackage.kt'].forEach(
        (file) => {
          fs.copyFileSync(
            path.join(srcDir, file),
            path.join(destDir, file)
          );
        }
      );

      return config;
    },
  ]);

  // Register package
  config = withMainApplication(config, (config) => {
    let contents = config.modResults.contents;

    if (!contents.includes('MyAppPackage')) {
      contents = contents.replace(
        /getPackages\(\): List<ReactPackage> \{/,
        `getPackages(): List<ReactPackage> {
          packages.add(MyAppPackage())`
      );
    }

    config.modResults.contents = contents;
    return config;
  });

  // Register service
  config = withAndroidManifest(config, (config) => {
    const app = config.modResults.manifest.application[0];

    app.service = app.service || [];
    const serviceName = `.LocationService`;
    const alreadyAdded = app.service.some((s) => s?.$?.['android:name'] === serviceName);
    if (!alreadyAdded) {
      app.service.push({
        $: {
          'android:name': serviceName,
          'android:exported': 'false',
          'android:foregroundServiceType': 'location',
          'android:stopWithTask': 'false',
        },
      });
    }

    return config;
  });

  return config;
};
