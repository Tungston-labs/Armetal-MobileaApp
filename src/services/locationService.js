import BackgroundFetch from "react-native-background-fetch";
import Geolocation from "react-native-geolocation-service";
import ReactNativeForegroundService from "@supersami/rn-foreground-service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PermissionsAndroid, Platform } from "react-native";

const API_URL = "http://178.248.112.16:8001/api/background-location/";
const DEFAULT_INTERVAL_MINUTES = 20;

let _isServiceRunning = false;


const requestPermissions = async () => {

  if (Platform.OS !== "android") return true;

  const granted = await PermissionsAndroid.requestMultiple([
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
  ]);

  return (
    granted["android.permission.ACCESS_FINE_LOCATION"] === "granted" &&
    granted["android.permission.ACCESS_COARSE_LOCATION"] === "granted" &&
    granted["android.permission.ACCESS_BACKGROUND_LOCATION"] === "granted"
  );
};


/* ---------------- TOKEN REFRESH ---------------- */

const refreshAccessToken = async () => {

  const refreshToken = await AsyncStorage.getItem("refreshToken");

  if (!refreshToken) {
    console.log("🔴 REFRESH TOKEN: Not found in storage");
    return null;
  }

  console.log("🟡 REFRESH TOKEN: Attempting refresh...");

  try {

    const res = await fetch("http://178.248.112.16:8001/api/token/refresh/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    console.log("🟡 REFRESH TOKEN: Response status:", res.status);

    if (res.status === 401) {
      console.log("🔴 REFRESH TOKEN EXPIRED or INVALID");
      return null;
    }

    if (!res.ok) {
      console.log("🔴 REFRESH TOKEN FAILED: server error");
      return null;
    }

    const data = await res.json();

    if (data?.access) {

      await AsyncStorage.setItem("accessToken", data.access);

      console.log("🟢 ACCESS TOKEN REFRESHED SUCCESSFULLY");

      return data.access;
    }

    console.log("🔴 REFRESH TOKEN FAILED: No access token in response");

    return null;

  } catch (err) {

    console.log("🔴 REFRESH TOKEN NETWORK ERROR:", err);

    return null;

  }
};


/* ---------------- LOCATION ---------------- */

const getCurrentLocation = () =>
  new Promise((resolve, reject) => {

    Geolocation.getCurrentPosition(
      resolve,
      reject,
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 10000,
        forceRequestLocation: true,
      }
    );

  });


/* ---------------- UPLOAD LOCATION ---------------- */

export const uploadLocation = async () => {

  const employeeId = await AsyncStorage.getItem("employeeId");
  const sessionId = await AsyncStorage.getItem("sessionId");

  if (!employeeId || !sessionId) {
    console.log("uploadLocation: missing employeeId/sessionId");
    return;
  }
let token = await AsyncStorage.getItem("accessToken");

if (!token) {
  console.log("🟡 ACCESS TOKEN missing. Trying refresh...");
  token = await refreshAccessToken();
}

if (!token) {
  console.log("🔴 Cannot upload location. No valid token.");
  return;
}

  try {

    const pos = await getCurrentLocation();

    const body = {
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude,
      session_id: sessionId,
    };

    let res = await fetch(`${API_URL}${employeeId}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (res.status === 401) {
  console.log("🟡 ACCESS TOKEN expired. Refreshing...");

      token = await refreshAccessToken();

      if (!token) {
    console.log("🔴 Refresh failed. User must login again.");
    return;
  }

  console.log("🟢 Retrying location upload with new token...");

      res = await fetch(`${API_URL}${employeeId}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

    }

    console.log("Location uploaded:", new Date().toISOString());

  } catch (err) {

    console.log("uploadLocation error:", err);

  }
};


/* ---------------- FOREGROUND SERVICE ---------------- */

const startForeground = async ({
  title = "Tracking active",
  message = "Tracking location...",
  isBackground = false
} = {}) => {
  if (_isServiceRunning || isBackground) return; 
  try {
    await ReactNativeForegroundService.start({
      id: 1001,
      title,
      message,
      icon: "ic_launcher",
      serviceType: "location",
    });
    _isServiceRunning = true;
  } catch (err) {
    console.log("startForeground error:", err);
  }
};


const stopForeground = async () => {

  try {

    await ReactNativeForegroundService.stop();

  } catch (err) {

    console.log("stopForeground error:", err);

  } finally {

    _isServiceRunning = false;

  }

};


/* ---------------- START TRACKING ---------------- */

export const startBackgroundTracking = async ({
  employeeId,
  sessionId,
  intervalMinutes = DEFAULT_INTERVAL_MINUTES
} = {}) => {
if (_intervalId) clearInterval(_intervalId);
_intervalId = setInterval(() => {
  uploadLocation().catch(console.log);
}, Math.max(1, intervalMinutes) * 60 * 1000);
  const ok = await requestPermissions();

  if (!ok) return;

  await AsyncStorage.multiSet([
    ["employeeId", String(employeeId)],
    ["sessionId", String(sessionId)],
    ["punchedIn", "true"],
  ]);

  try {

    await BackgroundFetch.configure(
      {
        minimumFetchInterval: Math.max(15, intervalMinutes),
        stopOnTerminate: false,
        startOnBoot: true,
        enableHeadless: true,
        
        forceAlarmManager: true,
        requiredNetworkType: BackgroundFetch.NETWORK_TYPE_ANY,
      },

      async (taskId) => {

        console.log("BackgroundFetch event:", taskId);

        try {

await startForeground({ isBackground: true }); 
          await uploadLocation();

        } catch (e) {

          console.log("Background task error", e);

        }

        await stopForeground();

        BackgroundFetch.finish(taskId);

      },

      (error) => {
        console.log("BackgroundFetch configure error:", error);
      }
    );

    await BackgroundFetch.start();

  } catch (e) {

    console.log("BackgroundFetch setup failed:", e);

  }

  console.log("startBackgroundTracking done");
};


/* ---------------- STOP TRACKING ---------------- */

export const stopBackgroundTracking = async () => {

  await stopForeground();

  try {

    await BackgroundFetch.stop();

  } catch (e) {

    console.log("BackgroundFetch.stop failed:", e);

  }

  await AsyncStorage.multiRemove([
    "employeeId",
    "sessionId",
    "punchedIn"
  ]);

  console.log("stopBackgroundTracking done");

};


/* ---------------- HEADLESS TASK ---------------- */

export const backgroundFetchHeadless = async (event) => {

  const { taskId, timeout } = event;

  if (timeout) {
    BackgroundFetch.finish(taskId);
    return;
  }

  console.log("Headless background fetch:", taskId);

  try {

    await uploadLocation();

  } catch (err) {

    console.log("Headless upload error", err);

  }

  BackgroundFetch.finish(taskId);

};


try {

  BackgroundFetch.registerHeadlessTask(backgroundFetchHeadless);

} catch (e) {

  console.log("registerHeadlessTask err:", e);

}