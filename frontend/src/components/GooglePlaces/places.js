import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const libraries = ["places"];

function Map({ userPreference }) {
  const [map, setMap] = useState(null);
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const request = {
      query: userPreference,
      fields: ['name', 'geometry'],
    };

    const service = new window.google.maps.places.PlacesService(map);
    service.findPlaceFromQuery(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setPlaces(results);
      }
    });
    setMap(map);
  }, [userPreference])

  return (
    <div>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY} libraries={libraries}>
        <GoogleMap
          id="map"
          mapContainerStyle={{ height: "800px", width: "1000px" }}
          center={{ lat: -33.867, lng: 151.195 }}
          zoom={15}
          onLoad={onLoad}
        >
          {places.map((place, i) => (
            <Marker key={i} position={place.geometry.location} onClick={() => setSelectedPlace(place)} />
          ))}
          {selectedPlace && (
            <InfoWindow position={selectedPlace.geometry.location} onCloseClick={() => setSelectedPlace(null)}>
              <div>{selectedPlace.name}</div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default Map;