const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();
const fetch = require('node-fetch');

const app = express();
app.use(cors());

app.get('/nearbyPlaces', async (req, res) => {
  const { lat, lng, radius, type } = req.query;
  const apiKey = process.env.REACT_APP_GOOGLE_PLACES_API_KEY; 
// Get API key from environment variables

//ai gen start (chat gpt 3.5, 1)
  try {
    const response = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${type}&key=${apiKey}`);
    const data = await response.json();

    const places = data.results.map(place => {
      const photoReference = place.photos && place.photos.length > 0 ? place.photos[0].photo_reference : null;
      return {
        name: place.name,
        address: place.vicinity,
        photoReference,
        rating: place.rating, // Add this line
        priceLevel: place.price_level, // Add this line
        lat: place.geometry.location.lat,

        lng: place.geometry.location.lng, 
      };
    });
    //ai gen stop
    
    console.log(places);
    res.json(places);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching nearby places' });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));