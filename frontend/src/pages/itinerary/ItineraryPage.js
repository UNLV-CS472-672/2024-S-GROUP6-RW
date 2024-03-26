import React, { useState } from "react";
import DatePickerComponent from "../../components/ItineraryForm/DatePickerComponent"; // Importing the DatePickerComponent
import ItineraryAccordion from "../../components/ItineraryForm/ItineraryAccordion"; // Importing the ItineraryAccordion component
import { format } from "date-fns"; // Importing the format function from date-fns library

// Functional component for the ItineraryPage
const ItineraryPage = () => {
  // State variables using useState hook
  const [currentCity] = useState("Your City"); // Current city, set to "Your City"
  const [itinerary, setItinerary] = useState([]); // Itinerary array state
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

  // Function to calculate the number of days between two dates
  const calculateNumberOfDays = (startDate, endDate) => {
    const oneDay = 24 * 60 * 60 * 1000;
    return Math.round(Math.abs((startDate - endDate) / oneDay)) + 1;
  };
  

  // Function to generate itinerary based on the number of days
  const generateItinerary = (numberOfDays) => {
    const newItinerary = Array.from({ length: numberOfDays }, (_, index) => ({
      activities: [],
      day: format(
        new Date(selectedStartDate.getTime() + index * 24 * 60 * 60 * 1000),
        "EEEE, MMMM dd, yyyy"
      ),
    }));
    setItinerary(newItinerary);
  };

  // Event handler for adding an activity to a specific day
  const handleAddActivity = (dayIndex, newActivity) => {
    setItinerary((prevItinerary) => {
      const updatedItinerary = [...prevItinerary];
      updatedItinerary[dayIndex].activities.push(newActivity);
      return updatedItinerary;
    });
  };

  // Event handler for adding a new day to the itinerary
  const handleAddDay = () => {
    setItinerary((prevItinerary) => {
      const startDate = selectedStartDate || new Date(); // Use selectedStartDate if available, otherwise use current date
      const newDay = new Date(startDate.getTime() + prevItinerary.length * 24 * 60 * 60 * 1000);
      return [
        ...prevItinerary,
        {
          activities: [],
          day: format(newDay, "EEEE, MMMM dd, yyyy"), // Convert newDay to a string representation
        },
      ];
    });
  };
  
  // JSX rendering
  return (
    <div>
      <h1>Itinerary</h1>
      <h2>Current City: {currentCity}</h2>

      {/* Render DatePickerComponent if currentStep is 'datePicker' */}
      {currentStep === "datePicker" && (
        <DatePickerComponent
          onSelectStartDate={handleStartDateSelect}
          onSelectEndDate={handleEndDateSelect}
          onDateSelectionComplete={handleDateSelectionComplete}
        />
      )}

      {/* Render ItineraryAccordion components for each day in the itinerary */}
      {currentStep === "itinerary" && (
        <>
          {itinerary.map((day, index) => (
            <ItineraryAccordion
              key={index}
              day={day.day}
              activities={day.activities}
              onAddActivity={(newActivity) =>
                handleAddActivity(index, newActivity)
              }
            />
          ))}
          <button onClick={handleAddDay}>Add Another Day</button>
        </>
      )}
    </div>
  );
};


export default ItineraryPage; // Exporting the ItineraryPage component