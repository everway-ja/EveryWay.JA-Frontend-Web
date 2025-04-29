import React, { useState, useEffect } from 'react';
import PageHeader from '@ui/PageHeader';
import AnimatedCard from '@ui/AnimatedCard';
import Button from '@ui/Button';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@contexts/ThemeContext';

const AboutUsPage = () => {
    const showHeader = true;
    const navigate = useNavigate();
    const [headerExpanded, setHeaderExpanded] = useState(false);
    const [animationStarted, setAnimationStarted] = useState(false);
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
                {/* Hero section */}
                <div className="h-screen flex flex-col items-center justify-center p-4">
                    <div 
                        className={`w-full max-w-4xl mx-auto text-center transition-all duration-700 ease-out ${
                            animationStarted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-24'
                        }`}
                    >
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            About EveryWay.JA
                        </h1>
                        <p className="text-xl mb-8 max-w-2xl mx-auto">
                            We're dedicated to making everyday services accessible to everyone, everywhere. 
                            Our mission is to create a world where accessibility is not an afterthought, but a standard.
                        </p>
                    </div>
                </div>
                
                {/* Our Mission section */}
                <div className="py-20 px-4 bg-[rgba(var(--color-overlay),0.03)]">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">Our Mission</h2>
                        <div className="flex flex-col md:flex-row gap-8 items-center">
                        </div>
                    </div>
                </div>
                
                {/* Our Values section */}
                <div className="py-20 px-4">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">Our Values</h2>
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
                    </div>
                </div>
                
                {/* Our Journey section */}
                <div className="py-20 px-4 bg-[rgba(var(--color-overlay),0.03)]">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">Our Journey</h2>
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
                    </div>
                </div>
                
                {/* Our Team section */}
                <div className="py-20 px-4">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">Our Team</h2>
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
                    </div>
                </div>
                
                {/* Join Us section */}
                <div className="py-20 px-4 bg-[rgba(var(--color-overlay),0.03)]">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-5xl font-bold mb-8">Join Our Mission</h2>
                        <p className="text-xl mb-12">
                            We're always looking for passionate individuals and organizations to join our mission of making services accessible to everyone.
                        </p>
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUsPage;
