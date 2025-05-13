/**
 * Button.jsx
 * 
 * A versatile, customizable button component for the EveryWay application.
 * 
 * This component provides a unified approach to buttons throughout the application with:
 * - Support for internal navigation (React Router) and external links
 * - Customizable appearance with color, size, and style options 
 * - Optional icon support using FontAwesome
 * - Outlined and filled styling variants
 * - Responsive sizing and optional full-width layout
 * - Disabled state handling
 * - Smooth hover effects with scale animation for the entire button
 * - Header positioning support (absolute positioning with left/right/center options)
 * 
 * The component intelligently determines whether to render as a button element
 * or an anchor tag based on the provided props.
 * 
 * @module Button
 */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@contexts/ThemeContext';

/**
 * Customizable Button component
 * 
 * @param {Object} props - Component props
 * @param {string} props.text - The button text
 * @param {string} props.color - Custom color (CSS color value or tailwind class)
 * @param {string} props.bgColor - Custom background color (CSS color value or tailwind class)
 * @param {string} props.hoverColor - Custom hover color (CSS color value or tailwind class)
 * @param {string} props.to - Internal route path (for React Router navigation)
 * @param {string} props.href - External URL (for regular anchor links)
 * @param {function} props.onClick - Click handler function
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.size - Button size ('sm', 'md', 'lg')
 * @param {boolean} props.fullWidth - Whether button should take full width
 * @param {boolean} props.outlined - Whether button should have an outlined style
 * @param {string} props.icon - Optional icon class (for Font Awesome icons)
 * @param {string} props.iconColor - Custom color for the icon
 * @param {string} props.textColor - Custom color for the text
 * @param {boolean} props.disabled - Whether button is disabled
 * @param {string} props.position - Position in header ('left', 'right', 'center')
 * @param {boolean} props.isHeader - Whether button is used in the header
 * @param {boolean} props.mobileVisible - Whether button is visible on mobile (only for header buttons)
 * @param {string} props.ariaLabel - Accessibility label
 * @param {React.ReactNode} props.children - Optional children elements
 * @returns {JSX.Element} The rendered button or anchor element
 */
const Button = ({
  text,
  color,
  bgColor,
  hoverColor,
  to,
  href,
  onClick,
  className = '',
  size = 'md',
  fullWidth = false,
  outlined = false,
  icon,
  iconColor,
  textColor,
  disabled = false,
  position,
  isHeader = false,
  mobileVisible = true,
  ariaLabel,
  children,
}) => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  
  /**
   * Handles click events for the button, including navigation logic
   * 
   * @param {React.MouseEvent} e - The click event object
   */
  const handleClick = (e) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    
    // Remove focus/selection from the button after clicking
    e.currentTarget.blur();
    
    if (onClick) {
      onClick(e);
    } else if (to) {
      e.preventDefault();
      navigate(to);
    }
    // For href links, let the browser handle navigation
  };

  // Set hover effects for icon and text
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  
  // Determine if button has transparent background
  const hasTransparentBg = bgColor === 'transparent' || !bgColor;
  
  // Handle positioning in header
  const getPositionClasses = () => {
    if (!position || !isHeader) return '';
    
    switch (position) {
      case 'right': return 'right-4';
      case 'center': return 'left-1/2 transform -translate-x-1/2';
      case 'left':
      default: return 'left-4';
    }
  };
  
  // Display settings based on device type (for header buttons)
  const displayClasses = isHeader ? (mobileVisible ? '' : 'hidden md:flex') : '';
  
  // Determine size classes based on if it's a header button or regular button
  const sizeClasses = isHeader 
    ? 'w-20 h-20 md:w-32 md:h-32'
    : {
        sm: 'px-4 py-2 text-sm',
        md: 'px-8 py-3 text-base',
        lg: 'px-10 py-4 text-lg',
      }[size] || 'px-8 py-3 text-base';
  
  // Determine width class for regular buttons
  const widthClass = !isHeader && fullWidth ? 'w-full' : '';
  
  // Apply hover effect to all buttons with transparent backgrounds and header buttons
  const buttonHoverClass = !disabled && (hasTransparentBg || isHeader)
    ? 'hover:scale-110 hover:brightness-110 transition-all duration-300 ease-out' 
    : '';
  
  // We no longer need content-specific hover classes as we're applying the effect to the whole button
  const iconSizeClass = '';
  const textSizeClass = '';

  /**
   * Generates the appropriate styles based on button configuration
   * 
   * @returns {Object} CSS style object for the button
   */
  const getStyles = () => {
    // For header buttons, always use transparent background with hover effect
    if (isHeader) {
      return {
        backgroundColor: bgColor || 'transparent',
        transition: 'all 0.3s ease',
      };
    }
    
    // For outlined buttons
    if (outlined) {
      return {
        backgroundColor: 'transparent',
        color: textColor || color || 'rgb(var(--color-text))',
        border: `2px solid ${color || 'rgb(var(--color-text))'}`,
        transition: 'all 0.3s ease',
        ':hover': {
          backgroundColor: color || 'rgb(var(--color-text))',
          color: isDarkMode ? 'rgb(var(--color-background))' : '#ffffff',
        }
      };
    }
    
    // Default styles for filled button
    return {
      backgroundColor: bgColor || color || 'rgb(var(--color-primary))',
      color: textColor || '#ffffff',
      border: 'none',
      transition: 'all 0.3s ease',
      ':hover': {
        backgroundColor: hoverColor || (color ? `${color}dd` : 'rgb(var(--color-primary), 0.9)'),
      }
    };
  };
  
  const buttonStyles = getStyles();
  
  /**
   * Renders the inner content of the button, including optional icon
   * 
   * @returns {JSX.Element} The button's inner content
   */
  const ButtonContent = () => (
    <div className="flex items-center justify-center gap-2">
      {icon && (
        <i 
          className={`${icon} ${isHeader ? 'text-2xl md:text-3xl' : ''} ${isHeader ? '' : 'mr-2'}`}
          style={{ color: iconColor || (isDarkMode ? '#ffffff' : '#000000') }}
        ></i>
      )}
      {text && (
        <span 
          style={{ color: textColor || undefined }}
        >
          {text}
        </span>
      )}
      {children && (
        <div>
          {children}
        </div>
      )}
    </div>
  );
  
  // Generate common props for both button and anchor elements
  const commonProps = {
    'aria-label': ariaLabel || text || 'Button',
    onClick: isHeader ? handleClick : (disabled ? (e) => e.preventDefault() : handleClick),
    onMouseEnter: !disabled ? handleMouseEnter : undefined,
    onMouseLeave: !disabled ? handleMouseLeave : undefined,
    style: buttonStyles,
  };
  
  // Generate common classes based on button type
  const getCommonClasses = () => {
    if (isHeader) {
      return `absolute ${getPositionClasses()} flex items-center justify-center bg-transparent border-none hover:bg-opacity-10 hover:bg-gray-500 ${buttonHoverClass} transition-all focus:outline-none focus:ring-0 outline-none cursor-pointer z-20 ${sizeClasses} ${displayClasses} ${className}`;
    } else {
      return `${buttonHoverClass} rounded-lg ${sizeClasses} ${widthClass} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:shadow-md'} focus:outline-none focus:ring-0 outline-none ${className}`;
    }
  };
  
  // External link
  if (href) {
    return (
      <a
        href={disabled ? undefined : href}
        className={`inline-block text-center ${getCommonClasses()}`}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        {...commonProps}
      >
        <ButtonContent />
      </a>
    );
  }
  
  // Internal link or button
  return (
    <button
      className={getCommonClasses()}
      disabled={disabled}
      type="button"
      {...commonProps}
    >
      <ButtonContent />
    </button>
  );
};

export default Button;