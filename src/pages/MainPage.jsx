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
      
      <div className="main-content p-4">
        <h1>Main Page Content</h1>
      </div>
    </div>
  )
}

export default MainPage
