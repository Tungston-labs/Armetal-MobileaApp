import { registerRootComponent } from 'expo';
import App from './App';
import BackgroundFetch from "react-native-background-fetch"; 
import { uploadLocation } from "./src/services/locationService"; 

const BackgroundFetchHeadlessTask = async (event) => {
  console.log("🔥 Headless background fetch triggered:", event.taskId);
  
  try {
    await uploadLocation();
  } catch (error) {
    console.log("❌ Headless fetch error:", error);
  }

  BackgroundFetch.finish(event.taskId);
};

BackgroundFetch.registerHeadlessTask(BackgroundFetchHeadlessTask);

registerRootComponent(App);