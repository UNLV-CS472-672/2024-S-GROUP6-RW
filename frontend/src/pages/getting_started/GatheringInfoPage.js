import React, { useState } from "react";
import GatheringInfo from "../../components/GatheringInfo/GatheringInfo";
import DatePickerComponent from "../../components/ItineraryForm/DatePickerComponent"; // Importing the DatePickerComponent
import {calculateNumberOfDays, generateItinerary} from "../itinerary/ItineraryPage";
import SearchBar from "../../components/GatheringInfo/SearchBar";

function GatheringInfoPage() {
    /*/const [currentCity] = useState("Your City"); // Current city, set to "Your City"
    //const [itinerary, setItinerary] = useState([]); // Itinerary array state
    const [currentStep, setCurrentStep] = useState("datePicker"); // Current step in the itinerary process
    const [selectedStartDate, setSelectedStartDate] = useState(null); // Selected start date
    const [selectedEndDate, setSelectedEndDate] = useState(null); // Selected end date
    
    // Event handler for selecting start date
    const handleStartDateSelect = (date) => {
        if (date instanceof Date) {
            setSelectedStartDate(date);
        } else {
            setSelectedStartDate(new Date(date));
        }
    };
    
      // Event handler for selecting end date
    const handleEndDateSelect = (date) => {
      if (date instanceof Date) {
        setSelectedEndDate(date);
      } else {
        setSelectedEndDate(new Date(date));
      }
    };
    
      // Event handler for completing date selection
    const handleDateSelectionComplete = () => {
      if (selectedStartDate && selectedEndDate) {
        const numberOfDays = calculateNumberOfDays(
          selectedStartDate,
          selectedEndDate
        );
    
        if (numberOfDays > 0) {
          generateItinerary(numberOfDays);
          setCurrentStep("itinerary");
        } else {
          alert("Please select a valid date range.");
        }
      }
    };
  */


    return (
    <>
        <h2>Plan your trip</h2>
        <SearchBar />
    </>
  );
};

export default GatheringInfoPage;
