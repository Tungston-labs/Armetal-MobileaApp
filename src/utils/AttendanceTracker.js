import React, { useEffect } from "react";
import { startBackgroundTracking, stopBackgroundTracking } from "../utils/backgroundLocationTracking";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useLiveLocationSocket from "../utils/useLiveLocationSocket";

export default function AttendanceTracker({ employeeId, sessionId }) {
  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem("employeeId", String(employeeId));
        await AsyncStorage.setItem("sessionId", String(sessionId));
        await AsyncStorage.setItem("punchedIn", "true");

        const ok = await startBackgroundTracking();
        if (!ok) console.warn("Background tracking did not start");
      } catch (err) {
        console.error("AttendanceTracker setup error:", err);
      }
    })();

    return () => {
      stopBackgroundTracking()
        .then(() => AsyncStorage.setItem("punchedIn", "false"))
        .catch(e => console.error("stopBackgroundTracking error:", e));
    };
  }, [employeeId, sessionId]);

  useLiveLocationSocket(employeeId, sessionId);

  return null;
}
