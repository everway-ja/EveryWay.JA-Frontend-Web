/**
 * NavLink.jsx
 * 
 * A reusable navigation link component for the EveryWay application.
 * 
 * This component provides a unified approach to links throughout the navigation system with:
 * - Support for internal navigation (React Router) and external links
 * - Customizable appearance with color, size, and style options
 * - Optional icon support using FontAwesome
 * - Active state detection and highlighting
 * - Hover effects and transitions
 * 
 * The component intelligently determines whether to render as a standard link
 * or a React Router Link based on the provided props.
 * 
 * @module NavLink
 */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '@contexts/ThemeContext';

/**
 * Customizable navigation link component
 * 
 * @param {Object} props - Component props
 * @param {string} props.text - The link text
 * @param {string} props.to - Internal route path (for React Router navigation)
 * @param {string} props.href - External URL (for regular anchor links)
 * @param {string} props.icon - Optional FontAwesome icon class (e.g., 'fas fa-home')
 * @param {string} props.iconPosition - Position of icon ('left' or 'right')
 * @param {string} props.color - Custom text color (CSS color value)
 * @param {string} props.hoverColor - Custom hover color (CSS color value)
 * @param {string} props.activeColor - Custom active color (CSS color value)
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.iconClassName - Additional CSS classes for the icon
 * @param {boolean} props.underline - Whether to show underline on hover
 * @param {boolean} props.exact - Whether the active match should be exact
 * @param {boolean} props.useActiveColor - Whether to apply active color styling (default true)
 * @param {function} props.onClick - Optional click handler
 * @returns {JSX.Element} The rendered link component
 */
const NavLink = ({
  text,
  to,
  href,
  icon,
  iconPosition = 'left',
  color,
  hoverColor,
  activeColor,
  className = '',
  iconClassName = '',
  underline = false, // Changed default to false so links don't have underline by default
  exact = false,
  useActiveColor = true, // New prop to control whether active color is applied
  onClick,
}) => {
  const location = useLocation();
  const { isDarkMode } = useTheme();
  
  // Determine if this link is active (for internal links)
  const isActive = to && (exact ? location.pathname === to : location.pathname.startsWith(to));
  
  // Default colors if not provided
  const defaultColor = 'rgb(var(--color-text))';
  const defaultHoverColor = 'rgb(var(--color-text))'; // Changed from --color-primary to --color-text to maintain same color on hover
  const defaultActiveColor = 'rgb(var(--color-primary))';
  
  // Set colors with fallbacks
  // Only apply active color if useActiveColor is true
  const textColor = isActive && useActiveColor 
    ? (activeColor || defaultActiveColor) 
    : (color || defaultColor);
  const hoverTextColor = hoverColor || defaultHoverColor;
  
  /**
   * Base styles for the link
   */
  const linkStyle = {
    color: textColor,
    transition: 'color 0.3s ease, opacity 0.3s ease',
  };
  
  /**
   * Hover styles to be applied with JavaScript
   */
  const handleMouseEnter = (e) => {
    e.currentTarget.style.color = hoverTextColor;
    if (underline) {
      e.currentTarget.style.textDecoration = 'underline';
    }
  };
  
  /**
   * Reset styles on mouse leave
   */
  const handleMouseLeave = (e) => {
    e.currentTarget.style.color = textColor;
    if (underline) {
      e.currentTarget.style.textDecoration = 'none';
    }
  };
  
  /**
   * Handle click events
   */
  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
  };
  
  /**
   * Icon element to display
  **/
  const IconElement = icon ? (
    <span className={`inline-flex justify-center items-center ${iconClassName} ${iconPosition === 'left' ? 'mr-6' : 'ml-6'} w-6`}>
      <i className={icon}></i>
    </span>
  ) : null;
  
  /**
   * Content inside the link
   */
  const LinkContent = () => (
    <>
      {icon && iconPosition === 'left' && IconElement}
      {text}
      {icon && iconPosition === 'right' && IconElement}
    </>
  );
  
  // External link (href provided)
  if (href) {
    return (
      <a
        href={href}
        className={`inline-flex items-center ${className}`}
        style={linkStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        <LinkContent />
      </a>
    );
  }
  
  // Internal link (to route provided)
  return (
    <Link
      to={to || '/'}
      className={`inline-flex items-center ${isActive ? 'font-medium' : ''} ${className}`}
      style={linkStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <LinkContent />
    </Link>
  );
};

export default NavLink;