import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Import Redux hooks
import { login, logout } from '../redux/studentSlice'; // Import the student actions
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import StudentDashboard from './StudentDashboard';
import '../css/Student&AdminLogin.css';  // Importing the CSS file

const StudentLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate

  // Access the Redux state to check if the student is logged in
  const isStudentLoggedIn = useSelector((state) => state.studentS.isStudentLoggedIn);
  const studentName = useSelector((state) => state.studentS.student); // Student name from Redux store

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Retrieve student data from local storage
    const students = JSON.parse(localStorage.getItem('students')) || [];
  
    // Check if student exists
    const student = students.find(student => student.email === username && student.password === password);
  
    if (student) {
      // Dispatch login action to Redux with separate name and surname
      dispatch(login({ name: student.name, surname: student.surname }));
      setLoginError('');
      navigate('/student-dashboard'); // Redirect to Student Dashboard on successful login
    } else {
      setLoginError('Invalid username or password.');
    }
  };
  

  // Handle logout
  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action to Redux
    setUsername(''); // Clear input fields
    setPassword('');
    navigate('/'); // Redirect to login after logout
  };

  // If student is not logged in, show login form
  if (!isStudentLoggedIn) {
    return (
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email (Username)</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {loginError && <p className="error-message">{loginError}</p>}
        <button type="submit" className="submit-btn">Log in</button>
      </form>
    );
  }

  // If student is logged in, show the dashboard
  return (
    <div>
      <StudentDashboard studentName={studentName} handleLogout={handleLogout} />
    </div>
  );
};

export default StudentLogin;
