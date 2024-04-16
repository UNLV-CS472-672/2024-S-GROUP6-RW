import React from 'react';
import { useLocation } from 'react-router-dom';
import GoogleMapBlock from "../../components/GoogleMapBlock/GoogleMapBlock";

function MapPageTemp() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const lat = parseFloat(params.get('lat'));
  const lng = parseFloat(params.get('lng'));

  // Check if lat and lng are valid numbers
  if (isNaN(lat) || isNaN(lng)) {
    return <div>Invalid coordinates provided in the URL</div>;
  }

  return (
    <div className="map-container">
      <GoogleMapBlock
        height="100vh"
        width="100vw"
        markerCoordinatesArray={[{ lat, lng }]} // Use the lat and lng from URL as marker coordinate
      />
    </div>
  );
}

export default MapPageTemp;
