/**
 * PageContainerSection.jsx
 * 
 * A versatile content section component for creating animated page sections in the EveryWay application.
 * 
 * This component serves as the primary building block for page content areas, providing:
 * - A consistent, responsive container structure
 * - Animated entry for title, description, and content areas
 * - Optional background styling for visual separation
 * - Support for FontAwesome icons alongside section titles
 * - Intersection Observer integration to trigger animations when scrolled into view
 * 
 * Unlike the PageTitleSection which is full-screen height, this component is designed
 * for stacking multiple sections on a page with consistent padding and maximum width.
 * 
 * @module PageContainerSection
 */
import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useTheme } from '@contexts/ThemeContext';

/**
 * PageContainerSection Component
 * 
 * A reusable content section component for pages that supports animations
 * from different directions for the title, description, and content elements.
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - The section title
 * @param {string} props.description - The section description (optional)
 * @param {React.ReactNode} props.children - The content to render in the section
 * @param {string} props.titleAnimation - Animation direction for title ('none', 'top', 'bottom', 'left', 'right')
 * @param {string} props.descriptionAnimation - Animation direction for description ('none', 'top', 'bottom', 'left', 'right')
 * @param {string} props.contentAnimation - Animation direction for content ('none', 'top', 'bottom', 'left', 'right')
 * @param {number} props.animationDelay - Base delay for animations in ms
 * @param {number} props.animationDuration - Duration of animations in ms
 * @param {number} props.staggerDelay - Delay between staggered animations in ms
 * @param {string} props.titleColor - Optional custom color for the title
 * @param {boolean} props.withBackground - Whether to add a subtle background color
 * @param {string} props.className - Additional classes for the container
 * @param {string} props.icon - Optional FontAwesome icon to display before the title
 * @param {string} props.iconColor - Color for the icon
 * @param {string} props.iconSize - Size class for the icon (e.g., 'text-4xl')
 * @param {string} props.titleStyle - Additional classes for the title
 * @param {string} props.descriptionStyle - Additional classes for the description
 * @param {string} props.contentStyle - Additional classes for the content container
 * @param {string} props.containerStyle - Additional classes for the main container
 * @param {string} props.iconStyle - Additional classes for the icon
 * @returns {JSX.Element} The rendered PageContainerSection component
 */
const PageContainerSection = ({
  title,
  description = '',
  children,
  titleAnimation = 'bottom',
  descriptionAnimation = 'bottom',
  contentAnimation = 'bottom',
  animationDelay = 200,
  animationDuration = 700,
  staggerDelay = 150,
  titleColor = '',
  withBackground = false,
  className = '',
  // New customization options
  icon = null,
  iconColor = '',
  iconSize = 'text-4xl',
  titleStyle = '',
  descriptionStyle = '',
  contentStyle = '',
  containerStyle = '',
  iconStyle = '',
}) => {
  const { isDarkMode } = useTheme();
  const [animationStarted, setAnimationStarted] = useState(false);
  
  // Set up the intersection observer for triggering animations when in view
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  /**
   * Determines the appropriate CSS classes for an element's animation
   * 
   * @param {string} direction - Animation direction ('none', 'top', 'bottom', 'left', 'right')
   * @param {boolean} isActive - Whether the animation has been triggered
   * @returns {string} CSS classes for the animation
   */
  const getAnimationClass = (direction, isActive) => {
    if (direction === 'none' || isActive) {
      return 'opacity-100 translate-y-0 translate-x-0';
    }
    
    switch (direction) {
      case 'top':
        return 'opacity-0 -translate-y-24';
      case 'bottom':
        return 'opacity-0 translate-y-24';
      case 'left':
        return 'opacity-0 -translate-x-24';
      case 'right':
        return 'opacity-0 translate-x-24';
      default:
        return 'opacity-0';
    }
  };

  /**
   * Generates the CSS transition styles for animated elements
   * 
   * @param {string} direction - Animation direction
   * @param {number} delay - Delay before starting the animation (ms)
   * @returns {Object} CSS transition styles
   */
  const getTransitionStyle = (direction, delay) => {
    if (direction === 'none') {
      return {};
    }
    
    let transform = '';
    
    switch (direction) {
      case 'top':
      case 'bottom':
        transform = 'transform, opacity';
        break;
      case 'left':
      case 'right':
        transform = 'transform, opacity';
        break;
      default:
        transform = 'opacity';
    }
    
    return {
      transitionProperty: transform,
      transitionDuration: `${animationDuration}ms`,
      transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
      transitionDelay: `${delay}ms`,
    };
  };

  // Start animation when the component comes into view
  useEffect(() => {
    if (inView) {
      setAnimationStarted(true);
    }
  }, [inView]);

  // Determine delays for each element
  const titleDelay = animationDelay;
  const iconDelay = titleDelay; // Icon animates with title
  const descriptionDelay = titleAnimation !== 'none' ? titleDelay + staggerDelay : titleDelay;
  const contentDelay = descriptionAnimation !== 'none' && description ? descriptionDelay + staggerDelay : descriptionDelay;

  // Background class based on prop
  const bgClass = withBackground ? 'bg-[rgba(var(--color-overlay),0.03)]' : '';
  
  // Check if we're using an icon
  const hasIcon = icon !== null;

  return (
    <div ref={ref} className={`py-20 px-4 ${bgClass} ${className} ${containerStyle}`}>
      <div className="max-w-6xl mx-auto">
        {/* Section Title with optional icon */}
        <div className="flex items-center justify-center mb-6">
          {/* Icon (if provided) */}
          {hasIcon && (
            <div 
              className={`mr-3 ${getAnimationClass(titleAnimation, animationStarted)} transition-all ${iconStyle}`}
              style={getTransitionStyle(titleAnimation, iconDelay)}
            >
              <i 
                className={`${icon} ${iconSize}`} 
                style={{ color: iconColor || titleColor || 'rgb(var(--color-text))' }}
              ></i>
            </div>
          )}
          
          <h2 
            className={`text-3xl md:text-5xl font-bold text-center ${titleColor} transition-all ${getAnimationClass(titleAnimation, animationStarted)} ${titleStyle}`}
            style={getTransitionStyle(titleAnimation, titleDelay)}
          >
            {title}
          </h2>
        </div>
        
        {/* Section Description (if provided) */}
        {description && (
          <p 
            className={`text-lg mb-12 max-w-3xl mx-auto text-center transition-all ${getAnimationClass(descriptionAnimation, animationStarted)} ${descriptionStyle}`}
            style={getTransitionStyle(descriptionAnimation, descriptionDelay)}
          >
            {description}
          </p>
        )}
        
        {/* Content */}
        <div 
          className={`transition-all ${getAnimationClass(contentAnimation, animationStarted)} ${contentStyle}`}
          style={getTransitionStyle(contentAnimation, contentDelay)}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default PageContainerSection;