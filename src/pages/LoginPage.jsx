import React, { useState } from 'react';
import PageHeader from '@ui/navigation/PageHeader';
import { useNavigate } from 'react-router-dom';
import PageTitleSection from '@ui/content/PageTitleSection';
import PageContainerSection from '@ui/content/PageContainerSection';

const LoginPage = () => {
    const showHeader = true;
    const navigate = useNavigate();
    const [headerExpanded, setHeaderExpanded] = useState(false);
    
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
                currentPath="Login"
            />
            
            <div className="main-content">
                {/* Title section using PageTitleSection */}
                <PageTitleSection
                    title="Login"
                    description="Access your EveryWay.JA account"
                    titleAnimation="bottom"
                    descriptionAnimation="bottom"
                />
                
                {/* Login form section using PageContainerSection */}
                <PageContainerSection
                    title="Account Access"
                    titleAnimation="left"
                    contentAnimation="right"
                    withBackground={true}
                >
                    <div className="max-w-md mx-auto">
                        {/* Login form would go here */}
                    </div>
                </PageContainerSection>
            </div>
        </div>
    );
};

export default LoginPage;
