/**
 * AnimatedCard.jsx
 * 
 * An enhanced version of the Card component that adds customizable entrance animations.
 * 
 * This component extends the base Card functionality, allowing elements to animate
 * when they enter the viewport. Each part of the card (the entire card, image/icon,
 * title, and description) can be animated independently with different directions
 * and timing.
 * 
 * Key features:
 * - Intersection Observer API integration to trigger animations on scroll
 * - Configurable animation direction for each element
 * - Staggered animation timing with customizable delays
 * - Hardware-accelerated animations for smooth performance
 * - Support for all Card component features and customization options
 * 
 * @module AnimatedCard
 */
import React, { useState, useEffect } from 'react';
import { useTheme } from '@contexts/ThemeContext';
import { useInView } from 'react-intersection-observer';
import Card from '@ui/components/Card';

/**
 * AnimatedCard component that extends Card with animation options
 * 
 * @param {Object} props - Component props
 * @param {string|null} props.image - URL of the image to display (optional)
 * @param {string} props.title - Card title text (optional)
 * @param {string} props.description - Card description text (optional)
 * @param {string} props.className - Additional CSS classes
 * @param {Function|null} props.onClick - Click handler (makes card clickable)
 * @param {string} props.cardWidth - Width of the card (Tailwind class or direct CSS)
 * @param {string} props.cardHeight - Height of the card (Tailwind class or direct CSS)
 * @param {string} props.imageHeight - Height of the image (Tailwind class)
 * @param {string} props.imageWidth - Width of the image (Tailwind class)
 * @param {string} props.contentHeight - Height of the content section (Tailwind class or direct CSS)
 * @param {string} props.contentWidth - Width of the content section (Tailwind class)
 * @param {string} props.contentPosition - Position of content relative to image ('below', 'left', or 'right')
 * @param {boolean} props.hoverEffect - Whether to apply hover animation effects
 * @param {boolean} props.rounded - Whether to apply rounded corners
 * @param {boolean} props.shadow - Whether to apply shadow effect
 * @param {string|null} props.icon - FontAwesome icon class (e.g., 'fas fa-star')
 * @param {string} props.iconColor - CSS color for the icon
 * @param {string} props.iconSize - Tailwind size class for icon
 * @param {string} props.iconPosition - Position of the icon ('top', 'left', 'right', 'bottom')
 * @param {string} props.titleStyle - Additional classes for title
 * @param {string} props.descriptionStyle - Additional classes for description
 * @param {string} props.cardStyle - Additional classes for the card wrapper
 * @param {string} props.iconStyle - Additional classes for the icon wrapper
 * @param {string} props.imageStyle - Additional classes for the image wrapper
 * @param {string} props.contentStyle - Additional classes for the content wrapper
 * @param {string} props.cardAnimation - Animation direction for the entire card ('none', 'top', 'bottom', 'left', 'right')
 * @param {string} props.imageAnimation - Animation direction for the image ('none', 'top', 'bottom', 'left', 'right')
 * @param {string} props.iconAnimation - Animation direction for the icon ('none', 'top', 'bottom', 'left', 'right')
 * @param {string} props.titleAnimation - Animation direction for the title ('none', 'top', 'bottom', 'left', 'right')
 * @param {string} props.descAnimation - Animation direction for the description ('none', 'top', 'bottom', 'left', 'right')
 * @param {number} props.animationDelay - Base delay before starting any animation (ms)
 * @param {number} props.animationDuration - Duration of the animation (ms)
 * @param {number} props.staggerDelay - Delay between each element's animation (ms)
 * @param {number} props.distance - Distance to travel during animation (px)
 * @param {boolean} props.triggerOnce - Whether to trigger the animation only once when scrolled into view
 * @param {number} props.threshold - Percentage of element visible to trigger animation (0-1)
 * @param {React.ReactNode} props.children - Custom content to render inside the card
 * @returns {JSX.Element} Rendered animated card component
 */
const AnimatedCard = ({
  // Card props
  image = null,
  title = '',
  description = '',
  className = '',
  onClick = null,
  cardWidth = 'w-full',
  cardHeight = 'auto',
  imageHeight = 'h-48',
  imageWidth = 'w-full',
  contentHeight = 'auto',
  contentWidth = 'w-full',
  contentPosition = 'below',
  hoverEffect = true,
  rounded = true,
  shadow = true,
  
  // Icon props
  icon = null,
  iconColor = '',
  iconSize = 'text-4xl',
  iconPosition = 'top',
  
  // Style customization
  titleStyle = '',
  descriptionStyle = '',
  cardStyle = '',
  iconStyle = '',
  imageStyle = '',
  contentStyle = '',

  // Animation control props
  cardAnimation = 'bottom', // Animation for the entire card: 'none', 'top', 'bottom', 'left', 'right'
  imageAnimation = 'none',  // Animation for the image: 'none', 'top', 'bottom', 'left', 'right'
  iconAnimation = 'none',   // Animation for the icon: 'none', 'top', 'bottom', 'left', 'right'
  titleAnimation = 'none',  // Animation for the title: 'none', 'top', 'bottom', 'left', 'right'
  descAnimation = 'none',   // Animation for the description: 'none', 'top', 'bottom', 'left', 'right'
  
  // Animation timing control
  animationDelay = 0,       // Base delay before starting any animation (ms)
  animationDuration = 700,  // Duration of the animation (ms)
  staggerDelay = 150,       // Delay between each element's animation (ms)
  distance = 24,            // Distance to travel during animation (px)
  
  // Trigger options
  triggerOnce = true,       // Whether to trigger the animation only once
  threshold = 0.1,          // Percentage of element visible to trigger animation
  
  // Children content
  children = null,
}) => {
  const { isDarkMode } = useTheme();
  const [hasAnimated, setHasAnimated] = useState(false);
  
  // Animation classes for each element
  const [cardAnimClass, setCardAnimClass] = useState('opacity-0');
  const [imageAnimClass, setImageAnimClass] = useState('opacity-0');
  const [iconAnimClass, setIconAnimClass] = useState('opacity-0');
  const [titleAnimClass, setTitleAnimClass] = useState('opacity-0');
  const [descAnimClass, setDescAnimClass] = useState('opacity-0');
  
  // Element styles for transform
  const [cardAnimStyle, setCardAnimStyle] = useState({});
  const [imageAnimStyle, setImageAnimStyle] = useState({});
  const [iconAnimStyle, setIconAnimStyle] = useState({});
  const [titleAnimStyle, setTitleAnimStyle] = useState({});
  const [descAnimStyle, setDescAnimStyle] = useState({});

  // Set up the intersection observer
  const { ref, inView } = useInView({
    threshold,
    triggerOnce,
  });

  /**
   * Determine the appropriate transformation values based on animation direction
   * 
   * @param {string} direction - Animation direction ('top', 'bottom', 'left', 'right', 'none')
   * @returns {Object} CSS transformation values
   */
  const getAnimationValues = (direction) => {
    switch (direction) {
      case 'top':
        return { transform: `translateY(-${distance}px)` };
      case 'bottom':
        return { transform: `translateY(${distance}px)` };
      case 'left':
        return { transform: `translateX(-${distance}px)` };
      case 'right':
        return { transform: `translateX(${distance}px)` };
      case 'none':
      default:
        return { transform: 'none' };
    }
  };
  // Apply animations when element comes into view
  useEffect(() => {
    if (inView && !hasAnimated) {
      // Card animation first
      const cardTransition = `opacity ${animationDuration}ms ease-out, transform ${animationDuration}ms ease-out`;
      const cardDelay = animationDelay;
      
      // Determine the sequence based on the layout (bottom to top)
      // For a standard card, the order from bottom to top would be:
      // 1. Description
      // 2. Title
      // 3. Image/Icon
      // 4. Card container (if animating)
      
      // Stagger the animations in reverse order
      const descDelay = cardDelay;
      const titleDelay = descDelay + staggerDelay;
      const mediaDelay = titleDelay + staggerDelay; // For either icon or image
      const cardAnimDelay = mediaDelay + staggerDelay;
      
      // Set card animation
      if (cardAnimation !== 'none') {
        setCardAnimStyle({
          ...getAnimationValues(cardAnimation),
          transition: cardTransition,
          transitionDelay: `${cardAnimDelay}ms`,
        });
      }
      
      // Set image animation
      if (imageAnimation !== 'none') {
        setImageAnimStyle({
          ...getAnimationValues(imageAnimation),
          transition: cardTransition,
          transitionDelay: `${mediaDelay}ms`,
        });
      }
      
      // Set icon animation
      if (iconAnimation !== 'none') {
        setIconAnimStyle({
          ...getAnimationValues(iconAnimation),
          transition: cardTransition,
          transitionDelay: `${mediaDelay}ms`,
        });
      }
      
      // Set title animation
      if (titleAnimation !== 'none') {
        setTitleAnimStyle({
          ...getAnimationValues(titleAnimation),
          transition: cardTransition,
          transitionDelay: `${titleDelay}ms`,
        });
      }
      
      // Set description animation
      if (descAnimation !== 'none') {
        setDescAnimStyle({
          ...getAnimationValues(descAnimation),
          transition: cardTransition,
          transitionDelay: `${descDelay}ms`,
        });
      }
      
      // Trigger animations with a tiny delay to ensure styles are applied
      setTimeout(() => {
        if (cardAnimation !== 'none') {
          setCardAnimClass('opacity-100 transform-none');
        }
        if (imageAnimation !== 'none') {
          setImageAnimClass('opacity-100 transform-none');
        }
        if (iconAnimation !== 'none') {
          setIconAnimClass('opacity-100 transform-none');
        }
        if (titleAnimation !== 'none') {
          setTitleAnimClass('opacity-100 transform-none');
        }
        if (descAnimation !== 'none') {
          setDescAnimClass('opacity-100 transform-none');
        }
        setHasAnimated(true);
      }, 50);
    }
  }, [inView, hasAnimated, cardAnimation, imageAnimation, iconAnimation, titleAnimation, descAnimation]);

  // Special handling for card that animates all at once
  const cardWrapperClass = cardAnimation !== 'none'
    ? `${cardAnimClass} transition-all will-change-transform will-change-opacity`
    : '';

  // Special handling for elements that don't animate
  useEffect(() => {
    if (cardAnimation === 'none') setCardAnimClass('opacity-100');
    if (imageAnimation === 'none') setImageAnimClass('opacity-100');
    if (iconAnimation === 'none') setIconAnimClass('opacity-100');
    if (titleAnimation === 'none') setTitleAnimClass('opacity-100');
    if (descAnimation === 'none') setDescAnimClass('opacity-100');
  }, []);

  /**
   * Custom render function to override the Card component's inner content
   * Used when card animation is enabled to provide individual animations for card elements
   * 
   * @returns {JSX.Element} Custom card content with animation capabilities
   */
  const renderCustomContent = () => {
    const hasImage = image !== null;
    const hasIcon = icon !== null;
    const hasContent = title || description || children;
    
    // Determine if we should use a horizontal layout
    const isHorizontal = (hasImage || hasIcon) && hasContent && 
                         (contentPosition === 'left' || contentPosition === 'right');
    const horizontalMediaWidth = isHorizontal ? imageWidth : 'w-full';
    const horizontalContentWidth = isHorizontal ? contentWidth : 'w-full';
    
    return (
      <>
        {/* Image with its own animation */}
        {hasImage && !hasIcon && (
          <div 
            className={`card-image ${horizontalMediaWidth} overflow-hidden ${imageAnimClass} transition-all will-change-transform will-change-opacity ${imageStyle}`} 
            style={imageAnimStyle}
          >
            <img 
              src={image} 
              alt={title || 'Card image'} 
              className={`${isHorizontal ? 'h-full w-full' : 'w-full'} object-cover ${!isHorizontal ? imageHeight : ''}`}
            />
          </div>
        )}
        
        {/* Icon with its own animation */}
        {hasIcon && !hasImage && (
          <div 
            className={`card-icon flex justify-center items-center ${horizontalMediaWidth} ${iconAnimClass} transition-all will-change-transform will-change-opacity ${!isHorizontal ? 'h-24 my-2' : ''} ${iconStyle}`} 
            style={iconAnimStyle}
          >
            <i 
              className={`${icon} ${iconSize}`} 
              style={{ color: iconColor || 'rgb(var(--color-text))' }}
            ></i>
          </div>
        )}
        
        {/* Content section with individual animations for title and description */}
        {hasContent && (
          <div 
            className={`card-content p-4 text-[rgb(var(--color-text))] ${horizontalContentWidth} flex flex-col justify-center
              ${contentHeight !== 'auto' ? contentHeight : ''} ${contentStyle}`}
            style={contentHeight === 'auto' ? {} : { height: typeof contentHeight === 'string' && contentHeight.startsWith('h-') ? undefined : contentHeight }}
          >
            {title && (
              <h3 
                className={`card-title text-lg font-semibold mb-2 ${titleAnimClass} transition-all will-change-transform will-change-opacity ${titleStyle}`}
                style={titleAnimStyle}
              >
                {title}
              </h3>
            )}
            {description && (
              <p 
                className={`card-description text-sm opacity-80 ${descAnimClass} transition-all will-change-transform will-change-opacity ${descriptionStyle}`}
                style={descAnimStyle}
              >
                {description}
              </p>
            )}
            {children}
          </div>
        )}
      </>
    );
  };

  return (
    <div ref={ref} className={`${cardWrapperClass} ${cardStyle}`} style={cardAnimStyle}>
      <Card
        image={cardAnimation !== 'none' ? null : image}
        title={cardAnimation !== 'none' ? '' : title}
        description={cardAnimation !== 'none' ? '' : description}
        className={className}
        onClick={onClick}
        cardWidth={cardWidth}
        cardHeight={cardHeight}
        imageHeight={imageHeight}
        imageWidth={imageWidth}
        contentHeight={contentHeight}
        contentWidth={contentWidth}
        contentPosition={contentPosition}
        hoverEffect={hoverEffect}
        rounded={rounded}
        shadow={shadow}
        icon={cardAnimation !== 'none' ? null : icon}
        iconColor={iconColor}
        iconSize={iconSize}
        iconPosition={iconPosition}
        titleStyle={titleStyle}
        descriptionStyle={descriptionStyle}
      >
        {cardAnimation !== 'none' ? renderCustomContent() : children}
      </Card>
    </div>
  );
};

export default AnimatedCard;
