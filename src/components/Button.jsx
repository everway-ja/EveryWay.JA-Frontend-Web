
function Button({ children }) {
    return (
        <button className={`px-4 py-2 bg-[#D3FFFF] text-black rounded-lg transform transition-transform duration-300 ease-in-out hover:scale-110`} >
            {children}
        </button>
    );
}

export default Button;