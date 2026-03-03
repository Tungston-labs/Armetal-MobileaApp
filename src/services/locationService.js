import BackgroundGeolocation from "react-native-background-geolocation";
import AsyncStorage from "@react-native-async-storage/async-storage";

let locationSubscription = null;

const refreshAccessToken = async () => {
  console.log(" Attempting token refresh...");

  const refreshToken = await AsyncStorage.getItem("refreshToken");

  if (!refreshToken) {
    console.log(" No refresh token found.");
    return null;
  }

  try {
    const response = await fetch(
      "http://178.248.112.16:8001/api/token/refresh/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: refreshToken }),
      }
    );

    if (!response.ok) {
      console.log(" Refresh failed:", response.status);
      return null;
    }

    const data = await response.json();
    const newAccessToken = data.access;

    await AsyncStorage.setItem("accessToken", newAccessToken);

    console.log(" Token refreshed successfully");
    return newAccessToken;
  } catch (error) {
    console.log(" Refresh error:", error);
    return null;
  }
};


const uploadLocation = async ({
  employeeId,
  sessionId,
  token,
  latitude,
  longitude,
}) => {
  try {
    console.log(" Uploading location...");
    console.log(" Lat:", latitude, "Lon:", longitude);

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
      console.log(" Access token expired (401)");

      const newToken = await refreshAccessToken();

      if (!newToken) {
        console.log("Token refresh failed. Location not uploaded.");
        return;
      }

      console.log(" Retrying upload with new token...");

      return await uploadLocation({
        employeeId,
        sessionId,
        token: newToken,
        latitude,
        longitude,
      });
    }

    if (!response.ok) {
      console.log(" Upload failed:", response.status);
      return;
    }

    console.log(" Location uploaded successfully");
  } catch (error) {
    console.log(" Upload error:", error);
  }
};


export const startBackgroundTracking = async ({
  employeeId,
  sessionId,
  token,
  intervalMinutes = 30, 
}) => {
  console.log(` Starting tracking every ${intervalMinutes} minutes`);

  const intervalMs = intervalMinutes * 60 * 1000;

  const state = await BackgroundGeolocation.getState();
  if (state.enabled) {
    console.log(" Tracking already running.");
    return true;
  }

await BackgroundGeolocation.ready({
  desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
  distanceFilter: 50,

  stopOnTerminate: false,
  startOnBoot: true,
  enableHeadless: true,

  foregroundService: true,
  preventSuspend: true,

  disableStopDetection: true,

  heartbeatInterval: intervalMinutes * 60, // seconds

  notification: {
    title: "Rekory Attendance",
    text: "Location tracking active",
    priority: BackgroundGeolocation.NOTIFICATION_PRIORITY_HIGH,
  },

  debug: false,
});
BackgroundGeolocation.onHeartbeat(async () => {
  console.log("Heartbeat Triggered");

  const location = await BackgroundGeolocation.getCurrentPosition({
    samples: 1,
    persist: false,
  });

  const latestToken =
    (await AsyncStorage.getItem("accessToken")) || token;

  await uploadLocation({
    employeeId,
    sessionId,
    token: latestToken,
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  });
});
  if (locationSubscription) {
    locationSubscription.remove();
    locationSubscription = null;
  }

  locationSubscription = BackgroundGeolocation.onLocation(
    async (location) => {
      console.log("Interval Triggered");
      console.log(
        " Location:",
        location.coords.latitude,
        location.coords.longitude
      );
      console.log(" Trigger Time:", new Date().toLocaleTimeString());

      try {
        const latestToken =
          (await AsyncStorage.getItem("accessToken")) || token;

        await uploadLocation({
          employeeId,
          sessionId,
          token: latestToken,
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      } catch (err) {
        console.log(" Interval error:", err);
      }
    }
  );

  await BackgroundGeolocation.start();

  console.log(" Background tracking started");

  return true;
};

export const stopBackgroundTracking = async () => {
  console.log("🛑 Stopping background tracking...");

  if (locationSubscription) {
    locationSubscription.remove();
    locationSubscription = null;
  }

  await BackgroundGeolocation.stop();

  console.log(" Background tracking stopped");
};