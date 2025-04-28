import React, { useState, useEffect } from 'react';
import PageHeader from '@ui/PageHeader';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@contexts/ThemeContext';

const FeedbackPage = () => {
    const showHeader = true;
    const navigate = useNavigate();
    const [headerExpanded, setHeaderExpanded] = useState(false);
    const [animationStarted, setAnimationStarted] = useState(false);
    const [titleAnimationStarted, setTitleAnimationStarted] = useState(false);
    const { isDarkMode } = useTheme();
    
    // Form state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [formStatus, setFormStatus] = useState(null);
    
    // Trigger animation after component mounts
    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimationStarted(true);
            
            // Add a slight delay before starting the dash animation
            setTimeout(() => {
                setTitleAnimationStarted(true);
            }, 800);
        }, 100);
        
        return () => clearTimeout(timer);
    }, []);
    
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
                {/* Full height container with centered content */}
                <div className="h-screen flex flex-col items-center justify-center p-4">
                    <div 
                        className={`w-full flex-1 flex flex-col items-center justify-center transition-all duration-700 ease-out ${
                            animationStarted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-24'
                        }`}
                    >
                        <div className="text-center">
                            <h1 className={`text-3xl md:text-4xl font-bold title-dash-animation ${titleAnimationStarted ? 'animate' : ''}`}>
                                We Value Your Feedback
                            </h1>
                        </div>
                        {/* Feedback form */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeedbackPage;
