import { Alert, Platform, Linking } from "react-native";
import * as IntentLauncher from "expo-intent-launcher";
import * as Application from "expo-application";

export const maybeAskBatteryPermission = () => {
  if (Platform.OS !== "android") return;

  Alert.alert(
    "Allow Background Activity",
    "To track attendance every 1 hour, set Rekory battery usage to UNRESTRICTED.\n\nSteps:\n1. Open Battery settings\n2. Tap Background usage limits\n3. Remove Rekory from sleeping apps\n4. Set Battery → Unrestricted",
    [
      { text: "Cancel", style: "cancel" },
      {
        text: "Open Settings",
        onPress: async () => {
          try {
            const packageName = Application.applicationId;

            // Open App Settings Page
            await IntentLauncher.startActivityAsync(
              IntentLauncher.ActivityAction.APPLICATION_DETAILS_SETTINGS,
              { data: `package:${packageName}` }
            );
          } catch (error) {
            Linking.openSettings();
          }
        },
      },
    ]
  );
};