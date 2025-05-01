/**
 * ScrollToTop.jsx
 * 
 * A utility component that scrolls the window to the top when the route changes.
 * This component should be placed high in the component tree to ensure it works
 * for all route changes.
 * 
 * The component uses useEffect to watch for changes in the location.pathname
 * and scrolls the window to the top (0,0) whenever the path changes.
 * 
 * @module ScrollToTop
 */
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop component that restores scroll position on navigation
 * 
 * @returns {null} This component doesn't render anything
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  // Scroll to top whenever the pathname changes
  useEffect(() => {
    // First set scroll to top immediately
    window.scrollTo(0, 0);
    
    // Sometimes the immediate scroll doesn't work consistently,
    // so we add a small timeout for more reliability
    const timeoutId = setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'auto' // Use 'auto' for immediate scrolling
      });
      
      // For some browsers/scenarios, targeting the html and body elements helps
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 10);
    
    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return null; // This component doesn't render anything
};

export default ScrollToTop;