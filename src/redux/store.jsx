import { configureStore } from '@reduxjs/toolkit';
import adminReducer from './adminSlice'; // Import the admin slice
import studentReducer from './studentSlice'; // Import the student slice

export const store = configureStore({
  reducer: {
    adminS: adminReducer,   // Slice for admin
    studentS: studentReducer, // Slice for student
  },
});
