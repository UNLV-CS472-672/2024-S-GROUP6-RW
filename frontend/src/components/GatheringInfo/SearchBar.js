import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // array of cities that will be an API call later
  const cities = ['Los Angeles, California, USA', 'Chicago, Illinois, USA', 'Chitest', 'Chianothertest', 'Houston, Texas, USA', 'Phoenix, Arizona, USA', 'Philadelphia, Pennsylvania, USA', 'San Antonio, Texas, USA', 'San Diego, California, USA', 'San Jose, California, USA'];

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
