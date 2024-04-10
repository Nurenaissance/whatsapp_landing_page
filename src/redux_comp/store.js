// redux_comp/store.js

import { createStore, combineReducers } from 'redux';
import authReducer from './authReducer'; // Import your authReducer
// Import other reducers if you have them

const rootReducer = combineReducers({
  auth: authReducer, // Assuming you have an auth reducer
  // Add more reducers as needed
});

const store = createStore(rootReducer);

export default store;
