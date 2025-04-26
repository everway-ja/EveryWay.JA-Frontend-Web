import React, { useState } from 'react';
import { useTheme } from '@contexts/ThemeContext';

const PageHeader = ({ 
  enabled = true, 
  children, 
  className = '', 
  onLogoClick = () => {}, 
  onMenuClick = () => {},
  currentPath = 'Home' // Default path
}) => {
  const { isDarkMode } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Switch logo based on theme - inverse relationship (white logo for light theme)
  const logoSrc = isDarkMode ? '/assets/images/logoSeal-black.svg' : '/assets/images/logoSeal-white.svg';
  
  // Title color - black for dark theme, white for light theme
  const titleColorClass = isDarkMode ? 'text-black' : 'text-white';
  
  // Icon color for menu button - black for dark theme, white for light theme
  const iconColor = isDarkMode ? '#000000' : '#ffffff';
  
  const handleMenuClick = () => {
    setMenuOpen(prevState => !prevState);
    onMenuClick(!menuOpen);
  };
  
  if (!enabled) return null;
  
  return (
    <>
      {/* Page Header with expandable menu */}
      <div 
        className={`page-header relative ${className} transition-all duration-300 ease-in-out`}
        style={{ height: menuOpen ? '320px' : '120px' }} // Dynamic height based on menu state
      >
        {/* Hamburger menu button in top left corner */}
        <button 
          onClick={handleMenuClick}
          className="absolute top-[-0.5rem] left-4 w-32 h-32 flex items-center justify-center bg-transparent border-none hover:bg-opacity-10 hover:bg-gray-500 transition-colors focus:outline-none cursor-pointer z-20"
          aria-label="Menu"
          type="button"
        >
          <div className="flex flex-col items-center justify-center w-8 h-8 relative">
            <div
              style={{
                width: '28px',
                height: '3px',
                backgroundColor: iconColor,
                borderRadius: '999px',
                position: 'absolute',
                transition: 'transform 0.3s ease',
                transform: menuOpen ? 'rotate(45deg)' : 'rotate(0) translateY(-8px)'
              }}
            ></div>
            <div
              style={{
                width: '28px',
                height: '3px',
                backgroundColor: iconColor,
                borderRadius: '999px',
                position: 'absolute',
                transition: 'opacity 0.3s ease',
                opacity: menuOpen ? '0' : '1'
              }}
            ></div>
            <div
              style={{
                width: '28px',
                height: '3px',
                backgroundColor: iconColor,
                borderRadius: '999px',
                position: 'absolute',
                transition: 'transform 0.3s ease',
                transform: menuOpen ? 'rotate(-45deg)' : 'rotate(0) translateY(8px)'
              }}
            ></div>
          </div>
        </button>
        
        {/* Logo button in top right corner */}
        <button 
          onClick={onLogoClick}
          className="absolute top-[-0.5rem] right-4 w-32 h-32 flex items-center justify-center bg-transparent border-none hover:bg-opacity-10 hover:bg-gray-500 transition-colors focus:outline-none z-20"
          aria-label="Logo"
        >
          <img src={logoSrc} alt="Logo" className="w-28 h-28" />
        </button>
        
        {/* Centered EveryWay.JA text with path below */}
        <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ height: '120px' }}>
          <button 
            onClick={onLogoClick}
            className="bg-transparent border-none focus:outline-none cursor-pointer"
            aria-label="Return to home page"
          >
            <h1 className={`text-3xl font-bold ${titleColorClass}`}>EveryWay.JA</h1>
          </button>
          
          {/* Path display */}
          <p className={`text-sm ${titleColorClass} mt-1 opacity-80`}>
            {currentPath}
          </p>
        </div>
        
        {/* Menu content - appears when header is expanded */}
        <div 
          className={`absolute inset-x-0 top-[120px] w-full flex justify-center transition-opacity duration-300 ease-in-out ${
            menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Three equally sized columns centered horizontally */}
          <div className="grid grid-cols-3 w-3/4 h-full">
            {/* Column 1 */}
            <div className="border-r border-[rgba(var(--color-overlay),0.2)] p-4">
              <h3 className={`font-semibold text-lg mb-3 ${titleColorClass} text-center`}>Other Pages</h3>
              {/* Column 1 content */}
            </div>
            
            {/* Column 2 */}
            <div className="border-r border-[rgba(var(--color-overlay),0.2)] p-4">
              <h3 className={`font-semibold text-lg mb-3 ${titleColorClass} text-center`}>In This Page</h3>
              {/* Column 2 content */}
            </div>
            
            {/* Column 3 */}
            <div className="p-4">
              <h3 className={`font-semibold text-lg mb-3 ${titleColorClass} text-center`}>Quick Links</h3>
              {/* Column 3 content */}
            </div>
          </div>
        </div>
        
        {children}
      </div>
    </>
  );
};

export default PageHeader;
