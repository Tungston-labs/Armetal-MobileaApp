// attendance/backgroundLocationTask.js
import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const TASK_NAME = "SEND_LOCATION_BACKGROUND";

TaskManager.defineTask(TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.error(" Background task error:", error);
    return;
  }

  if (!data) return;
  const { locations } = data;
  const [loc] = locations || [];
  if (!loc) return;

  const { latitude, longitude } = loc.coords;
  const timestamp = new Date().toISOString();

  console.log(" Background location:", latitude, longitude);

  try {
    const token = await AsyncStorage.getItem("accessToken");
    const employeeId = await AsyncStorage.getItem("employeeId");
    const sessionId = await AsyncStorage.getItem("sessionId");

    if (!token || !employeeId || !sessionId) return;

    const payload = {
      session_id: sessionId,
      latitude,
      longitude,
      timestamp,
    };

    // ✅ Send to backend REST API
    await fetch(`http://192.168.29.193:8001/api/live-location/${employeeId}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    console.log("✅ Background location sent");
  } catch (err) {
    console.error("⚠️ Failed to send background location:", err);
  }
});
