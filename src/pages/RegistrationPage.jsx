import React, { useState, useEffect } from 'react';
import PageHeader from '@ui/PageHeader';
import { useNavigate, useLocation } from 'react-router-dom';

const RegistrationPage = () => {
    const showHeader = true;
    const navigate = useNavigate();
    const location = useLocation();
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
                currentPath="Registration"
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
                                Registration
                            </h1>
                        </div>
                        {/* Registration form would go here */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegistrationPage;
