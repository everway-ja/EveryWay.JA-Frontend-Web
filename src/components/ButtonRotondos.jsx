import  './Button.css'

function ButtonRotondos({ children, to }) {
    const handleClick = () => {
        if (to) {
            window.location.href = to; // Naviga all'indirizzo specificato
        }
    };

    return (
        <button className="button-log" onClick={handleClick}>
            {children}
        </button>
    );
}

export default ButtonRotondos;