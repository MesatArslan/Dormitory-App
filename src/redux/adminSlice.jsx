import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  admin: '', // Admin's name or info
  isAdminLoggedIn: false, // Track admin's login state
};

export const adminSlice = createSlice({
  name: 'adminS',
  initialState,
  reducers: {
    login: (state, action) => {
      // Action payload will have the admin name
      state.admin = action.payload;
      state.isAdminLoggedIn = true; // Set logged-in status to true
    },
    logout: (state) => {
      state.admin = ''; // Clear the admin data
      state.isAdminLoggedIn = false; // Reset logged-in status
    },
  },
});

// Export the actions to use in the component
export const { login, logout } = adminSlice.actions;

export default adminSlice.reducer;
