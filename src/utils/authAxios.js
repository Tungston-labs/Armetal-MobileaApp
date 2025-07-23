import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = 'http://178.248.112.16:8000/api';

const authAxios = axios.create({ baseURL });

authAxios.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 💡 Interceptor to refresh token if 401
authAxios.interceptors.response.use(
  res => res,
  async err => {
    const originalRequest = err.config;
    if (
      err.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const refreshToken = await AsyncStorage.getItem("refreshToken");

      try {
        const res = await axios.post(`${baseURL}/token/refresh/`, {
          refresh: refreshToken,
        });

        const newAccessToken = res.data.access;
         const newRefreshToken = res.data.refresh || refreshToken; 

        await AsyncStorage.setItem("accessToken", newAccessToken);
        await AsyncStorage.setItem("refreshToken", newRefreshToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return authAxios(originalRequest); // Retry original request
      } catch (refreshError) {
        // Refresh failed → redirect to login
        await AsyncStorage.removeItem("accessToken");
        await AsyncStorage.removeItem("refreshToken");
        // Navigation logic here if needed
      }
    }

    return Promise.reject(err);
  }
);

export default authAxios;
