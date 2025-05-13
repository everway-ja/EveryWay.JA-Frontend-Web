/**
 * PageTitleSection.jsx
 * 
 * A versatile, animated hero section component for page headers in the EveryWay application.
 * 
 * This component provides a full-screen height section with animated entry effects for:
 * - The main title
 * - A descriptive subtitle
 * - An optional image or icon
 * - Optional additional content
 * 
 * Features:
 * - Configurable animation directions (top, bottom, left, right, none)
 * - Staggered animations with customizable timing and delays
 * - Support for both images and FontAwesome icons
 * - Intersection Observer integration to trigger animations when scrolled into view
 * - Extensive customization options via props
 * 
 * Typically used at the top of pages to provide an engaging introduction to the content.
 * 
 * @module PageTitleSection
 */
import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useTheme } from '@contexts/ThemeContext';

/**
 * PageTitleSection Component
 * 
 * A reusable title section component for pages that supports animations
 * from different directions for the image, title, and description elements.
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - The title text
 * @param {string} props.description - The description text
 * @param {string} props.image - URL to the image (optional) * @param {string} props.titleAnimation - Animation direction for title ('none', 'top', 'bottom', 'left', 'right')
 * @param {string} props.descriptionAnimation - Animation direction for description ('none', 'top', 'bottom', 'left', 'right')
 * @param {string} props.imageAnimation - Animation direction for image ('none', 'top', 'bottom', 'left', 'right')
 * @param {string} props.iconAnimation - Animation direction for icon ('none', 'top', 'bottom', 'left', 'right')
 * @param {number} props.animationDelay - Base delay for animations in ms
 * @param {number} props.animationDuration - Duration of animations in ms
 * @param {number} props.staggerDelay - Delay between staggered animations in ms
 * @param {string} props.titleColor - Optional custom color for the title
 * @param {string} props.className - Additional classes for the container
 * @param {string} props.icon - Optional FontAwesome icon class (instead of image) * @param {string} props.iconColor - Custom color for the icon
 * @param {string} props.iconSize - Tailwind size class for icon
 * @param {string} props.iconPosition - Position of the icon ('top', 'bottom') - defaults to 'bottom'
 * @param {string} props.titleStyle - Additional classes for title
 * @param {string} props.descriptionStyle - Additional classes for description
 * @param {string} props.imageStyle - Additional classes for image
 * @param {string} props.iconStyle - Additional classes for icon
 * @param {string} props.containerStyle - Additional classes for the section container
 * @param {React.ReactNode} props.children - Optional content to render below description
 * @returns {JSX.Element} The rendered PageTitleSection component
 */
const PageTitleSection = ({
  title,
  description,
  image = null,  titleAnimation = 'bottom',
  descriptionAnimation = 'bottom',
  imageAnimation = 'right',
  iconAnimation = null,
  animationDelay = 100,
  animationDuration = 700,
  staggerDelay = 150,
  titleColor = '',
  className = '',  // New customization options
  icon = null,
  iconColor = '',
  iconSize = 'text-6xl',
  iconPosition = 'bottom',
  titleStyle = '',
  descriptionStyle = '',
  imageStyle = '',
  iconStyle = '',
  containerStyle = '',
  children = null,
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
  }, [inView]);  // Determine sequentially staggered delays for elements
  // Elements will appear in sequence from bottom to top, regardless of visual ordering
  // When iconPosition is 'bottom', the sequence is children -> icon/image -> description -> title
  // When iconPosition is 'top', the sequence is children -> description -> title -> icon/image
  
  let currentDelay = animationDelay;
  
  // Calculate delays based on icon position (bottom or top)
  const childrenDelay = currentDelay;
  currentDelay += staggerDelay;
  
  const mediaDelay = iconPosition === 'bottom' 
    ? currentDelay 
    : currentDelay + (staggerDelay * 2);
  
  const descriptionDelay = iconPosition === 'bottom'
    ? currentDelay + staggerDelay
    : currentDelay;
  
  const titleDelay = iconPosition === 'bottom'
    ? currentDelay + (staggerDelay * 2)
    : currentDelay + staggerDelay;

  // Check if we're using an icon instead of an image
  const hasIcon = icon !== null;
  const hasImage = image !== null && !hasIcon;
  return (
    <div ref={ref} className={`h-screen flex flex-col items-center justify-center p-4 ${className} ${containerStyle}`}>
      <div className={`w-full max-w-4xl mx-auto text-center relative`}>
        {/* Media Section (Image or Icon) - Above Title if iconPosition is 'top' */}
        {hasIcon && iconPosition === 'top' && (
          <div 
            className={`mx-auto mb-8 transition-all ${getAnimationClass(iconAnimation || imageAnimation, animationStarted)} ${iconStyle}`}
            style={getTransitionStyle(iconAnimation || imageAnimation, mediaDelay)}
          >
            <i 
              className={`${icon} ${iconSize}`} 
              style={{ color: iconColor || (titleColor || 'rgb(var(--color-text))') }}
            ></i>
          </div>
        )}
        
        {hasImage && iconPosition === 'top' && (
          <div 
            className={`mx-auto mb-8 transition-all ${getAnimationClass(imageAnimation, animationStarted)} ${imageStyle}`}
            style={getTransitionStyle(imageAnimation, mediaDelay)}
          >
            <img src={image} alt={title} className="w-64 h-64 object-contain mx-auto" />
          </div>
        )}
        
        {/* Title */}
        <h1 
          className={`text-4xl md:text-6xl font-bold mb-6 ${titleColor} transition-all ${getAnimationClass(titleAnimation, animationStarted)} ${titleStyle}`}
          style={getTransitionStyle(titleAnimation, titleDelay)}
        >
          {title}
        </h1>
        
        {/* Description */}
        {description && (
          <p 
            className={`text-xl mb-8 max-w-2xl mx-auto transition-all ${getAnimationClass(descriptionAnimation, animationStarted)} ${descriptionStyle}`}
            style={getTransitionStyle(descriptionAnimation, descriptionDelay)}
          >
            {description}
          </p>
        )}
        
        {/* Media Section (Image or Icon) - Below Description if iconPosition is 'bottom' */}
        {hasImage && iconPosition === 'bottom' && (
          <div 
            className={`mx-auto mb-8 transition-all ${getAnimationClass(imageAnimation, animationStarted)} ${imageStyle}`}
            style={getTransitionStyle(imageAnimation, mediaDelay)}
          >
            <img src={image} alt={title} className="w-64 h-64 object-contain mx-auto" />
          </div>
        )}
        
        {hasIcon && iconPosition === 'bottom' && (
          <div 
            className={`mx-auto mb-8 transition-all ${getAnimationClass(iconAnimation || imageAnimation, animationStarted)} ${iconStyle}`}
            style={getTransitionStyle(iconAnimation || imageAnimation, mediaDelay)}
          >
            <i 
              className={`${icon} ${iconSize}`} 
              style={{ color: iconColor || (titleColor || 'rgb(var(--color-text))') }}
            ></i>
          </div>
        )}
        
        {/* Children (if provided) */}
        {children && (
          <div 
            className={`transition-all ${getAnimationClass(descriptionAnimation, animationStarted)}`}
            style={getTransitionStyle(descriptionAnimation, childrenDelay)}
          >
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default PageTitleSection;