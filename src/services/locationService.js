import BackgroundGeolocation from "react-native-background-geolocation";
import AsyncStorage from "@react-native-async-storage/async-storage";

let isInitialized = false;
let heartbeatSubscription = null;


const uploadLocation = async ({
  employeeId,
  sessionId,
  token,
  latitude,
  longitude,
}) => {
  try {
    const response = await fetch(
      `https://api.rekory.com/api/background-location/${employeeId}/`,
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
  console.log("Access token expired. Refreshing...");

  const refreshToken = await AsyncStorage.getItem("refreshToken");

  if (!refreshToken) {
    console.log("No refresh token found. Stopping tracking.");
    return;
  }

  const refreshResponse = await fetch(
    "https://api.rekory.com/api/token/refresh/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh: refreshToken,
      }),
    }
  );

  if (!refreshResponse.ok) {
    console.log("Refresh failed:", refreshResponse.status);
    return;
  }

  const refreshData = await refreshResponse.json();
  const newAccessToken = refreshData.access;

  await AsyncStorage.setItem("accessToken", newAccessToken);

  console.log("Token refreshed successfully");

  return await uploadLocation({
    employeeId,
    sessionId,
    token: newAccessToken,
    latitude,
    longitude,
  });
}


    const result = await response.text();
    console.log(" Manual Upload:", response.status, result);

  } catch (error) {
    console.log(" Upload error:", error);
  }
};


export const startBackgroundTracking = async ({
  employeeId,
  sessionId,
  token,
}) => {
  const state = await BackgroundGeolocation.getState();

  if (state.enabled) {
    console.log("Already running — skipping");
    return true;
  }

  if (!isInitialized) {
await BackgroundGeolocation.ready({
  desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_LOW,
  distanceFilter: 1000,
  stopOnTerminate: false,
  startOnBoot: true,
  enableHeadless: true,
  preventSuspend: true,
  foregroundService: true,

  heartbeatInterval: 1800, 

  autoSync: false,
  batchSync: false,

  debug: false,
  logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,

  notification: {
    title: "Rekory Attendance",
    text: "Location updates every 30 minutes",
  },
});


    BackgroundGeolocation.onLocation(async (location) => {
      console.log(" Location received");

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

    isInitialized = true;
  }

  await BackgroundGeolocation.start();
  console.log(" Background tracking started");

  setTimeout(async () => {
    console.log(" Initial location fetch");

    await BackgroundGeolocation.getCurrentPosition({
      samples: 1,
      timeout: 30,
      persist: false,
    });
  }, 3000);

  if (!heartbeatSubscription) {
    heartbeatSubscription =
      BackgroundGeolocation.onHeartbeat(async () => {
        console.log(" 1 Hour Location Triggered");

        await BackgroundGeolocation.getCurrentPosition({
          samples: 1,
          timeout: 30,
          persist: false,
        });
      });
  }

  return true;
};


export const stopBackgroundTracking = async () => {
  if (heartbeatSubscription) {
    heartbeatSubscription.remove();
    heartbeatSubscription = null;
  }

  await BackgroundGeolocation.stop();
  BackgroundGeolocation.removeListeners();

  console.log(" Background tracking stopped");
};
