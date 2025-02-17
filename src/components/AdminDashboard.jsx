import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom'; 
import AStudentRegister from './AStudentRegister';
import AFoodList from './AFoodList';
import AStudentFoodSign from './AStudentFoodSign';
import AStudentPermission from './AStudentPermission';
import AStudentList from './AStudentList';
import '../css/AdminDashboard.css';  // Custom CSS for styling

const AdminDashboard = () => {
  const isAdminLoggedIn = useSelector((state) => state.adminS.isAdminLoggedIn);

  if (!isAdminLoggedIn) {
    return <Navigate to="/login" />;
  }

  const [selectedComponent, setSelectedComponent] = useState('AStudentRegister'); 

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'AStudentRegister':
        return <AStudentRegister />;
      case 'AFoodList':
        return <AFoodList />;
      case 'AStudentFoodSign':
        return <AStudentFoodSign />;
      case 'AStudentPermission':
        return <AStudentPermission />;
      case 'AStudentList':
        return <AStudentList />;
      default:
        return <AStudentRegister />;
    }
  };

  return (
    <div className="admin-dashboard-container">
      {/* Left Sidebar */}
      <div className="admin-sidebar">
        <button 
          onClick={() => setSelectedComponent('AStudentRegister')}
          className={selectedComponent === 'AStudentRegister' ? 'active' : ''}
        >
          Register Students
        </button>
        <button 
          onClick={() => setSelectedComponent('AFoodList')}
          className={selectedComponent === 'AFoodList' ? 'active' : ''}
        >
          Manage Food List
        </button>
        <button 
          onClick={() => setSelectedComponent('AStudentFoodSign')}
          className={selectedComponent === 'AStudentFoodSign' ? 'active' : ''}
        >
          Student Food Sign
        </button>
        <button 
          onClick={() => setSelectedComponent('AStudentPermission')}
          className={selectedComponent === 'AStudentPermission' ? 'active' : ''}
        >
          Student Permissions
        </button>
        <button 
          onClick={() => setSelectedComponent('AStudentList')}
          className={selectedComponent === 'AStudentList' ? 'active' : ''}
        >
          Student List
        </button>
      </div>

      {/* Right Content Area */}
      <div className="admin-content">
        {renderComponent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
