/**
 * PageFooter.jsx
 * 
 * A responsive footer component for the EveryWay application that adapts to
 * different pages and themes.
 * 
 * This component:
 * - Displays organization logos, contact information, and copyright notice
 * - Adapts its appearance based on the current theme (dark/light)
 * - Applies special styling for certification and partner pages
 * - Provides links to social media and contact information
 * - Maintains consistent branding with the rest of the application
 * 
 * @module PageFooter
 */
import React from 'react';
import { useTheme } from '@contexts/ThemeContext';

/**
 * Page footer component that displays at the bottom of every page
 * 
 * @param {Object} props - Component props
 * @param {string} props.pageName - The name of the current page for contextual styling
 * @returns {JSX.Element} The rendered footer component
 */
const PageFooter = ({ pageName = '' }) => {
    const { isDarkMode, isMobileDevice } = useTheme();
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
            className={`mt-auto ${isMobileDevice ? 'py-4' : 'py-8'} ${textColorClass} backdrop-blur-md ${footerClass} relative overflow-hidden`} 
            style={{
                background: isDarkMode 
                    ? 'rgba(var(--color-overlay), 0.10)' // Reduced opacity for dark mode
                    : 'rgba(var(--color-overlay), 0.15)', // Keep light mode opacity
                boxShadow: '0 -4px 30px rgba(var(--color-overlay), 0.1)',
                position: 'relative',
                zIndex: 1
            }}
        >
            {/* Gradient effect that appears from top towards bottom - Reduced for dark mode */}
            <div 
                className={`absolute left-0 right-0 top-0 w-full transition-opacity duration-500 ease-in-out opacity-100`}
                style={{
                    height: '15vh',
                    maxHeight: '150px',
                    background: isDarkMode 
                        ? 'linear-gradient(to bottom, rgba(255, 255, 255, 0.08), transparent)' // Less intense in dark mode
                        : 'linear-gradient(to bottom, rgba(0, 0, 0, 0.15), transparent)',
                    pointerEvents: 'none', // Make sure it doesn't interfere with clicks
                    zIndex: 2
                }}
            />

            <div className="container mx-auto px-4 relative z-10">
                <div className={`flex flex-col ${isMobileDevice ? '' : 'md:flex-row'} justify-between items-center ${isMobileDevice ? 'min-h-[100px]' : 'min-h-[150px]'}`}>
                    {/* JA Impresa in Azione Logo - Left Side */}
                    <div className={`${isMobileDevice ? 'w-full' : 'md:w-1/3'} flex ${isMobileDevice ? 'justify-center' : 'md:justify-start'} items-center`}>
                        <a 
                            href="https://www.jaitalia.org" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="transition-opacity hover:opacity-80"
                        >
                            <img 
                                src="/assets/images/logoJaImpresaInAzione.webp" 
                                alt="JA Impresa in Zione Logo" 
                                className={`${isMobileDevice ? 'h-12' : 'h-20'} object-contain cursor-pointer`}
                            />
                        </a>
                    </div>
                    
                    {/* Logo and Company Info - Center */}
                    <div className={`mt-4 ${isMobileDevice ? '' : 'md:mt-0'} flex flex-col items-center ${isMobileDevice ? 'w-full' : 'md:w-1/3'}`}>
                        <a href="/" className="flex flex-col items-center transition-opacity hover:opacity-80">
                            <img src={logoSrc} alt="EveryWay Logo" className={`${isMobileDevice ? 'w-16 h-16' : 'w-24 h-24'} ${isMobileDevice ? 'mb-2' : 'mb-4'}`} />
                            <h3 className={`${isMobileDevice ? 'text-xl' : 'text-2xl'} font-semibold ${textColorClass}`}>EveryWay</h3>
                            <p className={`${isMobileDevice ? 'text-xs' : 'text-sm'} italic mt-1 ${textColorClass} opacity-80`}>Overcome, Travel, Live.</p>
                        </a>
                    </div>
                    
                    {/* Contact Information - Right Side */}
                    <div className={`mt-4 ${isMobileDevice ? '' : 'md:mt-0'} flex flex-col items-center ${isMobileDevice ? '' : 'md:items-end'} ${isMobileDevice ? 'w-full' : 'md:w-1/3'} ${textColorClass} ${isMobileDevice ? 'text-xs' : 'text-sm'} opacity-80`}>
                        <p className="flex items-center mb-1">
                            <i className="fas fa-map-marker-alt mr-2"></i> Via Rivolta 10, Lecco Italy IT
                        </p>
                        <p className="flex items-center mb-1">
                            <i className="fas fa-phone mr-2"></i> 0341 365339
                        </p>
                        <p className="flex items-center mb-1">
                            <i className="fas fa-envelope mr-2"></i> 
                            <a href="mailto:EveryWay@gmail.com" className="hover:underline">
                                everyway.ja@gmail.com
                            </a>
                        </p>
                        <p className="flex items-center">
                            <i className="fab fa-instagram mr-2"></i> 
                            <a href="https://www.instagram.com/EveryWay/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                                @EveryWay
                            </a>
                        </p>
                    </div>
                </div>
                
                {/* Copyright */}
                <div className={`mt-4 md:mt-8 pt-2 md:pt-4 border-t border-[rgba(var(--color-overlay),0.1)] text-center ${textColorClass} text-xs md:text-sm opacity-70`}>
                    <p>© {currentYear} EveryWay. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default PageFooter;