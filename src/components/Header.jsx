import React from 'react';
import { AppBar, Toolbar, Button, Box, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux'; // Import from Redux
import { logout as studentLogout } from '../redux/studentSlice'; // Import the student logout action
import { logout as adminLogout } from '../redux/adminSlice'; // Import the admin logout action
import { useNavigate } from 'react-router-dom'; // Import useNavigate for programmatic navigation
import '../css/Header.css';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate

  // Access Redux state for both admin and student
  const adminName = useSelector((state) => state.adminS.admin); // Get admin name from Redux state
  const isAdminLoggedIn = useSelector((state) => state.adminS.isAdminLoggedIn); // Check if admin is logged in

  const studentName = useSelector((state) => state.studentS.student); // Get student name from Redux state
  const isStudentLoggedIn = useSelector((state) => state.studentS.isStudentLoggedIn); // Check if student is logged in

  // Log out handler
  const handleLogout = () => {
    if (isAdminLoggedIn) {
      dispatch(adminLogout()); // Dispatch admin logout action
      goToLoginPage();
    } else if (isStudentLoggedIn) {
      dispatch(studentLogout()); // Dispatch student logout action
      goToLoginPage();
    }
    else {
      goToLoginPage();
    }
    // Additional logout logic (e.g., clearing tokens) can be added here
  };

  // Handle navigation to Admin or Student dashboard
  const goToAdminDashboard = () => {
    navigate('/admin-dashboard'); // Navigate to Admin Dashboard
  };

  const goToStudentDashboard = () => {
    navigate('/student-dashboard'); // Navigate to Student Dashboard
  };

  const goToLoginPage = () => {
    navigate('/login')
  };

  return (
    <AppBar className="header" position="sticky">
      <Toolbar>
        {/* Logo */}
        <Button
          className="logo"
          variant="text"
          onClick={() => navigate('/')} // Navigate to homepage
        >
          Association Name
        </Button>

        {/* Navigation Links */}
        <Box className="nav-links">
          <Button className="nav-link" href="#introduction">Introduction</Button>
          <Button className="nav-link" href="#about">About Us</Button>
          <Button className="nav-link" href="#contact">Contact</Button>
        </Box>

        {/* Conditionally show Log in or admin/student name with Log out button */}
        <Box className="auth-section" sx={{ marginLeft: 'auto' }}>
          {isAdminLoggedIn ? (
            <Box display="flex" alignItems="center">
              {/* Display admin name as a clickable text */}
              <Typography
                variant="body1"
                className="admin-name"
                style={{ marginRight: '15px', color: '#eaff00', cursor: 'pointer' }}
                onClick={goToAdminDashboard} // Navigate to Admin Dashboard on click
              >
                {adminName}
              </Typography>
              {/* Log out button */}
              <Button variant="outlined" color="inherit" onClick={handleLogout}>
                Log out
              </Button>
            </Box>
          ) : isStudentLoggedIn ? (
            <Box display="flex" alignItems="center">
              {/* Display student name as a clickable text */}
              <Typography
                variant="body1"
                className="student-name"
                style={{ marginRight: '15px', color: '#eaff00', cursor: 'pointer' }}
                onClick={goToStudentDashboard} // Navigate to Student Dashboard on click
              >
                {studentName}
              </Typography >
              {/* Log out button */}
              <Button variant="outlined" color="inherit" onClick={handleLogout}>
                Log out
              </Button>
            </Box>
          ) : (
            // Show Log in button if no one is logged in
            <Button variant="contained" className="join-us-btn" onClick={goToLoginPage}>
              Log in
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
