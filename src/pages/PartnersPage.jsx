import React, { useState, useEffect } from 'react';
import PageHeader from '@ui/PageHeader';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '@contexts/ThemeContext';

const PartnersPage = () => {
    const showHeader = true;
    const navigate = useNavigate();
    const location = useLocation();
    const [headerExpanded, setHeaderExpanded] = useState(false);
    const { isDarkMode } = useTheme();
    const [animationStarted, setAnimationStarted] = useState(false);
    const [titleAnimationStarted, setTitleAnimationStarted] = useState(false);
    
    // Trigger animation after component mounts
    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimationStarted(true);
            
            // Add a slight delay before starting the dash animation
            setTimeout(() => {
                setTitleAnimationStarted(true);
            }, 800);
        }, 100);
        
        return () => clearTimeout(timer);
    }, []);
    
    const handleLogoClick = () => {
        console.log('Logo clicked from partners page');
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
    const partnerColor = '#907c4f'; // Gold color for partners

    return (
        <div className={`partners-page ${headerExpanded ? 'header-expanded' : ''}`}>
            <PageHeader 
                enabled={showHeader}
                onLogoClick={handleLogoClick}
                onMenuClick={handleMenuClick}
                currentPath="Our Partners"
            />
            
            <div className="main-content">
                {/* Hero section with background */}
                <div className="h-screen flex items-center justify-center relative">
                    <div className="text-center px-4 z-10 relative">
                        <div className="text-center">
                            <h1 
                                className={`text-4xl md:text-6xl font-bold mb-6 ${textColorClass} transition-all duration-700 ease-out title-dash-animation ${
                                    animationStarted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-24'
                                } ${titleAnimationStarted ? 'animate' : ''}`}
                                style={{color: partnerColor}}
                            >
                                Our Partners
                            </h1>
                        </div>
                        <p 
                            className={`text-xl mb-8 ${textColorClass} transition-all duration-700 delay-200 ease-out ${
                                animationStarted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-24'
                            }`}
                        >
                            Partners who make our work possible
                        </p>
                    </div>
                </div>
                
                {/* Partners content - Added more content to test scrolling */}
                <div className="container mx-auto p-4 mb-16">
                    
                </div>
            </div>
        </div>
    );
};

export default PartnersPage;
