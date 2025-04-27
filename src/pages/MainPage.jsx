import PageHeader from '@ui/PageHeader';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

const MainPage = () => {
  // Set this to false to disable the header
  const showHeader = true;
  const navigate = useNavigate();
  const location = useLocation();
  const [headerExpanded, setHeaderExpanded] = useState(false);
  
  // Format the current path for display
  const formatPathForDisplay = (path) => {
    if (path === '/') return 'Home';
    
    // Remove leading slash and replace remaining slashes with ' > '
    return path.substring(1).split('/').map(segment => 
      segment.charAt(0).toUpperCase() + segment.slice(1)
    ).join(' > ');
  };
  
  const currentPath = formatPathForDisplay(location.pathname);
  
  const handleLogoClick = () => {
    console.log('Logo clicked - navigating to home page');
    navigate('/'); // Navigate to the home/main page
  };
  
  const handleMenuClick = (isOpen) => {
    console.log('Menu button clicked', isOpen ? 'opened' : 'closed');
    setHeaderExpanded(isOpen);
  };
  
  return (
    <div className={headerExpanded ? 'header-expanded' : ''}>
      <PageHeader 
        enabled={showHeader}
        onLogoClick={handleLogoClick}
        onMenuClick={handleMenuClick}
        currentPath={currentPath}
      />
      
      <div className="main-content">
        {/* Hero section that starts at the top of the page */}
        <div className="h-screen flex items-center justify-center relative">
          <div className="text-center px-4">
            <img 
              src="/assets/images/logos/logo.svg" 
              alt="EveryWay.JA Logo" 
              className="mx-auto mb-8 w-56 h-56 md:w-72 md:h-72 rounded-3xl shadow-lg"
            />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">EveryWay.JA</h1>
            <p className="text-xl mb-8">
              La vita è già difficile, non deve esserlo di più.<br/> 
              EveryWay.JA : tutti, ovunque, per sempre.
            </p>
          </div>
        </div>
        
        {/* Content after the hero section */}
        <div className="p-4">
          <h1>Main Page Content</h1>
          {/* Rest of the page content */}
        </div>
      </div>
    </div>
  )
}

export default MainPage
