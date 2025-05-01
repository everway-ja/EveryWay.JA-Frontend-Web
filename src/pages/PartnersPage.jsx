import React, { useState } from 'react';
import PageHeader from '@ui/navigation/PageHeader';
import AnimatedCard from '@ui/components/AnimatedCard';
import Button from '@ui/components/Button';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@contexts/ThemeContext';
import PageTitleSection from '@ui/content/PageTitleSection';
import PageContainerSection from '@ui/content/PageContainerSection';

const PartnersPage = () => {
    const showHeader = true;
    const navigate = useNavigate();
    const [headerExpanded, setHeaderExpanded] = useState(false);
    const { isDarkMode, isMobileDevice } = useTheme(); // Add isMobileDevice to keep mobile context alive
    
    // Partner categories
    const partnerCategories = [
        {
            title: "Government Partners",
            description: "Public institutions collaborating with us to improve accessibility in public services.",
        },
        {
            title: "Corporate Partners",
            description: "Businesses committed to improving accessibility in their products and services.",
        },
        {
            title: "Non-Profit Partners",
            description: "Organizations working with us to advocate for and implement accessibility solutions.",
        }
    ];
    
    // Sample partners data (placeholder for future real partners)
    const partners = {
        "Government Partners": [
        ],
        "Corporate Partners": [
        ],
        "Non-Profit Partners": [
        ]
    };
    
    const handleLogoClick = () => {
        navigate('/');
    };
    
    const handleMenuClick = (isOpen) => {
        setHeaderExpanded(isOpen);
    };
    
    // Handle email partner button click
    const handleContactPartnerClick = (e) => {
        e.preventDefault();
        window.location.href = 'mailto:EveryWay@gmail.com?subject=Partnership%20Inquiry&body=I%20am%20interested%20in%20becoming%20a%20partner%20with%20EveryWay.';
    };

    // Partner color for consistency
    const partnerColor = '#ff2d2d'; // Vibrant red color for partners

    return (
        <div className={`partners-page ${headerExpanded ? 'header-expanded' : ''}`}>
            <PageHeader 
                enabled={showHeader}
                onLogoClick={handleLogoClick}
                onMenuClick={handleMenuClick}
                currentPath="Our Partners"
            />
            
            <div className="main-content">
                {/* Hero section using PageTitleSection */}
                <PageTitleSection
                    title="Our Partners"
                    description="Partners who make our work possible"
                    titleAnimation="bottom"
                    descriptionAnimation="bottom"
                    titleColor={partnerColor}
                />
                
                {/* Introduction section */}
                <PageContainerSection
                    title="Collaboration for Accessibility"
                    description="At EveryWay, we believe that creating a more accessible world requires collaboration. 
                    We're proud to partner with organizations across different sectors who share our vision 
                    of making services accessible to everyone, regardless of their abilities."
                    titleAnimation="right"
                    descriptionAnimation="right"
                    contentAnimation="bottom"
                    withBackground={true}
                />
                
                {/* Partners categories sections */}
                {partnerCategories.map((category, categoryIndex) => (
                    <PageContainerSection
                        key={categoryIndex}
                        title={category.title}
                        description={category.description}
                        titleAnimation={categoryIndex % 2 === 0 ? "left" : "right"}
                        descriptionAnimation={categoryIndex % 2 === 0 ? "left" : "right"}
                        contentAnimation="bottom"
                        titleColor={partnerColor}
                        withBackground={categoryIndex % 2 !== 0}
                    >
                        {/* Partner cards grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {partners[category.title].map((partner, partnerIndex) => (
                                <AnimatedCard
                                    key={partnerIndex}
                                    image={partner.image}
                                    title={partner.name}
                                    description={partner.description}
                                    cardAnimation={categoryIndex % 2 === 0 ? "left" : "right"}
                                    animationDelay={300 + (partnerIndex * 150)}
                                    cardHeight="h-[400px]"
                                    contentPosition="below"
                                    onClick={partner.website !== "#" ? () => window.open(partner.website, '_blank') : null}
                                    hoverEffect={partner.website !== "#"}
                                />
                            ))}
                        </div>
                    </PageContainerSection>
                ))}
                
                {/* Become a Partner section */}
                <PageContainerSection
                    title="Become a Partner"
                    description="Are you interested in collaborating with us to create more accessible services and solutions? 
                    We're always looking for new partnerships that align with our mission."
                    titleAnimation="bottom"
                    descriptionAnimation="bottom"
                    contentAnimation="bottom"
                    withBackground={true}
                >
                    <div className="flex flex-wrap justify-center">
                        <Button 
                            text="Contact Us to Partner"
                            onClick={handleContactPartnerClick}
                            color="#c13f3f"
                            icon="fas fa-handshake"
                            size="lg"
                        />
                    </div>
                </PageContainerSection>
            </div>
        </div>
    );
};

export default PartnersPage;
