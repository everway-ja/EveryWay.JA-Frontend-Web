import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

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
