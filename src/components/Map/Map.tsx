
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Map: React.FC = () => {
  const [position, setPosition] = useState<[number, number]>([51.505, -0.09]); //(Лондон)

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setPosition([position.coords.latitude, position.coords.longitude]);
      });
    }
  }, []);

  const places = [
    { name: 'Museum', lat: 51.507, lng: -0.09, description: 'A cool museum' },
    { name: 'Park', lat: 51.51, lng: -0.08, description: 'Nice green park' },
  ];

  return (
    <MapContainer center={position} zoom={13} style={{ height: '500px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {places.map((place, index) => (
        <Marker key={index} position={[place.lat, place.lng]}>
          <Popup>
            <h3>{place.name}</h3>
            <p>{place.description}</p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
