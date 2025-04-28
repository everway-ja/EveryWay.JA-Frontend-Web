import React from 'react';
import { useTheme } from '@contexts/ThemeContext';

/**
 * Generic Card component that can display:
 * - Just a title and description (no image)
 * - An image only
 * - An image and a title
 * - An image, a title, and a description
 * 
 * Text content can be positioned:
 * - Below the image (default)
 * - Left of the image
 * - Right of the image
 */
const Card = ({ 
  image = null, 
  title, 
  description, 
  className = '', 
  onClick = null,
  cardWidth = 'w-full',
  cardHeight = 'auto',
  imageHeight = 'h-48',
  imageWidth = 'w-full',
  contentHeight = 'auto',
  contentWidth = 'w-full',
  contentPosition = 'below', // 'below', 'left', or 'right'
  hoverEffect = true,
  rounded = true,
  shadow = true,
}) => {
  const { isDarkMode } = useTheme();
  
  // Determine if we should render the content section
  const hasContent = title || description;
  const hasImage = image !== null;
  
  // Hover effect class
  const hoverClass = hoverEffect 
    ? 'transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg' 
    : '';
  
  // Shadow class
  const shadowClass = shadow ? 'shadow-md' : '';
  
  // Rounded class
  const roundedClass = rounded ? 'rounded-lg' : '';
  
  // Determine layout based on content position and whether there's an image
  const isHorizontal = hasImage && hasContent && (contentPosition === 'left' || contentPosition === 'right');
  const flexDirection = !hasImage ? 'flex-col' :
    contentPosition === 'left' ? 'flex-row-reverse' : 
    contentPosition === 'right' ? 'flex-row' : 
    'flex-col';
  
  // Adjust image and content widths for horizontal layouts
  const horizontalImageWidth = isHorizontal ? imageWidth : 'w-full';
  const horizontalContentWidth = isHorizontal ? contentWidth : 'w-full';
  
  return (
    <div 
      className={`
        card overflow-hidden ${roundedClass} bg-[rgba(var(--color-background),0.8)]
        backdrop-blur-sm ${hoverClass} ${shadowClass} transition-all duration-300 
        ${cardWidth} ${cardHeight !== 'auto' ? cardHeight : ''} 
        ${className}
        ${onClick ? 'cursor-pointer' : ''}
        ${isHorizontal || !hasImage ? 'flex' : ''}
        ${flexDirection}
      `}
      onClick={onClick}
      style={cardHeight === 'auto' ? {} : { height: typeof cardHeight === 'string' && cardHeight.startsWith('h-') ? undefined : cardHeight }}
    >
      {/* Image (only if provided) */}
      {hasImage && (
        <div className={`card-image ${horizontalImageWidth}`}>
          <img 
            src={image} 
            alt={title || 'Card image'} 
            className={`${isHorizontal ? 'h-full w-full' : 'w-full'} object-cover ${!isHorizontal ? imageHeight : ''}`}
          />
        </div>
      )}
      
      {/* Content (only rendered if title or description exists) */}
      {hasContent && (
        <div 
          className={`card-content p-4 text-[rgb(var(--color-text))] ${horizontalContentWidth} flex flex-col justify-center
            ${contentHeight !== 'auto' ? contentHeight : ''}`}
          style={contentHeight === 'auto' ? {} : { height: typeof contentHeight === 'string' && contentHeight.startsWith('h-') ? undefined : contentHeight }}
        >
          {title && (
            <h3 className="card-title text-lg font-semibold mb-2">
              {title}
            </h3>
          )}
          {description && (
            <p className="card-description text-sm opacity-80">
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Card;
