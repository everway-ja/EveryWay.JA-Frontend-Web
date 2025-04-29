/**
 * PageHeader.jsx
 * 
 * The main navigation header component for the EveryWay.JA application.
 * 
 * This component provides a responsive, animated header with:
 * - Application logo and home navigation
 * - Theme toggle (dark/light mode)
 * - Current page indicator
 * - Expandable menu with navigation links
 * - Contextual styling based on current page
 * - Background image randomization
 * 
 * The header adapts its appearance based on the current theme and page context,
 * with special styling for partner and certification pages.
 * 
 * @module PageHeader
 */
import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '@contexts/ThemeContext';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * Page header component with expandable menu for navigation
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.enabled - Whether the header is enabled/visible
 * @param {React.ReactNode} props.children - Additional content to render in the header
 * @param {string} props.className - Additional CSS classes to apply
 * @param {Function} props.onLogoClick - Callback function when logo is clicked
 * @param {Function} props.onMenuClick - Callback function when menu is toggled, receives isOpen state
 * @param {string} props.currentPath - Current page path for display
 * @returns {JSX.Element|null} The rendered header or null if disabled
 */
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
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [partnerLinkAnimated, setPartnerLinkAnimated] = useState(false);
    const [certificationLinkAnimated, setCertificationLinkAnimated] = useState(false);
    const headerRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();
    
    // Check if we're on the certifications page, partners page, or feedback page
    const isCertificationsPage = currentPath === 'Get Our Certifications';
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
    
    /**
     * Toggles the user menu open/closed state
     */
    const handleUserMenuToggle = () => {
        setUserMenuOpen(prev => !prev);
    };
    
    /**
     * Closes the user menu
     */
    const handleUserMenuClose = () => {
        setUserMenuOpen(false);
    };
    
    /**
     * Selects a random background image and applies a transition effect
     */
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
            
            // Add a brief flash effect when changing backgrounds
            const flashEffect = document.createElement('div');
            flashEffect.style.position = 'fixed';
            flashEffect.style.top = '0';
            flashEffect.style.left = '0';
            flashEffect.style.width = '100%';
            flashEffect.style.height = '100%';
            flashEffect.style.backgroundColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
            flashEffect.style.zIndex = '5';
            flashEffect.style.opacity = '0';
            flashEffect.style.transition = 'opacity 0.5s ease-in-out';
            document.body.appendChild(flashEffect);
            
            // Trigger the flash effect
            setTimeout(() => { flashEffect.style.opacity = '0.5'; }, 50);
            setTimeout(() => { 
                flashEffect.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(flashEffect);
                }, 500);
            }, 250);
        }
    };
    
    /**
     * Handles clicks on the menu button and triggers appropriate state changes
     */
    const handleMenuClick = () => {
        setMenuOpen(prevState => !prevState);
        onMenuClick(!menuOpen);
        
        // Close user menu when opening main menu
        setUserMenuOpen(false);
        
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
                    height: menuOpen ? '440px' : '120px',
                    overflow: 'hidden',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    zIndex: 1000
                }}
            >
                {/* Fixed height container for header title and buttons */}
                <div className="h-[140px] relative">
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
                    
                    {/* User menu button to the left of the hamburger menu */}
                    <div className="absolute top-[-0.5rem] right-4 w-32 h-32 flex items-center justify-center bg-transparent border-none hover:bg-opacity-10 hover:bg-gray-500 transition-colors focus:outline-none cursor-pointer z-20">

                    </div>
                    
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
                                
                                {/* About Us link */}
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
                                
                                {/* Our Partners button with light animation */}
                                <div className="relative overflow-hidden">
                                    <a href="/partners" className={`flex items-center ${isPartnersPage ? titleColorClass : 'text-[#ff2d2d]'} hover:opacity-80 transition-opacity pl-4 relative z-10`}>
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
                                </div>
                                
                                {/* Get Our Certifications button with light animation - Updated text */}
                                <div className="relative overflow-hidden">
                                    <a href="/certifications" className={`flex items-center ${isCertificationsPage ? titleColorClass : 'text-[rgb(132,0,255)]'} hover:opacity-80 transition-opacity pl-4 relative z-10`}>
                                        <span className="inline-flex justify-center items-center w-6">
                                            <i className="fas fa-certificate"></i>
                                        </span>
                                        <span className="ml-2 font-semibold">Get Our Certifications</span>
                                    </a>
                                    {/* Light animation overlay for Certifications */}
                                    <div 
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50 z-0 transition-transform duration-1000 ease-in-out" 
                                        style={{ 
                                            transform: certificationLinkAnimated ? 'translateX(100%)' : 'translateX(-100%)',
                                            opacity: isDarkMode ? '0.4' : '0.2'
                                        }}
                                    ></div>
                                </div>
                                
                                {/* User Account section in the main menu */}
                                <div className={`border-t border-[rgba(var(--color-overlay),0.3)] mx-4 my-1`}></div>
                                <a href="/login" className={`flex items-center ${titleColorClass} hover:opacity-80 transition-opacity pl-4`}>
                                    <span className="inline-flex justify-center items-center w-6">
                                        <i className="fas fa-user"></i>
                                    </span>
                                    <span className="ml-2">My Account</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Gradient effect that appears from bottom - smaller when menu closed, full size when open */}
                <div 
                    className={`absolute left-0 right-0 bottom-0 w-full transition-all duration-500 ease-in-out`}
                    style={{
                        height: menuOpen ? '150px' : '50px', // Full height when open, smaller when closed
                        opacity: menuOpen ? (isDarkMode ? '0.7' : '1') : (isDarkMode ? '0.4' : '0.7'), // Lower opacity in dark mode
                        background: isDarkMode 
                            ? 'linear-gradient(to top, rgba(255, 255, 255, 0.08), transparent)' // Reduced intensity for dark mode
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