import { Alert, Platform } from "react-native";
import * as IntentLauncher from "expo-intent-launcher";
import * as Application from "expo-application";

export const maybeAskBatteryPermission = () => {
  if (Platform.OS !== "android") return;

  Alert.alert(
    "Allow background activity",
    "To track attendance during work hours, Rekory needs permission to run without battery restrictions.",
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
            console.log("Battery optimization intent failed", e);
          }
        },
      },
    ]
  );
};
