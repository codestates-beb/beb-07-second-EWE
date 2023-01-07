//modules
import { configureStore } from '@reduxjs/toolkit';

//slices
import userReducer from "../feature/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});