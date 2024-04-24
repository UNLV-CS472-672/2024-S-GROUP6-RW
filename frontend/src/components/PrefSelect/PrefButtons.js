// // 2024-S-GROUP6-RW\frontend\src\components\PrefSelect\PrefButtons.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/PrefButtons.css';
import SignInPopUp from '../GatheringInfo/SignInPopUp';
import { saveToLocal, getFromLocal } from '../../utils/LocalStorageManager';
import { useAuth } from '../../auth/AuthContext';
import { CreateTrip } from '../../utils/ApiManager';

const PrefButtons = () => {
  // State to control the visibility of the SignInPopUp
  const [showSignInPopUp, setShowSignInPopUp] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const categories = ['Beaches', 'Theme Parks', 'Shopping', 'Shows', 'Museums', 'Thrilling', 'Nightlife', 'Nature', 'Art & Culture', 'Tourist Attractions', 'Food'];
  const navigate = useNavigate();
  const { isAuth } = useAuth();

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


    // Retrieve the location name from local storage
    const fullLocationName = getFromLocal('LocationName');
    if (fullLocationName) {

      // Split the location name at the comma and take the first part. Example: Las Vegas from Las Vegas, Nevada, United States
      const locationName = fullLocationName.split(',')[0];

    // Save the first part of the location name as the trip title
    saveToLocal("tripTitle",`Trip To ${locationName}`);
  } else {
    console.log("No location name found in local storage.");
  }
    if(!isAuth){
      setShowSignInPopUp(true);
    }else{
      CreateTrip();

      navigate('/my-trips');
    }
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
