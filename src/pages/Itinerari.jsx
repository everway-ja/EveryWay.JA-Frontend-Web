import Itinerario from '../components/Itinerario';

function Itinerari() {
    const itinerari = [
        {
            id: 1,
            titolo: "Tour dei Laghi",
            descrizione: "Esplora i bellissimi laghi alpini tra Lecco e Bellagio. Un'escursione immersa nella natura.",
            immagine: "https://images.unsplash.com/photo-1586975303199-8c54f3ee97f2?q=80&w=1474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            id: 2,
            titolo: "Passeggiata in Montagna",
            descrizione: "Un'escursione sulle montagne che circondano il Lago di Como, con panorami mozzafiato.",
            immagine: "https://images.unsplash.com/photo-1710954695593-32563ce4767a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            id: 3,
            titolo: "Scoperta di Milano",
            descrizione: "Visita i luoghi iconici di Milano, come il Duomo e il Castello Sforzesco.",
            immagine: "https://images.unsplash.com/photo-1663862706669-d7f2f246c490?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            id: 4,
            titolo: "Cultura e Storia a Bellagio",
            descrizione: "Un viaggio nella storia di Bellagio, con una visita ai suoi giardini e al suo affascinante centro storico.",
            immagine: "https://images.unsplash.com/photo-1553246969-7dcb4259a87b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
    ];

    return (
        <div className="flex flex-col items-center justify-center h-screen p-4">
            <h1 className="text-3xl font-bold mb-6">Itinerari</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
                {itinerari.map(itinerario => (
                    <Itinerario
                        key={itinerario.id}
                        titolo={itinerario.titolo}
                        descrizione={itinerario.descrizione}
                        immagine={itinerario.immagine}
                    />
                ))}
            </div>
        </div>
    );
}

export default Itinerari;