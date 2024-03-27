import { Link } from "react-router-dom"; 
import React, { useState } from "react";
import GoogleMapBlock from "../../components/GoogleMapBlock/GoogleMapBlock";
import "../../css/MapPage.css";

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

  /*const handleImageClick = (imageId) => {
    if (clickedImage === imageId) {
      setMapVisible(!isMapVisible);
    } else {
      setClickedImage(imageId);
      setMapVisible(true);
    }
  };*/

  const images = [
    { name: "Popular Trips 1", src: "https://media.istockphoto.com/id/458236925/photo/caesars-palace-hotel-casino.jpg?s=612x612&w=0&k=20&c=D4Ub55Ne1CswmoXRqtGigSXv0cRK6P0Rg73vQSXuz7k=", coordinates: { lat: 36.1173, lng: -115.1761, message: "Las Vegas" } },
    { name: "Popular Trips 2", src: "https://www.deutschland.de/sites/default/files/styles/image_carousel_mobile/public/media/image/tdt_29092020_1_staat_16_laender_schwerin.jpg?itok=4PP80WP4", coordinates: { lat: 51.1657, lng: 10.4515, message: "Germany" } },
    { name: "Popular Trips 3", src: "https://www.travelandleisure.com/thmb/9xr8CFGR14sLvR4IhLwKV64fEV0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/TAL-Eiffel-Tower-BESTFRANCE0323-dada0673f8764c099b68d01695ef8057.jpg", coordinates: { lat: 46.2276, lng: 2.2137, message: "France" } },
    { name: "Popular Trips 4", src: "https://www.exoticca.com/us/blog/wp-content/uploads/2019/05/The-12-most-spectacular-beaches-in-hawaii-that-you-cannot-miss.jpg", coordinates: { lat: 19.8987, lng: 155.6659, message: "Hawaii" } }
    // Add more images as needed
  ];

  const handleImageClick = (imageName) => {
    if (clickedImage === imageName) {
      // If the same image is clicked again, toggle the map visibility
      setMapVisible(!isMapVisible);
    } else {
      // If a different image is clicked, show the map and update the clicked image
      setClickedImage(imageName);
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
        </ul>
      </div>
      <div id="Popular Trips" className="continent-section">
        <h2>Popular Trips</h2>
        <div className="image-container">
        {images.map((image, index) => (
          <div className="image-wrapper" key={index} onClick={() => handleImageClick(image.name)}>
            <img src={image.src} alt={`Image ${index + 1}`} style={{ width: "400px", height: "400px" }} />
            <div className="image-name">{image.coordinates.message}</div>
          </div>
        ))}
      </div>
      {images.map((image, index) => (
        clickedImage === image.name && isMapVisible && (
          <div key={index} className="map-container">
            <GoogleMapBlock
              height="85vh"
              width="85vw"
              markerCoordinatesArray={[image.coordinates]}
            />
          </div>
        )
      ))}
      </div>
      <div id="Africa" className="continent-section">
        <h2>Africa</h2>
        <div className="image-container">
          <div className="image-wrapper" onClick={() => handleImageClick("Africa Image 1")}>
            <img src="https://via.placeholder.com/150" 
            alt="Africa Image 1" 
            style={{ width: "400px", height: "400px" }}
            />
            <div className="image-name">Africa Image 1 </div>
          </div>
          <div className="image-wrapper" onClick={() => handleImageClick("Africa Image 2")}>
            <img src="https://via.placeholder.com/150" 
            alt="Africa Image 2" 
            style={{ width: "400px", height: "400px" }}
            />
            <div className="image-name">Africa Image 2 </div>
          </div>
          <div className="image-wrapper" onClick={() => handleImageClick("Africa Image 3")}>
            <img src="https://via.placeholder.com/150" 
            alt="Africa Image 3" 
            style={{ width: "400px", height: "400px" }}
            />
            <div className="image-name">Africa Image 3 </div>
          </div>
          {/* Add other images for Africa */}
        </div>
      </div>
      <div id="Asia" className="continent-section">
        <h2>Asia</h2>
        <div className="image-container">
          <div className="image-wrapper" onClick={() => handleImageClick("Asia Image 1")}>
            <img src="https://via.placeholder.com/150" 
            alt="Asia Image 1" 
            style={{ width: "400px", height: "400px" }}
            />
            <div className="image-name">Asia Image 1 </div>
          </div>
          <div className="image-wrapper" onClick={() => handleImageClick("Asia Image 2")}>
            <img src="https://via.placeholder.com/150" 
            alt="Asia Image 2" 
            style={{ width: "400px", height: "400px" }}
            />
            <div className="image-name">Asia Image 2 </div>
          </div>
          <div className="image-wrapper" onClick={() => handleImageClick("Asia Image 3")}>
            <img src="https://via.placeholder.com/150" 
            alt="Asia Image 3" 
            style={{ width: "400px", height: "400px" }}
            />
            <div className="image-name">Asia Image 3 </div>
          </div>
          {/* Add other images for Asia */}
        </div>
      </div>
      <div id="Europe" className="continent-section">
        <h2>Europe</h2>
        <div className="image-container">
        <div className="image-wrapper" onClick={() => handleImageClick("Europe Image 1")}>
            <img src="https://via.placeholder.com/150" 
            alt="Europe Image 1" 
            style={{ width: "400px", height: "400px" }}
            />
            <div className="image-name">Europe Image 1 </div>
          </div>
          <div className="image-wrapper" onClick={() => handleImageClick("Europe Image 2")}>
            <img src="https://via.placeholder.com/150" 
            alt="Europe Image 2" 
            style={{ width: "400px", height: "400px" }}
            />
            <div className="image-name">Europe Image 2 </div>
          </div>
          <div className="image-wrapper" onClick={() => handleImageClick("Europe Image 3")}>
            <img src="https://via.placeholder.com/150" 
            alt="Europe Image 3" 
            style={{ width: "400px", height: "400px" }}
            />
            <div className="image-name">Europe Image 3 </div>
          </div>
          {/* Add other images for Europe */}
        </div>
      </div>
      <div id="NorthAmerica" className="continent-section">
        <h2>North America</h2>
        <div className="image-container">
        <div className="image-wrapper" onClick={() => handleImageClick("NorthAmerica Image 1")}>
            <img src="https://via.placeholder.com/150" 
            alt="NorthAmerica Image 1" 
            style={{ width: "400px", height: "400px" }}
            />
            <div className="image-name">NorthAmerica Image 1 </div>
          </div>
          <div className="image-wrapper" onClick={() => handleImageClick("NorthAmerica Image 2")}>
            <img src="https://via.placeholder.com/150" 
            alt="NorthAmerica Image 2" 
            style={{ width: "400px", height: "400px" }}
            />
            <div className="image-name">NorthAmerica Image 2 </div>
          </div>
          <div className="image-wrapper" onClick={() => handleImageClick("NorthAmerica Image 3")}>
            <img src="https://via.placeholder.com/150" 
            alt="NorthAmerica Image 3" 
            style={{ width: "400px", height: "400px" }}
            />
            <div className="image-name">NorthAmerica Image 3 </div>
          </div>
          {/* Add other images for North America */}
        </div>
      </div>
      <div id="SouthAmerica" className="continent-section">
        <h2>South America</h2>
        <div className="image-container">
        <div className="image-wrapper" onClick={() => handleImageClick("SouthAmerica Image 1")}>
            <img src="https://via.placeholder.com/150" 
            alt="SouthAmerica Image 1" 
            style={{ width: "400px", height: "400px" }}
            />
            <div className="image-name">SouthAmerica Image 1 </div>
          </div>
          <div className="image-wrapper" onClick={() => handleImageClick("SouthAmerica Image 2")}>
            <img src="https://via.placeholder.com/150" 
            alt="SouthAmerica Image 2" 
            style={{ width: "400px", height: "400px" }}
            />
            <div className="image-name">SouthAmerica Image 2 </div>
          </div>
          <div className="image-wrapper" onClick={() => handleImageClick("SouthAmerica Image 3")}>
            <img src="https://via.placeholder.com/150" 
            alt="SouthAmerica Image 3" 
            style={{ width: "400px", height: "400px" }}
            />
            <div className="image-name">SouthAmerica Image 3 </div>
          </div>
          {/* Add other images for South America */}
        </div>
      </div>
      <div id="Australia" className="continent-section">
        <h2>Australia</h2>
        <div className="image-container">
        <div className="image-wrapper" onClick={() => handleImageClick("Australia Image 1")}>
            <img src="https://via.placeholder.com/150" 
            alt="Australia Image 1" 
            style={{ width: "400px", height: "400px" }}
            />
            <div className="image-name">Australia Image 1 </div>
          </div>
          <div className="image-wrapper" onClick={() => handleImageClick("Australia Image 2")}>
            <img src="https://via.placeholder.com/150" 
            alt="Australia Image 2" 
            style={{ width: "400px", height: "400px" }}
            />
            <div className="image-name">Australia Image 2 </div>
          </div>
          <div className="image-wrapper" onClick={() => handleImageClick("Australia Image 3")}>
            <img src="https://via.placeholder.com/150" 
            alt="Australia Image 3" 
            style={{ width: "400px", height: "400px" }}
            />
            <div className="image-name">Australia Image 3 </div>
          </div>
          {/* Add other images for Australia */}
        </div>
      </div>
      
      {/* Add more continent sections as needed */}
    </div>
  );
}

export default MapPage;
