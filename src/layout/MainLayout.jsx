import { Outlet } from 'react-router-dom'
import { useTheme } from '@contexts/ThemeContext'
import PageFooter from '@ui/PageFooter'
import { useState, useEffect } from 'react'

const MainLayout = () => {
    const { isDarkMode } = useTheme();
    const [backgroundImage, setBackgroundImage] = useState('');
    
    // Load a random background image when the component mounts
    useEffect(() => {
        // Select a random background image using a more direct approach
        const bgNumber = Math.floor(Math.random() * 8); // 0-7
        const imagePath = `/assets/images/backgrounds/bg${bgNumber}.jpg`;
        console.log('Setting background image to:', imagePath);
        setBackgroundImage(imagePath);
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
                }}
            />
            
            {/* Overlay div with adjusted transparency for light mode */}
            <div 
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: isDarkMode 
                        ? 'linear-gradient(to bottom, rgba(18, 18, 18, 0.85), rgba(18, 18, 18, 0.90))' // Keep dark mode overlay opacity
                        : 'linear-gradient(to bottom, rgba(255, 255, 255, 0.70), rgba(255, 255, 255, 0.75))', // More transparent light mode overlay
                    zIndex: -5,
                }}
            />
            
            {/* Content with higher z-index */}
            <div className="relative z-10 flex flex-col min-h-screen">
                <Outlet />
                <PageFooter />
            </div>
        </div>
    )
}

export default MainLayout
