import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  // Function to get current system theme preference
  const getSystemThemePreference = () => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  };
  
  // Initialize state based on system preference
  const [isDarkMode, setIsDarkMode] = useState(getSystemThemePreference());

  // Function to update theme based on system preference
  const updateThemeBasedOnSystemPreference = () => {
    setIsDarkMode(getSystemThemePreference());
  };

  // Toggle function (can be used for manual control if needed)
  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  // Update when system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Set initial theme
    updateThemeBasedOnSystemPreference();
    
    // Add listener for theme changes
    const handleChange = () => updateThemeBasedOnSystemPreference();
    
    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } 
    // Older browsers
    else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange);
    }

    // Cleanup
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else if (mediaQuery.removeListener) {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
