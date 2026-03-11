import { Alert, Platform, Linking } from "react-native";
import * as IntentLauncher from "expo-intent-launcher";
import * as Application from "expo-application";

export const maybeAskBatteryPermission = () => {
  if (Platform.OS !== "android") return;

 Alert.alert(
    "Allow Background Activity",
    "To ensure attendance verification works reliably, please allow Rekory to run without battery restrictions.\n\nSteps:\n1. Open Battery settings\n2. Tap Background usage limits\n3. Remove Rekory from sleeping apps\n4. Set Battery → Unrestricted\n4.Disable manage app is unused",
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