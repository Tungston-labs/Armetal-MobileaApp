import * as Location from "expo-location";
import { Alert, Platform } from "react-native";

/**
 * Request permissions + fetch accurate GPS location
 */
export const getAccurateLocation = async () => {
  try {
    // Foreground permission
    const fg = await Location.requestForegroundPermissionsAsync();

    if (fg.status !== "granted") {
      Alert.alert("Permission required", "Location access is required");
      return null;
    }

    // Background permission (Android only)
    if (Platform.OS === "android") {
      const bg = await Location.requestBackgroundPermissionsAsync();

      if (bg.status !== "granted") {
        Alert.alert(
          "Background Location Required",
          "Enable background location for attendance tracking"
        );
        return null;
      }
    }

    // Improve GPS accuracy (Android)
    await Location.enableNetworkProviderAsync?.();

    // Fetch location
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest,
      maximumAge: 5000,
      timeout: 15000,
    });

    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
  } catch (error) {
    console.log("Location error:", error);
    Alert.alert("Location Error", "Unable to fetch location");
    return null;
  }
};
