/**
 * Card.jsx
 * 
 * A versatile card component that serves as a foundational UI element
 * throughout the EveryWay.JA application.
 * 
 * This component offers highly customizable cards that can display:
 * - Just a title and description (no image)
 * - An image only
 * - An image and a title
 * - An image, a title, and a description
 * - An icon instead of an image
 * 
 * Text content can be positioned:
 * - Below the image (default)
 * - Left of the image
 * - Right of the image
 * 
 * The card supports various visual customizations including shadow effects,
 * hover animations, rounded corners, and flexible sizing options.
 * 
 * @module Card
 */
import React from 'react';
import { useTheme } from '@contexts/ThemeContext';

/**
 * Generic Card component with extensive customization options
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
 * @param {React.ReactNode} props.children - Custom content to render inside the card
 * @returns {JSX.Element} Rendered card component
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
  icon = null, // FontAwesome icon class (e.g., 'fas fa-star') 
  iconColor = '', // CSS color for the icon
  iconSize = 'text-4xl', // Tailwind size class for icon
  iconPosition = 'top', // 'top', 'left', 'right', 'bottom'
  titleStyle = '', // Additional classes for title
  descriptionStyle = '', // Additional classes for description
  children = null, // Allow passing custom content inside the card
}) => {
  const { isDarkMode } = useTheme();
  
  // Determine if we should render the content section
  const hasContent = title || description || children;
  const hasImage = image !== null;
  const hasIcon = icon !== null;
  
  // Hover effect class
  const hoverClass = hoverEffect 
    ? 'transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg' 
    : '';
  
  // Shadow class
  const shadowClass = shadow ? 'shadow-md' : '';
  
  // Rounded class
  const roundedClass = rounded ? 'rounded-lg' : '';
  
  // Determine layout based on content position and whether there's an image
  const isHorizontal = (hasImage || hasIcon) && hasContent && (contentPosition === 'left' || contentPosition === 'right');
  const flexDirection = !hasImage && !hasIcon ? 'flex-col' :
    contentPosition === 'left' ? 'flex-row-reverse' : 
    contentPosition === 'right' ? 'flex-row' : 
    'flex-col';
  
  // Adjust image and content widths for horizontal layouts
  const horizontalImageWidth = isHorizontal ? imageWidth : 'w-full';
  const horizontalContentWidth = isHorizontal ? contentWidth : 'w-full';
  
  /**
   * Determines the appropriate CSS classes for icon positioning
   * 
   * @returns {string} CSS classes for icon positioning
   */
  const getIconPositionClass = () => {
    switch (iconPosition) {
      case 'left': return 'justify-start';
      case 'right': return 'justify-end';
      case 'bottom': return 'justify-center items-end';
      case 'top':
      default: return 'justify-center items-start pt-8 mt-2'; // Increased top padding
    }
  };

  return (
    <div 
      className={`
        card overflow-hidden flex flex-col ${roundedClass} bg-[rgba(var(--color-background),0.8)]
        backdrop-blur-sm ${hoverClass} ${shadowClass} transition-all duration-300 
        ${cardWidth} ${cardHeight !== 'auto' ? cardHeight : ''} 
        ${className}
        ${onClick ? 'cursor-pointer' : ''}
        ${isHorizontal ? 'flex-row' : 'flex-col'}
        ${isHorizontal && contentPosition === 'left' ? 'flex-row-reverse' : ''}
      `}
      onClick={onClick}
      style={cardHeight === 'auto' ? {} : { height: typeof cardHeight === 'string' && cardHeight.startsWith('h-') ? undefined : cardHeight }}
    >
      {/* Image (only if provided) */}
      {hasImage && !hasIcon && (
        <div className={`card-image ${horizontalImageWidth} overflow-hidden flex-shrink-0`}>
          <img 
            src={image} 
            alt={title || 'Card image'} 
            className={`${isHorizontal ? 'h-full w-full' : 'w-full'} object-cover ${!isHorizontal ? imageHeight : ''}`}
          />
        </div>
      )}
      
      {/* Icon (only if provided) */}
      {hasIcon && !hasImage && (
        <div className={`card-icon flex ${getIconPositionClass()} ${horizontalImageWidth} ${!isHorizontal ? 'h-24' : ''} overflow-visible`}>
          <i 
            className={`${icon} ${iconSize}`} 
            style={{ color: iconColor || 'rgb(var(--color-text))' }}
          ></i>
        </div>
      )}
      
      {/* Content (only rendered if title, description or children exist) */}
      {hasContent && (
        <div 
          className={`card-content p-4 text-[rgb(var(--color-text))] ${horizontalContentWidth} flex flex-col justify-center flex-grow
            ${contentHeight !== 'auto' ? contentHeight : ''} overflow-hidden`}
          style={contentHeight === 'auto' ? {} : { height: typeof contentHeight === 'string' && contentHeight.startsWith('h-') ? undefined : contentHeight }}
        >
          {title && (
            <h3 className={`card-title text-lg font-semibold mb-2 ${titleStyle} overflow-hidden text-ellipsis`}>
              {title}
            </h3>
          )}
          {description && (
            <p className={`card-description text-sm opacity-80 ${descriptionStyle} overflow-hidden`}>
              {description}
            </p>
          )}
          {children}
        </div>
      )}
    </div>
  );
};

export default Card;
