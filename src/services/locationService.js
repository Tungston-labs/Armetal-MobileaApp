import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LOCATION_TASK_NAME = "attendance-background-task";

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


const uploadLocation = async (latitude, longitude) => {
  const employeeId = await AsyncStorage.getItem("employeeId");
  const sessionId = await AsyncStorage.getItem("sessionId");

  let token = await AsyncStorage.getItem("accessToken");

  if (!employeeId || !sessionId || !token) return;

  try {
    const response = await fetch(
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

    if (response.status === 401) {
      const newToken = await refreshAccessToken();
      if (!newToken) return;

      await fetch(
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

    console.log("Location uploaded");
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

  if (data) {
    const { locations } = data;
    const location = locations[0];

    console.log("Background triggered at:", new Date().toLocaleTimeString());

    await uploadLocation(
      location.coords.latitude,
      location.coords.longitude
    );
  }
});

/* ==============================
   START TRACKING
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
  if (status !== "granted") return;

  await Location.requestBackgroundPermissionsAsync();

  await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
    accuracy: Location.Accuracy.High,
    timeInterval: intervalMinutes * 60 * 1000,
    distanceInterval: 0,
    foregroundService: {
      notificationTitle: "Rekory Attendance",
      notificationBody: "Tracking location every 30 minutes",
    },
  });

  console.log("Background tracking started");
};

/* ==============================
   STOP TRACKING
============================== */
export const stopBackgroundTracking = async () => {
  const hasStarted = await Location.hasStartedLocationUpdatesAsync(
    LOCATION_TASK_NAME
  );

  if (hasStarted) {
    await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
  }

  await AsyncStorage.multiRemove(["employeeId", "sessionId"]);

  console.log("Background tracking stopped");
};