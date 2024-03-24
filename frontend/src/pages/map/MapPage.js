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
        {/* Commenting out the conflicting part for later use*/}
        {/* <h2>Map Page</h2>
        <GoogleMapBlock 
          width="800px" 
          height="600px" 
          markerCoordinatesArray={markers}
          start="Las Vegas" // Las Vegas coordinates
          destination= "Fremont, Ohio" // Fremont, Ohio coordinates
        /> */}
      </div>
    </div>
  );
}

export default MapPage;
