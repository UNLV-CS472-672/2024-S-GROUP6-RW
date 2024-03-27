import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // Example array of cities. You might fetch this list from an API.
  const cities = ['New York', 'Los Angeles', 'Chicago', 'Chimom', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'];

  const handleChange = (event) => {
    const value = event.target.value;
    setQuery(value);

    // Filter cities based on the input value
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, 'i');
      setSuggestions(cities.sort().filter(v => regex.test(v)));
    } else {
      setSuggestions([]);
    }

    console.log(`Search query: ${value}`);
  };

  const handleSuggestionClick = (value) => {
    setQuery(value);
    setSuggestions([]);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search here..."
        className="search-input" // Applying the CSS class
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
