import Geolocation from "react-native-geolocation-service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import {
  createQueuedLocationItem,
  enqueueLocationItem,
  getQueuedLocationCount,
  isNetworkAvailable,
  isValidLocationPosition,
  syncQueuedLocations,
} from "./offlineLocationQueue";

let watchId = null;
let uploading = false;
let lastUploadTime = 0;

const API_URL = "https://api.rekory.com/api/background-location/";
const REFRESH_URL = "https://api.rekory.com/api/token/refresh/";
const UPLOAD_TIMEOUT_MS = 30000;

// 20 minutes interval
const LOCATION_INTERVAL = 20 * 60 * 1000; 

const refreshAccessToken = async () => {
  try {
    const refresh = await AsyncStorage.getItem("refreshToken");

    if (!refresh) return null;

    const res = await fetch(REFRESH_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh: refresh,
      }),
    });

    const data = await res.json();

    if (data?.access) {
      await AsyncStorage.setItem("accessToken", data.access);
      return data.access;
    }

    return null;
  } catch (err) {
    console.log("Token refresh failed", err);
    return null;
  }
};

const fetchWithTimeout = async (url, options = {}) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), UPLOAD_TIMEOUT_MS);

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeoutId);
  }
};

const getLocationUploadContext = async () => {
  const [employeeId, sessionId] = await AsyncStorage.multiGet([
    "employeeId",
    "sessionId",
  ]);

  return {
    employeeId: employeeId?.[1] ?? null,
    sessionId: sessionId?.[1] ?? null,
  };
};

const uploadLocationItemToServer = async (locationItem) => {
  const employeeId = locationItem.employeeId;
  const sessionId = locationItem.sessionId;
  let token = await AsyncStorage.getItem("accessToken");

  if (!employeeId || !sessionId) {
    throw new Error("Missing employeeId/sessionId");
  }

  if (!token) {
    token = await refreshAccessToken();
  }

  if (!token) {
    throw new Error("No token available");
  }

  const body = {
    latitude: locationItem.latitude,
    longitude: locationItem.longitude,
    session_id: sessionId,
    captured_at: locationItem.timestamp,
  };

  let res = await fetchWithTimeout(`${API_URL}${employeeId}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  // refresh token if expired
  if (res.status === 401) {
    const newToken = await refreshAccessToken();

    if (newToken) {
      res = await fetchWithTimeout(`${API_URL}${employeeId}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${newToken}`,
        },
        body: JSON.stringify(body),
      });
    }
  }

  if (!res.ok) {
    throw new Error(`Upload failed: ${res.status}`);
  }

  console.log("📍 iOS location uploaded");
};

export const uploadQueuedIOSLocation = async (locationItem) => {
  await uploadLocationItemToServer(locationItem);
};

const uploadLocation = async (position) => {
  if (!isValidLocationPosition(position)) {
    console.log("Invalid iOS location skipped");
    return;
  }

  try {
    const { employeeId, sessionId } = await getLocationUploadContext();
    const locationItem = createQueuedLocationItem(position, {
      employeeId,
      sessionId,
    });

    if (!locationItem) return;

    if (!employeeId || !sessionId) {
      console.log("Missing employeeId/sessionId");
      return;
    }

    const queueCount = await getQueuedLocationCount();
    const online = await isNetworkAvailable();

    if (!online || uploading || queueCount > 0) {
      await enqueueLocationItem(locationItem);
      console.log("📍 iOS location queued");

      if (online) {
        await syncQueuedLocations(uploadQueuedIOSLocation);
      }

      return;
    }

    uploading = true;

    try {
      await uploadLocationItemToServer(locationItem);
      await syncQueuedLocations(uploadQueuedIOSLocation);
    } catch (err) {
      console.log("iOS upload error", err);
      await enqueueLocationItem(locationItem);
      console.log("📍 iOS location queued");
    } finally {
      uploading = false;
    }
  } catch (err) {
    console.log("iOS location handling error", err);
  }
};

export const startIOSLocationFetch = () => {
  if (Platform.OS !== "ios") return;

  if (watchId !== null) return;

  watchId = Geolocation.watchPosition(
    async (position) => {

      const now = Date.now();

      // 🚀 allow only 1 upload every 20 minutes
      if (now - lastUploadTime < LOCATION_INTERVAL) {
        return;
      }

      lastUploadTime = now;

      // ignore very bad GPS readings
      if (position.coords.accuracy > 100) {
        console.log("Skipping inaccurate GPS");
        return;
      }

      await uploadLocation(position);

    },
    (error) => console.log("watchPosition error:", error),
    {
      enableHighAccuracy: true,

      distanceFilter: 0, // allow updates even if not moving

      interval: 60000, // request GPS every 1 minute
      fastestInterval: 60000,

      showsBackgroundLocationIndicator: true,

      useSignificantChanges: false,

      pausesLocationUpdatesAutomatically: false,

      activityType: "other",
    }
  );

  console.log("📡 iOS Tracking Started (20 min interval)");
};

export const stopIOSLocationFetch= () => {
  if (watchId !== null) {
    Geolocation.clearWatch(watchId);
    watchId = null;
    console.log("🛑 iOS Tracking Stopped");
  }
};
