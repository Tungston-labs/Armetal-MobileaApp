import BackgroundFetch from "react-native-background-fetch";
import Geolocation from "react-native-geolocation-service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PermissionsAndroid, Platform } from "react-native";


const API_URL = "http://178.248.112.16:8001/api/background-location/";
const DEFAULT_INTERVAL_MINUTES = 20;

let _intervalId = null;
let _isServiceRunning = false;
const ReactNativeForegroundService =
  Platform.OS === "android"
    ? require("@supersami/rn-foreground-service").default
    : null;
const requestPermissions = async () => {
  if (Platform.OS === "ios") {
    const fgStatus = await Location.requestForegroundPermissionsAsync();
    if (fgStatus.status !== "granted") {
      console.log("Foreground location permission denied");
      return false;
    }

    const bgStatus = await Geolocation.requestAuthorization("always");
    if (bgStatus !== "granted") {
      console.log("Background location permission denied");
      return false;
    }

    return true;
  }

  if (Platform.OS === "android") {
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
  }
};

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

    let res = await fetch(`${API_URL}${employeeId}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

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
      console.log("Location uploaded:", new Date().toISOString());
    }
  } catch (err) {
    console.log("uploadLocation error:", err);
  }
};


const startForeground = async ({ title = "Rekory Attendance", message = "Tracking location..." }={}) => {
  if (Platform.OS === "ios") return; // skip for iOS

  if (_isServiceRunning) return;

  try {
    await ReactNativeForegroundService.start({
      id: 1001,
      title: "Rekory Attendance",
      message: "Location tracking active",
      icon: "ic_launcher",
      serviceType: "location",
    });

    _isServiceRunning = true;
  } catch (err) {
    console.log("startForeground error:", err);
  }
};

const stopForeground = async () => {
  if (Platform.OS === "ios") return;

  try {
    await ReactNativeForegroundService.stop();
  } catch (err) {
    console.log("stopForeground error:", err);
  }
};


export const startBackgroundTracking = async ({ employeeId, sessionId, intervalMinutes = DEFAULT_INTERVAL_MINUTES } = {}) => {
  const ok = await requestPermissions();
  if (!ok) {
    console.log("Permissions not granted - abort startBackgroundTracking");
    return;
  }

  await AsyncStorage.multiSet([
    ["employeeId", String(employeeId)],
    ["sessionId", String(sessionId)],
    ["punchedIn", "true"],
  ]);

  await startForeground({ title: "Rekory Attendance", message: "Location tracking active for your shift" });

  await uploadLocation();

  if (_intervalId) clearInterval(_intervalId);
  _intervalId = setInterval(() => {
    uploadLocation().catch((e) => console.log("interval upload err", e));
  }, Math.max(1, intervalMinutes) * 60 * 1000);

  try {
    if (Platform.OS === "android" && ReactNativeForegroundService) {
    ReactNativeForegroundService.register({
      id: "rekory_location_tick",
      task: async (taskData) => {
        console.log("Native service tick -> uploadLocation");
        await uploadLocation();
      },
    });
  }
  } catch (e) {
    console.log("register native task failed (non-fatal):", e);
  }

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

  console.log(" startBackgroundTracking done");
};

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
  console.log("stopBackgroundTracking done");
};


export const backgroundFetchHeadless = async (taskId) => {
  console.log("Headless background fetch:", taskId);
  await uploadLocation();
  BackgroundFetch.finish(taskId);
};

