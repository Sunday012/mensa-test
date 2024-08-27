import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'; // Adjust the path according to your project structure

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
