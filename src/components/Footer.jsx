import "./Link"
import './Footer.css'
import Link from './Link'

function Footer() {
    const img = "instagram"
    const img2 = "email"

    return (
        <footer className="">

            <ul>

                <Link>
                    <img
                    style={{ height: "14px", borderRadius: "0px" }}
                    src={`/${img}.png`}
                    alt="instagram"
                    className="iconLogo"
                    />Instagram
                </Link>
                <Link>
                    <img
                        style={{ height: "14px", borderRadius: "0px" }}
                        src={`/${img2}.png`}
                        alt="instagram"
                        className="iconLogo"
                    />
                    Mail
                </Link>
                <Link>LINK</Link>
            </ul><p>&copy; 2025 EveryWay</p>

        </footer>
    );
}

export default Footer;