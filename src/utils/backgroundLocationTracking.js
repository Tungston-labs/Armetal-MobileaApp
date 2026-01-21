// attendance/backgroundTracking.js
import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";
import { TASK_NAME } from "./backgroundLocationTask";

export async function startBackgroundTracking() {
  console.log("Starting background tracking…");

  const fg = await Location.requestForegroundPermissionsAsync();
  if (fg.status !== "granted") {
    console.log("No foreground permission");
    return false;
  }

  const bg = await Location.requestBackgroundPermissionsAsync();
  if (bg.status !== "granted") {
    console.log("No background permission");
    return false;
  }

  // Ensure task is defined
  const defined = await TaskManager.isTaskDefined(TASK_NAME);
  if (!defined) {
    console.log("TASK NOT DEFINED — import backgroundLocationTask.js at app start");
    return false;
  }

  const already = await Location.hasStartedLocationUpdatesAsync(TASK_NAME);
  if (!already) {
    await Location.startLocationUpdatesAsync(TASK_NAME, {
      accuracy: Location.Accuracy.Highest,
      timeInterval: 120000, // 2 min
      deferredUpdatesInterval: 120000, 
      distanceInterval: 1,

      foregroundService: {
        notificationTitle: "Tracking Location",
        notificationBody: "Sending your live location to the server.",
      },

      pausesUpdatesAutomatically: false,
      showsBackgroundLocationIndicator: true, // iOS only
    });

    console.log("Background tracking STARTED");
  } else {
    console.log("Already running");
  }

  return true;
}

export async function stopBackgroundTracking() {
  const isRunning = await Location.hasStartedLocationUpdatesAsync(TASK_NAME);
  if (isRunning) {
    await Location.stopLocationUpdatesAsync(TASK_NAME);
    console.log("Stopped tracking");
  }
}
