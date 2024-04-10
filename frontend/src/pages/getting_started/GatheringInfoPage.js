// 2024-S-GROUP6-RW\frontend\src\pages\getting_started\GatheringInfoPage.js

import React, { useState } from "react";
import DatePickerComponent from "../../components/ItineraryForm/DatePickerComponent"; 
import SearchBar from "../../components/GatheringInfo/SearchBar";

function GatheringInfoPage() {

    // the keys for local storage
    const searchStorageKey = 'LocationName';
    const startDateStorageKey = 'startDate';
    const endDateStorageKey = 'endDate';

    return (
    <>
        <h2>Plan your trip</h2>
        <h3> Where would you like to go? </h3>
        <SearchBar storageKey={searchStorageKey} />
        <h3> Select the dates of your trip </h3>
        <DatePickerComponent 
            startDateKey={startDateStorageKey} 
            endDateKey={endDateStorageKey} 
        />
      
    </>
  );
};

export default GatheringInfoPage;
