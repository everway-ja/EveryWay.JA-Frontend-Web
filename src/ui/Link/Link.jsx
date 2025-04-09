import PropTypes from 'prop-types';
import './Link.css';

function Link({ children, link = "#" }) {
    const isExternal = typeof link === 'string' && link.startsWith('http');

    const handleClick = (e) => {
        if (isExternal) {
            e.preventDefault(); // Previene il comportamento predefinito
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

Link.propTypes = {
    children: PropTypes.node.isRequired,
    link: PropTypes.string
};

export default Link;
