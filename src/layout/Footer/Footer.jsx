import "./Footer.css"
import Link from "../../ui/Link/Link"

function Footer() {
    return (
        <footer className="text-white py-12 ">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">EveryWay</h3>
                        <p className="text-gray-300" style={{maxWidth: "50%"}}>
                            Il tuo compagno di viaggio perfetto per scoprire il mondo in modo unico e personalizzato.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4" style={{textAlign: "center"}}>Link Utili</h4>
                        <ul className="space-y-2" style={{ alignItems: "center" }}>
                            <li><a href="#" className="text-gray-300 hover:text-cyan-600 cursor-pointer">Home</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-cyan-600 cursor-pointer">Destinazioni</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-cyan-600 cursor-pointer">Blog</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-cyan-600 cursor-pointer">FAQ</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4" style={{textAlign: "end"}}>Contatti</h4>
                        <ul className="space-y-2" style={{ alignItems: "flex-end" }}>
                            <li className="text-gray-300">Via Rivolta 10, Lecco</li>
                            <li className="text-gray-300">0341 365339</li>
                            <li className="text-gray-300">info@every-way.it</li>
                        </ul>
                    </div>

                </div>
                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                    <p>&copy; 2025 EveryWay. Tutti i diritti riservati.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
