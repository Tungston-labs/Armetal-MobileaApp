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
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import { startBackgroundUpdate } from './src/screens/punch-in-screen/LocationTask';
import './src/screens/punch-in-screen/LocationTask';


// Fonts
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

// Keep splash screen visible until app is ready

enableScreens();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Component to restore session before rendering app

const InitAuth = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const init = async () => {
      await dispatch(restoreSession());

      const punchedIn = await AsyncStorage.getItem("punchedIn"); 
      if (punchedIn === "true") {
        startBackgroundUpdate();
      }
    };
    init();
  }, [dispatch]);

  return children;
};


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

  // Prepare app: notifications + fonts + any setup
  useEffect(() => {
    const prepareApp = async () => {
      try {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== "granted") {
          console.warn("Notification permission not granted");
        }
      } catch (e) {
        console.warn("Notification permission error:", e);
      } finally {
        if (fontsLoaded) {
          setAppReady(true);
        }
      }
    };
    prepareApp();
  }, [fontsLoaded]);

  // Hide splash screen when root view is ready
  const onLayoutRootView = useCallback(async () => {
    if (appReady) {
      await SplashScreen.hideAsync();
    }
  }, [appReady]);

  if (!appReady) {
    return null; // Keep splash screen visible
  }

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
