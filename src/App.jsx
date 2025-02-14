import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // Use BrowserRouter
import Header from './components/Header';
import Introduction from './components/Introduction';
import About from './components/About';
import MainLogin from './components/MainLogin';     // Login component
import Footer from './components/Footer';
import StudentDashboard from './components/StudentDashboard';
import AdminDashboard from './components/AdminDashboard';


const App = () => {
  return (
    <Router>  {/* Wrap everything in BrowserRouter */}
      <div>
        <Header />
        <Routes>  {/* Use Routes instead of Switch */}
          <Route path="/" element={<>
            <div id="introduction">
              <Introduction />
            </div>
            
            <div id="about">
              <About />
            </div>

            <div id="contact">
              <Footer/>
            </div></>} />  {/* Default page */}
          <Route path="/login" element={<MainLogin />} />  {/* Login page route */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />  {/* Login page route */}
          <Route path="/student-dashboard" element={<StudentDashboard />} />  {/* Login page route */}
        </Routes>        
      </div>
    </Router>
  );
};

export default App;
