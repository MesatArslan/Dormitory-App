import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import StudentFoodList from './StudentFoodList';
import StudentPermission from './StudentPermission';
import '../css/StudentDashbboard.css'; // Updated CSS

const StudentDashboard = () => {
  const isStudentLoggedIn = useSelector((state) => state.studentS.isStudentLoggedIn); // Get student login status from Redux

  // Redirect to login if student is not logged in
  if (!isStudentLoggedIn) {
    return <Navigate to="/login" />;
  }

  const [selectedComponent, setSelectedComponent] = useState('StudentFoodList'); // Default component
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar visibility

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.querySelector('.student-sidebar');
      const mobileMenuButton = document.querySelector('.mobile-menu-button');

      if (
        isSidebarOpen &&
        !sidebar.contains(event.target) &&
        !mobileMenuButton.contains(event.target)
      ) {
        setIsSidebarOpen(false);
      }
    };

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarOpen]);

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
      {/* Mobile Menu Button - Only show when sidebar is closed */}
      {!isSidebarOpen && (
        <button className="mobile-menu-button" onClick={toggleSidebar}>
          <div className="mobile-menu-button-text">☰</div>
        </button>
      )}

      {/* Overlay - Only show when sidebar is open */}
      {isSidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Left Sidebar */}
      <div className={`student-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <button
          className={selectedComponent === 'StudentFoodList' ? 'active' : ''}
          onClick={() => {
            setSelectedComponent('StudentFoodList');
            setIsSidebarOpen(false); // Close sidebar after clicking a button
          }}
        >
          Student Food List
        </button>
        <button
          className={selectedComponent === 'StudentPermission' ? 'active' : ''}
          onClick={() => {
            setSelectedComponent('StudentPermission');
            setIsSidebarOpen(false); // Close sidebar after clicking a button
          }}
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