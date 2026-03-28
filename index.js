import { registerRootComponent } from "expo";
import BackgroundFetch from "react-native-background-fetch";
import App from "./App";
import { backgroundFetchHeadless } from "./src/services/locationService";

BackgroundFetch.registerHeadlessTask(backgroundFetchHeadless);

registerRootComponent(App);
