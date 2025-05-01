import PageHeader from '@ui/navigation/PageHeader';
import { useNavigate, useLocation } from 'react-router-dom';

const MainPage = () => {
    // Set this to false to disable the header
    const showHeader = true;
    const navigate = useNavigate();
    const location = useLocation();
    
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
    
    return (
        <div>
            <PageHeader 
                enabled={showHeader}
                onLogoClick={handleLogoClick}
                currentPath={currentPath}
            />
            
            <div className="main-content">
                {/* The PageTitleSection has been removed */}
            </div>
        </div>
    )
}

export default MainPage
