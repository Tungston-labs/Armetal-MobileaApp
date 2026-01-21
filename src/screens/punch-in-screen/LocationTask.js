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

  if (data) {
    const location = data.locations[0];
    if (location) {
      console.log("📍 Location received:", location.coords);
      try {
        const res = await authAxios.post('/attendance/update-location/', {
          location: `${location.coords.latitude}, ${location.coords.longitude}`,
          timestamp: new Date(location.timestamp).toISOString(),
        });
        console.log(" API hit success:", res.data);
      } catch (err) {
        console.log("❌ API hit failed:", err.response?.data || err.message);
      }
    }
  }
});

// 2️⃣ Start background fetch
export async function startBackgroundUpdate() {
  const { status: fgStatus } = await Location.requestForegroundPermissionsAsync();
  if (fgStatus !== 'granted') {
    console.log(' Foreground location permission denied');
    return;
  }

  const { status: bgStatus } = await Location.requestBackgroundPermissionsAsync();
  if (bgStatus !== 'granted') {
    console.log('Background location permission denied');
    return;
  }

  const hasStarted = await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME);
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
