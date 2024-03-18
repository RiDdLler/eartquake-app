import React, { useState } from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const earthquakeIcon = new L.Icon({
  iconUrl: `${process.env.PUBLIC_URL}/Earthquake.png`,
  iconRetinaUrl: `${process.env.PUBLIC_URL}/Earthquake.png`,
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [1, -34],
});

const DraggableMarker = ({ position, onDragEnd }) => {
  const [earthquakes, setEarthquakes] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const fetchEarthquakes = async (lat, lng) => {
    const endDate = new Date().toISOString();
    const startDate = new Date(new Date().setDate(new Date().getDate() - 30)).toISOString();
    const url = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${startDate}&endtime=${endDate}&latitude=${lat}&longitude=${lng}&maxradiuskm=100`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setEarthquakes(data.features);
    } catch (error) {
      console.error("Ошибка при получении данных о землетрясениях:", error);
    }
  };

  return (
    <Marker
      position={position}
      icon={earthquakeIcon}
      draggable={true}
      eventHandlers={{
        dragend: (e) => {
          const newPos = e.target.getLatLng();
          onDragEnd(newPos);
          setShowPopup(false); // Скрываем попап при перетаскивании
        },
        click: (e) => {
          const { lat, lng } = e.latlng;
          fetchEarthquakes(lat, lng);
          setShowPopup(true); // Показываем попап при клике
        },
      }}
    >
      {showPopup && (
        <Popup>
          <div>
            <h2>Землетрясения в радиусе 100 км:</h2>
            {earthquakes.map((eq, index) => (
              <p key={index}>{eq.properties.title}</p>
            ))}
          </div>
        </Popup>
      )}
    </Marker>
  );
};

export default DraggableMarker;
