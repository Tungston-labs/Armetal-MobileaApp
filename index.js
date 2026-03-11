import { registerRootComponent } from 'expo';
import App from './App';
import BackgroundFetch from "react-native-background-fetch"; 
import { backgroundFetchHeadless } from './src/services/locationService';


BackgroundFetch.registerHeadlessTask(backgroundFetchHeadless);

registerRootComponent(App);