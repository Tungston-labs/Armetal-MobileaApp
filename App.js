// App.js
import React, { useEffect, useState } from "react";
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

// ✅ Import font utilities
import { useFonts, Raleway_400Regular, Raleway_500Medium, Raleway_700Bold } from "@expo-google-fonts/raleway";
import { Montserrat_400Regular, Montserrat_500Medium, Montserrat_700Bold, Montserrat_800ExtraBold } from "@expo-google-fonts/montserrat";
import AppLoading from "expo-app-loading";

enableScreens();
SplashScreen.preventAutoHideAsync(); // Keep splash until fonts load

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    };
  },
});

const InitAuth = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restoreSession());
  }, [dispatch]);

  return children;
};

const App = () => {
  // ✅ Load Raleway and Montserrat fonts
  const [appReady, setAppReady] = useState(false);

  // ✅ Load Raleway fonts
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
    const prepareApp = async () => {
      try {
        // Request notification permissions
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== "granted") {
          alert("Permission for notifications not granted!");
        }
      } catch (e) {
        console.warn(e);
      } finally {
        if (fontsLoaded) {
          await SplashScreen.hideAsync(); // Hide splash when ready
          setAppReady(true);
        }
      }
    };

    prepareApp();
  }, [fontsLoaded]);

  if (!appReady) {
    return null; // Splash screen is visible
  }

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
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
