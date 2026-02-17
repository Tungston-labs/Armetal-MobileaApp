// src/redux/features/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: '',
    avatar: '', // ✅ Must define avatar here
  },
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.avatar = action.payload.avatar;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
