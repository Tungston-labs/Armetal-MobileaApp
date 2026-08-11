import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";

const OFFLINE_LOCATION_QUEUE = "offlineLocationQueue";
const UPLOAD_STATUS = {
  PENDING: "pending",
  UPLOADING: "uploading",
};

let syncInProgress = false;
let netInfoUnsubscribe = null;
let wasOffline = false;

const generateQueueId = () =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;

const readQueue = async () => {
  try {
    const raw = await AsyncStorage.getItem(OFFLINE_LOCATION_QUEUE);
    const parsed = raw ? JSON.parse(raw) : [];

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.map((item) =>
      item.uploadStatus === UPLOAD_STATUS.UPLOADING
        ? { ...item, uploadStatus: UPLOAD_STATUS.PENDING }
        : item,
    );
  } catch (err) {
    console.log("[OfflineQueue] Read failed", err);
    return [];
  }
};

const writeQueue = async (queue) => {
  await AsyncStorage.setItem(OFFLINE_LOCATION_QUEUE, JSON.stringify(queue));
};

const toTimestampMs = (value) => {
  const parsed = new Date(value).getTime();
  return Number.isFinite(parsed) ? parsed : null;
};

const isDuplicateCapture = (queue, timestampMs, intervalMs) => {
  const windowMs = Math.max(intervalMs * 0.8, 60 * 1000);

  return queue.some((item) => {
    const itemMs = toTimestampMs(item.timestamp);

    return (
      Number.isFinite(itemMs) && Math.abs(itemMs - timestampMs) < windowMs
    );
  });
};

/**
 * Returns true if internet is available.
 */
export const isInternetAvailable = async () => {
  const state = await NetInfo.fetch();

  if (!state.isConnected) {
    return false;
  }

  if (state.isInternetReachable === false) {
    return false;
  }

  return true;
};

/**
 * Save a captured location to the local queue.
 */
export const saveOfflineLocation = async ({
  employeeId,
  sessionId,
  latitude,
  longitude,
  accuracy = null,
  speed = null,
  heading = null,
  altitude = null,
  provider = null,
  capturedAt,
  intervalMs = null,
}) => {
  try {
    const queue = await readQueue();
    const timestamp = capturedAt || new Date().toISOString();
    const timestampMs = toTimestampMs(timestamp);

    if (!Number.isFinite(timestampMs)) {
      return false;
    }

    if (isDuplicateCapture(queue, timestampMs, intervalMs || 15 * 60 * 1000)) {
      console.log("[OfflineQueue] Skipping duplicate capture", timestamp);
      return false;
    }

    queue.push({
      id: generateQueueId(),
      employeeId,
      sessionId,
      latitude,
      longitude,
      accuracy,
      speed,
      heading,
      altitude,
      provider,
      timestamp,
      uploadStatus: UPLOAD_STATUS.PENDING,
    });

    queue.sort(
      (a, b) => toTimestampMs(a.timestamp) - toTimestampMs(b.timestamp),
    );

    await writeQueue(queue);


    return true;
  } catch (err) {
    console.log("[OfflineQueue] Save failed", err);
    return false;
  }
};

/**
 * Fill missed 15-minute slots after offline period.
 * Uses the provided coords for each missed slot with scheduled timestamps.
 */
export const backfillMissedCaptureSlots = async ({
  employeeId,
  sessionId,
  coords,
  lastCaptureAtMs,
  intervalMs,
}) => {
  if (!Number.isFinite(lastCaptureAtMs) || !intervalMs || intervalMs <= 0) {
    return 0;
  }

  const now = Date.now();
  let nextSlotMs = lastCaptureAtMs + intervalMs;
  let filledCount = 0;
  let lastFilledSlotMs = lastCaptureAtMs;

  while (nextSlotMs <= now) {
    const saved = await saveOfflineLocation({
      employeeId,
      sessionId,
      latitude: coords.latitude,
      longitude: coords.longitude,
      accuracy: coords.accuracy ?? null,
      speed: coords.speed ?? null,
      heading: coords.heading ?? null,
      altitude: coords.altitude ?? null,
      provider: coords.provider ?? null,
      capturedAt: new Date(nextSlotMs).toISOString(),
      intervalMs,
    });

    if (saved) {
      filledCount += 1;
      lastFilledSlotMs = nextSlotMs;
    }

    nextSlotMs += intervalMs;
  }

  if (filledCount > 0) {
    console.log(`[OfflineQueue] Backfilled ${filledCount} missed slot(s)`);
  }

  return { filledCount, lastFilledSlotMs };
};

const buildCoordsFromQueueItem = (item) => ({
  latitude: item.latitude,
  longitude: item.longitude,
  accuracy: item.accuracy ?? undefined,
  speed: item.speed ?? undefined,
  heading: item.heading ?? undefined,
  altitude: item.altitude ?? undefined,
});

/**
 * Upload queued locations oldest-first, one at a time.
 */
export const syncOfflineLocations = async ({
  sendLocationFn,
  getToken,
}) => {
  if (syncInProgress) {
    return false;
  }

  syncInProgress = true;

  try {
    const connected = await isInternetAvailable();

    if (!connected) {
      return false;
    }

    const token = await getToken();

    if (!token) {
      console.log("[OfflineQueue] Sync skipped: no access token");
      return false;
    }

    let uploadedCount = 0;

    while (true) {
      const queue = await readQueue();

      if (queue.length === 0) {
        break;
      }

      const item = queue[0];
      const nextQueue = [...queue];
      nextQueue[0] = { ...item, uploadStatus: UPLOAD_STATUS.UPLOADING };
      await writeQueue(nextQueue);

      try {
        const res = await sendLocationFn({
          employeeId: item.employeeId,
          sessionId: item.sessionId,
          coords: buildCoordsFromQueueItem(item),
          token,
          capturedAt: item.timestamp,
        });

        if (!res.ok) {
          const restoredQueue = await readQueue();
          restoredQueue[0] = { ...item, uploadStatus: UPLOAD_STATUS.PENDING };
          await writeQueue(restoredQueue);

          console.log(
            `[OfflineQueue] Sync stopped at item ${item.id}. HTTP ${res.status}`,
          );

          return false;
        }

        const updatedQueue = await readQueue();
        updatedQueue.shift();
        await writeQueue(updatedQueue);
        uploadedCount += 1;
      } catch (err) {
        const restoredQueue = await readQueue();
        restoredQueue[0] = { ...item, uploadStatus: UPLOAD_STATUS.PENDING };
        await writeQueue(restoredQueue);

        console.log(
          `[OfflineQueue] Sync stopped at item ${item.id}:`,
          err?.message || err,
        );

        return false;
      }
    }

    if (uploadedCount > 0) {
      console.log(`[OfflineQueue] Synced ${uploadedCount} location(s)`);
    }

    return uploadedCount > 0;
  } catch (err) {
    console.log("[OfflineQueue] Sync failed", err);
    return false;
  } finally {
    syncInProgress = false;
  }
};

/**
 * Automatically sync whenever internet becomes available.
 */
export const startOfflineSyncListener = ({
  sendLocationFn,
  getToken,
  onReconnect,
}) => {
  if (netInfoUnsubscribe) {
    return netInfoUnsubscribe;
  }

  NetInfo.fetch().then((state) => {
    wasOffline = !state.isConnected || state.isInternetReachable === false;
  });

  netInfoUnsubscribe = NetInfo.addEventListener(async (state) => {
    const isOnline =
      Boolean(state.isConnected) && state.isInternetReachable !== false;

    if (!isOnline) {
      wasOffline = true;
      return;
    }

    if (!wasOffline) {
      return;
    }

    wasOffline = false;
    console.log("[OfflineQueue] Internet restored. Running reconnect handler.");

    if (typeof onReconnect === "function") {
      try {
        await onReconnect();
      } catch (err) {
        console.log(
          "[OfflineQueue] Reconnect handler failed:",
          err?.message || err,
        );
      }
    }

    await syncOfflineLocations({
      sendLocationFn,
      getToken,
    });
  });

  return netInfoUnsubscribe;
};

export const stopOfflineSyncListener = () => {
  if (netInfoUnsubscribe) {
    netInfoUnsubscribe();
    netInfoUnsubscribe = null;
  }

  wasOffline = false;
};

export const getOfflineQueueCount = async () => {
  const queue = await readQueue();
  return queue.length;
};

export const clearOfflineQueue = async () => {
  await AsyncStorage.removeItem(OFFLINE_LOCATION_QUEUE);
};
