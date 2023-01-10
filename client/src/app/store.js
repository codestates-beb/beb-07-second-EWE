//modules
import { configureStore } from '@reduxjs/toolkit';

//slices
import authReducer from "../feature/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});