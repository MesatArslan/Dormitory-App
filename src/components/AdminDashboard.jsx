import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import AStudentRegister from './AStudentRegister';
import AFoodList from './AFoodList';
import AStudentFoodSign from './AStudentFoodSign';
import AStudentPermission from './AStudentPermission';
import AStudentList from './AStudentList';
import '../css/AdminDashboard.css';

const AdminDashboard = () => {
  const isAdminLoggedIn = useSelector((state) => state.adminS.isAdminLoggedIn);
  const [selectedComponent, setSelectedComponent] = useState('AStudentRegister');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.querySelector('.admin-sidebar');
      const mobileMenuButton = document.querySelector('.mobile-menu-button');

      if (
        isSidebarOpen &&
        sidebar &&
        mobileMenuButton &&
        !sidebar.contains(event.target) &&
        !mobileMenuButton.contains(event.target)
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSidebarOpen]);

  if (!isAdminLoggedIn) {
    return <Navigate to="/login" />;
  }

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'AStudentRegister': return <AStudentRegister />;
      case 'AFoodList': return <AFoodList />;
      case 'AStudentFoodSign': return <AStudentFoodSign />;
      case 'AStudentPermission': return <AStudentPermission />;
      case 'AStudentList': return <AStudentList />;
      default: return <AStudentRegister />;
    }
  };

  return (
    <div className="admin-dashboard-container">
      {/* Mobile Menu Button */}
      {!isSidebarOpen && (
        <button className="mobile-menu-button" onClick={toggleSidebar}>
          <div className="mobile-menu-button-text">☰</div>
        </button>
      )}

      {/* Overlay */}
      {isSidebarOpen && <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)} />}

      {/* Sidebar */}
      <div className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <button 
          onClick={() => { setSelectedComponent('AStudentRegister'); setIsSidebarOpen(false); }}
          className={selectedComponent === 'AStudentRegister' ? 'active' : ''}
        >
          Register Students
        </button>
        <button 
          onClick={() => { setSelectedComponent('AFoodList'); setIsSidebarOpen(false); }}
          className={selectedComponent === 'AFoodList' ? 'active' : ''}
        >
          Manage Food List
        </button>
        <button 
          onClick={() => { setSelectedComponent('AStudentFoodSign'); setIsSidebarOpen(false); }}
          className={selectedComponent === 'AStudentFoodSign' ? 'active' : ''}
        >
          Student Food Sign
        </button>
        <button 
          onClick={() => { setSelectedComponent('AStudentPermission'); setIsSidebarOpen(false); }}
          className={selectedComponent === 'AStudentPermission' ? 'active' : ''}
        >
          Student Permissions
        </button>
        <button 
          onClick={() => { setSelectedComponent('AStudentList'); setIsSidebarOpen(false); }}
          className={selectedComponent === 'AStudentList' ? 'active' : ''}
        >
          Student List
        </button>
      </div>

      {/* Content Area */}
      <div className="admin-content">
        {renderComponent()}
      </div>
    </div>
  );
};

export default AdminDashboard;