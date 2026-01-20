// attendance/backgroundLocationTask.js
import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";

export const TASK_NAME = "SEND_LOCATION_BACKGROUND";

// ---- OFFLINE STORAGE HELPERS ----
const OFFLINE_KEY = "OFFLINE_LOCATION_LOGS";

async function saveOffline(log) {
  try {
    const existing = await AsyncStorage.getItem(OFFLINE_KEY);
    const arr = existing ? JSON.parse(existing) : [];
    arr.push(log);
    await AsyncStorage.setItem(OFFLINE_KEY, JSON.stringify(arr));
    console.log("📥 Saved offline log");
  } catch (err) {
    console.log("Error saving offline log:", err);
  }
}

async function syncOfflineLogs(employeeId, token) {
  const state = await NetInfo.fetch();
  if (!state.isConnected) return; // No internet

  const pending = await AsyncStorage.getItem(OFFLINE_KEY);
  if (!pending) return;

  const logs = JSON.parse(pending);
  if (logs.length === 0) return;

  try {
    const res = await fetch(
      `http://178.248.112.16:8001/api/background-bulk-sync/${employeeId}/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ logs }),
      }
    );

    if (res.ok) {
      console.log("📤 Synced offline logs");
      await AsyncStorage.removeItem(OFFLINE_KEY);
    } else {
      console.log(" Sync failed, will retry later")
    }
  } catch (err) {
    console.log(" Sync error:", err);
  }
}

// ---- BACKGROUND TASK ----
TaskManager.defineTask(TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.error("Background task error:", error);
    return;
  }

  if (!data?.locations?.length) return;

  const loc = data.locations[0];
  if (!loc?.coords) return;

  const { latitude, longitude } = loc.coords;
  const timestamp = new Date().toISOString();

  console.log("[BG TASK] Location:", latitude, longitude, timestamp);

  const token = await AsyncStorage.getItem("accessToken");
  const employeeId = await AsyncStorage.getItem("employeeId");
  const sessionId = await AsyncStorage.getItem("sessionId");

  if (!token || !employeeId || !sessionId) {
    console.log("[BG TASK] Missing credentials");
    return;
  }

  const payload = {
    session_id: sessionId,
    latitude,
    longitude,
    timestamp,
  };

  // Try direct send
  try {
    const resp = await fetch(
      `http://178.248.112.16:8001/api/background-location/${employeeId}/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      }
    );

    if (!resp.ok) throw new Error("Server/Network error");

    console.log(" Background location SENT");
  } catch (err) {
    console.log(" Direct send failed — saving offline");
    await saveOffline(payload);
  }

  await syncOfflineLogs(employeeId, token);
});
