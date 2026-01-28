// Expo only inlines environment variables prefixed with EXPO_PUBLIC_
// into the JS bundle (including production builds).
export const BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

