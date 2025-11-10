// attendance/AttendanceTracker.js

import React from "react";
import useLiveLocationSocket from "./useLiveLocationSocket";

export default function AttendanceTracker({ employeeId, sessionId }) { 
  
  useLiveLocationSocket(employeeId, sessionId); 
  
  return null;
}