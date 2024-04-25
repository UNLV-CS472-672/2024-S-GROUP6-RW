import React, { useState, useCallback, useEffect } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import ActComponent from '../../components/Activities/Activities';
import '../../css/MapPageTemp.css'; // Import the CSS file

// GoogleMapBlock component to render a Google Map
function GoogleMapBlock({
  width = "400px",
  height = "400px",
  lat = 39.5,
  lng = -98.7129,
  markerCoordinatesArray,
  start,
  destination,
}) {
  // Styles and initial center position for the map
  const containerStyle = {
    width: width,
    height: height,
  };

  const center = {
    lat: lat,
    lng: lng,
  };

  // Load the Google Maps JavaScript API
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
  });

  // State variables
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [infoWindows, setInfoWindows] = useState([]);
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);

  // Function to handle map load
  const onLoad = useCallback(
    function callback(map) {
      const bounds = new window.google.maps.LatLngBounds();

      // Add markers to the map
      if (markerCoordinatesArray && markerCoordinatesArray.length > 0) {
        const newMarkers = markerCoordinatesArray.map((markerData, index) => {
          const marker = new window.google.maps.Marker({
            position: markerData,
            map: map,
            title: `Marker ${index + 1}`,
          });

          // Extend bounds to fit all markers
          bounds.extend(markerData);

          // Create info window for each marker
          const infoWindow = new window.google.maps.InfoWindow({
            content: `<div>${markerData.message}</div>`,
          });

          // Event listener to open info window on marker click
          window.google.maps.event.addListener(marker, "click", () => {
            infoWindows.forEach((iw) => iw.close());
            infoWindow.open(map, marker);
          });

          setInfoWindows((prevInfoWindows) => [...prevInfoWindows, infoWindow]);

          return marker;
        });

        setMarkers(newMarkers);
      }

      // Fit map bounds to show all markers
      map.fitBounds(bounds);
      setMap(map);
      setDirectionsService(new window.google.maps.DirectionsService());
      setDirectionsRenderer(
        new window.google.maps.DirectionsRenderer({ map: map })
      );
    },
    [markerCoordinatesArray, infoWindows]
  );

  // Function to handle map unmount
  const onUnmount = useCallback(
    function callback(map) {
      setMap(null);
      if (infoWindows) {
        infoWindows.forEach((iw) => iw.close());
      }
      setMarkers([]);
      setInfoWindows([]);
      setDirectionsService(null);
      setDirectionsRenderer(null);
    },
    [infoWindows]
  );

  // Effect to fit map bounds when markers change
  useEffect(() => {
    if (map && markers.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      markers.forEach((marker) => bounds.extend(marker.getPosition()));
      map.fitBounds(bounds);
    }
  }, [map, markers]);

  // Function to create and render route between start and destination
  const createRoute = () => {
    if (directionsService && directionsRenderer) {
      const request = {
        origin: start,
        destination: destination,
        travelMode: "DRIVING",
      };

      directionsService.route(request, (result, status) => {
        if (status === "OK") {
          directionsRenderer.setDirections(result);
        } else {
          console.error("Directions request failed due to " + status);
        }
      });
    }
  };

  // Effect to create and render route when map, directions service, or renderer change
  useEffect(() => {
    if (map && directionsService && directionsRenderer) {
      createRoute();
    }
  }, [map, directionsService, directionsRenderer]);

  // Render GoogleMap component if loaded
  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={3}
      onLoad={onLoad}
      onUnmount={onUnmount}
      className="google-map"
    >
      {/* Child components, such as markers, info windows, etc. */}
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(GoogleMapBlock);

