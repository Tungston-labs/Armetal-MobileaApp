import { useEffect, useRef, useState } from "react";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";

async function getAccessToken() {
  try {
    const token = await AsyncStorage.getItem("accessToken");
    return token;
  } catch (e) {
    console.error("Failed to retrieve access token for WebSocket:", e);
    return null;
  }
}

export default function useLiveLocationSocket(employeeId, sessionId) {
  const socket = useRef(null);
  const [accessToken, setAccessToken] = useState(null);

  // Fetch token once
  useEffect(() => {
    getAccessToken().then((token) => {
      setAccessToken(token);
    });
  }, []);

  // Setup WebSocket once token + sessionId + employeeId are ready
  useEffect(() => {
    if (!employeeId || !sessionId || !accessToken) return;

    // ✅ Match your Django route with employee_id
    const baseUrl = "ws://192.168.29.134:8001/ws/live-location";
    const url = `${baseUrl}/${employeeId}/?token=${accessToken}`;

    socket.current = new WebSocket(url);

    socket.current.onopen = () =>
      console.log("✅ Live location socket connected:", employeeId);
    socket.current.onclose = () => console.log("🔌 Live location socket closed");
    socket.current.onerror = (e) =>
      console.log("⚠️ Socket error:", e.message);

    // ✅ Function to fetch and send current location
    const sendLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.warn("❌ Location permission not granted");
          return;
        }

        const loc = await Location.getCurrentPositionAsync({});
        const payload = {
          session_id: sessionId,
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          timestamp: new Date().toISOString(),
        };

        if (socket.current?.readyState === WebSocket.OPEN) {
          socket.current.send(JSON.stringify(payload));
          console.log("📍 Sent location:", payload);
        } else {
          console.log("⚠️ WebSocket not ready to send");
        }
      } catch (err) {
        console.error("❌ Location send failed:", err);
      }
    };

    // ✅ Send immediately (on punch-in)
    sendLocation();

    // ✅ Send every 1 hour (3600000 ms)
    const interval = setInterval(sendLocation, 3600000);

    // ✅ Cleanup on unmount or logout
    return () => {
      clearInterval(interval);
      if (
        socket.current?.readyState === WebSocket.OPEN ||
        socket.current?.readyState === WebSocket.CONNECTING
      ) {
        socket.current.close();
      }
    };
  }, [employeeId, sessionId, accessToken]);

  return null;
}