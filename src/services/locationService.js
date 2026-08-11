import BackgroundFetch from "react-native-background-fetch";
import Geolocation from "react-native-geolocation-service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PermissionsAndroid, Platform } from "react-native";
let ReactNativeForegroundService = null;

try {
  if (Platform.OS === "android") {
    ReactNativeForegroundService =
      require("@supersami/rn-foreground-service").default;
  }
} catch (e) {
  console.log("Foreground service not available on this platform");
}
const API_URL = "https://api.rekory.com/api/background-location/";
const REFRESH_URL = "https://api.rekory.com/api/token/refresh/";

const DEFAULT_INTERVAL_MINUTES = 20;

let _isServiceRunning = false;
let lastUploadTime = 0;

const MIN_UPLOAD_GAP = 60 * 1000;

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

const refreshAccessToken = async () => {
  const refreshToken = await AsyncStorage.getItem("refreshToken");
  if (!refreshToken) return null;

  try {
    const res = await fetch(REFRESH_URL, {
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
      resolve,
      reject,
      {
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 60000,
        forceRequestLocation: true,
        showLocationDialog: true,
      }
    );
  });

export const uploadLocation = async () => {

  const now = Date.now();

  if (now - lastUploadTime < MIN_UPLOAD_GAP) {
    console.log("Skipping duplicate upload");
    return;
  }

  lastUploadTime = now;

  const employeeId = await AsyncStorage.getItem("employeeId");
  const sessionId = await AsyncStorage.getItem("sessionId");

  if (!employeeId || !sessionId) {
    console.log("Missing employeeId/sessionId");
    return;
  }

  let token = await AsyncStorage.getItem("accessToken");
  if (!token) token = await refreshAccessToken();

  if (!token) {
    console.log("No token available");
    return;
  }

  try {

    const pos = await getCurrentLocation();

    const body = {
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude,
      session_id: sessionId,
      captured_at: new Date(pos.timestamp || Date.now()).toISOString(),
    };

    let res = await fetch(`${API_URL}${employeeId}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
console.log("uploadLocation triggered");
    if (res.status === 401) {

      token = await refreshAccessToken();

      if (!token) return;

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
      console.log("Upload failed", res.status);
    } else {
      console.log("Location uploaded", new Date().toISOString());
    }

  } catch (err) {
    console.log("uploadLocation error:", err);
  }
};

const startForeground = async ({
  title = "Tracking active",
  message = "Tracking location..."
} = {}) => {

  if (_isServiceRunning) return;

  try {

    await ReactNativeForegroundService.start({
      id: 1001,
      title,
      message,
      icon: "ic_launcher",
      ServiceType: "location",
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
  }

};

export const startBackgroundFetch = async ({
  employeeId,
  sessionId,
  intervalMinutes = DEFAULT_INTERVAL_MINUTES
} = {}) => {

  const ok = await requestPermissions();

  if (!ok) {
    console.log("Permissions not granted");
    return;
  }

  await AsyncStorage.multiSet([
    ["employeeId", String(employeeId)],
    ["sessionId", String(sessionId)],
    ["punchedIn", "true"],
  ]);

  await startForeground({
    title: "Rekory Attendance",
    message: "Location tracking active for your shift",
  });

  await uploadLocation();

ReactNativeForegroundService.add_task(
  async () => {
    console.log("Foreground task running:", new Date().toISOString());
    await uploadLocation();
  },
  {
    delay: intervalMinutes * 60 * 1000,
    onLoop: true,
    taskId: "locationTask",
  }
);

  try {

    await BackgroundFetch.configure(
      {
        minimumFetchInterval: 20,
        stopOnTerminate: false,
        startOnBoot: true,
        enableHeadless: true,
        forceAlarmManager: true,
        allowWhileIdle: true,
        requiredNetworkType: BackgroundFetch.NETWORK_TYPE_ANY,
      },

      async (taskId) => {

        console.log("BackgroundFetch event:", taskId);

        await uploadLocation();

        BackgroundFetch.finish(taskId);
      },

      (error) => {
        console.log("BackgroundFetch error:", error);
      }
    );

    await BackgroundFetch.start();

  } catch (err) {
    console.log("BackgroundFetch setup failed:", err);
  }

  console.log("Background tracking started");
};

export const stopBackgroundFetch = async () => {

  await stopForeground();

  try {
    await BackgroundFetch.stop();
  } catch (e) {
    console.log("BackgroundFetch stop error:", e);
  }

  await AsyncStorage.multiRemove([
    "employeeId",
    "sessionId",
    "punchedIn"
  ]);

  console.log("Background tracking stopped");
};

export const stopBackgroundTracking = stopBackgroundFetch;

export const backgroundFetchHeadless = async (taskId) => {

  console.log("Headless background fetch:", taskId);

  await uploadLocation();

  BackgroundFetch.finish(taskId);
};
