import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '@contexts/ThemeContext';
import { useNavigate, useLocation, redirect } from 'react-router-dom';

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
    const [partnerLinkAnimated, setPartnerLinkAnimated] = useState(false);
    const [certificationLinkAnimated, setCertificationLinkAnimated] = useState(false);
    const headerRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();
    
    // Check if we're on the certifications page, partners page, or feedback page
    const isCertificationsPage = currentPath === 'Our Certifications';
    const isPartnersPage = currentPath === 'Our Partners';
    const isFeedbackPage = currentPath === 'Feedback';
    
    // Switch logo based on theme - use white logo for dark theme, certification page, or partners page
    const logoSrc = isDarkMode || isCertificationsPage || isPartnersPage
        ? '/assets/images/logos/logoSeal-white.svg' 
        : '/assets/images/logos/logoSeal-black.svg';
    
    // Title color - white for dark theme, certification page, or partner page, black for light theme
    const titleColorClass = isDarkMode || isCertificationsPage || isPartnersPage ? 'text-white' : 'text-black';
    
    // Icon color for menu button - white for dark theme, certification page, or partner page, black for light theme
    const iconColor = isDarkMode || isCertificationsPage || isPartnersPage ? '#ffffff' : '#000000';
    
    // Function to select a random background image
    const selectRandomBackground = () => {
        const backgroundImages = [
            '/assets/images/backgrounds/bg0.jpg',
            '/assets/images/backgrounds/bg1.jpg',
            '/assets/images/backgrounds/bg2.jpg',
            '/assets/images/backgrounds/bg3.jpg',
            '/assets/images/backgrounds/bg4.jpg',
            '/assets/images/backgrounds/bg5.jpg',
            '/assets/images/backgrounds/bg6.jpg',
            '/assets/images/backgrounds/bg7.jpg',
        ];
        
        const randomIndex = Math.floor(Math.random() * backgroundImages.length);
        const selectedImage = backgroundImages[randomIndex];
        
        // Find the background div and update it
        const bgDiv = document.querySelector('[style*="backgroundImage"]');
        if (bgDiv) {
            bgDiv.style.backgroundImage = `url(${selectedImage})`;
            console.log('Updated background image to:', selectedImage);
        }
    };
    
    // Handle menu state
    const handleMenuClick = () => {
        setMenuOpen(prevState => !prevState);
        onMenuClick(!menuOpen);
        
        // Reset animation states when closing the menu
        if (menuOpen) {
            setPartnerLinkAnimated(false);
            setCertificationLinkAnimated(false);
        }
    };
    
    // Effect to toggle body class for proper content padding
    useEffect(() => {
        if (menuOpen) {
            document.body.classList.add('header-expanded');
            
            // Trigger animations with a small delay when menu opens
            const partnerTimeout = setTimeout(() => {
                setPartnerLinkAnimated(true);
            }, 300);
            
            const certificationTimeout = setTimeout(() => {
                setCertificationLinkAnimated(true);
            }, 500);
            
            return () => {
                clearTimeout(partnerTimeout);
                clearTimeout(certificationTimeout);
            };
        } else {
            document.body.classList.remove('header-expanded');
        }
    }, [menuOpen]);
    
    if (!enabled) return null;
    
    // Determine header class based on current page
    let headerClass = '';
    if (isCertificationsPage) {
        headerClass = 'certification-header';
    } else if (isPartnersPage) {
        headerClass = 'partner-header';
    }
    
    return (
        <>
            {/* Page Header with expandable menu */}
            <header 
                ref={headerRef}
                className={`page-header ${headerClass} ${className} transition-all duration-300 ease-in-out`}
                style={{ 
                    height: menuOpen ? '520px' : '120px',
                    overflow: 'hidden',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    zIndex: 1000
                }}
            >
                {/* Fixed height container for header title and buttons */}
                <div className="h-[140px] relative">  {/* Increased height */}
                    {/* Home link with larger logo on the left side */}
                    <a 
                        href="/"
                        onClick={(e) => {
                            // Still change background when clicking the logo 
                            selectRandomBackground();
                            onLogoClick();
                            // Let default navigation happen naturally
                        }}
                        className="absolute top-[-0.5rem] left-4 w-32 h-32 flex items-center justify-center bg-transparent border-none hover:bg-opacity-10 hover:bg-gray-500 transition-colors focus:outline-none cursor-pointer z-20"
                        aria-label="Go to home page"
                    >
                        <img 
                            src={logoSrc} 
                            alt="EveryWay.JA Logo" 
                            className="w-16 h-16 transition-opacity hover:opacity-80"
                        />
                    </a>
                    
                    {/* Theme toggle button placed next to logo button */}
                    <button
                        onClick={toggleTheme}
                        className="absolute top-[-0.5rem] left-36 w-32 h-32 flex items-center justify-center bg-transparent border-none hover:bg-opacity-10 hover:bg-gray-500 transition-colors focus:outline-none cursor-pointer z-20"
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
                    
                    {/* Hamburger menu button moved to right corner */}
                    <button 
                        onClick={handleMenuClick}
                        className="absolute top-[-0.5rem] right-4 w-32 h-32 flex items-center justify-center bg-transparent border-none hover:bg-opacity-10 hover:bg-gray-500 transition-colors focus:outline-none cursor-pointer z-20"
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
                    
                    {/* Centered path display - Improved centering and increased size */}
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                        <div className="text-center mb-6"> {/* Added bottom margin to move page indicator upwards */}
                            {/* Path display with improved styling */}
                            <p className={`text-2xl ${titleColorClass} font-semibold`}>
                                {currentPath}
                            </p>
                        </div>
                    </div>
                </div>
                
                {/* Menu content - appears when header is expanded */}
                <div 
                    className={`w-full transition-opacity duration-300 ease-in-out ${  
                        menuOpen ? 'opacity-100 header-menu-expanded' : 'opacity-0 pointer-events-none'
                    }`}
                    style={{
                        position: 'absolute',
                        top: '140px',
                        left: 0,
                        right: 0,
                        padding: '1rem 0',
                        willChange: 'opacity',
                        transition: 'opacity 300ms ease-in-out',
                        height: '320px' // Fixed height for menu content
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
                            <div className="flex flex-col gap-4 mt-4 relative">
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
                                
                                {/* About Us link - added above Feedback */}
                                <a href="/about" className={`flex items-center ${titleColorClass} hover:opacity-80 transition-opacity pl-4`}>
                                    <span className="inline-flex justify-center items-center w-6">
                                        <i className="fas fa-info-circle"></i>
                                    </span>
                                    <span className="ml-2">About Us</span>
                                </a>
                                
                                {/* Feedback link - no special color */}
                                <a href="/feedback" className={`flex items-center ${titleColorClass} hover:opacity-80 transition-opacity pl-4`}>
                                    <span className="inline-flex justify-center items-center w-6">
                                        <i className="fas fa-comment-alt"></i>
                                    </span>
                                    <span className="ml-2">Feedback</span>
                                </a>
                                
                                {/* Separator */}
                                <div className={`border-t border-[rgba(var(--color-overlay),0.3)] mx-4 my-1`}></div>
                                
                                {/* Our Partners button with light animation and persisting blur effect */}
                                <div className="relative overflow-hidden">
                                    <a href="/partners" className={`flex items-center ${isPartnersPage ? titleColorClass : 'text-[rgb(173,148,93)]'} hover:opacity-80 transition-opacity pl-4 relative z-10`}>
                                        <span className="inline-flex justify-center items-center w-6">
                                            <i className="fas fa-handshake"></i>
                                        </span>
                                        <span className="ml-2 font-semibold">Our Partners</span>
                                    </a>
                                    {/* Light animation overlay for Partners */}
                                    <div 
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50 z-0 transition-transform duration-1000 ease-in-out" 
                                        style={{ 
                                            transform: partnerLinkAnimated ? 'translateX(100%)' : 'translateX(-100%)',
                                            opacity: isDarkMode ? '0.4' : '0.2'
                                        }}
                                    ></div>
                                    {/* Radial blur effect that radiates from inside out */}
                                    <div 
                                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-1000 ease-in-out z-0" 
                                        style={{ 
                                            width: partnerLinkAnimated ? '100%' : '0%',
                                            height: partnerLinkAnimated ? '200%' : '0%',
                                            background: isDarkMode 
                                                ? 'radial-gradient(circle, rgba(255, 255, 255, 0.25) 0%, transparent 70%)' 
                                                : 'radial-gradient(circle, rgba(0, 0, 0, 0.15) 0%, transparent 70%)',
                                            opacity: partnerLinkAnimated ? '1' : '0',
                                            transitionDelay: partnerLinkAnimated ? '800ms' : '0ms',
                                            backdropFilter: 'blur(2px)',
                                            WebkitBackdropFilter: 'blur(2px)',
                                            boxShadow: isDarkMode 
                                                ? 'inset 0 0 10px rgba(255, 255, 255, 0.2)' 
                                                : 'inset 0 0 10px rgba(0, 0, 0, 0.2)'
                                        }}
                                    ></div>
                                </div>
                                
                                {/* Our Certifications button with light animation and persisting blur effect */}
                                <div className="relative overflow-hidden">
                                    <a href="/certifications" className={`flex items-center ${isCertificationsPage ? titleColorClass : 'text-[rgb(132,0,255)]'} hover:opacity-80 transition-opacity pl-4 relative z-10`}>
                                        <span className="inline-flex justify-center items-center w-6">
                                            <i className="fas fa-certificate"></i>
                                        </span>
                                        <span className="ml-2 font-semibold">Our Certifications</span>
                                    </a>
                                    {/* Light animation overlay for Certifications */}
                                    <div 
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50 z-0 transition-transform duration-1000 ease-in-out" 
                                        style={{ 
                                            transform: certificationLinkAnimated ? 'translateX(100%)' : 'translateX(-100%)',
                                            opacity: isDarkMode ? '0.4' : '0.2'
                                        }}
                                    ></div>
                                    {/* Radial blur effect that radiates from inside out */}
                                    <div 
                                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-1000 ease-in-out z-0" 
                                        style={{ 
                                            width: certificationLinkAnimated ? '100%' : '0%',
                                            height: certificationLinkAnimated ? '200%' : '0%',
                                            background: isDarkMode 
                                                ? 'radial-gradient(circle, rgba(255, 255, 255, 0.25) 0%, transparent 70%)' 
                                                : 'radial-gradient(circle, rgba(0, 0, 0, 0.15) 0%, transparent 70%)',
                                            opacity: certificationLinkAnimated ? '1' : '0',
                                            transitionDelay: certificationLinkAnimated ? '800ms' : '0ms',
                                            backdropFilter: 'blur(2px)',
                                            WebkitBackdropFilter: 'blur(2px)',
                                            boxShadow: isDarkMode 
                                                ? 'inset 0 0 10px rgba(255, 255, 255, 0.2)' 
                                                : 'inset 0 0 10px rgba(0, 0, 0, 0.2)'
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Gradient effect that appears from bottom - smaller when menu closed, full size when open */}
                <div 
                    className={`absolute left-0 right-0 bottom-0 w-full transition-all duration-500 ease-in-out`}
                    style={{
                        height: menuOpen ? '150px' : '50px', // Full height when open, smaller when closed
                        opacity: menuOpen ? '1' : '0.7', // Full opacity when open, slightly transparent when closed
                        background: isDarkMode 
                            ? 'linear-gradient(to top, rgba(255, 255, 255, 0.15), transparent)' 
                            : 'linear-gradient(to top, rgba(0, 0, 0, 0.15), transparent)',
                        pointerEvents: 'none', // Make sure it doesn't interfere with clicks
                        zIndex: 5
                    }}
                />
                
                {children}
            </header>
        </>
    );
};

export default PageHeader;
