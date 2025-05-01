/**
 * ShinyLink.jsx
 * 
 * A customized link component that displays a shiny animation effect similar to 
 * the partners and certifications links in the header. The animation looks like 
 * a light being shined from left to right across the link.
 * 
 * Features:
 * - Configurable color for the link text
 * - Shiny animation effect that runs on component mount and then cycles every 4 seconds
 * - No underline on hover (unlike standard links)
 * - Customizable animation timing
 * - Support for both internal and external links
 * - Optional icon support
 * 
 * @module ShinyLink
 */
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@contexts/ThemeContext';

/**
 * ShinyLink Component
 * 
 * A link component with a shiny animation effect
 * 
 * @param {Object} props - Component props
 * @param {string} props.to - Internal route path
 * @param {string} props.href - External URL (use this OR 'to', not both)
 * @param {string} props.color - Custom text color (hex code or CSS color name)
 * @param {React.ReactNode} props.children - Link content
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.icon - FontAwesome icon class
 * @param {number} props.animationDuration - Duration of the shine animation in ms
 * @param {number} props.animationDelay - Delay before animation starts in ms
 * @param {number} props.animationInterval - Interval between animation cycles in ms (default 4000ms)
 * @param {boolean} props.animateOnHover - Whether to animate on hover
 * @param {Function} props.onClick - Click handler function
 * @returns {JSX.Element} The rendered ShinyLink component
 */
const ShinyLink = ({
  to,
  href,
  color,
  children,
  className = '',
  icon = null,
  animationDuration = 1000,
  animationDelay = 0,
  animationInterval = 4000,
  animateOnHover = true,
  onClick = () => {},
}) => {
  const { isDarkMode } = useTheme();
  const [animated, setAnimated] = useState(false);
  const linkRef = useRef(null);
  const animationTimerRef = useRef(null);
  
  // Determine if this is an internal or external link
  const isInternalLink = to !== undefined;
  const isExternalLink = href !== undefined;
  
  // Default text color if none provided
  const defaultColor = isDarkMode ? 'text-white' : 'text-black';
  const textColor = color ? color : defaultColor;
  
  // CSS classes for the link
  const linkClasses = `relative flex items-center hover:opacity-80 transition-opacity ${textColor} ${className}`;
  
  /**
   * Triggers the shiny animation
   */
  const triggerAnimation = () => {
    if (!animated) {
      setAnimated(true);
      setTimeout(() => {
        setAnimated(false);
      }, animationDuration + 100);
    }
  };
  
  // Start the cyclical animation
  useEffect(() => {
    // Initial animation after the specified delay
    const initialTimer = setTimeout(() => {
      triggerAnimation();
      
      // Set up the recurring animation
      animationTimerRef.current = setInterval(() => {
        triggerAnimation();
      }, animationInterval);
    }, animationDelay);
    
    // Cleanup function to clear all timers
    return () => {
      clearTimeout(initialTimer);
      if (animationTimerRef.current) {
        clearInterval(animationTimerRef.current);
      }
    };
  }, [animationDuration, animationDelay, animationInterval]);
  
  /**
   * Handle mouse enter events for hover animations
   */
  const handleMouseEnter = () => {
    if (animateOnHover) {
      triggerAnimation();
    }
  };
  
  /**
   * Handle click events
   * @param {Event} e - Click event
   */
  const handleClick = (e) => {
    // Always trigger the animation on click
    triggerAnimation();
    
    // Call any provided onClick handler
    if (onClick) {
      onClick(e);
    }
  };
  
  // Content of the link with optional icon
  const content = (
    <>
      {icon && (
        <span className="inline-flex justify-center items-center w-6 mr-2">
          <i className={icon}></i>
        </span>
      )}
      {children}
      
      {/* Shiny animation overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50 z-0 transition-transform ease-in-out overflow-hidden" 
        style={{ 
          transform: animated ? 'translateX(100%)' : 'translateX(-100%)',
          opacity: isDarkMode ? '0.4' : '0.2',
          transitionDuration: `${animationDuration}ms`,
        }}
      />
    </>
  );
  
  // Render appropriate link type
  if (isInternalLink) {
    return (
      <div className="relative overflow-hidden">
        <Link 
          ref={linkRef}
          to={to} 
          className={`${linkClasses} relative z-10`}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
        >
          {content}
        </Link>
      </div>
    );
  }
  
  if (isExternalLink) {
    return (
      <div className="relative overflow-hidden">
        <a 
          ref={linkRef}
          href={href} 
          className={`${linkClasses} relative z-10`}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        >
          {content}
        </a>
      </div>
    );
  }
  
  // Fallback for when neither to nor href is provided
  return (
    <div className="relative overflow-hidden">
      <button 
        ref={linkRef}
        className={`${linkClasses} relative z-10 bg-transparent border-0`}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
      >
        {content}
      </button>
    </div>
  );
};

export default ShinyLink;