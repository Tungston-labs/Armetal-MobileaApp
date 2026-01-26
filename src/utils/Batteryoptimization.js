import { Alert, NativeModules, Platform } from 'react-native';

const { BatteryOptimization } = NativeModules;

export const maybeAskBatteryPermission = () => {
  // iOS safe-guard
  if (Platform.OS !== 'android') return;

  // Native module safe-guard
  if (!BatteryOptimization?.requestIgnoreBatteryOptimizations) {
    console.warn('BatteryOptimization native module not available');
    return;
  }

  Alert.alert(
    'Allow background activity',
    'To track attendance during work hours, Rekory needs permission to run without battery restrictions.',
    [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Allow',
        onPress: () =>
          BatteryOptimization.requestIgnoreBatteryOptimizations(),
      },
    ]
  );
};
