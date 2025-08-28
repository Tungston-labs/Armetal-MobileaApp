import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import * as Notifications from 'expo-notifications';
import Navigation from './src/navigation/navigation';
import { store } from './src/redux/store';
import Toast from 'react-native-toast-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Optimize navigation performance
enableScreens();

// Set notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    };
  },
});

const App = () => {
  // Request notification permissions on app start
  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Permission for notifications not granted!");
      }
    };

    requestPermissions();
  }, []);

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <Navigation />
          <Toast />
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </Provider>
  );
};

export default App;
