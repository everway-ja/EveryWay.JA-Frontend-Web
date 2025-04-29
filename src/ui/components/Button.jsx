/**
 * Button.jsx
 * 
 * A versatile, customizable button component for the EveryWay.JA application.
 * 
 * This component provides a unified approach to buttons throughout the application with:
 * - Support for internal navigation (React Router) and external links
 * - Customizable appearance with color, size, and style options
 * - Optional icon support using FontAwesome
 * - Outlined and filled styling variants
 * - Responsive sizing and optional full-width layout
 * - Disabled state handling
 * 
 * The component intelligently determines whether to render as a button element
 * or an anchor tag based on the provided props.
 * 
 * @module Button
 */
import React from 'react';
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
 * @param {boolean} props.disabled - Whether button is disabled
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
  disabled = false,
}) => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  
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
    
    if (onClick) {
      onClick(e);
    } else if (to) {
      e.preventDefault();
      navigate(to);
    }
    // For href links, let the browser handle navigation
  };

  // Determine size classes
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-8 py-3 text-base',
    lg: 'px-10 py-4 text-lg',
  }[size] || 'px-8 py-3 text-base';
  
  // Determine width class
  const widthClass = fullWidth ? 'w-full' : '';
  
  /**
   * Generates the appropriate styles based on button configuration
   * 
   * @returns {Object} CSS style object for the button
   */
  const getStyles = () => {
    if (outlined) {
      return {
        backgroundColor: 'transparent',
        color: color || 'rgb(var(--color-text))',
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
      color: '#ffffff',
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
    <>
      {icon && (
        <span className="mr-2">
          <i className={icon}></i>
        </span>
      )}
      {text}
    </>
  );
  
  // External link
  if (href) {
    return (
      <a
        href={disabled ? undefined : href}
        className={`inline-block text-center rounded-lg ${sizeClasses} ${widthClass} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:shadow-md'} ${className}`}
        style={buttonStyles}
        onClick={disabled ? (e) => e.preventDefault() : undefined}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        <ButtonContent />
      </a>
    );
  }
  
  // Internal link or button
  return (
    <button
      onClick={handleClick}
      className={`rounded-lg ${sizeClasses} ${widthClass} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:shadow-md'} ${className}`}
      style={buttonStyles}
      disabled={disabled}
    >
      <ButtonContent />
    </button>
  );
};

export default Button;