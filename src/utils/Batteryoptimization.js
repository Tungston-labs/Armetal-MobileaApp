import { Platform } from "react-native";
import * as IntentLauncher from "expo-intent-launcher";
import * as Application from "expo-application";
import Toast from "react-native-toast-message";

export const maybeAskBatteryPermission = async () => {
  if (Platform.OS !== "android") return;

  try {
    const packageName = Application.applicationId;

    await IntentLauncher.startActivityAsync(
      "android.settings.REQUEST_IGNORE_BATTERY_OPTIMIZATIONS",
      { data: `package:${packageName}` }
    );
  } catch (error) {
    Toast.show({
      type: "info",
      text1: "Allow Background Activity",
      text2:
        "Set Rekory battery usage to Unrestricted for reliable attendance tracking.",
      visibilityTime: 6000,
    });
  }
};
