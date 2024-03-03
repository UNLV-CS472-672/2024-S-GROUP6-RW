import React from "react";
import GoogleMapBlock from "../../components/GoogleMapBlock/GoogleMapBlock";

function MapPage() {
  return <div>
  <h2>Map Page</h2>
  <GoogleMapBlock
  onLoad={map => {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
  }}
  onUnmount={_map => {
    // do your stuff before map is unmounted
  }}
/> 
</div>
}

export default MapPage;
