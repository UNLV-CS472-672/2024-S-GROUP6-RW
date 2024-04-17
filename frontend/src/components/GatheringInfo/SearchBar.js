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

  const handleSuggestionClick = (cityName) => {
    setQuery(cityName);
    setSuggestions([]); // Clear suggestions
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

