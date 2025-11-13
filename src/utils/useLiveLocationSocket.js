import { useEffect, useRef, useState } from "react";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";

async function getAccessToken() {
  try {
    return await AsyncStorage.getItem("accessToken");
  } catch (e) {
    console.error("Failed to retrieve access token:", e);
    return null;
  }
}

export default function useLiveLocationHttp(employeeId, sessionId) {
  const intervalRef = useRef(null);
  const [accessToken, setAccessToken] = useState(null);
  const [hasPermission, setHasPermission] = useState(false);

  // Load token once
  useEffect(() => {
    let mounted = true;
    getAccessToken().then((token) => {
      if (mounted) setAccessToken(token);
    });
    return () => { mounted = false; };
  }, []);

  // Request permissions once
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        setHasPermission(true);
      } else {
        console.warn("Location permission not granted");
      }
    })();
  }, []);

  useEffect(() => {
    // Only start if all dependencies are ready
    if (!employeeId || !sessionId || !accessToken || !hasPermission) return;

    let isSending = false; // prevent overlapping calls

    const sendLocation = async () => {
      if (isSending) return; // prevent multiple overlapping requests
      isSending = true;
      try {
        const loc = await Location.getCurrentPositionAsync({});

        const currentDate = new Date().toISOString().split("T")[0];

        const payload = {
          session_id: sessionId,
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          date: currentDate,
          timestamp: new Date().toISOString(),
        };

        await fetch(`http://192.168.29.193:8001/api/background-location/${employeeId}/`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        console.log("📤 Sent background location:", payload);
      } catch (e) {
        console.error("Failed to send location:", e);
      } finally {
        isSending = false;
      }
    };

    // Start periodic updates
    if (!intervalRef.current) {
      intervalRef.current = setInterval(sendLocation, 150000);
      sendLocation(); // first call
    }

    // Cleanup on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [employeeId, sessionId, accessToken, hasPermission]);

  return null;
}
