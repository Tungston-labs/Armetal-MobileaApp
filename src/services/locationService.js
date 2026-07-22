import AsyncStorage from "@react-native-async-storage/async-storage";
import BackgroundFetch from "react-native-background-fetch";
import Geolocation from "react-native-geolocation-service";
import ReactNativeForegroundService from "@supersami/rn-foreground-service";
import { PermissionsAndroid, Platform } from "react-native";
import {
  saveOfflineLocation,
  syncOfflineLocations,
  isInternetAvailable,
  startOfflineSyncListener,
} from "./offlineLocationQueue";

const buildOfflineLocationPayload = ({
  employeeId,
  sessionId,
  coords,
  capturedAt,
}) => ({
  employeeId,
  sessionId,
  latitude: coords.latitude,
  longitude: coords.longitude,
  accuracy: coords.accuracy ?? null,
  speed: coords.speed ?? null,
  heading: coords.heading ?? null,
  altitude: coords.altitude ?? null,
  provider: coords.provider ?? null,
  capturedAt: capturedAt || new Date().toISOString(),
});
const API_URL = "https://api.rekory.com/api/background-location/";
const DEFAULT_INTERVAL_MINUTES = 15;
const MINIMUM_FETCH_INTERVAL_MINUTES = 15;
const LAST_UPLOAD_AT_KEY = "lastLocationUploadAt";
const TRACKING_INTERVAL_KEY = "trackingIntervalMinutes";
const SLEEP_CHUNK_MS = 30 * 1000;
const ANDROID_FOREGROUND_SERVICE_ID = 42015;
const ANDROID_FOREGROUND_TASK_ID = "attendance-location-tracking";

let foregroundServiceRegistered = false;
let foregroundUploadInFlight = false;
let backgroundFetchConfigured = false;
let offlineSyncListenerStarted = false;

const normalizeIntervalMinutes = (intervalMinutes) => {
  const parsed = Number(intervalMinutes);

  if (!Number.isFinite(parsed)) {
    return DEFAULT_INTERVAL_MINUTES;
  }

  return Math.max(MINIMUM_FETCH_INTERVAL_MINUTES, Math.round(parsed));
};

const getStoredIntervalMinutes = async () => {
  const storedValue = await AsyncStorage.getItem(TRACKING_INTERVAL_KEY);
  return normalizeIntervalMinutes(storedValue);
};

const getIntervalMs = (intervalMinutes) =>
  normalizeIntervalMinutes(intervalMinutes) * 60 * 1000;

const getLastUploadAt = async () => {
  const raw = await AsyncStorage.getItem(LAST_UPLOAD_AT_KEY);
  const parsed = Number(raw);

  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
};

const markUploadComplete = async (capturedAtMs = Date.now()) => {
  await AsyncStorage.setItem(LAST_UPLOAD_AT_KEY, String(capturedAtMs));
};

const getDelayUntilNextUpload = async (intervalMinutes) => {
  const lastUploadAt = await getLastUploadAt();

  if (!lastUploadAt) {
    return 0;
  }

  return Math.max(
    getIntervalMs(intervalMinutes) - (Date.now() - lastUploadAt),
    0,
  );
};

const getForegroundNotificationMessage = (intervalMinutes) =>
  `Tracking your location every ${normalizeIntervalMinutes(intervalMinutes)} minutes while punched in`;

const ensureForegroundServiceRegistered = () => {
  if (Platform.OS !== "android" || foregroundServiceRegistered) {
    return true;
  }

  ReactNativeForegroundService.register({
    config: {
      alert: false,
      onServiceErrorCallBack: () => {
        console.log(
          "[LocationService] Foreground service reported an Android service error",
        );
      },
    },
  });

  foregroundServiceRegistered = true;
  return true;
};

const getValidAccessToken = async () => AsyncStorage.getItem("accessToken");

const runScheduledCaptureIfDue = async (source = "reconnect-capture") => {
  const intervalMinutes = await getStoredIntervalMinutes();
  const delayUntilNextUpload = await getDelayUntilNextUpload(intervalMinutes);

  if (delayUntilNextUpload > 0) {
    return false;
  }

  return uploadLocation({
    intervalMinutes,
    source,
  });
};

export const ensureOfflineSyncListener = () => {
  if (offlineSyncListenerStarted) {
    return;
  }

  startOfflineSyncListener({
    sendLocationFn: sendLocationRequest,
    getToken: getValidAccessToken,
    onReconnect: async () => {
      await runScheduledCaptureIfDue("post-sync-scheduled-capture");
    },
  });
  offlineSyncListenerStarted = true;
  console.log("[LocationService] Offline sync listener started");

  syncOfflineLocations({
    sendLocationFn: sendLocationRequest,
    getToken: getValidAccessToken,
  })
    .then(() => runScheduledCaptureIfDue("initial-sync-capture"))
    .catch((err) => {
      console.log(
        "[LocationService] Initial offline sync failed:",
        err?.message || err,
      );
    });
};

export const getCurrentLocation = () =>
  new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      (position) => resolve(position),
      (error) => reject(error),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 10000,
        forceRequestLocation: true,
        showLocationDialog: true,
      },
    );
  });

const requestAndroidPermissions = async ({ includeBackground }) => {
  const permissions = [
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
  ];

  if (includeBackground) {
    permissions.push(PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION);
  }

  if (PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS) {
    permissions.push(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
  }

  const granted = await PermissionsAndroid.requestMultiple(permissions);
  const fineOk =
    granted[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] === "granted";
  const coarseOk =
    granted[PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION] ===
    "granted";
  const backgroundOk = includeBackground
    ? granted[PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION] ===
      "granted"
    : true;

  console.log("[Permissions] Android permissions:", JSON.stringify(granted));
  return fineOk && coarseOk && backgroundOk;
};

const requestPermissions = async ({ includeBackground = true } = {}) => {
  if (Platform.OS === "ios") {
    const authorization = await Geolocation.requestAuthorization(
      includeBackground ? "always" : "whenInUse",
    );

    return authorization === "granted";
  }

  return requestAndroidPermissions({ includeBackground });
};

export const requestForegroundLocationPermission = async () =>
  requestPermissions({ includeBackground: false });

const sendLocationRequest = async ({
  employeeId,
  sessionId,
  coords,
  token,
  capturedAt,
}) =>
  fetch(`${API_URL}${employeeId}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      latitude: coords.latitude,
      longitude: coords.longitude,
      session_id: sessionId,
      logged_at: capturedAt,
      captured_at: capturedAt,
    }),
  });

export const uploadLocation = async ({
  coords: preloadedCoords,
  force = false,
  intervalMinutes,
  source = "manual",
} = {}) => {
  const effectiveIntervalMinutes = normalizeIntervalMinutes(
    intervalMinutes ?? (await getStoredIntervalMinutes())
  );

  console.log(
    "[LocationService] uploadLocation source:",
    source,
    "| interval:",
    effectiveIntervalMinutes,
    "min"
  );

  const employeeId = await AsyncStorage.getItem("employeeId");
  const sessionId = await AsyncStorage.getItem("sessionId");
  const punchedIn = await AsyncStorage.getItem("punchedIn");

  if (!employeeId || !sessionId || punchedIn !== "true") {
    console.log("[LocationService] Missing employeeId/sessionId or not punched in");
    return false;
  }

  if (!force) {
    const delayUntilNextUpload = await getDelayUntilNextUpload(
      effectiveIntervalMinutes
    );

    if (delayUntilNextUpload > 0) {
      console.log(
        "[LocationService] Skipping upload. Next upload due in",
        Math.ceil(delayUntilNextUpload / 1000),
        "seconds"
      );
      return false;
    }
  }

  // Get GPS first
  let coords = preloadedCoords;

  if (!coords) {
    try {
      const position = await getCurrentLocation();
      coords = position.coords;
    } catch (gpsErr) {
      console.log("[LocationService] GPS error:", gpsErr?.message || gpsErr);
      return false;
    }
  }

  // Check internet AFTER GPS
  const connected = await isInternetAvailable();

  const capturedAtMs = Date.now();
  const capturedAt = new Date(capturedAtMs).toISOString();
  const offlinePayload = buildOfflineLocationPayload({
    employeeId,
    sessionId,
    coords,
    capturedAt,
  });

  if (!connected) {
    console.log("[LocationService] Offline. Saving location locally.");

    await saveOfflineLocation(offlinePayload);
    await markUploadComplete(capturedAtMs);

    return true;
  }

  const token = await getValidAccessToken();

  if (!token) {
    console.log("[LocationService] No access token. Saving locally.");

    await saveOfflineLocation(offlinePayload);
    await markUploadComplete(capturedAtMs);

    return true;
  }

  try {
    const res = await sendLocationRequest({
      employeeId,
      sessionId,
      coords,
      token,
      capturedAt,
    });

    if (!res.ok) {
      console.log("[LocationService] Upload failed. Saving locally.");

      await saveOfflineLocation(offlinePayload);
      await markUploadComplete(capturedAtMs);

      return false;
    }

    await markUploadComplete(capturedAtMs);

    await syncOfflineLocations({
      sendLocationFn: sendLocationRequest,
      getToken: getValidAccessToken,
    });

    console.log(
      "[LocationService] Uploaded:",
      coords.latitude,
      coords.longitude,
    );

    return true;
  } catch (err) {
    console.log("[LocationService] Network error. Saving locally.");

    await saveOfflineLocation(offlinePayload);
    await markUploadComplete(capturedAtMs);

    return false;
  }
};

const syncForegroundTask = (intervalMinutes) => {
  if (Platform.OS !== "android") {
    return false;
  }

  if (!ensureForegroundServiceRegistered()) {
    return false;
  }

  ReactNativeForegroundService.update_task(
    async () => {
      if (foregroundUploadInFlight) {
        return;
      }

      const punchedIn = await AsyncStorage.getItem("punchedIn");

      if (punchedIn !== "true") {
        return;
      }

      foregroundUploadInFlight = true;

      try {
        const effectiveInterval = normalizeIntervalMinutes(
          await getStoredIntervalMinutes(),
        );

        await uploadLocation({
          intervalMinutes: effectiveInterval,
          source: "android-foreground-service",
        });
      } catch (error) {
        console.log(
          "[LocationService] Foreground task error:",
          error?.message || error,
        );
      } finally {
        foregroundUploadInFlight = false;
      }
    },
    {
      taskId: ANDROID_FOREGROUND_TASK_ID,
      delay: SLEEP_CHUNK_MS,
      onLoop: true,
      onError: (error) => {
        console.log(
          "[LocationService] Foreground loop error:",
          error?.message || error,
        );
      },
    },
  );

  console.log(
    `[LocationService] Android foreground task synced for ${normalizeIntervalMinutes(intervalMinutes)} minute tracking`,
  );
  return true;
};

const startAndroidForegroundService = async (intervalMinutes) => {
  if (Platform.OS !== "android") {
    return false;
  }

  if (!syncForegroundTask(intervalMinutes)) {
    return false;
  }

  const notificationConfig = {
    id: ANDROID_FOREGROUND_SERVICE_ID,
    title: "Rekory Attendance",
    message: getForegroundNotificationMessage(intervalMinutes),
    ServiceType: "location",
    icon: "ic_launcher",
    largeIcon: "ic_launcher",
    importance: "low",
    visibility: "public",
    color: "#3352BA",
  };

  try {
    if (ReactNativeForegroundService.is_running()) {
      await ReactNativeForegroundService.update(notificationConfig);
      console.log("[LocationService] Android foreground notification updated");
    } else {
      await ReactNativeForegroundService.start(notificationConfig);
      console.log("[LocationService] Android foreground service started");
    }

    return true;
  } catch (error) {
    console.log(
      "[LocationService] Failed to start Android foreground service:",
      error?.message || error,
    );
    return false;
  }
};

const stopAndroidForegroundService = async () => {
  if (Platform.OS !== "android") {
    return;
  }

  foregroundUploadInFlight = false;

  try {
    if (
      ReactNativeForegroundService.is_task_running(ANDROID_FOREGROUND_TASK_ID)
    ) {
      ReactNativeForegroundService.remove_task(ANDROID_FOREGROUND_TASK_ID);
    }

    ReactNativeForegroundService.remove_all_tasks();
    await ReactNativeForegroundService.stopAll();
    console.log("[LocationService] Android foreground service stopped");
  } catch (error) {
    console.log(
      "[LocationService] stopAndroidForegroundService error:",
      error?.message || error,
    );
  }
};

const configureBackgroundFetch = async (intervalMinutes) => {
  const effectiveInterval = normalizeIntervalMinutes(intervalMinutes);

  if (!backgroundFetchConfigured) {
    try {
      const status = await BackgroundFetch.configure(
        {
          minimumFetchInterval: effectiveInterval,
          stopOnTerminate: false,
          startOnBoot: true,
          enableHeadless: true,
          forceAlarmManager: true,
          requiredNetworkType: BackgroundFetch.NETWORK_TYPE_NONE,
          requiresBatteryNotLow: false,
          requiresCharging: false,
          requiresDeviceIdle: false,
          requiresStorageNotLow: false,
        },
        async (taskId) => {
          console.log("[BackgroundFetch] Event fired:", taskId);

          try {
            const storedInterval = await getStoredIntervalMinutes();

            await uploadLocation({
              intervalMinutes: storedInterval,
              source: "background-fetch",
            });
          } catch (err) {
            console.log("[BackgroundFetch] Upload error:", err?.message || err);
          }

          BackgroundFetch.finish(taskId);
        },
        async (taskId) => {
          console.log("[BackgroundFetch] Timeout:", taskId);
          BackgroundFetch.finish(taskId);
        },
      );

      backgroundFetchConfigured = true;
      console.log("[BackgroundFetch] configure status:", status);
    } catch (error) {
      console.log(
        "[BackgroundFetch] Configure error:",
        error?.message || error,
      );
      return false;
    }
  }

  try {
    await BackgroundFetch.start();
    console.log("[BackgroundFetch] Started");
    return true;
  } catch (error) {
    console.log("[BackgroundFetch] Start error:", error?.message || error);
    return false;
  }
};

export const startBackgroundTracking = async ({
  employeeId: rawEmployeeId,
  sessionId: rawSessionId,
  intervalMinutes = DEFAULT_INTERVAL_MINUTES,
} = {}) => {
  const employeeId =
    rawEmployeeId ?? (await AsyncStorage.getItem("employeeId"));
  const sessionId = rawSessionId ?? (await AsyncStorage.getItem("sessionId"));
  const effectiveInterval = normalizeIntervalMinutes(
    intervalMinutes ?? (await getStoredIntervalMinutes()),
  );

  console.log(
    "[LocationService] startBackgroundTracking employee:",
    employeeId,
    "| session:",
    sessionId,
    "| interval:",
    effectiveInterval,
  );

  if (!employeeId || !sessionId) {
    console.log("[LocationService] Missing employeeId/sessionId");
    return false;
  }

  const permissionsGranted = await requestPermissions({
    includeBackground: true,
  });

  if (!permissionsGranted) {
    console.log("[LocationService] Permissions not granted");
    return false;
  }

  const previousSessionId = await AsyncStorage.getItem("sessionId");

  await AsyncStorage.multiSet([
    ["employeeId", String(employeeId)],
    ["sessionId", String(sessionId)],
    ["punchedIn", "true"],
    [TRACKING_INTERVAL_KEY, String(effectiveInterval)],
  ]);

  if (previousSessionId !== String(sessionId)) {
    await AsyncStorage.removeItem(LAST_UPLOAD_AT_KEY);
  }

  ensureOfflineSyncListener();

  const foregroundServiceStarted =
    await startAndroidForegroundService(effectiveInterval);

  await uploadLocation({
    force: previousSessionId !== String(sessionId),
    intervalMinutes: effectiveInterval,
    source:
      previousSessionId !== String(sessionId) ? "punch-in" : "session-restore",
  });

  const backgroundFetchStarted =
    await configureBackgroundFetch(effectiveInterval);

  return foregroundServiceStarted || backgroundFetchStarted;
};

export const stopBackgroundTracking = async () => {
  console.log("[LocationService] stopBackgroundTracking called");

  try {
    await BackgroundFetch.stop();
    console.log("[LocationService] BackgroundFetch stopped");
  } catch (error) {
    console.log(
      "[LocationService] BackgroundFetch.stop error:",
      error?.message || error,
    );
  }

  await stopAndroidForegroundService();

  await AsyncStorage.multiRemove([
    "employeeId",
    "sessionId",
    "punchedIn",
    LAST_UPLOAD_AT_KEY,
    TRACKING_INTERVAL_KEY,
  ]);
};

export const backgroundFetchHeadless = async (event) => {
  const taskId = event?.taskId;
  const isTimeout = event?.timeout;

  if (isTimeout) {
    console.log("[Headless] Timeout:", taskId);
    BackgroundFetch.finish(taskId);
    return;
  }

  console.log("[Headless] Event:", taskId);

  try {
    const intervalMinutes = await getStoredIntervalMinutes();

    await uploadLocation({
      intervalMinutes,
      source: "headless-background-fetch",
    });
  } catch (error) {
    console.log("[Headless] Upload error:", error?.message || error);
  }

  BackgroundFetch.finish(taskId);
};

export const destroyTracking = stopBackgroundTracking;
export const startTracking = startBackgroundTracking;
export const stopTracking = stopBackgroundTracking;

export const sendImmediateLocation = async () => {
  const position = await getCurrentLocation();

  return uploadLocation({
    coords: position.coords,
    force: true,
    source: "send-immediate-location",
  });
};

if (Platform.OS === "android") {
  ensureForegroundServiceRegistered();
}
