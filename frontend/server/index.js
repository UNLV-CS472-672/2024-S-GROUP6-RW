const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();
const fetch = require('node-fetch');

const app = express();
app.use(cors());

app.get('/nearbyPlaces', async (req, res) => {
  const { lat, lng, radius, type } = req.query;
  const apiKey = 'AIzaSyCOhJAyiZTOhX4qQDYicsGHDXWxbsZyZKs' // Get API key from environment variables

  try {
    const response = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${type}&key=${apiKey}`);
    const data = await response.json();

    const places = data.results.map(place => {
      const photoReference = place.photos && place.photos.length > 0 ? place.photos[0].photo_reference : null;
      return {
        name: place.name,
        address: place.vicinity,
        photoReference,
      };
    });
    console.log(places);
    res.json(places);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching nearby places' });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));