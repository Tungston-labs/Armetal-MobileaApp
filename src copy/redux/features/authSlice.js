// src/redux/slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  accessToken: null,
  refreshToken: null,
  loading: true, // to check initial auth state
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTokens: (state, action) => {
      state.accessToken = action.payload.access;
      state.refreshToken = action.payload.refresh;
      state.loading = false;
    },
    clearTokens: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.loading = false;
    },
    finishLoading: (state) => {
      state.loading = false;
    },
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
    },
  },
});

export const { setTokens, clearTokens, finishLoading ,logout} = authSlice.actions;

export const restoreSession = () => async (dispatch) => {
  try {
    const access = await AsyncStorage.getItem("accessToken");
    const refresh = await AsyncStorage.getItem("refreshToken");
    if (access && refresh) {
      dispatch(setTokens({ access, refresh }));
    } else {
      dispatch(finishLoading());
    }
  } catch (err) {
    console.log("Restore session error:", err);
    dispatch(finishLoading());
  }
};

export default authSlice.reducer;
