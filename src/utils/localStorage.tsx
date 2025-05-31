import type { RootState } from '@/redux/store';


export const addStateToLocalStorage = (state : RootState) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('dState', serializedState);
    } catch (error) {
      console.error('Error saving state:', error);
    }
  };
  
  export const loadStateFromLocalStorage = () => {
    try {
      const serializedState = localStorage.getItem('dState');
      if (serializedState === null) return undefined;
      return JSON.parse(serializedState);
    } catch (error) {
      console.error('Error loading state:', error);
      return undefined;
    }
  };