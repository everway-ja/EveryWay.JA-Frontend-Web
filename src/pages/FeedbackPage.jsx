import React, { useState } from 'react';
import PageHeader from '@ui/navigation/PageHeader';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@contexts/ThemeContext';
import PageTitleSection from '@ui/content/PageTitleSection';
import PageContainerSection from '@ui/content/PageContainerSection';

const FeedbackPage = () => {
    const showHeader = true;
    const navigate = useNavigate();
    const [headerExpanded, setHeaderExpanded] = useState(false);
    const { isDarkMode } = useTheme();
    
    // Form state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [formStatus, setFormStatus] = useState(null);
    
    const handleLogoClick = () => {
        navigate('/');
    };
    
    const handleMenuClick = (isOpen) => {
        setHeaderExpanded(isOpen);
    };
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the data to a server
        // For now we'll just simulate a successful submission
        setFormStatus('success');
        
        // Reset form after 3 seconds
        setTimeout(() => {
            setFormStatus(null);
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            });
        }, 3000);
    };

    return (
        <div className={headerExpanded ? 'header-expanded' : ''}>
            <PageHeader 
                enabled={showHeader}
                onLogoClick={handleLogoClick}
                onMenuClick={handleMenuClick}
                currentPath="Feedback"
            />
            
            <div className="main-content">
                {/* Title section using PageTitleSection */}
                <PageTitleSection
                    title="Feedback"
                    description="We value your thoughts and suggestions"
                    titleAnimation="bottom"
                    descriptionAnimation="bottom"
                />
                
                {/* Feedback form section using PageContainerSection */}
                <PageContainerSection
                    title="Share Your Experience"
                    description="Your feedback helps us improve our services for everyone"
                    titleAnimation="right"
                    descriptionAnimation="right"
                    contentAnimation="bottom"
                    withBackground={true}
                >
                    {/* Feedback form would go here */}
                    <div className="max-w-2xl mx-auto">
                        {/* Form content goes here */}
                    </div>
                </PageContainerSection>
            </div>
        </div>
    );
};

export default FeedbackPage;
