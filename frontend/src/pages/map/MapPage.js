import React from 'react';
import { useLocation } from 'react-router-dom';
import GoogleMapBlock from "../../components/GoogleMapBlock/GoogleMapBlock";
import ActComponent from '../../components/Activities/Activities';
import '../../css/MapPageTemp.css'; // Import the CSS file

function MapPageTemp() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  let lat = parseFloat(params.get('lat'));
  let lng = parseFloat(params.get('lng'));

  // Check if lat and lng are valid numbers
  if (isNaN(lat) || isNaN(lng)) {
    lat=36.1173;
    lng=-115.1761;
  }

  return (
    <div className="map-container" data-testid="map-block">
      <GoogleMapBlock
        height="100vh"
        width="100vw"
        markerCoordinatesArray={[{ lat, lng }]} // Use the lat and lng from URL as marker coordinate
      />
      <div className="side-menu-container">
        <ActComponent lat={lat} lng={lng} />
      </div>
    </div>
  );
}

export default MapPageTemp;