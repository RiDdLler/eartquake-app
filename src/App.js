import React from 'react';
import './App.css';
import MapContainer from './components/MapContainer';
import EarthquakeData from './components/EarthquakeData';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Информация о землетрясениях</h1>
      </header>
      <main>
        <MapContainer />
        <EarthquakeData />
      </main>
      <footer>
        <p>Савостьянов Кирилл</p>
      </footer>
    </div>
  );
}

export default App;
