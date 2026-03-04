// src/services/locationService.js
import BackgroundFetch from "react-native-background-fetch";
import Geolocation from "react-native-geolocation-service";
import ReactNativeForegroundService from "@supersami/rn-foreground-service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PermissionsAndroid, Platform } from "react-native";

const API_URL = "http://178.248.112.16:8001/api/background-location/";
const DEFAULT_INTERVAL_MINUTES = 20;

let _intervalId = null;
let _isServiceRunning = false;

/* -----------------------------
   Permissions
   --------------------------- */
const requestPermissions = async () => {
  if (Platform.OS !== "android") return true;

  const granted = await PermissionsAndroid.requestMultiple([
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
  ]);

  // If you want to be strict: require background permission for interval tracking
  return (
    granted["android.permission.ACCESS_FINE_LOCATION"] === "granted" &&
    granted["android.permission.ACCESS_COARSE_LOCATION"] === "granted" &&
    granted["android.permission.ACCESS_BACKGROUND_LOCATION"] === "granted"
  );
};

/* -----------------------------
   Token refresh + retry helper
   --------------------------- */
const refreshAccessToken = async () => {
  const refreshToken = await AsyncStorage.getItem("refreshToken");
  if (!refreshToken) return null;
  try {
    const res = await fetch("http://178.248.112.16:8001/api/token/refresh/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: refreshToken }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (data?.access) {
      await AsyncStorage.setItem("accessToken", data.access);
      return data.access;
    }
    return null;
  } catch (err) {
    console.log("refresh token err", err);
    return null;
  }
};

/* -----------------------------
   Get location (single shot)
   --------------------------- */
const getCurrentLocation = () =>
  new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      (pos) => resolve(pos),
      (err) => reject(err),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 10000,
        forceRequestLocation: true,
      }
    );
  });

/* -----------------------------
   Upload with retry on 401
   --------------------------- */
export const uploadLocation = async () => {
  const employeeId = await AsyncStorage.getItem("employeeId");
  const sessionId = await AsyncStorage.getItem("sessionId");
  if (!employeeId || !sessionId) {
    console.log("uploadLocation: missing employeeId/sessionId");
    return;
  }

  let token = await AsyncStorage.getItem("accessToken");
  if (!token) token = await refreshAccessToken();
  if (!token) {
    console.log("uploadLocation: no token available, abort.");
    return;
  }

  try {
    const pos = await getCurrentLocation();
    const body = {
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude,
      session_id: sessionId,
    };

    // Try once
    let res = await fetch(`${API_URL}${employeeId}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    // If token expired (401), refresh and retry once
    if (res.status === 401) {
      console.log("uploadLocation: got 401, trying refresh token...");
      token = await refreshAccessToken();
      if (!token) {
        console.log("uploadLocation: refresh failed");
        return;
      }
      res = await fetch(`${API_URL}${employeeId}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
    }

    if (!res.ok) {
      const txt = await res.text();
      console.log("uploadLocation: server error -", res.status, txt);
    } else {
      console.log("✅ Location uploaded:", new Date().toISOString());
    }
  } catch (err) {
    console.log("uploadLocation error:", err);
  }
};


const startForeground = async ({ title = "Tracking active", message = "Tracking location..." } = {}) => {
  if (_isServiceRunning) return;
  try {
    await ReactNativeForegroundService.start({
      id: 1001,
      title,
      message,
      icon: "ic_launcher",
      serviceType: "location",
      setPriority: "max",
    });
    _isServiceRunning = true;
    console.log("Foreground service started");
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
    console.log("Foreground service stopped");
  }
};

/* -----------------------------
   Public: start tracking
   --------------------------- */
export const startBackgroundTracking = async ({ employeeId, sessionId, intervalMinutes = DEFAULT_INTERVAL_MINUTES } = {}) => {
  // ensure permissions
  const ok = await requestPermissions();
  if (!ok) {
    console.log("Permissions not granted - abort startBackgroundTracking");
    return;
  }

  // persist session info
  await AsyncStorage.multiSet([
    ["employeeId", String(employeeId)],
    ["sessionId", String(sessionId)],
    ["punchedIn", "true"],
  ]);

  // start persistent foreground service
  await startForeground({ title: "Rekory Attendance", message: "Location tracking active for your shift" });

  // immediate upload
  await uploadLocation();

  // start JS interval only if not already running
  if (_intervalId) clearInterval(_intervalId);
  _intervalId = setInterval(() => {
    uploadLocation().catch((e) => console.log("interval upload err", e));
  }, Math.max(1, intervalMinutes) * 60 * 1000);

  // register a native task as backup if library supports it
  try {
    ReactNativeForegroundService.register({
      id: "rekory_location_tick",
      task: async (taskData) => {
        console.log("Native service tick -> uploadLocation");
        await uploadLocation();
      },
    });
  } catch (e) {
    console.log("register native task failed (non-fatal):", e);
  }

  // configure BackgroundFetch as a backup (headless)
  try {
    await BackgroundFetch.configure(
      {
        minimumFetchInterval: Math.max(15, intervalMinutes), // Background fetch min is typically 15+
        stopOnTerminate: false,
        startOnBoot: true,
        enableHeadless: true,
        forceAlarmManager: true,
        requiredNetworkType: BackgroundFetch.NETWORK_TYPE_ANY,
      },
      async (taskId) => {
        console.log("BackgroundFetch event:", taskId);
        await uploadLocation();
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

  console.log("✅ startBackgroundTracking done");
};

/* -----------------------------
   Public: stop tracking
   --------------------------- */
export const stopBackgroundTracking = async () => {
  if (_intervalId) {
    clearInterval(_intervalId);
    _intervalId = null;
  }

  await stopForeground();

  try {
    await BackgroundFetch.stop();
  } catch (e) {
    console.log("BackgroundFetch.stop failed:", e);
  }

  await AsyncStorage.multiRemove(["employeeId", "sessionId", "punchedIn"]);
  console.log("🛑 stopBackgroundTracking done");
};

/* -----------------------------
   Headless background fetch task (export/register)
   --------------------------- */
export const backgroundFetchHeadless = async (taskId) => {
  console.log("Headless background fetch:", taskId);
  await uploadLocation();
  BackgroundFetch.finish(taskId);
};

// register headless handler for BackgroundFetch
try {
  BackgroundFetch.registerHeadlessTask(backgroundFetchHeadless);
} catch (e) {
  console.log("registerHeadlessTask err:", e);
}