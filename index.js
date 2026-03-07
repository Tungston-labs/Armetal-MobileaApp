import { registerRootComponent } from 'expo';
import App from './App';
import BackgroundFetch from "react-native-background-fetch"; 
import { uploadLocation } from "./src/services/locationService"; 
const BackgroundFetchHeadlessTask = async (event) => {
  const { taskId, timeout } = event;

  if (timeout) {
    console.log("Headless fetch timeout:", taskId);
    BackgroundFetch.finish(taskId);
    return;
  }

  console.log("🔥 Headless background fetch triggered:", taskId);

  try {
    await uploadLocation();
  } catch (error) {
    console.log(" Headless fetch error:", error);
  }

  BackgroundFetch.finish(taskId);
};
BackgroundFetch.registerHeadlessTask(BackgroundFetchHeadlessTask);

registerRootComponent(App);