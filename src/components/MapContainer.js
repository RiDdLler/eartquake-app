import React, { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import DraggableMarker from './DraggableMarker';

function MapComponent() {
  const [position, setPosition] = useState({ lat: 34.0522, lng: -118.2437 }); // Пример координат: Лос-Анджелес

  return (
    <MapContainer center={position} zoom={8} style={{ height: 400, width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <DraggableMarker position={position} onDragEnd={setPosition} />
    </MapContainer>
  );
}

export default MapComponent;
