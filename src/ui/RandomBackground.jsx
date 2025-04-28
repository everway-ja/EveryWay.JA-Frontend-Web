import React, { useState, useEffect } from 'react';
import { useTheme } from '@contexts/ThemeContext';

/**
 * RandomBackground component
 * 
 * Selects a random background image from the assets/images/backgrounds directory
 * and applies it with a gradient overlay to ensure content remains readable.
 * 
 * The gradient overlay adapts to the current theme (light/dark).
 */
const RandomBackground = () => {
    const { isDarkMode } = useTheme();
    const [backgroundImage, setBackgroundImage] = useState(null);
    const [imageLoaded, setImageLoaded] = useState(false);
    
    // Select a random background image on component mount
    useEffect(() => {
        // List of available background images
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
        
        // Select a random image from the list
        const randomIndex = Math.floor(Math.random() * backgroundImages.length);
        const selectedImage = backgroundImages[randomIndex];
        
        console.log("Loading background image from:", selectedImage);
        
        // Preload the image
        const img = new Image();
        img.onload = () => {
            console.log("Background image loaded successfully:", selectedImage);
            setBackgroundImage(selectedImage);
            setImageLoaded(true);
        };
        img.onerror = () => {
            console.error(`Failed to load background image: ${selectedImage}`);
            // Try another image
            tryNextImage(0, backgroundImages, selectedImage);
        };
        img.src = selectedImage;
    }, []);
    
    // Helper function to try loading images sequentially
    const tryNextImage = (index, images, tried) => {
        // Skip the one we already tried
        if (images[index] === tried) {
            index = (index + 1) % images.length;
        }
        
        // We've tried all images if we've circled back
        if (images[index] === tried) {
            console.error("All background images failed to load");
            setImageLoaded(true); // Still set to true so we show the fallback color
            return;
        }
        
        console.log(`Trying backup image (${index}):`, images[index]);
        const fallbackImg = new Image();
        fallbackImg.onload = () => {
            console.log("Backup image loaded successfully:", images[index]);
            setBackgroundImage(images[index]);
            setImageLoaded(true);
        };
        fallbackImg.onerror = () => {
            console.error(`Failed to load backup image: ${images[index]}`);
            tryNextImage((index + 1) % images.length, images, tried);
        };
        fallbackImg.src = images[index];
    };
    
    // Directly set styles as attributes to ensure they're applied correctly
    const containerStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -5,
    };
    
    const bgImageStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        opacity: imageLoaded ? 1 : 0,
        transition: 'opacity 0.5s ease',
    };
    
    const overlayStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: isDarkMode 
            ? 'linear-gradient(to bottom, rgba(18, 18, 18, 0.85), rgba(18, 18, 18, 0.90))' // Keep dark mode overlay
            : 'linear-gradient(to bottom, rgba(255, 255, 255, 0.70), rgba(255, 255, 255, 0.75))', // More transparent light mode
    };
    
    return (
        <div style={containerStyle}>
            <div style={bgImageStyle}></div>
            <div style={overlayStyle}></div>
        </div>
    );
};

export default RandomBackground;
