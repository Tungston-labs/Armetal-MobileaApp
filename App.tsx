import React from 'react';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';

import Navigation from './src/navigation/navigation';
import { store } from './src/redux/store';

enableScreens();

const App = () => (
  <Provider store={store}>
    <SafeAreaProvider>
      <Navigation />
    </SafeAreaProvider>
  </Provider>
);

export default App;
