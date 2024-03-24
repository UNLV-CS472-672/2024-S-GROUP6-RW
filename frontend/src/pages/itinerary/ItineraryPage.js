import React, { useState } from "react";
import DatePickerComponent from "../../components/ItineraryForm/DatePickerComponent";
import ItineraryAccordion from "../../components/ItineraryForm/ItineraryAccordion";

const ItineraryPage = () => {
  const [currentCity] = useState("Your City");
  const [itinerary, setItinerary] = useState([]);
  const [currentStep, setCurrentStep] = useState("datePicker");

  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const handleStartDateSelect = (date) => {
    setSelectedStartDate(date);
  };

  const handleEndDateSelect = (date) => {
    setSelectedEndDate(date);
  };

  const handleDateSelectionComplete = () => {
    const numberOfDays = calculateNumberOfDays(
      selectedStartDate,
      selectedEndDate
    );

    if (numberOfDays > 0) {
      generateItinerary(numberOfDays);
      setCurrentStep("itinerary");
    } else {
      // Handle invalid date range
      alert("Please select a valid date range.");
    }
  };

  const calculateNumberOfDays = (startDate, endDate) => {
    const oneDay = 24 * 60 * 60 * 1000;
    return Math.round(Math.abs((startDate - endDate) / oneDay)) + 1;
  };

  const generateItinerary = (numberOfDays) => {
    setItinerary(
      Array.from({ length: numberOfDays }, (_, index) => ({
        activities: [],
      }))
    );
  };

  const handleAddActivity = (day, newActivity) => {
    setItinerary((prevItinerary) => {
      const updatedItinerary = [...prevItinerary];
      updatedItinerary[day - 1].activities.push(newActivity);
      return updatedItinerary;
    });
  };

  const handleAddDay = () => {
    setItinerary((prevItinerary) => [
      ...prevItinerary,
      {
        activities: [],
      },
    ]);
  };

  return (
    <div>
      <h1>Itinerary</h1>
      <h2>Current City: {currentCity}</h2>

      {currentStep === "datePicker" && (
        <DatePickerComponent
          onSelectStartDate={handleStartDateSelect}
          onSelectEndDate={handleEndDateSelect}
          onDateSelectionComplete={handleDateSelectionComplete}
        />
      )}

      {currentStep === "itinerary" && (
        <>
          {itinerary.map((day, index) => (
            <ItineraryAccordion
              key={index}
              day={index + 1}
              activities={day.activities}
              onAddActivity={handleAddActivity}
              // You can pass other necessary props here
            />
          ))}
          <button onClick={handleAddDay}>Add Another Day</button>
        </>
      )}
    </div>
  );
};

export default ItineraryPage;