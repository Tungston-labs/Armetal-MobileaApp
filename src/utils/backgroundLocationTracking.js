// attendance/backgroundTracking.js
import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";
import { TASK_NAME } from "./backgroundLocationTask";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TRACKING_FLAG = "BG_TRACKING_STARTED";

export async function startBackgroundTracking() {
  const started = await AsyncStorage.getItem(TRACKING_FLAG);
  if (started === "true") {
    console.log(" Tracking already started (guarded)");
    return true;
  }

  console.log("Starting background tracking…");

  const fg = await Location.requestForegroundPermissionsAsync();
  if (fg.status !== "granted") {
    console.log(" No foreground permission");
    return false;
  }

  const bg = await Location.requestBackgroundPermissionsAsync();
  if (bg.status !== "granted") {
    console.log(" No background permission");
    return false;
  }

  const defined = await TaskManager.isTaskDefined(TASK_NAME);
  if (!defined) {
    console.log(" TASK NOT DEFINED — import backgroundLocationTask.js at app start");
    return false;
  }

  const already = await Location.hasStartedLocationUpdatesAsync(TASK_NAME);
  if (!already) {
    await Location.startLocationUpdatesAsync(TASK_NAME, {
      accuracy: Location.Accuracy.High,
      timeInterval: 120000,             
      deferredUpdatesInterval: 120000,
      distanceInterval: 0,               
      pausesUpdatesAutomatically: false, 

      foregroundService: {
        notificationTitle: "Location Tracking",
        notificationBody: "Tracking your work location",
      },

      showsBackgroundLocationIndicator: true,
    });


    console.log(" Background tracking STARTED");
  }

  await AsyncStorage.setItem(TRACKING_FLAG, "true");
  return true;
}

export async function stopBackgroundTracking() {
  try {
    const isRunning = await Location.hasStartedLocationUpdatesAsync(TASK_NAME);

    if (isRunning) {
      await Location.stopLocationUpdatesAsync(TASK_NAME);
      console.log(" Background location stopped");
    }

    await AsyncStorage.removeItem(TRACKING_FLAG);
  } catch (err) {
    console.log(" Error stopping background tracking:", err);
  }
}
