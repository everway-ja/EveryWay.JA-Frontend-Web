
function Link({children}) {
    return (
        <a href="#" className={`p-5 text-white hover:text-gray-300`}>
            {children}
        </a>
    )
}

export default Link;