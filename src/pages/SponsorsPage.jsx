import React, { useState, useEffect } from 'react';
import PageHeader from '@ui/PageHeader';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '@contexts/ThemeContext';

const SponsorsPage = () => {
  const showHeader = true;
  const navigate = useNavigate();
  const location = useLocation();
  const [headerExpanded, setHeaderExpanded] = useState(false);
  const { isDarkMode } = useTheme();
  
  // Log when component mounts to help with debugging
  useEffect(() => {
    console.log('Sponsors page mounted');
    return () => {
      console.log('Sponsors page unmounted');
    };
  }, []);
  
  const handleLogoClick = () => {
    console.log('Logo clicked from sponsors page');
    navigate('/');
  };
  
  const handleMenuClick = (isOpen) => {
    setHeaderExpanded(isOpen);
  };

  // Use text color based on theme
  const textColorClass = isDarkMode ? 'text-white' : 'text-[rgb(var(--color-text))]';
  const sponsorColor = '#fed065'; // Gold color for sponsors

  return (
    <div className={headerExpanded ? 'header-expanded' : ''}>
      <PageHeader 
        enabled={showHeader}
        onLogoClick={handleLogoClick}
        onMenuClick={handleMenuClick}
        currentPath="Our Sponsors"
      />
      
      <div className="main-content">
        {/* Hero section with background */}
        <div className="h-screen flex items-center justify-center relative">
          <div className="text-center px-4 z-10 relative">
            <h1 className={`text-4xl md:text-6xl font-bold mb-6 ${textColorClass}`} 
                style={{color: sponsorColor}}>
              Our Sponsors
            </h1>
            <p className={`text-xl mb-8 ${textColorClass}`}>
              Partners who make our work possible
            </p>
          </div>
        </div>
        
        {/* Sponsors content */}
        <div className="container mx-auto p-4 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default SponsorsPage;
