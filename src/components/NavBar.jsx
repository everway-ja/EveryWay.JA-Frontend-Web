import './NavBar.css'
import "./Link"
import Link from './Link'
import { useState } from "react";
import { Menu } from "lucide-react";
import Button from './Button';

function NavBar(){
    const img = "foca"
    const [isOpen, setIsOpen] = useState(false);

    console.log("isOpen state:", isOpen);

    return (
        <nav className="flex items-center justify-between px-6  text-white" style={{ height: "70px", padding: "10px" }}>
            {/* Logo a sinistra */}
            <Link>
                <img
                    style={{ height: "50px", borderRadius: "10px" }}
                    src={`/${img}.svg`}
                    alt="Logo"
                    className={`transform transition-transform duration-300 ease-in-out hover:scale-110`}
                />
            </Link>

            {/* Pulsanti desktop */}
            <div className="hidden md:flex gap-4">
                <Button variant="secondary">QWERTY</Button>
                <Button variant="secondary">Ciao</Button>
                <Button variant="secondary">Ciao</Button>
            </div>

            {/* Burger Menu */}
            <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                <Menu size={32} />
            </button>

            {/* Menu mobile */}
            <div className={`absolute top-full right-0 w-48 bg-neutral-800 text-white p-4 flex flex-col gap-2 md:hidden z-50 transition-all duration-300 ease-in-out ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
                <Link>QWERTY</Link>
                <Link>Ciao</Link>
                <Link>Ciao</Link>
            </div>
        </nav>
    )
}

export default NavBar;