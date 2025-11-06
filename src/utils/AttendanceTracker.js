import React from "react";
import useLiveLocationSocket from "./useLiveLocationSocket";

export default function AttendanceTracker({ sessionId }) {
  useLiveLocationSocket(sessionId);
  return null;
}
