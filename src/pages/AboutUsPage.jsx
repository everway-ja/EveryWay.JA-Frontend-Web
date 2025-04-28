import React, { useState, useEffect } from 'react';
import PageHeader from '@ui/PageHeader';
import { useNavigate } from 'react-router-dom';

const AboutUsPage = () => {
    const showHeader = true;
    const navigate = useNavigate();
    const [headerExpanded, setHeaderExpanded] = useState(false);
    const [animationStarted, setAnimationStarted] = useState(false);
    
    // Trigger animation after component mounts
    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimationStarted(true);
        }, 100);
        
        return () => clearTimeout(timer);
    }, []);
    
    const handleLogoClick = () => {
        navigate('/');
    };
    
    const handleMenuClick = (isOpen) => {
        setHeaderExpanded(isOpen);
    };

    return (
        <div className={headerExpanded ? 'header-expanded' : ''}>
            <PageHeader 
                enabled={showHeader}
                onLogoClick={handleLogoClick}
                onMenuClick={handleMenuClick}
                currentPath="About Us"
            />
            
            <div className="main-content">
                {/* Full height container with centered content */}
                <div className="h-screen flex flex-col items-center justify-center p-4">
                    <div 
                        className={`w-full flex-1 flex flex-col items-center justify-center transition-all duration-700 ease-out ${
                            animationStarted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-24'
                        }`}
                    >
                        <div className="text-center">
                            <h1 className="text-3xl md:text-4xl font-bold">
                                About Us
                            </h1>
                        </div>
                        {/* Content will be added later */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUsPage;
