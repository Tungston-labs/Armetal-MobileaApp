import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * @returns {Promise<string | null>} The access token or null if not found.
 */
export async function getAccessToken() {
  try {
    const token = await AsyncStorage.getItem("accessToken");
    return token;
  } catch (e) {
    console.error("Failed to retrieve access token:", e);
    return null;
  }
}