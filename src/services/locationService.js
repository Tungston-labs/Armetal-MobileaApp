import AsyncStorage from "@react-native-async-storage/async-storage";

const SESSION_STORAGE_KEYS = ["employeeId", "sessionId", "punchedIn"];

const normalizeSessionValue = (value) =>
  value === undefined || value === null ? "" : String(value);

// Background location tracking has been removed. These helpers now only
// persist the active attendance session so the UI can restore punch state.
export const startAttendanceSession = async ({ employeeId, sessionId } = {}) => {
  await AsyncStorage.multiSet([
    ["employeeId", normalizeSessionValue(employeeId)],
    ["sessionId", normalizeSessionValue(sessionId)],
    ["punchedIn", "true"],
  ]);
};

export const stopAttendanceSession = async () => {
  await AsyncStorage.multiRemove(SESSION_STORAGE_KEYS);
};

// Backward-compatible exports for older call sites.
export const startBackgroundTracking = startAttendanceSession;
export const stopBackgroundTracking = stopAttendanceSession;

export const uploadLocation = async () => {
  console.log("Background attendance location upload is disabled.");
};

export const backgroundFetchHeadless = async () => {
  console.log("Background attendance headless task is disabled.");
};
