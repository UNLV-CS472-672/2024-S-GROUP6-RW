import React, { useState, useEffect } from 'react';
import './SearchBar.css';
import { saveToLocal } from '../../utils/LocalStorageManager';


// SearchBar component for user input and suggestions
function SearchBar({ LocationNameKey, LocationCoordinatesKey }) {

  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // Effect to fetch cities based on user input
  useEffect(() => {
    const fetchCities = async () => {
      if (!query) {
        setSuggestions([]);
        return;
      }
      
      try {
        // Fetch city suggestions from Nominatim API
        // ai-gen start (ChatGPT-3.5, 0)
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const cityDetails = data.map((item) => ({
          name: item.display_name,
          lat: item.lat,
          lon: item.lon
        }));
        setSuggestions(cityDetails);
      } catch (error) {
        console.error('Error:', error);
        // Handle fetch error
      }
      // ai-gen end
    };

    // Debounce the fetch to avoid rapid API calls
    const debounceTimeout = setTimeout(fetchCities, 500);

    // Clean up debounce timer
    return () => clearTimeout(debounceTimeout);
  }, [query]);

  // Handler for input change
  const handleChange = (event) => {
    setQuery(event.target.value);
  };


  const handleSuggestionClick = ({ name, lat, lon }) => {
    setQuery(name);
    setSuggestions([]); // Clear suggestions
    saveToLocal(LocationNameKey, name);
    saveToLocal(LocationCoordinatesKey, { lat, lon });

  };

  // Render the SearchBar component
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Enter destination.."
        className="search-input"
        value={query}
        onChange={handleChange}
      />
      {/* Render suggestions if available */}
      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;


