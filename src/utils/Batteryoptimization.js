import { Platform, Linking } from "react-native";
import * as IntentLauncher from "expo-intent-launcher";
import * as Application from "expo-application";
import Toast from "react-native-toast-message";

const openBatterySettings = async () => {
  try {
    const packageName = Application.applicationId;

    await IntentLauncher.startActivityAsync(
      IntentLauncher.ActivityAction.APPLICATION_DETAILS_SETTINGS,
      { data: `package:${packageName}` }
    );
  } catch (error) {
    Linking.openSettings();
  }
};

export const maybeAskBatteryPermission = () => {
  if (Platform.OS !== "android") return;

  Toast.show({
    type: "info",
    text1: "Allow Background Activity",
    text2: "Tap to open settings and set Rekory battery usage to Unrestricted.",
    visibilityTime: 7000,
    onPress: openBatterySettings,
  });
};
