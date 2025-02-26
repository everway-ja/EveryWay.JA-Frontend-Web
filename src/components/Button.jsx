import  './Button.css'

function Button({ children }) {
    return (
        <button className="button-q" >
            {children}
        </button>
    );
}

export default Button;