import React, { useState, useEffect, useCallback } from 'react';
import './SearchBar.css';
import { debounce } from 'lodash'; // Import debounce from lodash

function SearchBar() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const debouncedFetchCities = useCallback(debounce((cityName) => {
    if (!cityName) return; // Exit early if cityName is empty

    const url = `https://api.api-ninjas.com/v1/city?name=${cityName}&limit=5`;
    fetch(url, {
      method: 'GET',
      headers: {
        'X-Api-Key': 'oUKbIX8gOqX6mdF1EOZ6fQ==vWsvuUWsuV8ZbfQ5',
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) throw new Error('Error with network response');
      return response.json();
    })
    .then(data => {
      const cityNames = data.map(city => city.name);
      setSuggestions(cityNames);
    })
    .catch(error => console.error('Error:', error));
  }, 500), []); // Dependencies array is empty, meaning the function is created only once

  const handleChange = (event) => {
    const cityName = event.target.value;
    setQuery(cityName);
    debouncedFetchCities(cityName); // Call the debounced function here
  };

  const handleSuggestionClick = (cityName) => {
    setQuery(cityName);
    setSuggestions([]);
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
