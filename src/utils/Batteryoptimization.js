import { Alert, Platform } from "react-native";
import * as IntentLauncher from "expo-intent-launcher";
import * as Application from "expo-application";

export const maybeAskBatteryPermission = async () => {
  if (Platform.OS !== "android") return;

  try {
    const packageName = Application.applicationId;

    await IntentLauncher.startActivityAsync(
      "android.settings.REQUEST_IGNORE_BATTERY_OPTIMIZATIONS",
      { data: `package:${packageName}` }
    );
  } catch (error) {
    Alert.alert(
      "Allow Background Activity",
      "To track attendance reliably, set Rekory battery usage to UNRESTRICTED.\n\nSteps:\n1. Go to Settings → Apps → Rekory\n2. Tap Battery\n3. Select Unrestricted",
      [{ text: "OK", style: "default" }]
    );
  }
};
