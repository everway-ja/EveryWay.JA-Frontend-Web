import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet with webpack/vite
// We need to redefine the default icon paths
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Define a custom marker icon for accessible locations
const accessibleIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Regular icon for non-accessible locations
const regularIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Define coordinates for Italian locations
const locationCoordinates = {
  "Trevi Fountain": [41.9009, 12.4833],
  "Colosseum": [41.8902, 12.4922],
  "Venice Canals": [45.4408, 12.3155],
  "Cinque Terre": [44.1461, 9.6439],
  "Vatican City": [41.9022, 12.4539],
  "Villa d'Este": [41.9633, 12.7958]
};

const InteractiveMap = ({ locationData, onMarkerClick }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  
  // Italy's center coordinates
  const italyCenter = [42.8333, 12.8333];
  const defaultZoom = 6;
  
  const handleMarkerClick = (location) => {
    setSelectedLocation(location);
    if (onMarkerClick) {
      onMarkerClick(location);
    }
  };

  return (
    <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-lg">
      <MapContainer 
        center={italyCenter} 
        zoom={defaultZoom} 
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {locationData.map((location, index) => (
          <Marker 
            key={index}
            position={locationCoordinates[location.title] || [0, 0]}
            icon={location.accessible ? accessibleIcon : regularIcon}
            eventHandlers={{
              click: () => handleMarkerClick(location),
            }}
          >
            <Popup>
              <div className="text-center">
                <h3 className="font-bold">{location.title}</h3>
                {location.accessible && 
                  <div className="text-blue-600 text-sm mt-1">
                    <i className="fas fa-wheelchair mr-1"></i>
                    Wheelchair Accessible
                  </div>
                }
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default InteractiveMap;
