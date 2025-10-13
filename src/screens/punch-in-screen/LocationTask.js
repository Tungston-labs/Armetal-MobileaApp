import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import authAxios from '../../utils/authAxios'; 

const LOCATION_TASK_NAME = 'background-location-task';

// 🛰 Define background task
TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.error("Background Task Error:", error);
    return;
  }

  if (data) {
    const { locations } = data;
    const location = locations[0];

    if (location) {
      const timestamp = new Date(location.timestamp).toISOString();

      try {
        await authAxios.post('/attendance/update-location/', {
          location: `${location.coords.latitude}, ${location.coords.longitude}`,
          timestamp: timestamp,
        });
        console.log("✅ Location sent:", location.coords);
      } catch (err) {
        console.log("❌ Error sending location:", err.message);
      }
    }
  }
});

// 🚀 Start background tracking
export async function startBackgroundUpdate() {
  const { status: fgStatus } = await Location.requestForegroundPermissionsAsync();
  if (fgStatus !== 'granted') {
    console.log('❌ Foreground location permission denied');
    return;
  }

  const { status: bgStatus } = await Location.requestBackgroundPermissionsAsync();
  if (bgStatus !== 'granted') {
    console.log('❌ Background location permission denied');
    return;
  }

  const hasStarted = await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME);
  if (!hasStarted) {
    console.log("Starting background location updates...");
    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      accuracy: Location.Accuracy.High,
      timeInterval: 300000, // every 5 minutes (300000 ms)
      distanceInterval: 0,
      showsBackgroundLocationIndicator: true,
      pausesUpdatesAutomatically: false,
      foregroundService: {
        notificationTitle: 'Tracking your location',
        notificationBody: 'Your location is being recorded in the background',
      },
    });
  }
}

// 🛑 Stop background tracking
export async function stopBackgroundUpdate() {
  const hasStarted = await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME);
  if (hasStarted) {
    await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
    console.log("Stopped background location tracking");
  }
}
