import { useEffect, useRef } from "react";
import * as Location from "expo-location";

export default function useLiveLocationSocket(employeeId, sessionId) {
  const socket = useRef(null);

  useEffect(() => {
    if (!employeeId || !sessionId) return;

    // ✅ Connect to WebSocket with employeeId (as per new backend route)
    socket.current = new WebSocket(`ws://192.168.29.134:8001/ws/live-location/${employeeId}/`);

    socket.current.onopen = () => console.log("✅ Live location socket connected:", employeeId);
    socket.current.onclose = () => console.log("🔌 Live location socket closed");
    socket.current.onerror = (e) => console.log("⚠️ Socket error", e.message);

    // ✅ Function to get and send current location
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

        if (socket.current.readyState === WebSocket.OPEN) {
          socket.current.send(JSON.stringify(payload));
          console.log("📍 Sent location:", payload);
        } else {
          console.log("⚠️ WebSocket not ready, cannot send location yet");
        }
      } catch (err) {
        console.error("❌ Location send failed:", err);
      }
    };

    // ✅ Immediately send first location on punch-in
    sendLocation();

    // ✅ Send updates every 1 hour (3600000 ms)
    const interval = setInterval(sendLocation, 3600000);

    // Cleanup when leaving or session ends
    return () => {
      clearInterval(interval);
      if (socket.current) socket.current.close();
    };
  }, [employeeId, sessionId]);

  return null;
}