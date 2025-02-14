import React, { useState } from 'react';
import { useSelector } from 'react-redux'; // Import Redux state
import { useNavigate } from 'react-router-dom';
import StudentLogin from './StudentLogin';
import AdminLogin from './AdminLogin';
import '../css/MainLogin.css';  // Custom CSS for styling

const MainLogin = () => {
  // By default, 'student' login is selected
  const [loginType, setLoginType] = useState('student');

  // Get login status from Redux state for both admin and student
  const isAdminLoggedIn = useSelector((state) => state.adminS.isAdminLoggedIn);
  const isStudentLoggedIn = useSelector((state) => state.studentS.isStudentLoggedIn);

  const navigate = useNavigate();

  const handleLoginNavigation = () => {
    if (loginType === 'student') {
      navigate('/student-dashboard'); // Navigate to student dashboard
    } else if (loginType === 'admin') {
      navigate('/admin-dashboard'); // Navigate to admin dashboard
    }
  };

  const handleLoginTypeChange = (type) => {
    setLoginType(type);
  };

  return (
    <div className="main-login-container">
      
      {/* Hide login options if either admin or student is logged in */}
      {!isAdminLoggedIn && !isStudentLoggedIn && (
        <div className="login-options-container">
          {/* Two rectangles for Student Login and Admin Login */}
          <div 
            className={`login-option ${loginType === 'student' ? 'active' : ''}`} 
            onClick={() => handleLoginTypeChange('student')}
          >
            <p>Student Login</p>
          </div>
          <div 
            className={`login-option ${loginType === 'admin' ? 'active' : ''}`} 
            onClick={() => handleLoginTypeChange('admin')}
          >
            <p>Admin Login</p>
          </div>
        </div>
      )}

      <div className="login-form-container">
        {/* Display the corresponding login form when a button is clicked */}
        {loginType === 'student' && <StudentLogin />}
        {loginType === 'admin' && <AdminLogin />}
      </div>
    </div>
  );
};

export default MainLogin;
