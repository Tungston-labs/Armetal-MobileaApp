import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";

const QUEUE_STORAGE_KEY = "offlineLocationQueue";
const SYNC_STATUSES = {
  PENDING: "pending",
  UPLOADING: "uploading",
  UPLOADED: "uploaded",
};

let queueCache = null;
let queueLock = Promise.resolve();
let syncInProgress = false;
let netInfoUnsubscribe = null;
let uploadQueuedLocationHandler = null;

const withQueueLock = (task) => {
  const run = queueLock.then(task, task);
  queueLock = run.catch(() => {});
  return run;
};

const parseQueue = (rawQueue) => {
  if (!rawQueue) return [];

  try {
    const parsed = JSON.parse(rawQueue);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.log("Failed to parse offline location queue:", error);
    return [];
  }
};

const loadQueue = async () => {
  if (queueCache) return queueCache;

  const rawQueue = await AsyncStorage.getItem(QUEUE_STORAGE_KEY);
  queueCache = parseQueue(rawQueue).filter(
    (item) => item?.status !== SYNC_STATUSES.UPLOADED
  );

  return queueCache;
};

const saveQueue = async (queue) => {
  queueCache = queue;
  await AsyncStorage.setItem(QUEUE_STORAGE_KEY, JSON.stringify(queue));
};

const toFiniteNumberOrNull = (value) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
};

const getPositionTimestamp = (position) => {
  const timestamp = Number(position?.timestamp);
  return Number.isFinite(timestamp) ? timestamp : Date.now();
};

export const isValidLocationPosition = (position) => {
  const latitude = toFiniteNumberOrNull(position?.coords?.latitude);
  const longitude = toFiniteNumberOrNull(position?.coords?.longitude);

  return latitude !== null && longitude !== null;
};

export const createQueuedLocationItem = (
  position,
  { employeeId, sessionId } = {}
) => {
  if (!isValidLocationPosition(position)) return null;

  const capturedAtMs = getPositionTimestamp(position);
  const now = Date.now();

  return {
    localQueueId: `ios-location-${capturedAtMs}-${now}-${Math.random()
      .toString(36)
      .slice(2, 10)}`,
    latitude: Number(position.coords.latitude),
    longitude: Number(position.coords.longitude),
    accuracy: toFiniteNumberOrNull(position.coords.accuracy),
    speed: toFiniteNumberOrNull(position.coords.speed),
    heading: toFiniteNumberOrNull(position.coords.heading),
    altitude: toFiniteNumberOrNull(position.coords.altitude),
    provider: position.provider ?? position.coords?.provider ?? null,
    timestamp: new Date(capturedAtMs).toISOString(),
    capturedAtMs,
    status: SYNC_STATUSES.PENDING,
    employeeId: employeeId ? String(employeeId) : null,
    sessionId: sessionId ? String(sessionId) : null,
    uploadAttempts: 0,
    createdAt: new Date(now).toISOString(),
    updatedAt: new Date(now).toISOString(),
    lastError: null,
  };
};

export const isNetworkAvailable = async () => {
  try {
    const state = await NetInfo.fetch();
    return Boolean(state.isConnected && state.isInternetReachable !== false);
  } catch (error) {
    console.log("Network state check failed:", error);
    return false;
  }
};

export const getQueuedLocationCount = () =>
  withQueueLock(async () => {
    const queue = await loadQueue();
    return queue.filter((item) => item.status !== SYNC_STATUSES.UPLOADED).length;
  });

export const enqueueLocationItem = (locationItem) =>
  withQueueLock(async () => {
    if (!locationItem?.localQueueId) return 0;

    const queue = await loadQueue();
    const exists = queue.some(
      (item) => item.localQueueId === locationItem.localQueueId
    );

    if (!exists) {
      queue.push({
        ...locationItem,
        status: SYNC_STATUSES.PENDING,
        updatedAt: new Date().toISOString(),
      });
      await saveQueue(queue);
    }

    return queue.length;
  });

const markQueuedLocation = (localQueueId, changes) =>
  withQueueLock(async () => {
    const queue = await loadQueue();
    const nextQueue = queue.map((item) =>
      item.localQueueId === localQueueId
        ? {
            ...item,
            ...changes,
            updatedAt: new Date().toISOString(),
          }
        : item
    );

    await saveQueue(nextQueue);
  });

const removeQueuedLocation = (localQueueId) =>
  withQueueLock(async () => {
    const queue = await loadQueue();
    const nextQueue = queue.filter((item) => item.localQueueId !== localQueueId);
    await saveQueue(nextQueue);
  });

const resetInterruptedUploads = () =>
  withQueueLock(async () => {
    const queue = await loadQueue();
    const nextQueue = queue
      .filter((item) => item.status !== SYNC_STATUSES.UPLOADED)
      .map((item) =>
        item.status === SYNC_STATUSES.UPLOADING
          ? {
              ...item,
              status: SYNC_STATUSES.PENDING,
              updatedAt: new Date().toISOString(),
            }
          : item
      );

    await saveQueue(nextQueue);
  });

export const syncQueuedLocations = async (uploadQueuedLocation) => {
  const uploader = uploadQueuedLocation ?? uploadQueuedLocationHandler;
  if (!uploader || syncInProgress) return;

  const online = await isNetworkAvailable();
  if (!online) return;

  syncInProgress = true;

  try {
    while (true) {
      const nextItem = await withQueueLock(async () => {
        const queue = await loadQueue();
        return queue.find((item) => item.status !== SYNC_STATUSES.UPLOADED);
      });

      if (!nextItem) break;

      await markQueuedLocation(nextItem.localQueueId, {
        status: SYNC_STATUSES.UPLOADING,
        uploadAttempts: Number(nextItem.uploadAttempts || 0) + 1,
        lastError: null,
      });

      try {
        await uploader(nextItem);
        await markQueuedLocation(nextItem.localQueueId, {
          status: SYNC_STATUSES.UPLOADED,
          uploadedAt: new Date().toISOString(),
        });
        await removeQueuedLocation(nextItem.localQueueId);
        console.log("📍 queued iOS location synced");
      } catch (error) {
        await markQueuedLocation(nextItem.localQueueId, {
          status: SYNC_STATUSES.PENDING,
          lastError: error?.message || "Upload failed",
        });
        break;
      }
    }
  } finally {
    syncInProgress = false;
  }
};

export const initOfflineLocationQueue = ({ uploadQueuedLocation } = {}) => {
  uploadQueuedLocationHandler =
    uploadQueuedLocation ?? uploadQueuedLocationHandler;

  void resetInterruptedUploads();

  if (netInfoUnsubscribe) {
    netInfoUnsubscribe();
  }

  netInfoUnsubscribe = NetInfo.addEventListener((state) => {
    const online = Boolean(
      state.isConnected && state.isInternetReachable !== false
    );

    if (online) {
      void syncQueuedLocations();
    }
  });

  void isNetworkAvailable().then((online) => {
    if (online) {
      void syncQueuedLocations();
    }
  });

  return () => {
    if (netInfoUnsubscribe) {
      netInfoUnsubscribe();
      netInfoUnsubscribe = null;
    }
  };
};
