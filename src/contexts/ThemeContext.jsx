import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    // Get saved theme from localStorage or use browser preference
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        // If user has previously set a preference, use that
        if (savedTheme !== null) {
            return savedTheme === 'dark';
        }
        // Otherwise use browser/OS preference
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    // Toggle function for manual control
    const toggleTheme = () => {
        setIsDarkMode(prev => !prev);
    };

    // Update document and save preference when theme changes
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            // Update favicon for dark mode
            document.getElementById('favicon').href = '/assets/images/logos/logoSeal-white.svg';
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            // Update favicon for light mode
            document.getElementById('favicon').href = '/assets/images/logos/logoSeal-black.svg';
        }
    }, [isDarkMode]);

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
