// authActions.js
export const setUser = (user) => ({
    type: 'SET_USER',
    payload: user,
  });
  
  export const clearUser = () => ({
    type: 'CLEAR_USER',
  });
  
  export const signOut = () => {
    return async (dispatch) => {
      try {
        // Perform sign-out logic here, such as calling Firebase signOut function
        // For example:
        // await auth.signOut(); // Assuming you're using Firebase Authentication
        
        // Dispatch action to clear user state
        dispatch({ type: 'SIGN_OUT_SUCCESS' });
      } catch (error) {
        dispatch({ type: 'SIGN_OUT_ERROR', payload: error.message });
      }
    };
  };