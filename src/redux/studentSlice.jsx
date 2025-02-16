import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  student: '', // Student's full name (name + surname)
  isStudentLoggedIn: false, // Track student's login state
};

export const studentSlice = createSlice({
  name: 'studentS',
  initialState,
  reducers: {
    login: (state, action) => {
      // Combine name and surname into one string
      const { name, surname } = action.payload;
      state.student = `${name} ${surname}`; // Store full name in the student field
      state.isStudentLoggedIn = true; // Set logged-in status to true
    },
    logout: (state) => {
      state.student = ''; // Clear the student's full name
      state.isStudentLoggedIn = false; // Reset logged-in status
    },
  },
});

// Export the actions to use in the component
export const { login, logout } = studentSlice.actions;

export default studentSlice.reducer;
