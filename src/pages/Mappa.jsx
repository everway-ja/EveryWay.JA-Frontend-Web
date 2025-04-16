import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from 'react';

function Mappa() {
    const [punti, setPunti] = useState([]);

    useEffect(() => {
        const datiReali = [
            { id: 1, nome: "Piazza della Chiesa - Premana", lat: 46.0458, lng: 9.3929 },
            { id: 2, nome: "Via Rivolta 10 - Lecco", lat: 45.8505, lng: 9.3916 },
            { id: 3, nome: "Duomo di Milano", lat: 45.4642, lng: 9.1900 },
            { id: 4, nome: "Bellagio", lat: 45.9876, lng: 9.2560 }
        ];
        setPunti(datiReali);
    }, []);

    return (
        <div className="flex w-screen h-screen overflow-hidden">
            <div className="w-[70%] h-full">
                <MapContainer center={[45.9, 9.3]} zoom={9} className="w-full h-full">
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {punti.map(p => (
                        <Marker
                            key={p.id}
                            position={[p.lat, p.lng]}
                            icon={L.icon({
                                iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
                                iconSize: [25, 41],
                                iconAnchor: [12, 41],
                            })}
                        >
                            <Popup>{p.nome}</Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>

            <div className="w-[30%] h-full p-6 overflow-y-auto bg-white shadow-lg">
                <h2 className="text-2xl font-bold mb-4">📍 Punti di interesse</h2>
                <ul className="space-y-2">
                    {punti.map(p => (
                        <li key={p.id} className="flex items-center gap-2">
                            <span>📍</span> <span>{p.nome}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Mappa;