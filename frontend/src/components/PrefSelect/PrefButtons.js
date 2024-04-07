import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/PrefButtons.css';


const PrefButtons = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const categories = ['Beaches', 'Theme Parks', 'Shopping', 'Shows', 'Museums', 'Thrilling', 'Nightlife', 'Nature', 'Art & Culture', 'Tourist Attractions', 'Food'];
  const navigate = useNavigate();

  const toggleCategory = (category) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((item) => item !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const handleNotSure = () => {
    setSelectedCategories([]);
    console.log("User is not sure.");
    navigate('/map');
  };

  const handleSubmit = () => {
    console.log("Selected Categories:", selectedCategories);
    navigate('/map');
  };

  return (
    <div className="buttonContainer">
      <div className="categoriesContainer">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => toggleCategory(category)}
            className={`categoryButton ${selectedCategories.includes(category) ? 'selected' : ''}`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="notSureAndSubmitContainer">
        <button onClick={handleNotSure} className="notSureButton">I'm not sure</button>
      </div>
      <button onClick={handleSubmit} className="submitButton">Submit</button>
    </div>
  );
};

export default PrefButtons;
