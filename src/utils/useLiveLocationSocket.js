import { useEffect, useRef } from "react";
import * as Location from "expo-location";

export default function useLiveLocationSocket(sessionId) {
  const socket = useRef(null);

  useEffect(() => {
    if (!sessionId) return;

    socket.current = new WebSocket("ws://YOUR_SERVER_IP:8000/ws/live-location/");

    socket.current.onopen = () => console.log(" Live location socket connected");
    socket.current.onclose = () => console.log(" Live location socket closed");
    socket.current.onerror = (e) => console.log("Socket error", e.message);

    const sendLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") return;

        const loc = await Location.getCurrentPositionAsync({});
        const payload = {
          session_id: sessionId,
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          timestamp: new Date().toISOString(),
        };
        if (socket.current.readyState === WebSocket.OPEN) {
          socket.current.send(JSON.stringify(payload));
          console.log(" Sent location", payload);
        }
      } catch (err) {
        console.error("Location send failed:", err);
      }
    };

    sendLocation(); 
    const interval = setInterval(sendLocation, 1800000); 

    return () => {
      clearInterval(interval);
      socket.current.close();
    };
  }, [sessionId]);

  return null;
}
