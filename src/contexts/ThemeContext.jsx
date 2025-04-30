/**
 * ThemeContext.jsx
 * 
 * Context provider for theme management in the EveryWay application.
 * 
 * This module implements a React Context that manages the application's theme state (dark/light mode).
 * It handles:
 * - Reading the user's preferred theme from localStorage
 * - Falling back to the system preference if no stored preference exists
 * - Updating the DOM with appropriate theme classes
 * - Providing a theme toggle function to all components
 * - Listening for system theme preference changes
 * - Updating favicon based on browser theme (not website theme)
 * - Disabling Tab key to prevent UI issues
 * 
 * @module ThemeContext
 */
import { createContext, useContext, useState, useEffect, useCallback } from 'react';

/**
 * Context for storing and accessing theme-related data
 * @type {React.Context}
 */
const ThemeContext = createContext();

/**
 * Custom hook to access the theme context from any component
 * @returns {Object} Theme context with isDarkMode state and toggleTheme function
 */
export const useTheme = () => useContext(ThemeContext);

/**
 * Theme provider component that wraps the application to provide theme functionality
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} Provider component with theme context
 */
export const ThemeProvider = ({ children }) => {
    // Get saved theme from localStorage or use browser preference
    const [isDarkMode, setIsDarkMode] = useState(() => {
        // Use the same logic as the inline script in index.html
        const savedTheme = localStorage.getItem('theme');
        // If user has previously set a preference, use that
        if (savedTheme !== null) {
            return savedTheme === 'dark';
        }
        // Otherwise use browser/OS preference
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    // Toggle function for manual control - memoized to avoid recreating on each render
    const toggleTheme = useCallback(() => {
        setIsDarkMode(prev => !prev);
    }, []);

    // Disable Tab key across the application
    useEffect(() => {
        const handleTabKeyDown = (event) => {
            if (event.key === 'Tab') {
                event.preventDefault();
            }
        };
        
        // Add event listener to document
        document.addEventListener('keydown', handleTabKeyDown);
        
        // Cleanup function to remove event listener
        return () => {
            document.removeEventListener('keydown', handleTabKeyDown);
        };
    }, []);
    
    // Update document and save preference when theme changes
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    // Listen for browser theme changes and update favicon accordingly
    useEffect(() => {
        const updateFaviconForBrowserTheme = () => {
            const browserPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const favicon = document.getElementById('favicon');
            if (favicon) {
                favicon.href = browserPrefersDark 
                    ? '/assets/images/logos/logoSeal-white.svg'
                    : '/assets/images/logos/logoSeal-black.svg';
            }
        };
        
        // Set initial favicon based on browser theme
        updateFaviconForBrowserTheme();
        
        // Listen for changes to browser theme
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleBrowserThemeChange = () => {
            updateFaviconForBrowserTheme();
        };
        
        // Add listener for theme changes
        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', handleBrowserThemeChange);
            return () => mediaQuery.removeEventListener('change', handleBrowserThemeChange);
        } else {
            // Fallback for older browsers
            mediaQuery.addListener(handleBrowserThemeChange);
            return () => mediaQuery.removeEventListener('change', handleBrowserThemeChange);
        }
    }, []);

    // Also listen for OS theme changes to update the site theme (when no preference is set)
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e) => {
            // Only update if user hasn't set a preference
            if (localStorage.getItem('theme') === null) {
                setIsDarkMode(e.matches);
            }
        };
        
        // Add listener for theme changes
        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', handleChange);
            return () => mediaQuery.removeEventListener('change', handleChange);
        } else {
            // Fallback for older browsers
            mediaQuery.addListener(handleChange);
            return () => mediaQuery.removeEventListener('change', handleChange);
        }
    }, []);

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
