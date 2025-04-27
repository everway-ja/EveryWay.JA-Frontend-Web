import React, { useState, useEffect } from 'react';
import { useTheme } from '@contexts/ThemeContext';
import { useNavigate, useLocation } from 'react-router-dom';

const PageHeader = ({ 
  enabled = true, 
  children, 
  className = '', 
  onLogoClick = () => {}, 
  onMenuClick = () => {},
  currentPath = 'Home' // Default path
}) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if we're on the certifications page
  const isCertificationsPage = currentPath === 'Our Certifications';
  
  // Switch logo based on theme - use white logo for dark theme or certification page
  const logoSrc = isDarkMode || isCertificationsPage 
    ? '/assets/images/logos/logoSeal-white.svg' 
    : '/assets/images/logos/logoSeal-black.svg';
  
  // Title color - white for dark theme or certification page, black for light theme
  const titleColorClass = isDarkMode || isCertificationsPage ? 'text-white' : 'text-black';
  
  // Icon color for menu button - white for dark theme or certification page, black for light theme
  const iconColor = isDarkMode || isCertificationsPage ? '#ffffff' : '#000000';
  
  // Handle menu state
  const handleMenuClick = () => {
    setMenuOpen(prevState => !prevState);
    onMenuClick(!menuOpen);
  };
  
  // Effect to toggle body class for proper content padding
  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('header-expanded');
    } else {
      document.body.classList.remove('header-expanded');
    }
  }, [menuOpen]);
  
  if (!enabled) return null;
  
  // Determine header class based only on current page (no exit animation)
  const headerClass = isCertificationsPage ? 'certification-header' : '';
  
  return (
    <>
      {/* Page Header with expandable menu */}
      <div 
        className={`page-header relative ${headerClass} ${className} transition-all duration-300 ease-in-out`}
        style={{ 
          height: menuOpen ? '425px' : '120px',
          overflow: 'hidden'
        }}
      >
        {/* Fixed height container for header title and buttons */}
        <div className="h-[120px] relative">
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
          
          {/* Theme toggle button placed next to hamburger menu */}
          <button
            onClick={toggleTheme}
            className="absolute top-[-0.5rem] left-40 w-32 h-32 flex items-center justify-center bg-transparent border-none hover:bg-opacity-10 hover:bg-gray-500 transition-colors focus:outline-none cursor-pointer z-20"
            aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            type="button"
          >
            {/* Lightbulb/Moon icon for theme toggle */}
            <div className="flex items-center justify-center w-8 h-8">
              {isDarkMode ? (
                // Lightbulb for dark mode (clicking switches to light)
                <i className="fas fa-lightbulb text-2xl" style={{ color: iconColor }}></i>
              ) : (
                // Moon icon for light mode (clicking switches to dark)
                <i className="fas fa-moon text-2xl" style={{ color: iconColor }}></i>
              )}
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
          
          {/* Centered EveryWay.JA text with path below - Improved positioning */}
          <div className="absolute left-0 right-0 top-0 bottom-0 flex flex-col items-center justify-center z-10">
            <div className="w-full text-center">
              <button 
                onClick={onLogoClick}
                className="bg-transparent border-none focus:outline-none cursor-pointer mx-auto block"
                aria-label="Return to home page"
              >
                <h1 className={`text-3xl font-bold ${titleColorClass}`}>EveryWay.JA</h1>
              </button>
              
              {/* Path display - simplified without arrows */}
              <p className={`text-base ${titleColorClass} mt-3 opacity-80 italic`}>
                {currentPath}
              </p>
            </div>
          </div>
        </div>
        
        {/* Menu content - appears when header is expanded */}
        <div 
          className={`w-full transition-opacity duration-300 ease-in-out absolute top-[120px] left-0 right-0 ${
            menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          style={{
            padding: '1rem 0',
            willChange: 'opacity',
            transition: 'opacity 300ms ease-in-out'
          }}
        >
          {/* Three equally sized columns centered horizontally */}
          <div className="grid grid-cols-3 w-3/4 mx-auto pb-6">
            {/* Column 1 */}
            <div className="relative p-4">
              <div className="absolute top-0 right-0 bottom-6 w-px bg-[rgba(var(--color-overlay),0.2)]"></div>
              <h3 className={`font-semibold text-lg mb-3 ${titleColorClass} text-center`}>Other Pages</h3>
              {/* Column 1 content */}
            </div>
            
            {/* Column 2 */}
            <div className="relative p-4">
              <div className="absolute top-0 right-0 bottom-6 w-px bg-[rgba(var(--color-overlay),0.2)]"></div>
              <h3 className={`font-semibold text-lg mb-3 ${titleColorClass} text-center`}>In This Page</h3>
              {/* Column 2 content */}
            </div>
            
            {/* Column 3 */}
            <div className="p-4">
              <h3 className={`font-semibold text-lg mb-3 ${titleColorClass} text-center`}>Quick Links</h3>
              {/* Quick links with icons - adjusted for consistent spacing */}
              <div className="flex flex-col gap-4 mt-4">
                {/* Home link (added at the top) */}
                <a href="/" className={`flex items-center ${titleColorClass} hover:opacity-80 transition-opacity pl-4`}>
                  <span className="inline-flex justify-center items-center w-6">
                    <i className="fas fa-home"></i>
                  </span>
                  <span className="ml-2">Home</span>
                </a>
                
                <a href="/login" className={`flex items-center ${titleColorClass} hover:opacity-80 transition-opacity pl-4`}>
                  <span className="inline-flex justify-center items-center w-6">
                    <i className="fas fa-sign-in-alt"></i>
                  </span>
                  <span className="ml-2">Login</span>
                </a>
                <a href="/register" className={`flex items-center ${titleColorClass} hover:opacity-80 transition-opacity pl-4`}>
                  <span className="inline-flex justify-center items-center w-6">
                    <i className="fas fa-id-card"></i>
                  </span>
                  <span className="ml-2">Registration</span>
                </a>
                <a 
                  href="https://www.instagram.com/everyway.ja/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`flex items-center ${titleColorClass} hover:opacity-80 transition-opacity pl-4`}
                >
                  <span className="inline-flex justify-center items-center w-6">
                    <i className="fab fa-instagram text-lg"></i>
                  </span>
                  <span className="ml-2">Instagram</span>
                </a>
                
                {/* Separator */}
                <div className={`border-t border-[rgba(var(--color-overlay),0.3)] mx-4 my-1`}></div>
                
                {/* Our Certifications button - Fixed syntax error with proper tag nesting */}
                <a href="/certifications" className={`flex items-center ${titleColorClass} hover:opacity-80 transition-opacity pl-4`}>
                  <span className="inline-flex justify-center items-center w-6">
                    <i className="fas fa-certificate"></i>
                  </span>
                  <span className="ml-2">Our Certifications</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {children}
      </div>
    </>
  );
};

export default PageHeader;
