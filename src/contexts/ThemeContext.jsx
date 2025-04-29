/**
 * ThemeContext.jsx
 * 
 * Context provider for theme management in the EveryWay.JA application.
 * 
 * This module implements a React Context that manages the application's theme state (dark/light mode).
 * It handles:
 * - Reading the user's preferred theme from localStorage
 * - Falling back to the system preference if no stored preference exists
 * - Updating the DOM with appropriate theme classes and favicon
 * - Providing a theme toggle function to all components
 * - Listening for system theme preference changes
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

    // Update document and save preference when theme changes
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            // Update favicon for dark mode
            const favicon = document.getElementById('favicon');
            if (favicon) favicon.href = '/assets/images/logos/logoSeal-white.svg';
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            // Update favicon for light mode
            const favicon = document.getElementById('favicon');
            if (favicon) favicon.href = '/assets/images/logos/logoSeal-black.svg';
        }
    }, [isDarkMode]);

    // Also listen for OS theme changes
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
            return () => mediaQuery.removeListener(handleChange);
        }
    }, []);

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
