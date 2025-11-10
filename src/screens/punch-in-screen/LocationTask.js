import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import * as BackgroundFetch from 'expo-background-fetch';
import authAxios from '../../utils/authAxios';  // your axios wrapper

const LOCATION_TASK_NAME = 'background-location-task';


TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.error("Background Task Error:", error);
    return;
  }

  console.log("📡 Background task triggered");

  try {
    const { status: fgStatus } = await Location.requestForegroundPermissionsAsync();
    if (fgStatus !== 'granted') return;

    const location = await Location.getCurrentPositionAsync({});
    console.log("📍 Location received:", location.coords);

    await authAxios.post('/attendance/update-location/', {
      location: `${location.coords.latitude}, ${location.coords.longitude}`,
      timestamp: new Date().toISOString(),
    });

    console.log("✅ Location sent successfully");
  } catch (err) {
    console.log("❌ Failed to send location:", err.message);
  }
});

// 2️⃣ Start background fetch
export async function startBackgroundUpdate() {
  const hasStarted = await TaskManager.isTaskRegisteredAsync(LOCATION_TASK_NAME);
  if (!hasStarted) {
    await BackgroundFetch.registerTaskAsync(LOCATION_TASK_NAME, {
      minimumInterval: 120, // 1 hour
      stopOnTerminate: false,
      startOnBoot: true,
    });
    console.log("Background fetch started ✅");
  }
}

export async function stopBackgroundUpdate() {
  const hasStarted = await TaskManager.isTaskRegisteredAsync(LOCATION_TASK_NAME);
  if (hasStarted) {
    await BackgroundFetch.unregisterTaskAsync(LOCATION_TASK_NAME);
    console.log("Background fetch stopped ❌");
  }
}
