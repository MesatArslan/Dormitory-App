import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../redux/adminSlice'; // Import the admin actions
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../css/Student&AdminLogin.css';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [smsCode, setSmsCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate

  // Access the Redux state to check if the admin is logged in
  const isAdminLoggedIn = useSelector((state) => state.adminS.isAdminLoggedIn);
  const adminName = useSelector((state) => state.adminS.admin);

  // Simulate existing admin credentials and save to local storage on initial load
  useEffect(() => {
    const adminData = {
      username: 'admin123',
      password: 'adminpass',
      smsCode: '123456',
    };
    localStorage.setItem('adminCredentials', JSON.stringify(adminData));
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Get the saved credentials from local storage
    const savedCredentials = JSON.parse(localStorage.getItem('adminCredentials'));

    // Check if the entered credentials match the saved ones
    if (
      username === savedCredentials.username &&
      password === savedCredentials.password &&
      smsCode === savedCredentials.smsCode
    ) {
      dispatch(login(username)); // Dispatch login action to Redux
      setErrorMessage('');
      navigate('/admin-dashboard'); // Redirect to Admin Dashboard on successful login
    } else {
      setErrorMessage('Invalid login credentials. Please try again.');
    }
  };

  // Handle logout
  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action to Redux
    setUsername(''); // Clear the input fields
    setPassword('');
    setSmsCode('');
  };

  if (isAdminLoggedIn) {
    // Admin is already logged in, so redirect to Admin Dashboard
    return <AdminDashboard adminName={adminName} onLogout={handleLogout} />;
  }

  return (
    <>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
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
        <div className="form-group">
          <label>SMS Code</label>
          <input
            type="text"
            value={smsCode}
            onChange={(e) => setSmsCode(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-btn">Log in</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </>
  );
};

export default AdminLogin;
