// 2024-S-GROUP6-RW\frontend\src\components\GatheringInfo\SearchBar.js

import React, { useState, useEffect } from 'react';
import './SearchBar.css';

function SearchBar() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      if (!query) {
        setSuggestions([]);
        return;
      }

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const cityNames = data.map((item) => item.display_name);
        setSuggestions(cityNames);
      } catch (error) {
        console.error('Error:', error);
        // Handle fetch error
      }
    };

    const debounceTimeout = setTimeout(fetchCities, 500);

    return () => clearTimeout(debounceTimeout);
  }, [query]);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSuggestionClick = async (cityName) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cityName)}&limit=1`
      );
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      const { lat, lon } = data[0];
  
      // Redirect to the map page with the selected location's coordinates however this will no longer allow people to sit at the previous page
      window.location.href = `http://localhost:3000/map?lat=${lat}&lng=${lon}`;
    } catch (error) {
      console.error('Error:', error);
      // Handle fetch error
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Enter destination.."
        className="search-input"
        value={query}
        onChange={handleChange}
      />
      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;

