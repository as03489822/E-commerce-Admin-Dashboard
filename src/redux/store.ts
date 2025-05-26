import { configureStore } from '@reduxjs/toolkit';
import loadingSlice from './slices/loadingSlice';

export const store = configureStore({
  reducer: {
    loading: loadingSlice,
  },
});

// Type definitions
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;