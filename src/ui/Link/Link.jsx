import PropTypes from 'prop-types';
import './Link.css';

/**
 * Link Component
 * 
 * A custom link component that handles both internal and external links.
 * External links (starting with "http") will open in a new tab with proper security attributes.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Content inside the link
 * @param {string} props.link - URL for the link destination (defaults to "#")
 * @returns {JSX.Element} Custom link component
 */
function Link({ children, link = "#" }) {
    // Check if this is an external link (starts with http)
    const isExternal = typeof link === 'string' && link.startsWith('http');

    /**
     * Handle click events for external links
     * @param {React.MouseEvent} e - Click event object
     */
    const handleClick = (e) => {
        if (isExternal) {
            e.preventDefault(); // Prevente il comportamento predefinito
            window.open(link, "_blank", "noopener,noreferrer"); // Apre in una nuova scheda
        }
    };

    return (
        <a
            href={link}
            className="a-link"
            target={isExternal ? "_blank" : "_self"}
            rel={isExternal ? "noopener noreferrer" : undefined}
            onClick={handleClick}
        >
            {children}
        </a>
    );
}

// Prop type validation
Link.propTypes = {
    children: PropTypes.node.isRequired,
    link: PropTypes.string
};

export default Link;
