import React, { useState } from 'react';
import PageHeader from '@ui/navigation/PageHeader';
import AnimatedCard from '@ui/components/AnimatedCard';
import Button from '@ui/components/Button';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@contexts/ThemeContext';
import PageTitleSection from '@ui/content/PageTitleSection';
import PageContainerSection from '@ui/content/PageContainerSection';

const AboutUsPage = () => {
    const showHeader = true;
    const navigate = useNavigate();
    const [headerExpanded, setHeaderExpanded] = useState(false);
    const { isDarkMode } = useTheme();
    
    // Team members data - Added example team members
    const teamMembers = [
    ];
    
    // Company milestones - Added example milestones
    const milestones = [
    ];
    
    // Core values
    const values = [
    ];
    
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
                {/* Hero section using PageTitleSection */}
                <PageTitleSection
                    title="About EveryWay.JA"
                    description="We're dedicated to making everyday services accessible to everyone, everywhere. Our mission is to create a world where accessibility is not an afterthought, but a standard."
                    titleAnimation="bottom"
                    descriptionAnimation="bottom"
                    image="/assets/images/logos/logo.svg" // Optional logo image
                    imageAnimation="top"
                />
                
                {/* Our Mission section using PageContainerSection */}
                <PageContainerSection
                    title="Our Mission"
                    description="At EveryWay.JA, we believe in a world where accessibility isn't just a feature—it's the foundation of how services are designed and delivered."
                    titleAnimation="bottom"
                    descriptionAnimation="bottom"
                    contentAnimation="left"
                    withBackground={true}
                >
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        {/* Mission content goes here */}
                    </div>
                </PageContainerSection>
                
                {/* Our Values section using PageContainerSection */}
                <PageContainerSection
                    title="Our Values"
                    titleAnimation="bottom"
                    contentAnimation="bottom"
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {values.map((value, index) => (
                            <AnimatedCard
                                key={index}
                                image={value.image}
                                title={value.title}
                                description={value.description}
                                cardAnimation="bottom"
                                animationDelay={300 + (index * 150)}
                                cardHeight="h-[400px]"
                                contentPosition="below"
                            />
                        ))}
                    </div>
                </PageContainerSection>
                
                {/* Our Journey section using PageContainerSection */}
                <PageContainerSection
                    title="Our Journey"
                    titleAnimation="right"
                    contentAnimation="bottom"
                    withBackground={true}
                >
                    <div className="space-y-12">
                        {milestones.map((milestone, index) => (
                            <div 
                                key={index} 
                                className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}
                            >
                                <div className="w-full md:w-1/2">
                                    <AnimatedCard
                                        image={milestone.image}
                                        cardHeight="h-[300px]"
                                        cardAnimation={index % 2 === 0 ? "left" : "right"}
                                        animationDelay={300}
                                    />
                                </div>
                                <div className="w-full md:w-1/2">
                                    <AnimatedCard
                                        title={`${milestone.year} - ${milestone.title}`}
                                        description={milestone.description}
                                        cardAnimation={index % 2 === 0 ? "right" : "left"}
                                        animationDelay={300}
                                        cardHeight="h-[300px]"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </PageContainerSection>
                
                {/* Our Team section using PageContainerSection */}
                <PageContainerSection
                    title="Our Team"
                    description="Meet the passionate individuals behind EveryWay.JA who are committed to making accessibility a reality for everyone."
                    titleAnimation="left"
                    descriptionAnimation="right"
                    contentAnimation="bottom"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {teamMembers.map((member, index) => (
                            <AnimatedCard
                                key={index}
                                image={member.image}
                                title={member.name}
                                description={`${member.role} - ${member.description}`}
                                cardAnimation="bottom"
                                animationDelay={300 + (index * 100)}
                                cardHeight="h-[450px]"
                                imageHeight="h-60"
                                contentPosition="below"
                            />
                        ))}
                    </div>
                </PageContainerSection>
                
                {/* Join Us section using PageContainerSection */}
                <PageContainerSection
                    title="Join Our Mission"
                    description="We're always looking for passionate individuals and organizations to join our mission of making services accessible to everyone."
                    titleAnimation="bottom"
                    descriptionAnimation="bottom"
                    contentAnimation="top"
                    withBackground={true}
                >
                    <div className="flex flex-wrap justify-center">
                        <Button 
                            text="Become a Partner"
                            to="/partners"
                            color="rgba(var(--color-partner),0.8)"
                            hoverColor="rgba(var(--color-partner),1)"
                            size="lg"
                            icon="fas fa-handshake"
                        />
                    </div>
                </PageContainerSection>
            </div>
        </div>
    );
};

export default AboutUsPage;
