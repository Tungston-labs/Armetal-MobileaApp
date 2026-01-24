
import React, { useEffect, useState, useCallback } from "react";
import { Provider, useDispatch } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { enableScreens } from "react-native-screens";
import { store } from "./src/redux/store";
import Toast from "react-native-toast-message";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Navigation from "./src/navigation/navigation";
import { restoreSession } from "./src/redux/features/authSlice";
import * as Notifications from "expo-notifications";
import * as SplashScreen from "expo-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";


import {
  useFonts,
  Raleway_400Regular,
  Raleway_500Medium,
  Raleway_700Bold,
} from "@expo-google-fonts/raleway";

import {
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
} from "@expo-google-fonts/montserrat";

// ---------------- Permissions Setup ----------------

enableScreens();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// ---------------- Session Restore Logic ----------------

const InitAuth = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const init = async () => {
      await dispatch(restoreSession());

      const punchedIn = await AsyncStorage.getItem("punchedIn");
      const employeeId = await AsyncStorage.getItem("employeeId");
      const sessionId = await AsyncStorage.getItem("sessionId");

      if (punchedIn === "true" && employeeId && sessionId) {
        console.log("🔄 Restoring background tracking after restart…");
        const ok = await startBackgroundTracking();
        if (!ok) console.warn("⚠ Background tracking failed to start");
      }
    };

    init();
  }, [dispatch]);

  return children;
};

// ---------------- Main App Component ----------------

const App = () => {
  const [appReady, setAppReady] = useState(false);

  const [fontsLoaded] = useFonts({
    Raleway_400Regular,
    Raleway_500Medium,
    Raleway_700Bold,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
  });

  useEffect(() => {
    const prepare = async () => {
      try {
        await Notifications.requestPermissionsAsync();
      } catch (e) {
        console.warn("Notification permission error:", e);
      } finally {
        if (fontsLoaded) setAppReady(true);
      }
    };

    prepare();
  }, [fontsLoaded]);

  const onLayoutRootView = useCallback(async () => {
    if (appReady) await SplashScreen.hideAsync();
  }, [appReady]);

  if (!appReady) return null;

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <SafeAreaProvider>
          <InitAuth>
            <Navigation />
            <Toast />
          </InitAuth>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </Provider>
  );
};

export default App;
