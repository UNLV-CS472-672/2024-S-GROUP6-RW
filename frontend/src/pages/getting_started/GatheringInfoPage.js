import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import "../../css/GatheringInfo.css";
import DatePickerComponent from "../../components/ItineraryForm/DatePickerComponent";
import SearchBar from "../../components/GatheringInfo/SearchBar";
import PrefButtons from "../../components/PrefSelect/PrefButtons";

function GatheringInfoPage() {
  const [activeScreen, setActiveScreen] = useState('screen1');

  const goToScreen2 = () => setActiveScreen('screen2');
  const goToScreen3 = () => setActiveScreen('screen3');

  return (
    <>
      <div className="whole-page">
        <div className={`screen ${activeScreen === 'screen1' ? 'slide-in' : 'slide-out'}`}>
          <div className="form-half">
            <h1 className="header-1">Let's plan your next trip together</h1>
            <h3> Where would you like to go? </h3>
            <SearchBar />
            <button className="next-button"
              onClick={goToScreen2}>
                Next
            </button>
          </div>
          <div className="destination-half">
            <h3 className="header-2"> Popular Destinations </h3>
            
            <div className="image-grid">
              <div className="image-item">
                <img src="seoul.jpg" />
              </div>
              <div className="image-item">
                <img src="tokyo.jpg" />
              </div>
              <div className="image-item">
                <img src="mchouse.jpg" />
              </div>
              <div className="image-item">
                <img src="paris.jpg" />
              </div>
              <div className="image-item">
                <img src="Japan.jpg" />
              </div>
            </div>
          </div>
        </div>
        <div className={`screen ${activeScreen === 'screen2' ? 'slide-in' : 'slide-out'}`}>
          <DatePickerComponent />
            <button className="start-button"
              onClick={goToScreen3}
              variant='contained'
              >
                Next
            </button>

        </div>
        <div className={`screen ${activeScreen === 'screen3' ? 'slide-in' : 'slide-out'}`}>
          <div className="third-section">
          <h2 className="header-4"> What are your group preferences? </h2>
            <PrefButtons/>
          </div>
        </div>
      </div>
    </>
  );
}

export default GatheringInfoPage;
