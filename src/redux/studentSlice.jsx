import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  student: '', // Student's name or info
  isStudentLoggedIn: false, // Track student's login state
};

export const studentSlice = createSlice({
  name: 'studentS',
  initialState,
  reducers: {
    login: (state, action) => {
      // Action payload will have the student name
      state.student = action.payload;
      state.isStudentLoggedIn = true; // Set logged-in status to true
    },
    logout: (state) => {
      state.student = ''; // Clear the student data
      state.isStudentLoggedIn = false; // Reset logged-in status
    },
  },
});

// Export the actions to use in the component
export const { login, logout } = studentSlice.actions;

export default studentSlice.reducer;
