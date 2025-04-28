import PageHeader from '@ui/PageHeader';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const MainPage = () => {
    // Set this to false to disable the header
    const showHeader = true;
    const navigate = useNavigate();
    const location = useLocation();
    const [headerExpanded, setHeaderExpanded] = useState(false);
    const [animationStarted, setAnimationStarted] = useState(false);
    const [titleAnimationStarted, setTitleAnimationStarted] = useState(false);
    
    // Trigger animation after component mounts
    useEffect(() => {
        // Short delay before starting animation
        const timer = setTimeout(() => {
            setAnimationStarted(true);
            
            // Add a slight delay before starting the dash animation
            setTimeout(() => {
                setTitleAnimationStarted(true);
            }, 800);
        }, 100);
        
        return () => clearTimeout(timer);
    }, []);
    
    // Format the current path for display
    const formatPathForDisplay = (path) => {
        if (path === '/') return 'Home';
        
        // Remove leading slash and replace remaining slashes with ' > '
        return path.substring(1).split('/').map(segment => 
            segment.charAt(0).toUpperCase() + segment.slice(1)
        ).join(' > ');
    };
    
    const currentPath = formatPathForDisplay(location.pathname);
    
    const handleLogoClick = () => {
        console.log('Logo clicked - navigating to home page');
        navigate('/'); // Navigate to the home/main page
    };
    
    const handleMenuClick = (isOpen) => {
        console.log('Menu button clicked', isOpen ? 'opened' : 'closed');
        setHeaderExpanded(isOpen);
    };
    
    return (
        <div className={headerExpanded ? 'header-expanded' : ''}>
            <PageHeader 
                enabled={showHeader}
                onLogoClick={handleLogoClick}
                onMenuClick={handleMenuClick}
                currentPath={currentPath}
            />
            
            <div className="main-content">
                {/* Hero section that starts at the top of the page */}
                <div className="h-screen flex items-center justify-center relative">
                    <div className="text-center px-4">
                        <div 
                            className={`transition-all duration-700 ease-out ${
                                animationStarted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-24'
                            }`}
                        >
                            <img 
                                src="/assets/images/logos/logo.svg" 
                                alt="EveryWay.JA Logo" 
                                className="mx-auto mb-8 w-56 h-56 md:w-72 md:h-72 rounded-3xl"
                            />
                        </div>
                        
                        <div className="text-center">
                            <h1 
                                className={`text-4xl md:text-6xl font-bold mb-6 transition-all duration-700 delay-200 ease-out text-rendering-optimized title-dash-animation ${
                                    animationStarted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-24'
                                } ${titleAnimationStarted ? 'animate' : ''}`}
                                style={{lineHeight: '1.3', paddingBottom: '0.15em'}}
                            >
                                EveryWay.JA
                            </h1>
                        </div>
                        
                        <p 
                            className={`text-xl mb-8 transition-all duration-700 delay-300 ease-out ${
                                animationStarted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-24'
                            }`}
                        >
                            Life is hard already, it doesn't have to be harder.
                        </p>
                    </div>
                </div>
                
                {/* Content after the hero section */}
                <div className="p-4">
                    {/* Rest of the page content */}
                </div>
            </div>
        </div>
    )
}

export default MainPage
