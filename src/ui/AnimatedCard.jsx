import React, { useState, useEffect } from 'react';
import { useTheme } from '@contexts/ThemeContext';
import { useInView } from 'react-intersection-observer';
import Card from '@ui/Card';

/**
 * AnimatedCard component that extends Card with animation options
 * 
 * Allows control of animation direction for:
 * - The entire card
 * - The image
 * - The title
 * - The description
 * 
 * Direction options: 'none' (instant), 'top', 'bottom', 'left', 'right'
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

  // Animation control props
  cardAnimation = 'bottom', // Animation for the entire card: 'none', 'top', 'bottom', 'left', 'right'
  imageAnimation = 'none',  // Animation for the image: 'none', 'top', 'bottom', 'left', 'right'
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
}) => {
  const { isDarkMode } = useTheme();
  const [hasAnimated, setHasAnimated] = useState(false);
  
  // Animation classes for each element
  const [cardClass, setCardClass] = useState('opacity-0');
  const [imageClass, setImageClass] = useState('opacity-0');
  const [titleClass, setTitleClass] = useState('opacity-0');
  const [descClass, setDescClass] = useState('opacity-0');
  
  // Element styles for transform
  const [cardStyle, setCardStyle] = useState({});
  const [imageStyle, setImageStyle] = useState({});
  const [titleStyle, setTitleStyle] = useState({});
  const [descStyle, setDescStyle] = useState({});

  // Set up the intersection observer
  const { ref, inView } = useInView({
    threshold,
    triggerOnce,
  });

  // Function to get animation values based on direction
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
      
      // Stagger the animations
      const imgDelay = cardAnimation !== 'none' ? cardDelay + staggerDelay : cardDelay;
      const titleDelay = imageAnimation !== 'none' ? imgDelay + staggerDelay : imgDelay;
      const descDelay = titleAnimation !== 'none' ? titleDelay + staggerDelay : titleDelay;
      
      // Set card animation
      if (cardAnimation !== 'none') {
        setCardStyle({
          ...getAnimationValues(cardAnimation),
          transition: cardTransition,
          transitionDelay: `${cardDelay}ms`,
        });
      }
      
      // Set image animation
      if (imageAnimation !== 'none') {
        setImageStyle({
          ...getAnimationValues(imageAnimation),
          transition: cardTransition,
          transitionDelay: `${imgDelay}ms`,
        });
      }
      
      // Set title animation
      if (titleAnimation !== 'none') {
        setTitleStyle({
          ...getAnimationValues(titleAnimation),
          transition: cardTransition,
          transitionDelay: `${titleDelay}ms`,
        });
      }
      
      // Set description animation
      if (descAnimation !== 'none') {
        setDescStyle({
          ...getAnimationValues(descAnimation),
          transition: cardTransition,
          transitionDelay: `${descDelay}ms`,
        });
      }
      
      // Trigger animations with a tiny delay to ensure styles are applied
      setTimeout(() => {
        if (cardAnimation !== 'none') {
          setCardClass('opacity-100 transform-none');
        }
        if (imageAnimation !== 'none') {
          setImageClass('opacity-100 transform-none');
        }
        if (titleAnimation !== 'none') {
          setTitleClass('opacity-100 transform-none');
        }
        if (descAnimation !== 'none') {
          setDescClass('opacity-100 transform-none');
        }
        setHasAnimated(true);
      }, 50);
    }
  }, [inView, hasAnimated, cardAnimation, imageAnimation, titleAnimation, descAnimation]);

  // Special handling for card that animates all at once
  const cardWrapperClass = cardAnimation !== 'none'
    ? `${cardClass} transition-all will-change-transform will-change-opacity`
    : '';

  // Special handling for elements that don't animate
  useEffect(() => {
    if (cardAnimation === 'none') setCardClass('opacity-100');
    if (imageAnimation === 'none') setImageClass('opacity-100');
    if (titleAnimation === 'none') setTitleClass('opacity-100');
    if (descAnimation === 'none') setDescClass('opacity-100');
  }, []);

  // Custom render function to override the Card component's inner content
  const renderCustomContent = () => {
    const hasImage = image !== null;
    const hasContent = title || description;
    
    // Determine if we should use a horizontal layout
    const isHorizontal = hasImage && hasContent && (contentPosition === 'left' || contentPosition === 'right');
    const horizontalImageWidth = isHorizontal ? imageWidth : 'w-full';
    const horizontalContentWidth = isHorizontal ? contentWidth : 'w-full';
    
    return (
      <>
        {/* Image with its own animation */}
        {hasImage && (
          <div 
            className={`card-image ${horizontalImageWidth} overflow-hidden ${imageClass} transition-all will-change-transform will-change-opacity`} 
            style={imageStyle}
          >
            <img 
              src={image} 
              alt={title || 'Card image'} 
              className={`${isHorizontal ? 'h-full w-full' : 'w-full'} object-cover ${!isHorizontal ? imageHeight : ''}`}
            />
          </div>
        )}
        
        {/* Content section with individual animations for title and description */}
        {hasContent && (
          <div 
            className={`card-content p-4 text-[rgb(var(--color-text))] ${horizontalContentWidth} flex flex-col justify-center
              ${contentHeight !== 'auto' ? contentHeight : ''}`}
            style={contentHeight === 'auto' ? {} : { height: typeof contentHeight === 'string' && contentHeight.startsWith('h-') ? undefined : contentHeight }}
          >
            {title && (
              <h3 
                className={`card-title text-lg font-semibold mb-2 ${titleClass} transition-all will-change-transform will-change-opacity`}
                style={titleStyle}
              >
                {title}
              </h3>
            )}
            {description && (
              <p 
                className={`card-description text-sm opacity-80 ${descClass} transition-all will-change-transform will-change-opacity`}
                style={descStyle}
              >
                {description}
              </p>
            )}
          </div>
        )}
      </>
    );
  };

  return (
    <div ref={ref} className={cardWrapperClass} style={cardStyle}>
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
      >
        {cardAnimation !== 'none' && renderCustomContent()}
      </Card>
    </div>
  );
};

export default AnimatedCard;
