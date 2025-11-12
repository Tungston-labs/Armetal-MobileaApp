// attendance/backgroundTracking.js
import * as Location from "expo-location";
import { TASK_NAME } from "./backgroundLocationTask";

export async function startBackgroundTracking() {
  // Request foreground + background permissions
  const { status: fgStatus } = await Location.requestForegroundPermissionsAsync();
  if (fgStatus !== "granted") {
    alert("Foreground location permission not granted");
    return;
  }

  const { status: bgStatus } = await Location.requestBackgroundPermissionsAsync();
  if (bgStatus !== "granted") {
    alert("Background location permission not granted");
    return;
  }

  const alreadyRunning = await Location.hasStartedLocationUpdatesAsync(TASK_NAME);
  if (!alreadyRunning) {
    await Location.startLocationUpdatesAsync(TASK_NAME, {
      accuracy: Location.Accuracy.High,
      timeInterval: 150000, // 2.5 min
      distanceInterval: 0,
      foregroundService: {
        notificationTitle: "Tracking Location",
        notificationBody: "Sending your live location to the server.",
        notificationColor: "#0000ff",
      },
      pausesUpdatesAutomatically: false,
      showsBackgroundLocationIndicator: true, // iOS only
    });
    console.log("✅ Background tracking started");
  }
}

export async function stopBackgroundTracking() {
  const isRunning = await Location.hasStartedLocationUpdatesAsync(TASK_NAME);
  if (isRunning) {
    await Location.stopLocationUpdatesAsync(TASK_NAME);
    console.log("🛑 Background tracking stopped");
  }
}
