import React, { useState } from 'react';
import './SearchBar.css'; 

function SearchBar() {
  const [query, setQuery] = useState('');

  const handleChange = (event) => {
    setQuery(event.target.value);
    console.log(`Search query: ${event.target.value}`);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search here..."
        className="search-input" // Applying the CSS class
        value={query}
        onChange={handleChange}
      />
    </div>
  );
}

export default SearchBar;
