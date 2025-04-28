import React from 'react';
import { useTheme } from '@contexts/ThemeContext';

const PageFooter = ({ pageName = '' }) => {
    const { isDarkMode } = useTheme();
    const currentYear = new Date().getFullYear();
    
    // Check if we're on the certifications or partners page
    const isCertificationsPage = pageName === 'Our Certifications';
    const isPartnersPage = pageName === 'Our Partners';
    
    // Logo source based on theme
    const logoSrc = isDarkMode || isCertificationsPage || isPartnersPage
        ? '/assets/images/logos/logoSeal-white.svg'
        : '/assets/images/logos/logoSeal-black.svg';
    
    // Text color class based on theme
    const textColorClass = isDarkMode || isCertificationsPage || isPartnersPage ? 'text-white' : 'text-black';
    
    // Determine footer class based on current page
    let footerClass = '';
    if (isCertificationsPage) {
        footerClass = 'certification-footer';
    } else if (isPartnersPage) {
        footerClass = 'partner-footer';
    }
    
    return (
        <footer 
            className={`mt-auto py-8 ${textColorClass} backdrop-blur-md ${footerClass} relative overflow-hidden`} 
            style={{
                background: isDarkMode 
                    ? 'rgba(var(--color-overlay), 0.20)' // Dark mode - match header opacity
                    : 'rgba(var(--color-overlay), 0.15)', // Light mode - match header opacity
                boxShadow: '0 -4px 30px rgba(var(--color-overlay), 0.1)',
                position: 'relative',
                zIndex: 1
            }}
        >
            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-center min-h-[150px]">
                    {/* JA Impresa in Azione Logo - Left Side */}
                    <div className="md:w-1/3 flex justify-start items-center">
                        <a 
                            href="https://www.jaitalia.org" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="transition-opacity hover:opacity-80"
                        >
                            <img 
                                src="/assets/images/logoJaImpresaInAzione.webp" 
                                alt="JA Impresa in Zione Logo" 
                                className="h-20 object-contain cursor-pointer"
                            />
                        </a>
                    </div>
                    
                    {/* Logo and Company Info - Center */}
                    <div className="mt-6 md:mt-0 flex flex-col items-center md:w-1/3">
                        <a href="/" className="flex flex-col items-center transition-opacity hover:opacity-80">
                            <img src={logoSrc} alt="EveryWay.JA Logo" className="w-24 h-24 mb-4" />
                            <h3 className={`text-2xl font-semibold ${textColorClass}`}>EveryWay.JA</h3>
                        </a>
                    </div>
                    
                    {/* Contact Information - Right Side */}
                    <div className={`mt-6 md:mt-0 flex flex-col items-center md:items-end md:w-1/3 ${textColorClass} text-sm opacity-80`}>
                        <p className="flex items-center mb-1">
                            <i className="fas fa-map-marker-alt mr-2"></i> Via Rivolta 10, Lecco Italy IT
                        </p>
                        <p className="flex items-center mb-1">
                            <i className="fas fa-phone mr-2"></i> 0341 365339
                        </p>
                        <p className="flex items-center mb-1">
                            <i className="fas fa-envelope mr-2"></i> 
                            <a href="mailto:everyway.ja@gmail.com" className="hover:underline">
                                everyway.ja@gmail.com
                            </a>
                        </p>
                        <p className="flex items-center">
                            <i className="fab fa-instagram mr-2"></i> 
                            <a href="https://www.instagram.com/everyway.ja/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                                @everyway.ja
                            </a>
                        </p>
                    </div>
                </div>
                
                {/* Copyright */}
                <div className={`mt-8 pt-4 border-t border-[rgba(var(--color-overlay),0.1)] text-center ${textColorClass} text-sm opacity-70`}>
                    <p>© {currentYear} EveryWay.JA. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default PageFooter;
