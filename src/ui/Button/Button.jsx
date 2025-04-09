import './Button.css';
import PropTypes from 'prop-types';

function Button({ children, to, variant = "default", onClick }) {
    const handleClick = (e) => {
        if (onClick) {
            onClick(e);
        }
        if (to) {
            window.location.href = to; // Navigate to specified address
        }
    };

    // Choose class based on variant
    const className = variant === "rotondo" ? "button-log" : "button-q";

    return (
        <button className={className} onClick={handleClick}>
            {children}
        </button>
    );
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    to: PropTypes.string,
    variant: PropTypes.oneOf(["default", "rotondo"]),
    onClick: PropTypes.func
};

export default Button;
