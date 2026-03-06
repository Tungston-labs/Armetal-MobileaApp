import Geolocation from "react-native-geolocation-service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

let watchId = null;
let uploading = false;
let lastUploadTime = 0;

const API_URL = "http://178.248.112.16:8001/api/background-location/";
const REFRESH_URL = "http://178.248.112.16:8001/api/token/refresh/";

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

const uploadLocation = async (position) => {
  if (uploading) return;

  uploading = true;

  try {
    const employeeId = await AsyncStorage.getItem("employeeId");
    const sessionId = await AsyncStorage.getItem("sessionId");
    let token = await AsyncStorage.getItem("accessToken");

    if (!employeeId || !sessionId || !token) {
      uploading = false;
      return;
    }

    const body = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
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

    // refresh token if expired
    if (res.status === 401) {
      const newToken = await refreshAccessToken();

      if (newToken) {
        res = await fetch(`${API_URL}${employeeId}/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${newToken}`,
          },
          body: JSON.stringify(body),
        });
      }
    }

    if (res.ok) {
      console.log("📍 iOS location uploaded");
    } else {
      console.log("Upload failed:", res.status);
    }

  } catch (err) {
    console.log("iOS upload error", err);
  }

  uploading = false;
};

export const startIOSLocationTracking = () => {
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

export const stopIOSLocationTracking = () => {
  if (watchId !== null) {
    Geolocation.clearWatch(watchId);
    watchId = null;
    console.log("🛑 iOS Tracking Stopped");
  }
};