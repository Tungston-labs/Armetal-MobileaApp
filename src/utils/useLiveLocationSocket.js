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
  const [accessToken, setAccessToken] = useState(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    getAccessToken().then((token) => setAccessToken(token));
  }, []);

  useEffect(() => {
    if (!employeeId || !sessionId || !accessToken) return;

    const baseUrl = "ws://192.168.29.193:8001/ws/live-location";
    const url = `${baseUrl}/${employeeId}/?token=${accessToken}`;

    // Close any old socket before opening new one
    if (socketRef.current) {
      socketRef.current.close();
    }

    const socket = new WebSocket(url);
    socketRef.current = socket;

    const sendLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.warn("Location permission not granted");
          return;
        }

        const loc = await Location.getCurrentPositionAsync({});
        const payload = {
          session_id: sessionId,
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          timestamp: new Date().toISOString(),
        };

        if (socket.readyState === WebSocket.OPEN) {
          socket.send(JSON.stringify(payload));
          console.log("📍 Sent location:", payload);
        } else {
          console.log("⚠️ WebSocket not ready to send");
        }
      } catch (err) {
        console.error("❌ Location send failed:", err);
      }
    };

    socket.onopen = () => {
      console.log("✅ Live location socket connected:", employeeId);
      // First send after 2s delay, then every 15s
      sendLocation();
      intervalRef.current = setInterval(sendLocation, 15000);
    };

    socket.onmessage = (event) => {
      console.log("📬 Message from server:", event.data);
    };

    socket.onerror = (e) => {
      console.error("⚠️ Socket error:", e.message);
    };

    socket.onclose = (e) => {
      console.warn("🔌 Socket closed:", e.code, e.reason);
      if (intervalRef.current) clearInterval(intervalRef.current);
      // Optional: try to reconnect after delay
      setTimeout(() => {
        console.log("🔁 Reconnecting socket...");
        if (!socketRef.current || socketRef.current.readyState === WebSocket.CLOSED) {
          socketRef.current = null; // Reset before next effect runs
        }
      }, 5000);
    };

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (socket && (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING)) {
        socket.close();
      }
    };
  }, [employeeId, sessionId, accessToken]);

  return null;
}
