
import React, { useState, useEffect } from 'react';
import '../../css/PopUp.css'
import '../../css/closeButton.css'
import '../../css/Activities.css'
import StarRatings from 'react-star-ratings';


let apiKey=process.env.REACT_APP_GOOGLE_PLACES_API_KEY

//ai gen start (chat gpt 3.5, 2)
async function getNearbyPlaces(lat, lng, radius, type) {
  const response = await fetch(`http://localhost:5000/nearbyPlaces?lat=${lat}&lng=${lng}&radius=${radius}&type=${type}`);
  if (!response.ok) {
    const message = `An error has occurred: ${response.status}`;
    console.log(await response.json()); // Log the response from the server
    throw new Error(message);
  }
  return await response.json();
}
//ai gen stop


 
  
  const ActComponent = ({ lat, lng }) => {
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [nearbyPlaces, setNearbyPlaces] = useState([]);
    const [radius, setRadius] = useState(50); // initial value
    const [type, setType] = useState('restaurant'); // initial value

    //ai gen start (chat gpt 3.5, 2)
    useEffect(() => {
      console.log('Fetching nearby places for lat:', lat, 'lng:', lng); // Add this line
      async function fetchNearbyPlaces() {
        try {
          const response = await getNearbyPlaces(lat, lng, radius, type);
          console.log('Response:', response);
          if (Array.isArray(response)) {
            setNearbyPlaces(response);
          } else {
            console.error('Unexpected response format:', response);
          }
        } catch (error) {
          console.error('Error fetching nearby places:', error);
        }
      }

      fetchNearbyPlaces();
    }, [lat, lng]);
    //ai gen stop

    function handlePlaceClick(place) {
      setSelectedPlace(place);
    }
  
    function handleClose() {
      setSelectedPlace(null);
    }

    return (
      <div className="map-container">
        {(
          <div className="side-menu">
            {nearbyPlaces && nearbyPlaces.map((place, index) => (
              <div key={index} className="place" onClick={() => handlePlaceClick(place)}>
                <h3>{place.name}</h3>
                <p>{place.vicinity}</p>
                {place.photoReference && (
                  <img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photoReference}&key=${apiKey}`} alt={place.name} />
                )}
                <StarRatings
                  rating={place.rating}
                  starRatedColor="gold"
                  numberOfStars={5}
                  name='rating'
                  starDimension="20px"
                />
                <p>Price Level: {place.priceLevel}</p>
              </div>
            ))}
          </div>
        )}
        {selectedPlace && (
        <div className="popup">
          <button onClick={handleClose}>Close</button>
          <h2>{selectedPlace.name}</h2>
          <p>{selectedPlace.vicinity}</p>
          {selectedPlace.photoReference && (
            <img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${selectedPlace.photoReference}&key=${apiKey}`} alt={selectedPlace.name} />
          )}
          <p>Rating: {selectedPlace.rating}</p>
          <p>Price Level: {selectedPlace.priceLevel}</p>
        </div>
      )}
      </div>
    );
  };
  
  export default ActComponent;
