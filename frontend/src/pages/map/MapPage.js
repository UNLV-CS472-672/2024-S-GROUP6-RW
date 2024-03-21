import React, { useState } from "react";
import GoogleMapBlock from "../../components/GoogleMapBlock/GoogleMapBlock";
import "../../css/MapPage.css";

function MapPage() {
  const [isListVisible, setListVisible] = useState(false);

  const handleMouseEnter = () => {
    setListVisible(true);
  };

  const handleMouseLeave = () => {
    setListVisible(false);
  };

  const handleContinentClick = (continent) => {
    console.log(`${continent} clicked`);
    // CONTINENT BUTTON FUNCTIONALITY HERE
  };

  const handleSearch = (searchQuery) => {
    console.log("Search query:", searchQuery);
    // SEARCH BAR FUNCTIONALITY HERE
  };

  return (
    <div>
      <div className="search-bar">
        <input type="text" placeholder="Search..." onChange={(e) => handleSearch(e.target.value)} />
      </div>
      <div className="map-container">
        <div className="continent-list-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <div className={`continent-list ${isListVisible ? 'visible' : ''}`}>
            <ul>
              <li className="continent-button" onClick={() => handleContinentClick("Africa")}>
                <strong>Africa</strong>
                <ul className="hotspot-list">
                  <li>Hotspot 1</li>
                  <li>Hotspot 2</li>
                  <li>Hotspot 3</li>
                </ul>
              </li>
              <li className="continent-button" onClick={() => handleContinentClick("Asia")}>
                <strong>Asia</strong>
                <ul className="hotspot-list">
                  <li>Hotspot 1</li>
                  <li>Hotspot 2</li>
                  <li>Hotspot 3</li>
                </ul>
              </li>
              <li className="continent-button" onClick={() => handleContinentClick("Europe")}>
                <strong>Europe</strong>
                <ul className="hotspot-list">
                  <li>Hotspot 1</li>
                  <li>Hotspot 2</li>
                  <li>Hotspot 3</li>
                </ul>
              </li>
              <li className="continent-button" onClick={() => handleContinentClick("North America")}>
                <strong>North America</strong>
                <ul className="hotspot-list">
                  <li>Hotspot 1</li>
                  <li>Hotspot 2</li>
                  <li>Hotspot 3</li>
                </ul>
              </li>
              <li className="continent-button" onClick={() => handleContinentClick("South America")}>
                <strong>South America</strong>
                <ul className="hotspot-list">
                  <li>Hotspot 1</li>
                  <li>Hotspot 2</li>
                  <li>Hotspot 3</li>
                </ul>
              </li>
              <li className="continent-button" onClick={() => handleContinentClick("Australia")}>
                <strong>Australia</strong>
                <ul className="hotspot-list">
                  <li>Hotspot 1</li>
                  <li>Hotspot 2</li>
                  <li>Hotspot 3</li>
                </ul>
              </li>
              <li className="continent-button" onClick={() => handleContinentClick("Antarctica")}>
                <strong>Antarctica</strong>
                <ul className="hotspot-list">
                  <li>Hotspot 1</li>
                  <li>Hotspot 2</li>
                  <li>Hotspot 3</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div className="map-placeholder">
          <GoogleMapBlock
            height="98%" // Adjusted to take fit black box which takes up 80% of the screen height
            width="99%" // Takes up entire width of the container
            markerCoordinatesArray={[]}
          />
        </div>
      </div>
    </div>
  );
}

export default MapPage;

/*
const markers = [
  { lat: 40.7128, lng: -74.0060, message: "Hello from New York City" },  // Example: New York City
  { lat: 34.0522, lng: -118.2437, message: "Hello from Los Angeles"  }, // Example: Los Angeles
  { lat: 41.8781, lng: -87.6298, message: "Hello from Chicago"  }   // Example: Chicago
  // Add more coordinates as needed
];
*/

/* 
const markers = [
  { lat: 40.7128, lng: -74.0060, message: "Hello from New York City" },  // Example: New York City
  { lat: 34.0522, lng: -118.2437, message: "Hello from Los Angeles"  }, // Example: Los Angeles
  { lat: 41.8781, lng: -87.6298, message: "Hello from Chicago"  }   // Example: Chicago
  // Add more coordinates as needed
];
*/



