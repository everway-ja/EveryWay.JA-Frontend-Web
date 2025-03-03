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
        <nav className="flex items-center justify-between px-6 text-white" style={{ height: "75px", padding: "10px" }}>
            {/* Logo a sinistra */}
            <Link link="google.com">
                <img
                    style={{ height: "60px", borderRadius: "10px" }}
                    src={`/${img}.png`}
                    alt="Logo"
                    className={`transform transition-transform duration-300 ease-in-out hover:scale-110`}
                />
            </Link>

            <div className="blocco-b">
                <div className="blocco-sup">
                    <Link link="https://www.instagram.com/everyway.ja">Instagram</Link>
                    <Link link="mailto:info@every-way.it">E-Mail</Link>
                    <Link link={"/contact"}>Contact</Link>
                    <Link link={"/partners"}>Partner</Link>
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
        </nav>
    )
}

export default NavBar;
