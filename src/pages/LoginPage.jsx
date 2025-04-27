import React, { useState } from 'react';
import PageHeader from '@ui/PageHeader';
import { useNavigate, useLocation } from 'react-router-dom';

const LoginPage = () => {
  const showHeader = true;
  const navigate = useNavigate();
  const location = useLocation();
  const [headerExpanded, setHeaderExpanded] = useState(false);
  
  const handleLogoClick = () => {
    navigate('/');
  };
  
  const handleMenuClick = (isOpen) => {
    setHeaderExpanded(isOpen);
  };

  return (
    <div className={headerExpanded ? 'header-expanded' : ''}>
      <PageHeader 
        enabled={showHeader}
        onLogoClick={handleLogoClick}
        onMenuClick={handleMenuClick}
        currentPath="Login"
      />
      
      <div className="main-content">
        {/* Full height container with centered content */}
        <div className="h-screen flex items-center justify-center p-4">
          <div className="bg-[rgba(var(--color-overlay),0.05)] backdrop-blur-sm p-8 rounded-lg w-full max-w-md">
            <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
            {/* Login form would go here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
