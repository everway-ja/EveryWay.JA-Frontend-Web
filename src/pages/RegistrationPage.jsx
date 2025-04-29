import React, { useState } from 'react';
import PageHeader from '@ui/navigation/PageHeader';
import { useNavigate } from 'react-router-dom';
import PageTitleSection from '@ui/content/PageTitleSection';
import PageContainerSection from '@ui/content/PageContainerSection';

const RegistrationPage = () => {
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
                currentPath="Registration"
            />
            
            <div className="main-content">
                {/* Title section using PageTitleSection */}
                <PageTitleSection
                    title="Registration"
                    description="Join the EveryWay.JA community"
                    titleAnimation="bottom"
                    descriptionAnimation="right"
                />
                
                {/* Registration form section using PageContainerSection */}
                <PageContainerSection
                    title="Create Your Account"
                    description="Sign up to access all our services"
                    titleAnimation="left"
                    descriptionAnimation="right"
                    contentAnimation="bottom"
                    withBackground={true}
                >
                    <div className="max-w-lg mx-auto">
                        {/* Registration form would go here */}
                    </div>
                </PageContainerSection>
            </div>
        </div>
    );
};

export default RegistrationPage;
