import '../Button.css'

/**
 * ButtonRotondos Component (Round Button)
 * 
 * A specialized button component with rounded styling.
 * Can navigate to a specified URL when clicked.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Content inside the button
 * @param {string} props.to - URL to navigate to when the button is clicked
 * @returns {JSX.Element} Rounded button component
 */
function ButtonRotondos({ children, to }) {
    /**
     * Handle button click event
     * If a 'to' URL is provided, navigate to that location
     */
    const handleClick = () => {
        if (to) {
            window.location.href = to; // Navigate to the specified address
        }
    };

    return (
        <button className="button-log" onClick={handleClick}>
            {children}
        </button>
    );
}

export default ButtonRotondos;
