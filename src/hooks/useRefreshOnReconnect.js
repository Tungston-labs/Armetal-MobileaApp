import { useCallback, useEffect, useRef } from "react";
import { AppState } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { useFocusEffect } from "@react-navigation/native";

const isOnlineState = (state) =>
  state.isConnected === true && state.isInternetReachable !== false;

export const isNetworkAvailable = async () => {
  const state = await NetInfo.fetch();
  return isOnlineState(state);
};

export default function useRefreshOnReconnect(onRefresh) {
  const refreshRef = useRef(onRefresh);
  const focusedRef = useRef(false);
  const wasOnlineRef = useRef(null);
  const pendingRefreshRef = useRef(false);
  const runningRef = useRef(false);

  useEffect(() => {
    refreshRef.current = onRefresh;
  }, [onRefresh]);

  const runRefresh = useCallback(async () => {
    if (runningRef.current) return;

    runningRef.current = true;
    try {
      await refreshRef.current?.();
    } finally {
      runningRef.current = false;
    }
  }, []);

  const handleNetworkState = useCallback(
    async (state) => {
      const online = isOnlineState(state);
      const wasOnline = wasOnlineRef.current;

      wasOnlineRef.current = online;

      if (online && wasOnline === false) {
        if (focusedRef.current) {
          await runRefresh();
        } else {
          pendingRefreshRef.current = true;
        }
      }
    },
    [runRefresh]
  );

  useEffect(() => {
    let cancelled = false;
    const unsubscribe = NetInfo.addEventListener(handleNetworkState);

    NetInfo.fetch().then((state) => {
      if (!cancelled) handleNetworkState(state);
    });

    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, [handleNetworkState]);

  useFocusEffect(
    useCallback(() => {
      let cancelled = false;
      focusedRef.current = true;

      NetInfo.fetch().then(async (state) => {
        if (cancelled) return;

        const online = isOnlineState(state);
        const wasOnline = wasOnlineRef.current;

        wasOnlineRef.current = online;

        if (online && (pendingRefreshRef.current || wasOnline === false)) {
          pendingRefreshRef.current = false;
          await runRefresh();
        }
      });

      return () => {
        cancelled = true;
        focusedRef.current = false;
      };
    }, [runRefresh])
  );

  useEffect(() => {
    const subscription = AppState.addEventListener("change", async (state) => {
      if (state !== "active" || !focusedRef.current) return;

      const netState = await NetInfo.fetch();
      await handleNetworkState(netState);
    });

    return () => subscription.remove();
  }, [handleNetworkState]);
}
