function Contact() {
    return (
        <div className="flex flex-col md:flex-row items-start justify-between p-10 gap-10">
            {/* Sezione Informazioni */}
            <div className="w-full md:w-1/2">
                <h1 className="text-4xl font-bold mb-4">Contattaci</h1>
                <p className="text-lg mb-4">Se hai domande o vuoi metterti in contatto con noi, ecco i nostri riferimenti:</p>

                <table className="text-lg border-collapse border border-gray-300 rounded-lg overflow-hidden shadow-lg w-full">
                    <tbody>
                    <tr className="border-b border-gray-300">
                        <td className="p-4 font-semibold bg-gray-100 w-1/3">Email:</td>
                        <td className="p-4 text-blue-500">info@every-way.it</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                        <td className="p-4 font-semibold bg-gray-100 w-1/3">Scuola:</td>
                        <td className="p-4">Istituto Tecnico Badoni</td>
                        <td className="p-4">0341 365339</td>
                    </tr>
                    <tr>
                        <td className="p-4 font-semibold bg-gray-100 w-1/3">Progetto:</td>
                        <td className="p-4" colSpan="2">JA Junior Achievement - Impresa ed Azione</td>
                    </tr>
                    </tbody>
                </table>
            </div>

            {/* Sezione Form */}
            <div className="w-full md:w-1/2 bg-gray-100 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Fai una domanda</h2>
                <form className="flex flex-col space-y-4">
                    <label className="text-lg">Nome:</label>
                    <input type="text" className="p-2 border rounded-md" placeholder="Inserisci il tuo nome" />

                    <label className="text-lg">Email:</label>
                    <input type="email" className="p-2 border rounded-md" placeholder="Inserisci la tua email" />

                    <label className="text-lg">Messaggio:</label>
                    <textarea className="p-2 border rounded-md" placeholder="Scrivi il tuo messaggio" rows="4"></textarea>

                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                        Invia
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Contact;