import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import "../../css/GatheringInfo.css";
import DatePickerComponent from "../../components/ItineraryForm/DatePickerComponent";
import SearchBar from "../../components/GatheringInfo/SearchBar";

function GatheringInfoPage() {
  return (
    <>
      <div className="whole-page">
        <div className="form-half">
          <h3 className="header-1">Plan your trip</h3>
          <h3> Where would you like to go? </h3>
          <SearchBar />
          <h3> Select the dates of your trip </h3>
          <DatePickerComponent />
        </div>
        <div className="other-half">
          <h3 className="header-2"> Popular Destinations </h3>
          <div className="App">
            <div className="image-grid">
              <div className="image-item">
                <img src="seoul.jpg" alt="Description 1" />
              </div>
              <div className="image-item">
                <img src="tokyo.jpg" alt="Description 2" />
              </div>
              <div className="image-item">
                <img src="mchouse.jpg" alt="Description 3" />
              </div>
              <div className="image-item">
                <img src="paris.jpg" alt="Description 4" />
              </div>
              <div className="image-item">
                <img src="Japan.jpg" alt="Description 5" />
              </div>
          </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GatheringInfoPage;
