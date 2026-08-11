
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { store } from "../redux/store";
import { setTokens, clearTokens } from "../redux/features/authSlice";
import { stopBackgroundTracking } from "../services/locationService";

const BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;
const baseURL = `${BASE_URL}/api`;

const authAxios = axios.create({
  baseURL,
});

let isRefreshing = false;
let refreshSubscribers = [];

const subscribeTokenRefresh = (resolve, reject) => {
  refreshSubscribers.push({ resolve, reject });
};

const onRefreshed = (newAccessToken) => {
  refreshSubscribers.forEach(({ resolve }) => {
    resolve(newAccessToken);
  });

  refreshSubscribers = [];
};

const onRefreshFailed = (error) => {
  refreshSubscribers.forEach(({ reject }) => {
    reject(error);
  });

  refreshSubscribers = [];
};


authAxios.interceptors.request.use(
  async (config) => {
    const accessToken = await AsyncStorage.getItem("accessToken");

    if (accessToken) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


authAxios.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    if (originalRequest?._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;


    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        subscribeTokenRefresh(
          (newAccessToken) => {
            originalRequest.headers =
              originalRequest.headers || {};

            originalRequest.headers.Authorization =
              `Bearer ${newAccessToken}`;

            resolve(authAxios(originalRequest));
          },
          (refreshError) => {
            reject(refreshError);
          }
        );
      });
    }

    isRefreshing = true;

    try {
      const refreshToken =
        await AsyncStorage.getItem("refreshToken");

      if (!refreshToken) {
        throw new Error("Refresh token not found");
      }


      const refreshResponse = await axios.post(
        `${baseURL}/token/refresh/`,
        {
          refresh: refreshToken,
        }
      );

      const newAccessToken = refreshResponse.data?.access;

   
      const newRefreshToken =
        refreshResponse.data?.refresh;

      if (!newAccessToken) {
        throw new Error(
          "Refresh response did not contain access token"
        );
      }

 

      await AsyncStorage.setItem(
        "accessToken",
        newAccessToken
      );

  

      if (newRefreshToken) {
        await AsyncStorage.setItem(
          "refreshToken",
          newRefreshToken
        );
      }

      store.dispatch(
        setTokens({
          access: newAccessToken,
          refresh: newRefreshToken || refreshToken,
        })
      );

      authAxios.defaults.headers.common =
        authAxios.defaults.headers.common || {};

      authAxios.defaults.headers.common.Authorization =
        `Bearer ${newAccessToken}`;

      onRefreshed(newAccessToken);

      isRefreshing = false;

      originalRequest.headers =
        originalRequest.headers || {};

      originalRequest.headers.Authorization =
        `Bearer ${newAccessToken}`;

      return authAxios(originalRequest);
    } catch (refreshError) {
      console.log(
        "TOKEN REFRESH FAILED:",
        refreshError?.response?.data ||
          refreshError?.message
      );

      isRefreshing = false;

      onRefreshFailed(refreshError);

      try {
        await stopBackgroundTracking();
      } catch (err) {
        console.log("Error stopping background tracking during logout:", err);
      }

      await AsyncStorage.multiRemove([
        "accessToken",
        "refreshToken",
      ]);

      store.dispatch(clearTokens());

      return Promise.reject(refreshError);
    }
  }
);

export default authAxios;
