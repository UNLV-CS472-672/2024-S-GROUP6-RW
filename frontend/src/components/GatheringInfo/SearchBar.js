import React, { useState } from 'react';
import './SearchBar.css';
import { debounce } from 'lodash'; // Import debounce from lodash

function SearchBar() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // Debounce function to limit API calls
  /*const debouncedFetchCities = debounce((cityName) => {
    if (cityName.length > 0) {
      // Replace 'https://api.example.com/cities' with your actual API endpoint
      fetch(`https://api.example.com/cities?search=${cityName}`)
        .then(response => response.json())
        .then(data => {
          // Assume the API returns an array of city names
          setSuggestions(data);
        })
        .catch(error => console.error('Error fetching cities:', error));
    } else {
      setSuggestions([]);
    }
  }, 300); // 300 ms delay

 */
  const handleChange = (event) => {
    const cityName = event.target.value;
    setQuery(cityName);
  
    if (cityName.length > 0) {
      
      const url = `https://api.api-ninjas.com/v1/city?name=${cityName}`;

      fetch(url, {
        method: 'GET', // The HTTP method for the request
        headers: {
          'X-Api-Key': 'oUKbIX8gOqX6mdF1EOZ6fQ==vWsvuUWsuV8ZbfQ5', // Your API key
          'Content-Type': 'application/json' // The type of content being sent
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the JSON of the response
      })
      .then(data => {
        // Extract just the city names for the suggestions
        const cityNames = data.map(city => city.name);
        setSuggestions(cityNames);
      })      
      .catch(error => {
        console.error('Error:', error); // Log any errors
      });

        
    } else {
      setSuggestions([]);
    }
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
