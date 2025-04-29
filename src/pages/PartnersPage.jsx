import React, { useState, useEffect } from 'react';
import PageHeader from '@ui/PageHeader';
import AnimatedCard from '@ui/AnimatedCard';
import Button from '@ui/Button';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '@contexts/ThemeContext';

const PartnersPage = () => {
    const showHeader = true;
    const navigate = useNavigate();
    const location = useLocation();
    const [headerExpanded, setHeaderExpanded] = useState(false);
    const { isDarkMode } = useTheme();
    const [animationStarted, setAnimationStarted] = useState(false);
    
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
        // Add or remove header-expanded class from body to ensure proper content positioning
        if (isOpen) {
            document.body.classList.add('header-expanded');
        } else {
            document.body.classList.remove('header-expanded');
        }
    };
    
    // Handle email partner button click
    const handleContactPartnerClick = (e) => {
        e.preventDefault();
        window.location.href = 'mailto:everyway.ja@gmail.com?subject=Partnership%20Inquiry&body=I%20am%20interested%20in%20becoming%20a%20partner%20with%20EveryWay.JA.';
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
                                className={`text-4xl md:text-6xl font-bold mb-6 ${textColorClass} transition-all duration-700 ease-out ${
                                    animationStarted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-24'
                                }`}
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
                
                {/* Introduction section */}
                <div className="py-12 px-4 bg-[rgba(var(--color-overlay),0.03)]">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-8">Collaboration for Accessibility</h2>
                        <p className="text-lg mb-12">
                            At EveryWay.JA, we believe that creating a more accessible world requires collaboration. 
                            We're proud to partner with organizations across different sectors who share our vision 
                            of making services accessible to everyone, regardless of their abilities.
                        </p>
                    </div>
                </div>
                
                {/* Partners categories */}
                {partnerCategories.map((category, categoryIndex) => (
                    <div key={categoryIndex} className="py-16 px-4">
                        <div className="max-w-6xl mx-auto">
                            <h2 className="text-3xl font-bold mb-4 text-center" style={{color: partnerColor}}>
                                {category.title}
                            </h2>
                            <p className="text-lg mb-12 text-center max-w-3xl mx-auto">
                                {category.description}
                            </p>
                            
                            {/* Partner cards grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {partners[category.title].map((partner, partnerIndex) => (
                                    <AnimatedCard
                                        key={partnerIndex}
                                        image={partner.image}
                                        title={partner.name}
                                        description={partner.description}
                                        cardAnimation="bottom"
                                        animationDelay={300 + (partnerIndex * 150)}
                                        cardHeight="h-[400px]"
                                        contentPosition="below"
                                        onClick={partner.website !== "#" ? () => window.open(partner.website, '_blank') : null}
                                        hoverEffect={partner.website !== "#"}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
                
                {/* Become a Partner section */}
                <div className="py-16 px-4 bg-[rgba(var(--color-overlay),0.03)]">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-6">Become a Partner</h2>
                        <p className="text-lg mb-10">
                            Are you interested in collaborating with us to create more accessible services and solutions? 
                            We're always looking for new partnerships that align with our mission.
                        </p>
                        <Button 
                            text="Contact Us to Partner"
                            onClick={handleContactPartnerClick}
                            color="rgba(var(--color-partner),0.8)"
                            hoverColor="rgba(var(--color-partner),1)"
                            icon="fas fa-handshake"
                            size="lg"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PartnersPage;
