const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

app.get('/nearbyPlaces', async (req, res) => {
    console.log('Received request for /nearbyPlaces'); // Log when a request is received
  
    const { location, radius, type } = req.query;
    const [lat, lng] = location.split(',');
  
    console.log('Request parameters:', { lat, lng, radius, type }); // Log the request parameters
  
    const apiKey = 'AIzaSyCOhJAyiZTOhX4qQDYicsGHDXWxbsZyZKs';
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${type}&key=${apiKey}`;
  
    try {
      const response = await axios.get(url);
      console.log('Google Places API response:', response.data); // Log the response data
      res.json(response.data.results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  });

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));