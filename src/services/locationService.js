import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LOCATION_TASK_NAME = "attendance-background-task";
const UPLOAD_INTERVAL = 30 * 60 * 1000; // 30 minutes

/* ==============================
   TOKEN REFRESH
============================== */
const refreshAccessToken = async () => {
  const refreshToken = await AsyncStorage.getItem("refreshToken");
  if (!refreshToken) return null;

  try {
    const response = await fetch(
      "http://178.248.112.16:8001/api/token/refresh/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: refreshToken }),
      }
    );

    if (!response.ok) return null;

    const data = await response.json();
    await AsyncStorage.setItem("accessToken", data.access);
    return data.access;
  } catch {
    return null;
  }
};

/* ==============================
   UPLOAD LOCATION
============================== */
const uploadLocation = async (latitude, longitude) => {
  const employeeId = await AsyncStorage.getItem("employeeId");
  const sessionId = await AsyncStorage.getItem("sessionId");
  let token = await AsyncStorage.getItem("accessToken");

  if (!employeeId || !sessionId || !token) return;

  try {
    let response = await fetch(
      `http://178.248.112.16:8001/api/background-location/${employeeId}/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          latitude,
          longitude,
          session_id: sessionId,
        }),
      }
    );

    // If token expired
    if (response.status === 401) {
      const newToken = await refreshAccessToken();
      if (!newToken) return;

      response = await fetch(
        `http://178.248.112.16:8001/api/background-location/${employeeId}/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${newToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            latitude,
            longitude,
            session_id: sessionId,
          }),
        }
      );
    }

    if (response.ok) {
      await AsyncStorage.setItem("lastUploadTime", Date.now().toString());
      console.log("Location uploaded successfully");
    }
  } catch (err) {
    console.log("Upload error:", err);
  }
};

/* ==============================
   BACKGROUND TASK
============================== */
TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.log("Task error:", error);
    return;
  }

  if (!data) return;

  const { locations } = data;

  if (!locations || locations.length === 0) return;

  // Always take the latest location only
  const latestLocation = locations[locations.length - 1];

  const lastUpload = await AsyncStorage.getItem("lastUploadTime");
  const now = Date.now();

  // Strict 30 minute interval control
  if (lastUpload && now - parseInt(lastUpload) < UPLOAD_INTERVAL) {
    console.log("Skipped - waiting for 30 minute interval");
    return;
  }

  await uploadLocation(
    latestLocation.coords.latitude,
    latestLocation.coords.longitude
  );
});

/* ==============================
   START TRACKING (INTERVAL BASED ONLY)
============================== */
export const startBackgroundTracking = async ({
  employeeId,
  sessionId,
  intervalMinutes = 30,
}) => {
  const hasStarted = await Location.hasStartedLocationUpdatesAsync(
    LOCATION_TASK_NAME
  );

  if (hasStarted) {
    console.log("Tracking already running");
    return;
  }

  await AsyncStorage.multiSet([
    ["employeeId", employeeId.toString()],
    ["sessionId", sessionId.toString()],
  ]);

  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    console.log("Foreground permission not granted");
    return;
  }

  const bgStatus = await Location.requestBackgroundPermissionsAsync();
  if (bgStatus.status !== "granted") {
    console.log("Background permission not granted");
    return;
  }

  await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
    accuracy: Location.Accuracy.Balanced,
    timeInterval: intervalMinutes * 60 * 1000, // System trigger hint
    distanceInterval: null, // No movement based trigger
    pausesUpdatesAutomatically: false,
    foregroundService: {
      notificationTitle: "Rekory Attendance",
      notificationBody: "Tracking location every 30 minutes",
    },
  });

  console.log("Background tracking started");
};

export const stopBackgroundTracking = async () => {
  const hasStarted = await Location.hasStartedLocationUpdatesAsync(
    LOCATION_TASK_NAME
  );

  if (hasStarted) {
    await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
  }

  await AsyncStorage.multiRemove([
    "employeeId",
    "sessionId",
    "lastUploadTime",
  ]);

  console.log("Background tracking stopped");
};