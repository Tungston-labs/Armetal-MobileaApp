import { useEffect, useRef, useState } from "react";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";

async function getAccessToken() {
  try {
    return await AsyncStorage.getItem("accessToken");
  } catch (e) {
    console.error("Failed to retrieve access token for WebSocket:", e);
    return null;
  }
}

export default function useLiveLocationSocket(employeeId, sessionId) {
  const socketRef = useRef(null);
  const intervalRef = useRef(null);
  const [accessToken, setAccessToken] = useState(null);
  const [hasPermission, setHasPermission] = useState(false);

  // Get token once
  useEffect(() => {
    getAccessToken().then((token) => setAccessToken(token));
  }, []);

  // Ask permission once
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
    if (!employeeId || !sessionId || !accessToken || !hasPermission) return;

    const baseUrl = "ws://192.168.29.193:8001/ws/live-location";
    const url = `${baseUrl}/${employeeId}/?token=${accessToken}`;

    // Close previous socket if exists
    if (socketRef.current) {
      socketRef.current.close();
    }

    const socket = new WebSocket(url);
    socketRef.current = socket;
  
 const sendLocation = async () => {
  try {
    const token = await AsyncStorage.getItem("accessToken");

    const loc = await Location.getCurrentPositionAsync({});
    const payload = {
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
      timestamp: new Date().toISOString(),
    };

    await fetch(`http://192.168.29.193:8001/api/background-location/${employeeId}/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    console.log("📤 Sent background location:", payload);
  } catch (e) {
    console.error("Failed to send location:", e);
  }
};


    socket.onopen = () => {
      console.log("✅ WebSocket connected for:", employeeId);
    };

    socket.onerror = (e) => {
      console.error("⚠️ Socket error:", e.message);
    };

    socket.onclose = (e) => {
      console.warn("🔌 Socket closed:", e.code, e.reason);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    // 🔁 Start periodic location updates
    if (!intervalRef.current) {
      intervalRef.current = setInterval(sendLocation, 15000);
    }

    // 🧹 Cleanup
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
    };
  }, [employeeId, sessionId, accessToken, hasPermission]);

  return null;
}
