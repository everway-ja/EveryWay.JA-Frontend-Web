import PageHeader from '@ui/navigation/PageHeader';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '@contexts/ThemeContext';
import PageTitleSection from '@ui/content/PageTitleSection';
import PageContainerSection from '@ui/content/PageContainerSection';
import AnimatedCard from '@ui/components/AnimatedCard';
import InteractiveMap from '@ui/components/InteractiveMap';
import { useState } from 'react';

const MainPage = () => {
    // Set this to false to disable the header
    const showHeader = true;
    const navigate = useNavigate();
    const location = useLocation();
    const { isDarkMode } = useTheme();
    const [selectedLocation, setSelectedLocation] = useState(null);
    
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
      // Location data for cards - only keeping the requested locations
    const locationData = [
        {
            title: "Trevi Fountain",
            image: "https://images.unsplash.com/photo-1525874684015-58379d421a52?q=80&w=1000&auto=format&fit=crop",
            accessible: true,
            description: "One of the most famous fountains in the world, located in Rome"
        },
        {
            title: "Colosseum",
            image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1000&auto=format&fit=crop",
            accessible: false,
            description: "Ancient Roman amphitheater in the center of Rome"
        },
        {
            title: "Venice Canals",
            image: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?q=80&w=1000&auto=format&fit=crop",
            accessible: true,
            description: "Famous waterways that run through the city of Venice"
        },
        {
            title: "Cinque Terre",
            image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=1000&auto=format&fit=crop",
            accessible: true,
            description: "Five colorful coastal villages on the Italian Riviera"
        },
        {
            title: "Vatican City",
            image: "https://images.unsplash.com/photo-1531572753322-ad063cecc140?q=80&w=1000&auto=format&fit=crop",
            accessible: false,
            description: "Independent city-state and home to St. Peter's Basilica"
        },
        {
            title: "Villa d'Este",
            image: "https://images.unsplash.com/photo-1654951887322-578a375add11?q=80&w=1000&auto=format&fit=crop",
            accessible: false,
            description: "16th-century villa famous for its terraced gardens and fountains"
        }
    ];// Custom accessibility icon component with absolute positioning
    const AccessibilityIcon = () => (
        <div className="absolute top-2 right-2 z-10">
            <i className="fas fa-wheelchair text-2xl text-blue-600"></i>
        </div>
    );
    
    return (
        <div>
            <PageHeader 
                enabled={showHeader}
                onLogoClick={handleLogoClick}
                currentPath={currentPath}
            />
            
            <div className="main-content">
                {/* PageTitleSection with Map Icon */}
                <PageTitleSection
                    title="Explore Destinations"
                    description="Find your next adventure with our curated destinations"
                    titleAnimation="bottom"
                    descriptionAnimation="bottom"
                    icon={isDarkMode ? "fas fa-map text-white" : "fas fa-map text-black"}
                    iconAnimation="bottom"
                    iconPosition="top" // Place icon above the title
                    iconSize="text-7xl" // Make icon slightly larger for better visibility at the top
                    staggerDelay={150} // Animations will start at the same time in PageTitleSection
                />
                
                {/* PageContainerSection with AnimatedCards Grid */}
                <PageContainerSection
                    contentAnimation="top"
                    withBackground={true}
                >
                    {/* Grid of Animated Cards with location data */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {locationData.map((location, index) => (
                            <div key={index} className="relative">
                                {location.accessible && <AccessibilityIcon />}
                                <AnimatedCard
                                    image={location.image}
                                    title={location.title}
                                    description={location.description}
                                    cardAnimation="top"
                                    animationDelay={300 + (index * 50)}
                                    cardHeight="h-auto"
                                    shadow={true}
                                    rounded={true}
                                    hoverEffect={true}
                                    imageHeight="h-[180px]"
                                    imageStyle="brightness-95"
                                    contentPosition="below"
                                    titleStyle="text-center font-bold text-base"
                                    descriptionStyle="text-center text-sm"
                                    onClick={() => setSelectedLocation(location)}
                                />
                            </div>
                        ))}
                    </div>                
                </PageContainerSection>
                
                {/* Interactive Map Section */}
                <PageContainerSection
                    title="Interactive Map"
                    titleStyle="text-2xl font-bold mb-6"
                    description="Click on markers to explore locations"
                    contentAnimation="bottom"
                    withBackground={false}
                >
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                            <InteractiveMap 
                                locationData={locationData} 
                                onMarkerClick={setSelectedLocation}
                            />
                        </div>
                        <div className="lg:col-span-1">
                            {selectedLocation ? (
                                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg h-full flex flex-col">
                                    <h3 className="text-xl font-bold mb-4">{selectedLocation.title}</h3>
                                    <div className="relative flex-grow mb-4">
                                        <img 
                                            src={selectedLocation.image} 
                                            alt={selectedLocation.title}
                                            className="w-full h-[300px] object-cover rounded-lg" 
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Available';
                                            }}
                                        />
                                        {selectedLocation.accessible && (
                                            <div className="absolute top-2 right-2">
                                                <i className="fas fa-wheelchair text-2xl text-blue-600"></i>
                                            </div>
                                        )}
                                    </div>
                                    {selectedLocation.description && (
                                        <p className="text-sm mb-4">{selectedLocation.description}</p>
                                    )}
                                    <div className="text-sm">
                                        {selectedLocation.accessible ? 
                                            <div className="text-green-600 dark:text-green-400">
                                                <i className="fas fa-check-circle mr-2"></i>
                                                This location is wheelchair accessible
                                            </div> :
                                            <div className="text-yellow-600 dark:text-yellow-400">
                                                <i className="fas fa-exclamation-triangle mr-2"></i>
                                                Limited accessibility at this location
                                            </div>
                                        }
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg h-full flex flex-col items-center justify-center text-center">
                                    <i className="fas fa-map-marker-alt text-4xl text-gray-400 mb-4"></i>
                                    <h3 className="text-xl font-semibold mb-2">Select a Location</h3>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        Click on any marker on the map to view details about that location
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </PageContainerSection>
            </div>
        </div>
    )
}

export default MainPage
