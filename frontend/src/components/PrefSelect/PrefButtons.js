// // 2024-S-GROUP6-RW\frontend\src\components\PrefSelect\PrefButtons.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/PrefButtons.css';
import SignInPopUp from '../GatheringInfo/SignInPopUp';

const PrefButtons = () => {
  // State to control the visibility of the SignInPopUp
  const [showSignInPopUp, setShowSignInPopUp] = useState(false);
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
    console.log("onComplete called");
    setShowSignInPopUp(true);
};

  return (
    <div className="buttonContainer">
      <SignInPopUp open={showSignInPopUp} handleClose={() => setShowSignInPopUp(false)} />
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