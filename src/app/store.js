import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/FrontPage/hnreducers.js';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
