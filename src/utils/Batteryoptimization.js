import { Alert, Platform } from "react-native";
import * as IntentLauncher from "expo-intent-launcher";
import * as Application from "expo-application";

export const maybeAskBatteryPermission = () => {
  if (Platform.OS !== "android") return;

  Alert.alert(
    "Allow background activity",
    "To track attendance reliably, Rekory must be allowed to run in the background without battery restrictions.\n\nOn Samsung: set Battery to Unrestricted and add Rekory to Never sleeping apps.",
    [
      { text: "Cancel", style: "cancel" },
      {
        text: "Allow",
        onPress: async () => {
          try {
            const packageName = Application.applicationId;

            await IntentLauncher.startActivityAsync(
              IntentLauncher.ActivityAction.REQUEST_IGNORE_BATTERY_OPTIMIZATIONS,
              {
                data: `package:${packageName}`,
              }
            );
          } catch (e) {
            // Fallback: open app details so the user can set "Battery" to Unrestricted.
            try {
              const packageName = Application.applicationId;
              await IntentLauncher.startActivityAsync(
                IntentLauncher.ActivityAction.APPLICATION_DETAILS_SETTINGS,
                { data: `package:${packageName}` }
              );
            } catch (e2) {
              console.log("Battery optimization intent failed", e, e2);
            }
          }
        },
      },
    ]
  );
};
