/**
 * PageHeader.jsx
 * 
 * The main navigation header component for the EveryWay application.
 * 
 * This component provides a responsive header with:
 * - Application logo and home navigation
 * - Theme toggle (dark/light mode)
 * - Current page indicator (except on home page)
 * - Contextual styling based on current page
 * - Background image randomization
 * - User account icon on the right side
 * - Dropdown menu functionality for the account button
 * 
 * The header adapts its appearance based on the current theme and page context,
 * with special styling for partner and certification pages.
 * 
 * @module PageHeader
 */
import React, { useRef, useState, useEffect } from 'react';
import { useTheme } from '@contexts/ThemeContext';
import { useLocation } from 'react-router-dom';
import ShinyLink from './links/ShinyLink';
import NavLink from './links/NavLink';
import Button from '@ui/components/Button';

/**
 * Page header component with navigation links
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.enabled - Whether the header is enabled/visible
 * @param {React.ReactNode} props.children - Additional content to render in the header
 * @param {string} props.className - Additional CSS classes to apply
 * @param {Function} props.onLogoClick - Callback function when logo is clicked
 * @param {string} props.currentPath - Current page path for display
 * @returns {JSX.Element|null} The rendered header or null if disabled
 */
const PageHeader = ({ 
    enabled = true, 
    children, 
    className = '', 
    onLogoClick = () => {},
    currentPath = 'Home' // Default path
}) => {
    // Get theme context values
    const { isDarkMode, toggleTheme, isMobileDevice: contextMobileDevice } = useTheme();
    
    // Force detect mobile directly in component, using global var as backup
    const [forcedMobileDevice, setForcedMobileDevice] = useState(() => {
        // First check the global var which persists across navigation
        if (typeof window !== 'undefined' && window.__EVERYWAY_IS_MOBILE !== undefined) {
            return window.__EVERYWAY_IS_MOBILE;
        }
        // Fallback to direct check
        return window.innerWidth < 768;
    });
    
    // Use the forced check as the source of truth
    const isMobileDevice = forcedMobileDevice;
    
    const headerRef = useRef(null);
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMenuClosing, setIsMenuClosing] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ top: 0, right: 0 });
    const accountButtonRef = useRef(null);
    
    // Update forced mobile check on component mount and window resize
    useEffect(() => {
        const handleResize = () => {
            const newIsMobile = window.innerWidth < 768;
            setForcedMobileDevice(newIsMobile);
            if (typeof window !== 'undefined') {
                window.__EVERYWAY_IS_MOBILE = newIsMobile;
            }
        };
        
        // Check the global var on mount, which persists across navigation
        if (typeof window !== 'undefined' && window.__EVERYWAY_IS_MOBILE !== undefined) {
            setForcedMobileDevice(window.__EVERYWAY_IS_MOBILE);
        }
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    // Check if we're on the certifications page, partners page, or feedback page
    const isCertificationsPage = currentPath === 'Get Our Certifications';
    const isPartnersPage = currentPath === 'Our Partners';
    const isFeedbackPage = currentPath === 'Feedback';
    const isHomePage = currentPath === 'Home';
    // Update the position of the dropdown menu to appear near the header on right side
    useEffect(() => {
        if (isMenuOpen) {
            const headerHeight = isMobileDevice ? 70 : 120; // Match the header height
            setMenuPosition({
                top: headerHeight - 10, // Position slightly higher than directly below the header
                right: 10 // Closer to the right edge of the screen
            });
        }
    }, [isMenuOpen, isMobileDevice]);
    
    // Close the menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isMenuOpen && 
                accountButtonRef.current && 
                !accountButtonRef.current.contains(event.target) &&
                !event.target.closest('.dropdown-menu')) {
                closeMenuWithAnimation();
            }
        };
        
        // Use mousedown for earlier capture and add to document.body for better delegation
        document.body.addEventListener('mousedown', handleClickOutside, true);
        
        // Also handle touch events for mobile devices
        document.body.addEventListener('touchstart', handleClickOutside, true);
        
        return () => {
            document.body.removeEventListener('mousedown', handleClickOutside, true);
            document.body.removeEventListener('touchstart', handleClickOutside, true);
        };
    }, [isMenuOpen]);
    
    // Switch logo based on theme - use white logo for dark theme, certification page, or partners page
    const logoSrc = isDarkMode || isCertificationsPage || isPartnersPage
        ? '/assets/images/logos/logoSeal-white.svg' 
        : '/assets/images/logos/logoSeal-black.svg';
    
    // Title color - white for dark theme, certification page, or partner page, black for light theme
    const titleColorClass = isDarkMode || isCertificationsPage || isPartnersPage ? 'text-white' : 'text-black';
    
    // Icon color for theme toggle - white for dark theme, certification page, or partner page, black for light theme
    const iconColor = isDarkMode || isCertificationsPage || isPartnersPage ? '#ffffff' : '#000000';

    /**
     * Close the menu with a fade out animation
     */
    const closeMenuWithAnimation = () => {
        setIsMenuClosing(true);
        setTimeout(() => {
            setIsMenuOpen(false);
            setIsMenuClosing(false);
        }, 200); // Match this with the animation duration
    };

    /**
     * Toggle the menu visibility when the account button is clicked
     */
    const toggleMenu = () => {
        if (isMenuOpen) {
            closeMenuWithAnimation();
        } else {
            setIsMenuOpen(true);
        }
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
            {/* Page Header with fixed height */}
            <header 
                ref={headerRef}
                className={`page-header ${headerClass} ${className} transition-all duration-300 ease-in-out`}
                style={{ 
                    height: isMobileDevice ? '70px' : '120px',
                    maxHeight: isMobileDevice ? '70px' : '120px',
                    overflow: 'hidden',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    zIndex: 1000
                }}
                data-is-mobile={isMobileDevice ? 'true' : 'false'} // Add data attribute for easier debugging
            >                {/* Fixed height container for header title and buttons */}                <div className={`relative ${isMobileDevice ? 'h-[70px]' : 'h-[120px]'}`}>
                      {/* User account button on the right side */}
                    <Button
                        ref={accountButtonRef}
                        isHeader={true}
                        position="right"
                        icon="fas fa-bars"
                        iconColor={iconColor}
                        bgColor="transparent"
                        className={`${isMobileDevice ? 'top-1' : 'top-[-0.5rem]'} flex items-center justify-center`}
                        ariaLabel="User account menu"
                        onClick={toggleMenu}
                    >
                        <div className={`flex items-center justify-center ${isMobileDevice ? 'w-10 h-10' : 'w-8 h-8 md:w-12 md:h-12'} bg-gray-300 rounded-full ml-2`}>
                            <i className={`fas fa-user text-gray-600 ${isMobileDevice ? 'text-lg' : 'text-sm md:text-lg'}`}></i>
                        </div>
                    </Button>
                    
                    {/* Home link with logo on the left side */}
                    <Button
                        isHeader={true}
                        position="left"
                        href="/"
                        bgColor="transparent"
                        className={`${isMobileDevice ? 'top-1' : 'top-[-0.5rem]'}`}
                        ariaLabel="Go to home page"
                        onClick={(e) => {
                            selectRandomBackground();
                            onLogoClick();
                        }}
                    >
                        <img 
                            src={logoSrc} 
                            alt="EveryWay Logo" 
                            className={`${isMobileDevice ? 'w-12 h-12' : 'w-10 h-10 md:w-16 md:h-16'} transition-opacity hover:opacity-80`}
                        />
                    </Button>
                      {/* Theme toggle button - left of the logo, hidden on mobile */}
                    <Button
                        isHeader={true}
                        position="left"
                        icon={isDarkMode ? "fas fa-lightbulb" : "fas fa-moon"}
                        iconColor={iconColor}
                        bgColor="transparent"
                        className={`${isMobileDevice ? 'top-1' : 'top-[-0.5rem]'} left-24 md:left-36`}
                        mobileVisible={false}
                        ariaLabel={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                        onClick={toggleTheme}
                    />
                      {/* Prototype text - positioned more to the right and higher */}
                    <div 
                        className={`absolute ${isMobileDevice ? 'left-44 md:left-60' : 'left-52 md:left-72'} h-full flex items-center justify-center ${titleColorClass} transition-colors duration-300 ease-in-out font-medium`}
                        style={{ top: '47.5%', transform: 'translateY(-50%)' }}
                    >
                        <div className={`${isMobileDevice ? 'text-lg' : 'text-xl font-semibold'}`}>
                            Prototype
                        </div>
                    </div>
                    
                    {/* Centered path display - only show if not on home page */}
                    {!isHomePage && (
                        <div className={`absolute inset-0 flex items-center justify-center z-10`}>
                            <p className={`${isMobileDevice ? 'text-lg' : 'text-xl md:text-3xl'} font-semibold ${titleColorClass}`}>
                                {currentPath}
                            </p>
                        </div>
                    )}
                </div>
                
                {/* Subtle gradient effect at the bottom of the header */}
                <div 
                    className="absolute left-0 right-0 bottom-0 w-full transition-all duration-500 ease-in-out"
                    style={{
                        height: '50px',
                        opacity: isDarkMode ? '0.4' : '0.7',
                        background: isDarkMode 
                            ? 'linear-gradient(to top, rgba(255, 255, 255, 0.08), transparent)'
                            : 'linear-gradient(to top, rgba(0, 0, 0, 0.15), transparent)',
                        pointerEvents: 'none',
                        zIndex: 5
                    }}
                />
                
                {children}
            </header>
              {/* Dropdown menu - Positioned below the header on the right side */}
            {isMenuOpen && (
                <div
                    className={`fixed dropdown-menu w-64 rounded-lg overflow-hidden shadow-lg backdrop-blur-lg z-[1001] ${titleColorClass}`}
                    style={{
                        top: `${menuPosition.top}px`,
                        right: `${menuPosition.right}px`,
                        background: isCertificationsPage 
                            ? `rgba(var(--color-certification), ${isDarkMode ? 0.65 : 0.75})` 
                            : isPartnersPage 
                                ? `rgba(var(--color-partner), ${isDarkMode ? 0.65 : 0.75})`
                                : `rgba(var(--color-overlay), ${isDarkMode ? 0.15 : 0.2})`,
                        animation: isMenuClosing ? 'fadeOutUp 0.2s ease-out forwards' : 'fadeInDown 0.2s ease-out forwards',                        transition: 'background 0.15s ease-out',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
                    }}
                >
                    <div className="py-2">
                        <div className="block px-4 py-3 hover:bg-[rgba(255,255,255,0.1)] transition-all duration-200">
                            <NavLink 
                                to="/login"
                                text="Login"
                                icon="fas fa-sign-in-alt"
                                iconPosition="left"
                                iconClassName="w-6 text-center"
                                color={isCertificationsPage ? "#ffffff" : (isPartnersPage ? "#ffffff" : undefined)}
                                className="flex items-center w-full"
                                useActiveColor={false}
                            />
                        </div>
                        <div className="block px-4 py-3 hover:bg-[rgba(255,255,255,0.1)] transition-all duration-200">
                            <NavLink 
                                to="/register"
                                text="Sign Up"
                                icon="fas fa-user-plus"
                                iconPosition="left"
                                iconClassName="w-6 text-center"
                                color={isCertificationsPage ? "#ffffff" : (isPartnersPage ? "#ffffff" : undefined)}
                                className="flex items-center w-full"
                                useActiveColor={false}
                            />
                        </div>
                        <div className="border-t border-[rgba(255,255,255,0.1)] my-1"></div>
                        <div className="block px-4 py-3 hover:bg-[rgba(255,255,255,0.1)] transition-all duration-200">
                            <ShinyLink 
                                href="/partners"
                                color="#ffffff"
                                icon="fas fa-handshake"
                                iconColor="#ffffff"
                                animationDuration={1200}
                                className="flex items-center w-full"
                            >
                                <span className="ml-4">Become a Partner</span>
                            </ShinyLink>
                        </div>
                        <div className="block px-4 py-3 hover:bg-[rgba(255,255,255,0.1)] transition-all duration-200">
                            <ShinyLink 
                                href="/certifications"
                                color="#ffffff"
                                icon="fas fa-certificate"
                                iconColor="#ffffff"
                                animationDuration={1200}
                                animationDelay={600}
                                className="flex items-center w-full"
                            >
                                <span className="ml-4">Get Our Certifications</span>
                            </ShinyLink>
                        </div>
                        <div className="block px-4 py-3 hover:bg-[rgba(255,255,255,0.1)] transition-all duration-200">
                            <NavLink 
                                to="/feedback"
                                text="Give us Your Feedback"
                                icon="fas fa-comment"
                                iconPosition="left"
                                iconClassName="w-6 text-center"
                                color={isCertificationsPage ? "#ffffff" : (isPartnersPage ? "#ffffff" : undefined)}
                                className="flex items-center w-full"
                                useActiveColor={false}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default PageHeader;