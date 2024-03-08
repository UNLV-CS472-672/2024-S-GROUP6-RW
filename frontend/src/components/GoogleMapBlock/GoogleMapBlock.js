import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

function GoogleMapBlock({ width = '400px', height = '400px', lat = 39.50, lng = -98.7129, markerCoordinatesArray }) {
  const containerStyle = {
    width: width,
    height: height
  };

  const center = {
    lat: lat,
    lng: lng
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
  });

  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [infoWindows, setInfoWindows] = useState([]);

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();

    if (markerCoordinatesArray && markerCoordinatesArray.length > 0) {
      // Create markers and infoWindows dynamically based on the provided array
      const newMarkers = markerCoordinatesArray.map((markerData, index) => {
        const marker = new window.google.maps.Marker({
          position: markerData,
          map: map,
          title: `Marker ${index + 1}`
        });

        bounds.extend(markerData);  // Extend bounds for each marker

        // Create an InfoWindow for each marker with custom message
        const infoWindow = new window.google.maps.InfoWindow({
          content: `<div>${markerData.message}</div>`,
        });

        // Attach the click event to each marker
        window.google.maps.event.addListener(marker, 'click', () => {
          // Close all other infoWindows before opening the current one
          infoWindows.forEach((iw) => iw.close());
          infoWindow.open(map, marker);
        });

        setInfoWindows((prevInfoWindows) => [...prevInfoWindows, infoWindow]);

        return marker;
      });

      setMarkers(newMarkers);
    }

    map.fitBounds(bounds);  // Fit the map to the bounds after adding all markers
    setMap(map);
  }, [center, markerCoordinatesArray, infoWindows]);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
    if (infoWindows) {
      infoWindows.forEach((iw) => iw.close());
    }
    setMarkers([]);
    setInfoWindows([]);
  }, [infoWindows]);

  useEffect(() => {
    if (map && markers.length > 0) {
      // Update the bounds when markers are added dynamically
      const bounds = new window.google.maps.LatLngBounds();
      markers.forEach((marker) => bounds.extend(marker.getPosition()));
      map.fitBounds(bounds);
    }
  }, [map, markers]);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={3}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
    </GoogleMap>
  ) : <></>;
}

export default React.memo(GoogleMapBlock);






