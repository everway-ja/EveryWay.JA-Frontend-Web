import React from 'react';
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

    return (
        <div>
            <PageHeader 
                enabled={showHeader}
                onLogoClick={handleLogoClick}
                currentPath="About Us"
            />
            
            <div className="main-content">
                {/* Hero section using PageTitleSection */}
                <PageTitleSection
                    title="About EveryWay"
                    titleAnimation="bottom"
                    descriptionAnimation="bottom"
                    image="/assets/images/logos/logo.svg" // Optional logo image
                    imageAnimation="bottom"
                />
                
                {/* Our Mission section using PageContainerSection */}
                <PageContainerSection
                    title="Our Mission"
                    description="Our mission is to create a world where accessibility is not an afterthought, but a standard."
                    titleAnimation="right"
                    descriptionAnimation="right"
                    contentAnimation="bottom"
                    withBackground={true}
                >
                </PageContainerSection>

                {/* Our Vision section using PageContainerSection */}
                <PageContainerSection
                    title="Our Vision"
                    description="We envision a future where every service is accessible to everyone, regardless of their difficulties."
                    titleAnimation="left"
                    descriptionAnimation="left"
                    contentAnimation="bottom"
                >
                </PageContainerSection>

                
                {/* Our Values section using PageContainerSection */}
                <PageContainerSection
                    title="Our Values"
                    titleAnimation="right"
                    descriptionAnimation="right"
                    contentAnimation="bottom"
                    withBackground={true}
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {values.map((value, index) => (
                            <AnimatedCard
                                key={index}
                                image={value.image}
                                title={value.title}
                                description={value.description}
                                cardAnimation="right"
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
                    titleAnimation="left"
                    descriptionAnimation="left"
                    contentAnimation="bottom"
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
                                        cardAnimation="left"
                                        animationDelay={300}
                                    />
                                </div>
                                <div className="w-full md:w-1/2">
                                    <AnimatedCard
                                        title={`${milestone.year} - ${milestone.title}`}
                                        description={milestone.description}
                                        cardAnimation="left"
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
                    description="Meet the passionate individuals behind EveryWay who are committed to making accessibility a reality for everyone."
                    titleAnimation="right"
                    descriptionAnimation="right"
                    contentAnimation="bottom"
                    withBackground={true}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {teamMembers.map((member, index) => (
                            <AnimatedCard
                                key={index}
                                image={member.image}
                                title={member.name}
                                description={`${member.role} - ${member.description}`}
                                cardAnimation="right"
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
                    contentAnimation="bottom"
                >
                    <div className="flex flex-wrap justify-center">
                        <Button 
                            text="Become a Partner"
                            to="/partners"
                            color="#c13f3f"
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
