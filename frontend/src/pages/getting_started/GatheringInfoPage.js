import React, { useState } from "react";
import DatePickerComponent from "../../components/ItineraryForm/DatePickerComponent"; 
import SearchBar from "../../components/GatheringInfo/SearchBar";

function GatheringInfoPage() {

    return (
    <>
        <h2>Plan your trip</h2>
        <h3> Where would you like to go? </h3>
        <SearchBar />
        <h3> Select the dates of your trip </h3>
        <DatePickerComponent />
      
    </>
  );
};

export default GatheringInfoPage;
