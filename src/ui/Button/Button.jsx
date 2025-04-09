import './Button.css';

function Button({ children, to }) {
    const handleClick = () => {
        if (to) {
            window.location.href = to; // Naviga all'indirizzo specificato
        }
    };

    return (
        <button className="button-q" onClick={handleClick}>
            {children}
        </button>
    );
}

export default Button;
