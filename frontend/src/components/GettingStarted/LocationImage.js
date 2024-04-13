import React from "react";
import { Link } from "react-router-dom";

function ImageWithLocation({ image }) {
  const { lat, lng, message } = image;

  return (
    <Link
      to={`/maptemp?lat=${lat}&lng=${lng}`}
    >
      <div className="image-wrapper">
        <img src={image.src} alt={image.name} style={{ width: "400px", height: "400px" }} />
        <div className="image-name">{message}</div>
      </div>
    </Link>
  );
}

export default ImageWithLocation;
