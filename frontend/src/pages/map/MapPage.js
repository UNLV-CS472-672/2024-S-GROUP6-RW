import { Link } from "react-router-dom"; 
import React, { useState } from "react";
import GoogleMapBlock from "../../components/GoogleMapBlock/GoogleMapBlock";
import "../../css/MapPage.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function MapPage() {
  const [clickedImage, setClickedImage] = useState(null); 
  const [isListVisible, setListVisible] = useState(false);
  const [isMapVisible, setMapVisible] = useState(false);
  const [isMapLoaded, setMapLoaded] = useState(false); 

  const handleContinentClick = (continent) => {
    console.log(`${continent} clicked`);
    const section = document.getElementById(continent);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSearch = (searchQuery) => {
    console.log("Search query:", searchQuery);
  };

  const handleImageClick = (imageId) => {
    if (clickedImage === imageId) {
      
      setMapVisible(!isMapVisible);
    } else {
      
      setClickedImage(imageId);
      setMapVisible(true);
    }
  };

  return (
    <div>
      <div className="search-bar">
        <input type="text" placeholder="Search..." onChange={(e) => handleSearch(e.target.value)} />
      </div>
          <div className={`continent-list ${isListVisible ? 'visible' : ''}`}>
            <ul>
              <li className="continent-button" onClick={() => handleContinentClick("Africa")}>
                <strong>Africa</strong>
              </li>
              <li className="continent-button" onClick={() => handleContinentClick("Asia")}>
                <strong>Asia</strong>
              </li>
              <li className="continent-button" onClick={() => handleContinentClick("Europe")}>
                <strong>Europe</strong>
              </li>
              <li className="continent-button" onClick={() => handleContinentClick("NorthAmerica")}>
                <strong>North America</strong>
              </li>
              <li className="continent-button" onClick={() => handleContinentClick("SouthAmerica")}>
                <strong>South America</strong>
              </li>
              <li className="continent-button" onClick={() => handleContinentClick("Australia")}>
                <strong>Australia</strong>
              </li>
              <li className="continent-button" onClick={() => handleContinentClick("Antarctica")}>
                <strong>Antarctica</strong>
              </li>
            </ul>
          </div>
      <div id="Popular Trips" className="continent-section">
        <h2>Popular Trips</h2>
        <div className="image-container">
            <img src="https://media.istockphoto.com/id/458236925/photo/caesars-palace-hotel-casino.jpg?s=612x612&w=0&k=20&c=D4Ub55Ne1CswmoXRqtGigSXv0cRK6P0Rg73vQSXuz7k=" 
            alt="Popular Image 1" 
            style={{ width: "400px", height: "400px" }} 
            onClick={() => handleImageClick("Popular Trips")}           
            />
          <img src="https://via.placeholder.com/150" alt="Popular Image 2" />
          <img src="https://via.placeholder.com/150" alt="Popular Image 3" />
        </div>
        
        {/* Render map below the clicked image */}
        {clickedImage === "Popular Trips" && isMapVisible && (
          <div className="map-container">
            <GoogleMapBlock
              height="85vh"
              width="85vw"
              markerCoordinatesArray={[{ lat: 36.1173, lng: -115.1761, message: "Las Vegas" }]}
            />
          </div>
        )}
      </div>
      <div id="Africa" className="continent-section">
        <h2>Africa</h2>
        <div className="image-container">
          <img src="https://via.placeholder.com/150" alt="Africa Image 1" />
          <img src="https://via.placeholder.com/150" alt="Africa Image 2" />
          <img src="https://via.placeholder.com/150" alt="Africa Image 3" />
        </div>
      </div>
      <div id="Asia" className="continent-section">
        <h2>Asia</h2>
        <div className="image-container">
          <img src="https://via.placeholder.com/150" alt="Asia Image 1" />
          <img src="https://via.placeholder.com/150" alt="Asia Image 2" />
          <img src="https://via.placeholder.com/150" alt="Asia Image 3" />
        </div>
      </div>
      <div id="Europe" className="continent-section">
        <h2>Europe</h2>
        <div className="image-container">
          <img src="https://via.placeholder.com/150" alt="Europe Image 1" />
          <img src="https://via.placeholder.com/150" alt="Europe Image 2" />
          <img src="https://via.placeholder.com/150" alt="Europe Image 3" />
        </div>
      </div>
      <div id="NorthAmerica" className="continent-section">
        <h2>North America</h2>
        <div className="image-container">
          <img src="https://via.placeholder.com/150" alt="North America Image 1" />
          <img src="https://via.placeholder.com/150" alt="North America Image 2" />
          <img src="https://via.placeholder.com/150" alt="North America Image 3" />
        </div>
      </div>
      <div id="SouthAmerica" className="continent-section">
        <h2>South America</h2>
        <div className="image-container">
          <img src="https://via.placeholder.com/150" alt="South America Image 1" />
          <img src="https://via.placeholder.com/150" alt="South America Image 2" />
          <img src="https://via.placeholder.com/150" alt="South America Image 3" />
        </div>
      </div>
      <div id="Australia" className="continent-section">
        <h2>Australia</h2>
        <div className="image-container">
          <img src="https://via.placeholder.com/150" alt="Australia Image 1" />
          <img src="https://via.placeholder.com/150" alt="Australia Image 2" />
          <img src="https://via.placeholder.com/150" alt="Australia Image 3" />
        </div>
      </div>


      {/*{clickedImage === "Popular Trips" && isMapVisible && ( // Conditionally render the map if isMapVisible is true
          <GoogleMapBlock
            height="90vh"
            width="90vw"
            markerCoordinatesArray={[]}
          />

        )} */}
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