import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import StudentFoodList from './StudentFoodList';
import StudentPermission from './StudentPermission';
import '../css/StudentDashbboard.css';  // Updated CSS

const StudentDashboard = () => {
  const isStudentLoggedIn = useSelector((state) => state.studentS.isStudentLoggedIn); // Get student login status from Redux

  // Redirect to login if student is not logged in
  if (!isStudentLoggedIn) {
    return <Navigate to="/login" />;
  }

  const [selectedComponent, setSelectedComponent] = useState('StudentFoodList'); // Default component

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'StudentFoodList':
        return <StudentFoodList />;
      case 'StudentPermission':
        return <StudentPermission />;
      default:
        return <StudentFoodList />;
    }
  };

  return (
    <div className="student-dashboard-container">
      {/* Left Sidebar */}
      <div className="student-sidebar">
        <button 
          className={selectedComponent === 'StudentFoodList' ? 'active' : ''} 
          onClick={() => setSelectedComponent('StudentFoodList')}
        >
          Student Food List
        </button>
        <button 
          className={selectedComponent === 'StudentPermission' ? 'active' : ''} 
          onClick={() => setSelectedComponent('StudentPermission')}
        >
          Student Permissions
        </button>
      </div>

      {/* Right Content Area */}
      <div className="student-content">
        {renderComponent()}
      </div>
    </div>
  );
};

export default StudentDashboard;
