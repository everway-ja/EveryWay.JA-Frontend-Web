import './NavBar.css'
import "./Link"
import Link from './Link'
import { useState } from "react";
import Button from "./Button.jsx";
import ButtonRotondos from "./ButtonRotondos.jsx";

function NavBar(){
    const img = "focaRound"
    const [isOpen, setIsOpen] = useState(false);

    console.log("isOpen state:", isOpen);

    return (
        <nav className="flex items-center justify-between px-6 text-white " style={{ height: "75px", padding: "10px" }}>
            {/* Logo a sinistra */}
            <Link link="/">
                <img
                    style={{ height: "60px", borderRadius: "10px" }}
                    src={`/${img}.png`}
                    alt="Logo"
                    className={`transform transition-transform duration-300 ease-in-out hover:scale-110`}
                />
            </Link>

            <div className="blocco-b">
                <div className="blocco-sup">
                    <Link link={"/contact"}>Contact</Link>
                    <Link link={"/partners"}>Partner</Link>
                    <Link link="https://www.instagram.com/everyway.ja"><i className="fa-brands fa-instagram"></i></Link>
                    <Link link="mailto:info@every-way.it"><i className="fa-regular fa-envelope"></i></Link>
                </div>
                <div className="blocco-inf">
                    <Button to={"/"}>Home</Button>
                    <Button to={"/map"}>Mappa</Button>
                    <Button to={"/itinerari"}>Itinerari</Button>
                    <Button to={"/feedback"}>Feedback</Button>
                    <Button to={"/about"}>About us</Button>
                    <ButtonRotondos to={"/login"}>Log In</ButtonRotondos>
                </div>
            </div>

            {/* Icona Burger (visibile sotto i 992px) */}
            <button
                className="hidden text-3xl text-gray-800 focus:outline-none bg-white"
                onClick={() => setIsOpen(true)}
            >
                <i className="fa-solid fa-bars"></i>
            </button>

            {/* Overlay (dietro la sidebar ma sopra il sito) */}
            <div
                className={`nascondino fixed top-0 right-0 w-screen h-screen bg-black bg-opacity-50 transition-transform duration-300 ease-in-out z-40
                ${isOpen ? "translate-x-0" : "translate-x-full"}`}
                onClick={() => setIsOpen(false)}
            ></div>

            {/* Sidebar Mobile (sopra l'overlay) */}
            <div
                className={`fixed right-0 top-0 w-64 h-full bg-white ordine z-50 transition-transform duration-300 ease-in-out
                ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
                <button
                    className="self-end p-6 text-2xl text-gray-800 bg-white"
                    onClick={() => setIsOpen(false)}>
                    <i className="fa-solid fa-xmark"></i>
                </button>
                <Button to="/" onClick={() => setIsOpen(false)}>Home</Button>
                <Button to="/map" onClick={() => setIsOpen(false)}>Mappa</Button>
                <Button to="/itinerari" onClick={() => setIsOpen(false)}>Itinerari</Button>
                <Button to="/feedback" onClick={() => setIsOpen(false)}>Feedback</Button>
                <Button to="/about" onClick={() => setIsOpen(false)}>About us</Button>
                <ButtonRotondos to="/login" onClick={() => setIsOpen(false)}>Log In</ButtonRotondos>
                <div>
                    <div className="ordina-link">
                        <a className="dimensione-icon" href="https://www.instagram.com/everyway.ja" onClick={() => setIsOpen(false)}>
                            <i className="fa-brands fa-instagram fa-xl text-black"></i>
                        </a>
                        <a className="dimensione-icon" href="mailto:info@every-way.it" onClick={() => setIsOpen(false)}>
                            <i className="fa-regular fa-envelope fa-xl text-black"></i>
                        </a>
                    </div>
                    <div className="ordina-link">
                        <Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
                        <Link to="/partners" onClick={() => setIsOpen(false)}>Partner</Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;
