import React, { useState, useEffect } from 'react';
import PageHeader from '@ui/PageHeader';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '@contexts/ThemeContext';

const CertificationsPage = () => {
  const showHeader = true;
  const navigate = useNavigate();
  const location = useLocation();
  const [headerExpanded, setHeaderExpanded] = useState(false);
  const { isDarkMode } = useTheme();
  
  // Log when component mounts to help with debugging
  useEffect(() => {
    console.log('Certifications page mounted');
    return () => {
      console.log('Certifications page unmounted');
    };
  }, []);
  
  const handleLogoClick = () => {
    console.log('Logo clicked from certifications page');
    navigate('/');
  };
  
  const handleMenuClick = (isOpen) => {
    setHeaderExpanded(isOpen);
  };

  // Use text color based on theme
  const textColorClass = isDarkMode ? 'text-white' : 'text-[rgb(var(--color-text))]';

  return (
    <div className={headerExpanded ? 'header-expanded' : ''}>
      <PageHeader 
        enabled={showHeader}
        onLogoClick={handleLogoClick}
        onMenuClick={handleMenuClick}
        currentPath="Our Certifications"
      />
      
      <div className="main-content">
        {/* Hero section with background image */}
        <div className="h-screen flex items-center justify-center relative">
          <div className="text-center px-4 z-10 relative">
            <h1 className={`text-4xl md:text-6xl font-bold mb-6 ${textColorClass}`}>Our Certifications</h1>
            <p className={`text-xl mb-8 ${textColorClass}`}>Quality assured by industry standards</p>
          </div>
        </div>
        
        {/* Content after the hero section */}
        <div className="p-4">
          {/* Certifications content would go here */}
        </div>
      </div>
    </div>
  );
};

export default CertificationsPage;
