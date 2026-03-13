import BackgroundFetch from "react-native-background-fetch";
import Geolocation from "react-native-geolocation-service";
import ReactNativeForegroundService from "@supersami/rn-foreground-service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PermissionsAndroid, Platform, Linking } from "react-native";

const API_URL = "http://178.248.112.16:8001/api/background-location/";
const DEFAULT_INTERVAL_MINUTES = 20;

let _watchId = null;
let _lastUploadTime = 0;
let _foregroundRunning = false;
let _trackingStarted = false;

/* --------------------------------------------------
   PERMISSIONS
-------------------------------------------------- */

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

/* --------------------------------------------------
   BATTERY OPTIMIZATION
-------------------------------------------------- */

export const openBatterySettings = async () => {
  try {
    await Linking.openSettings();
  } catch (e) {
    console.log("Failed to open settings", e);
  }
};

/* --------------------------------------------------
   TOKEN REFRESH
-------------------------------------------------- */

const refreshAccessToken = async () => {
  const refreshToken = await AsyncStorage.getItem("refreshToken");
  if (!refreshToken) return null;

  try {
    const res = await fetch(
      "http://178.248.112.16:8001/api/token/refresh/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: refreshToken }),
      }
    );

    if (!res.ok) return null;

    const data = await res.json();

    if (data?.access) {
      await AsyncStorage.setItem("accessToken", data.access);
      return data.access;
    }

    return null;
  } catch (e) {
    console.log("refresh token error", e);
    return null;
  }
};

/* --------------------------------------------------
   GET LOCATION
-------------------------------------------------- */

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
        showLocationDialog: true,
      }
    );
  });

/* --------------------------------------------------
   FOREGROUND SERVICE
-------------------------------------------------- */

const startForeground = async () => {
  if (_foregroundRunning) return;

  try {
  await ReactNativeForegroundService.start({
  id: 1001,
  title: "Rekory Attendance",
  message: "Verifying attendance location",
  icon: "ic_launcher",
  importance: "high",
});

    _foregroundRunning = true;
    console.log("Foreground service started");
  } catch (e) {
    console.log("Foreground start error", e);
  }
};

const stopForeground = async () => {
  if (!_foregroundRunning) return;

  try {
    await ReactNativeForegroundService.stop();
    console.log("Foreground service stopped");
  } catch (e) {
    console.log("Foreground stop error", e);
  }

  _foregroundRunning = false;
};

/* --------------------------------------------------
   UPLOAD LOCATION
-------------------------------------------------- */

export const uploadLocation = async () => {
  const now = Date.now();

  if (now - _lastUploadTime < 60000) return;
  _lastUploadTime = now;

  const employeeId = await AsyncStorage.getItem("employeeId");
  const sessionId = await AsyncStorage.getItem("sessionId");

  if (!employeeId || !sessionId) {
    console.log("Missing session info");
    return;
  }

  let token = await AsyncStorage.getItem("accessToken");

  if (!token) token = await refreshAccessToken();
  if (!token) return;

  try {
    const pos = await getCurrentLocation();

    const body = {
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude,
      session_id: sessionId,
      timestamp: new Date().toISOString(),
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

    if (res.ok) {
      console.log("Location uploaded", new Date().toISOString());
    } else {
      console.log("Server error", res.status);
    }
  } catch (e) {
    console.log("uploadLocation error", e);
  }
};

/* --------------------------------------------------
   WATCH POSITION
-------------------------------------------------- */

const startLocationWatcher = (intervalMinutes) => {

  if (_watchId !== null) {
    Geolocation.clearWatch(_watchId);
  }

  _watchId = Geolocation.watchPosition(
    async () => {
      console.log("Location watcher triggered");

      await uploadLocation();
    },
    (error) => console.log("watchPosition error", error),
    {
      enableHighAccuracy: true,
      distanceFilter: 0,
      interval: intervalMinutes * 60 * 1000,
      fastestInterval: 15 * 60 * 1000,
      forceRequestLocation: true,
    }
  );
};

/* --------------------------------------------------
   BACKGROUND FETCH
-------------------------------------------------- */

const startBackgroundFetch = async (intervalMinutes) => {

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
        console.log("BackgroundFetch triggered");

        await startForeground();
        await uploadLocation();
        await stopForeground();

        BackgroundFetch.finish(taskId);
      },

      (error) => {
        console.log("BackgroundFetch error", error);
      }
    );

    await BackgroundFetch.start();
  } catch (e) {
    console.log("BackgroundFetch setup failed", e);
  }
};

/* --------------------------------------------------
   START TRACKING
-------------------------------------------------- */

export const startBackgroundTracking = async ({
  employeeId,
  sessionId,
  intervalMinutes = DEFAULT_INTERVAL_MINUTES,
}) => {

  if (_trackingStarted) {
    console.log("Tracking already running");
    return;
  }

  const ok = await requestPermissions();
  if (!ok) return;

  await AsyncStorage.multiSet([
    ["employeeId", String(employeeId)],
    ["sessionId", String(sessionId)],
    ["punchedIn", "true"],
  ]);

  await startForeground();
  await uploadLocation();
  await stopForeground();

  startLocationWatcher(intervalMinutes);
  await startBackgroundFetch(intervalMinutes);

  _trackingStarted = true;

  console.log("Background tracking started");
};

/* --------------------------------------------------
   STOP TRACKING
-------------------------------------------------- */

export const stopBackgroundTracking = async () => {

  if (_watchId !== null) {
    Geolocation.clearWatch(_watchId);
    _watchId = null;
  }

  await stopForeground();

  try {
    await BackgroundFetch.stop();
  } catch (e) {
    console.log("BackgroundFetch stop error", e);
  }

  await AsyncStorage.multiRemove([
    "employeeId",
    "sessionId",
    "punchedIn",
  ]);

  _trackingStarted = false;

  console.log("Tracking stopped");
};

/* --------------------------------------------------
   HEADLESS TASK
-------------------------------------------------- */

export const backgroundFetchHeadless = async (event) => {

  const { taskId, timeout } = event;

  if (timeout) {
    BackgroundFetch.finish(taskId);
    return;
  }

  console.log("Headless fetch triggered");

  try {

    await startForeground();
    await uploadLocation();
    await stopForeground();

  } catch (e) {
    console.log("Headless error", e);
  }

  BackgroundFetch.finish(taskId);
};

