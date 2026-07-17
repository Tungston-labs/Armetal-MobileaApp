// // Expo only inlines environment variables prefixed with EXPO_PUBLIC_
// // into the JS bundle (including production builds).
// export const BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;
// console.log("BASE_URL:", BASE_URL);



export const API_URLS = {
  IN: process.env.EXPO_PUBLIC_API_BASE_URL_IN,
  AE: process.env.EXPO_PUBLIC_API_BASE_URL_AE,
  US: process.env.EXPO_PUBLIC_API_BASE_URL_US,
};

export const getBaseUrl = (countryCode) => {
  return API_URLS[countryCode];
};