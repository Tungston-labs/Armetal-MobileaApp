import { useEffect, useRef, useState } from "react";
import * as Location from "expo-location";
import AsyncStorage from '@react-native-async-storage/async-storage'; 

async function getAccessToken() {
  try {
    const token = await AsyncStorage.getItem("accessToken");
    return token;
  } catch (e) {
    console.error("Failed to retrieve access token for WebSocket:", e);
    return null;
  }
}

export default function useLiveLocationSocket(sessionId) {
  const socket = useRef(null);
  const [accessToken, setAccessToken] = useState(null); 

  useEffect(() => {
    getAccessToken().then(token => {
      setAccessToken(token);
    });
  }, []);

  useEffect(() => {
    if (!sessionId || !accessToken) return; 

    const baseUrl = "ws://192.168.29.193:8001/ws/live-location/";
    const urlWithToken = `${baseUrl}?token=${accessToken}`;
    
    socket.current = new WebSocket(urlWithToken); 

    socket.current.onopen = () => console.log(" Live location socket connected");
    socket.current.onclose = () => console.log(" Live location socket closed");
    socket.current.onerror = (e) => console.log("Socket error", e.message);

    const sendLocation = async () => {
      // ... (rest of the location sending logic)
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
    const interval = setInterval(sendLocation, 10000); 

    return () => {
      clearInterval(interval);
      if (socket.current?.readyState === WebSocket.OPEN || socket.current?.readyState === WebSocket.CONNECTING) {
        socket.current.close();
      }
    };
  }, [sessionId, accessToken]); 

  return null;
}