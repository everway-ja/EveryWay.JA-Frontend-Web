function Itinerario({ titolo, descrizione, immagine }) {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <img className="w-full h-48 object-cover" src={immagine} alt={titolo} />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{titolo}</div>
                <p className="text-gray-700 text-base">{descrizione}</p>
            </div>
        </div>
    );
}

export default Itinerario;