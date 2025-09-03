// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import authReducer from './features/authSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    auth:authReducer,
  },
});
