import React, { useState, useEffect } from 'react';
import PageHeader from '@ui/PageHeader';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '@contexts/ThemeContext';

const CertificationsPage = () => {
    const showHeader = true;
    const navigate = useNavigate();
    const location = useLocation();
    const [headerExpanded, setHeaderExpanded] = useState(false);
    const { isDarkMode } = useTheme();
    const [animationStarted, setAnimationStarted] = useState(false);
    
    // Trigger animation after component mounts
    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimationStarted(true);
        }, 100);
        
        return () => clearTimeout(timer);
    }, []);
    
    const handleLogoClick = () => {
        console.log('Logo clicked from certifications page');
        navigate('/');
    };
    
    const handleMenuClick = (isOpen) => {
        setHeaderExpanded(isOpen);
        // Add or remove header-expanded class from body to ensure proper content positioning
        if (isOpen) {
            document.body.classList.add('header-expanded');
        } else {
            document.body.classList.remove('header-expanded');
        }
    };

    // Use text color based on theme
    const textColorClass = isDarkMode ? 'text-white' : 'text-[rgb(var(--color-text))]';
    const certificationColor = '#5c2490'; // Purple color for certifications

    return (
        <div className={`certification-page ${headerExpanded ? 'header-expanded' : ''}`}>
            <PageHeader 
                enabled={showHeader}
                onLogoClick={handleLogoClick}
                onMenuClick={handleMenuClick}
                currentPath="Our Certifications"
            />
            
            <div className="main-content">
                {/* Hero section with background image */}
                <div className="h-screen flex items-center justify-center relative">
                    <div className="text-center px-4 z-10 relative">
                        <div className="text-center">
                            <h1 
                                className={`text-4xl md:text-6xl font-bold mb-6 ${textColorClass} transition-all duration-700 ease-out ${
                                    animationStarted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-24'
                                }`}
                                style={{color: certificationColor}}
                            >
                                Our Certifications
                            </h1>
                        </div>
                        <p 
                            className={`text-xl mb-8 ${textColorClass} transition-all duration-700 delay-200 ease-out ${
                                animationStarted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-24'
                            }`}
                        >
                            Quality assured by industry standards
                        </p>
                    </div>
                </div>
                
                {/* Content after the hero section - Added more content to test scrolling */}
                <div className="p-4">
                    
                </div>
            </div>
        </div>
    );
};

export default CertificationsPage;
