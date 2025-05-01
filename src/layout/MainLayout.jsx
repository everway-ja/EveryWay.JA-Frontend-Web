/**
 * MainLayout.jsx
 * 
 * Primary layout component for the EveryWay application that serves as the 
 * container for all pages.
 * 
 * This component:
 * - Provides a consistent layout across all pages
 * - Manages the random background image selection
 * - Handles preloading of background images
 * - Applies theme-appropriate styling overlays
 * - Determines the current page name for use in the footer
 * - Scrolls to top on page navigation
 * 
 * The component uses nested routing via React Router's Outlet to render
 * different page content while maintaining the consistent layout structure.
 * 
 * @module MainLayout
 */
import { Outlet, useLocation } from 'react-router-dom'
import { useTheme } from '@contexts/ThemeContext'
import PageFooter from '@ui/navigation/PageFooter'
import { useState, useEffect, useRef } from 'react'

/**
 * Main layout component that wraps all pages in the application
 * 
 * @returns {JSX.Element} The main layout with nested content
 */
const MainLayout = () => {
    const { isDarkMode } = useTheme();
    const [backgroundImage, setBackgroundImage] = useState('');
    const [imagesPreloaded, setImagesPreloaded] = useState(false);
    const location = useLocation();
    const contentRef = useRef(null);
    
    // Scroll to top whenever the pathname changes
    // This is a secondary mechanism in addition to the ScrollToTop component
    useEffect(() => {
        const scrollToTop = () => {
            // Try various scroll methods for maximum browser compatibility
            if (contentRef.current) {
                contentRef.current.scrollTop = 0;
            }
            
            // Standard window scrolling
            window.scrollTo(0, 0);
            
            // For Safari and other browsers that might need specific element targeting
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        };
        
        // Execute immediately
        scrollToTop();
        
        // And also after a small delay to catch any pending rendering
        const timeoutId = setTimeout(scrollToTop, 50);
        return () => clearTimeout(timeoutId);
    }, [location.pathname]);
    
    /**
     * Determines the current page name based on the URL pathname
     * 
     * @param {string} pathname - The current URL path
     * @returns {string} Formatted page name for display
     */
    const getPageName = (pathname) => {
        switch (pathname) {
            case '/':
                return 'Home';
            case '/certifications':
                return 'Our Certifications';
            case '/partners':
                return 'Our Partners';
            case '/about':
                return 'About Us';
            case '/feedback':
                return 'Feedback';
            case '/login':
                return 'Login';
            case '/register':
                return 'Registration';
            default:
                // Extract page name from pathname
                return pathname.substring(1).split('/').map(segment => 
                    segment.charAt(0).toUpperCase() + segment.slice(1)
                ).join(' > ');
        }
    };
    
    const currentPageName = getPageName(location.pathname);
    
    // Array of all background images
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
    
    // Preload all background images when component mounts
    useEffect(() => {
        console.log('Preloading all background images...');
        let loadedCount = 0;
        
        // Create an array to hold references to the Image objects
        const preloadedImages = [];
        
        /**
         * Handler for image load events
         * When all images are loaded, selects a random background
         */
        const handleImageLoad = () => {
            loadedCount++;
            if (loadedCount === backgroundImages.length) {
                console.log('All background images preloaded successfully');
                setImagesPreloaded(true);
                
                // Select a random background now that all are loaded
                const bgNumber = Math.floor(Math.random() * backgroundImages.length);
                const imagePath = backgroundImages[bgNumber];
                console.log('Setting background image to:', imagePath);
                setBackgroundImage(imagePath);
            }
        };
        
        // Create and load each image
        backgroundImages.forEach((src, index) => {
            const img = new Image();
            img.onload = handleImageLoad;
            img.onerror = () => {
                console.error(`Failed to preload background image: ${src}`);
                handleImageLoad(); // Still count errors to avoid blocking
            };
            img.src = src;
            preloadedImages.push(img); // Keep a reference to prevent garbage collection
        });
        
        // Cleanup function
        return () => {
            // Clear image references
            preloadedImages.forEach(img => {
                img.onload = null;
                img.onerror = null;
            });
        };
    }, []);

    return (
        <div 
            className="min-h-screen theme-transition text-[rgb(var(--color-text))] flex flex-col"
            style={{
                position: 'relative',
            }}
        >
            {/* Fixed background div that doesn't move with scrolling */}
            <div 
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundAttachment: 'fixed', // This keeps it fixed during scroll
                    backgroundColor: isDarkMode ? '#121212' : '#ffffff',
                    zIndex: -10,
                    opacity: imagesPreloaded ? 1 : 0,
                    transition: 'opacity 0.5s ease-in-out',
                }}
            />
            
            {/* Overlay div with adjusted transparency for dark mode */}
            <div 
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: isDarkMode 
                        ? 'linear-gradient(to bottom, rgba(18, 18, 18, 0.92), rgba(18, 18, 18, 0.97))' // More subtle dark mode gradient
                        : 'linear-gradient(to bottom, rgba(255, 255, 255, 0.68), rgba(255, 255, 255, 0.82))', // Keep light mode gradient
                    zIndex: -5,
                }}
            />
            
            {/* Hidden div for preloading - adds another layer of assurance that images remain loaded */}
            <div style={{ display: 'none' }}>
                {backgroundImages.map((src, index) => (
                    <img key={index} src={src} alt="Preloaded background" />
                ))}
            </div>
            
            {/* Content with higher z-index */}
            <div ref={contentRef} className="relative z-10 flex flex-col min-h-screen">
                <Outlet />
                <PageFooter pageName={currentPageName} />
            </div>
        </div>
    )
}

export default MainLayout
