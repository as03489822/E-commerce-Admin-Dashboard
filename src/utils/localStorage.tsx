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
    if (!serializedState) return undefined;

    const parsed = JSON.parse(serializedState);

    // Ensure the shape matches { authenticate: { token: string | null } }
    if (
      parsed &&
      parsed.authenticate &&
      typeof parsed.authenticate.token !== 'undefined'
    ) {
      return {
        authenticate: {
          token: parsed.authenticate.token,
        },
      };
    }

    return undefined;
  } catch (error) {
    console.error('Error loading state:', error);
    return undefined;
  }
};
