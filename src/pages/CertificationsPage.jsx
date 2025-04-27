import React, { useState } from 'react';
import PageHeader from '@ui/PageHeader';
import { useNavigate, useLocation } from 'react-router-dom';

const CertificationsPage = () => {
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
        currentPath="Our Certifications"
      />
      
      <div className="main-content">
        {/* Hero section with background image */}
        <div className="h-screen flex items-center justify-center relative">
          <div className="text-center px-4 z-10 relative">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Certifications</h1>
            <p className="text-xl mb-8">Quality assured by industry standards</p>
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
