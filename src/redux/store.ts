import { configureStore } from '@reduxjs/toolkit';
import tokenSlice from './slices/tokenSlice'
import { addStateToLocalStorage , loadStateFromLocalStorage } from '@/utils/localStorage';

const isBrowser = typeof window !== 'undefined';


const persistedState = isBrowser ? loadStateFromLocalStorage() : undefined;

export const store = configureStore({
  reducer:{
    authenticate : tokenSlice
  },
  preloadedState: persistedState
});

store.subscribe(() => {
  addStateToLocalStorage(store.getState());
});

// Type definitions
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;