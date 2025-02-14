import "./Link"
import './Footer.css'
import Link from './Link'

function Footer() {
    return (
        <footer className=" bottom-0 w-full h-[60px] bg-neutral-800 text-white flex items-center justify-between px-4">
            <p>&copy; 2025 EveryWay. Tutti i diritti riservati.</p>
            <ul className="flex space-x-4">
                <Link>LINK1</Link>
                <Link>LINK2</Link>
                <Link>LINK3</Link>
            </ul>

        </footer>
    );
}

export default Footer;