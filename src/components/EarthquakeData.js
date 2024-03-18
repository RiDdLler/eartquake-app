import React, { useState, useEffect } from 'react';

function EarthquakeData() {
    const [earthquakes, setEarthquakes] = useState([]);

    useEffect(() => {
        fetchEarthquakes();
    }, []);

    const fetchEarthquakes = async () => {
        const endDate = new Date().toISOString();
        const startDate = new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString();
        const url = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${startDate}&endtime=${endDate}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            setEarthquakes(data.features);
        } catch (error) {
            console.error("Ошибка при получении данных о землетрясениях:", error);
        }
    };

    return (
        <div>
            <h2>Все землетрясения за последний месяц:</h2>
            <ul>
                {earthquakes.map((eq, index) => (
                    <li key={index}>
                        {eq.properties.place} | Магнитуда: {eq.properties.mag} | {new Date(eq.properties.time).toLocaleDateString()}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default EarthquakeData;
