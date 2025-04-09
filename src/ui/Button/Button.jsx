import './Button.css';
import PropTypes from 'prop-types';

/**
 * Button Component
 * 
 * A versatile button component that supports different variants and actions.
 * Can navigate to URLs and/or trigger custom onClick functions.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Content inside the button
 * @param {string} props.to - URL to navigate to when clicked
 * @param {string} props.variant - Button style variant ('default' or 'rotondo')
 * @param {Function} props.onClick - Custom click handler function
 * @returns {JSX.Element} Button component
 */
function Button({ children, to, variant = "default", onClick }) {
    /**
     * Handle button click events
     * Executes the provided onClick callback if any
     * Navigates to the specified URL if 'to' is provided
     * 
     * @param {React.MouseEvent} e - Click event object
     */
    const handleClick = (e) => {
        if (onClick) {
            onClick(e);
        }
        if (to) {
            window.location.href = to; // Navigate to specified address
        }
    };

    // Choose CSS class based on variant
    const className = variant === "rotondo" ? "button-log" : "button-q";

    return (
        <button className={className} onClick={handleClick}>
            {children}
        </button>
    );
}

// Prop type validation
Button.propTypes = {
    children: PropTypes.node.isRequired,
    to: PropTypes.string,
    variant: PropTypes.oneOf(["default", "rotondo"]),
    onClick: PropTypes.func
};

export default Button;
