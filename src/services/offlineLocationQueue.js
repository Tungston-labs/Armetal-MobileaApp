import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";

const OFFLINE_LOCATION_QUEUE = "offlineLocationQueue";
const UPLOAD_STATUS = {
  PENDING: "pending",
  UPLOADING: "uploading",
};
const DUPLICATE_WINDOW_MS = 60 * 1000;

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

const isDuplicateCapture = (queue, capturedAt) => {
  const capturedMs = new Date(capturedAt).getTime();

  if (!Number.isFinite(capturedMs)) {
    return false;
  }

  return queue.some((item) => {
    const itemMs = new Date(item.timestamp).getTime();

    return (
      Number.isFinite(itemMs) &&
      Math.abs(itemMs - capturedMs) < DUPLICATE_WINDOW_MS
    );
  });
};

/**
 * Returns true if internet is available.
 */
export const isInternetAvailable = async () => {
  const state = await NetInfo.fetch();

  return Boolean(state.isConnected) && state.isInternetReachable !== false;
};

/**
 * Save a captured location when upload is not possible.
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
}) => {
  try {
    const queue = await readQueue();
    const timestamp = capturedAt || new Date().toISOString();

    if (isDuplicateCapture(queue, timestamp)) {
      console.log("[OfflineQueue] Skipping duplicate capture", timestamp);
      return true;
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
      (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
    );

    await writeQueue(queue);

    console.log(`[OfflineQueue] Saved location. Queue size: ${queue.length}`);

    return true;
  } catch (err) {
    console.log("[OfflineQueue] Save failed", err);
    return false;
  }
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
 * Stops on the first failure and leaves remaining items in the queue.
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
    console.log("[OfflineQueue] Internet restored. Syncing queued locations.");

    await syncOfflineLocations({
      sendLocationFn,
      getToken,
    });

    if (typeof onReconnect === "function") {
      try {
        await onReconnect();
      } catch (err) {
        console.log(
          "[OfflineQueue] Post-sync reconnect callback failed:",
          err?.message || err,
        );
      }
    }
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

/**
 * Get queue count.
 */
export const getOfflineQueueCount = async () => {
  const queue = await readQueue();
  return queue.length;
};

/**
 * Clear queue manually.
 */
export const clearOfflineQueue = async () => {
  await AsyncStorage.removeItem(OFFLINE_LOCATION_QUEUE);
};
