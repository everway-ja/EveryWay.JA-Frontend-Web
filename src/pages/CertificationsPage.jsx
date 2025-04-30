import React, { useState } from 'react';
import PageHeader from '@ui/navigation/PageHeader';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@contexts/ThemeContext';
import PageTitleSection from '@ui/content/PageTitleSection';
import PageContainerSection from '@ui/content/PageContainerSection';
import Button from '@ui/components/Button';
import Card from '@ui/components/Card';

const CertificationsPage = () => {
    const showHeader = true;
    const navigate = useNavigate();
    const [headerExpanded, setHeaderExpanded] = useState(false);
    const { isDarkMode } = useTheme();
    
    // Certification color for consistency
    const certificationColor = '#ba68ff'; // More vibrant purple color for certifications
    
    const handleLogoClick = () => {
        console.log('Logo clicked from certifications page');
        navigate('/');
    };
    
    const handleMenuClick = (isOpen) => {
        setHeaderExpanded(isOpen);
    };

    // Handle certification request submission
    const handleRequestCertification = (e) => {
        e.preventDefault();
        // In a real application, this would submit the form data
        alert('Your certification request has been submitted!');
    };

    return (
        <div className={`certification-page ${headerExpanded ? 'header-expanded' : ''}`}>
            <PageHeader 
                enabled={showHeader}
                onLogoClick={handleLogoClick}
                onMenuClick={handleMenuClick}
                currentPath="Get Our Certifications"
            />
            
            <div className="main-content">
                {/* Hero section using PageTitleSection */}
                <PageTitleSection
                    title="Get Our Certifications"
                    description="Apply for quality certifications for your services and products"
                    titleAnimation="bottom"
                    descriptionAnimation="bottom"
                    titleColor={certificationColor}
                />
                
                {/* Certification Benefits section */}
                <PageContainerSection
                    title="Benefits of Our Certifications"
                    description="Our certifications help your business stand out by validating your commitment to accessibility and quality standards."
                    titleAnimation="left"
                    descriptionAnimation="right"
                    contentAnimation="bottom"
                    withBackground={true}
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-8">
                        <Card
                            title="Enhanced Credibility"
                            description="Build trust with your customers by demonstrating your commitment to accessibility standards."
                            className="backdrop-blur-sm"
                            contentHeight="h-full"
                            icon="fas fa-medal"
                            iconColor={certificationColor}
                            iconSize="text-5xl"
                            iconPosition="top"
                            titleStyle="text-center font-semibold text-lg"
                            descriptionStyle="text-center mt-3"
                        />
                        
                        <Card
                            title="Wider Audience"
                            description="Reach more customers by making your services accessible to people with different needs."
                            className="backdrop-blur-sm"
                            contentHeight="h-full"
                            icon="fas fa-users"
                            iconColor={certificationColor}
                            iconSize="text-5xl"
                            iconPosition="top"
                            titleStyle="text-center font-semibold text-lg"
                            descriptionStyle="text-center mt-3"
                        />
                        
                        <Card
                            title="Competitive Advantage"
                            description="Stand out from competitors by showcasing your accessibility certifications."
                            className="backdrop-blur-sm"
                            contentHeight="h-full"
                            icon="fas fa-chart-line"
                            iconColor={certificationColor}
                            iconSize="text-5xl"
                            iconPosition="top"
                            titleStyle="text-center font-semibold text-lg"
                            descriptionStyle="text-center mt-3"
                        />
                    </div>
                </PageContainerSection>
            </div>
        </div>
    );
};

export default CertificationsPage;
