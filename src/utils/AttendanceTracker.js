import React, { useEffect } from "react";
import { startBackgroundTracking, stopBackgroundTracking } from "./backgroundLocationTracking";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useLiveLocationSocket from "./useLiveLocationSocket"
export default function AttendanceTracker({ employeeId, sessionId }) {
  useEffect(() => {
    (async () => {
      await AsyncStorage.setItem("employeeId", String(employeeId));
      await AsyncStorage.setItem("sessionId", String(sessionId));
    })();

    startBackgroundTracking();

    return () => stopBackgroundTracking();
  }, [employeeId, sessionId]);
  useLiveLocationSocket(employeeId, sessionId); 

  return null;
}
