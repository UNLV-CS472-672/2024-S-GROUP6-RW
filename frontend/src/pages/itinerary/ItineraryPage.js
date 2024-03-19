import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DatePickerComponent from "../../components/ItineraryForm/DatePickerComponent";
import ItineraryAccordion from "../../components/ItineraryForm/ItineraryAccordion";

const possibleActivities = [
  "Explore the city",
  "Visit a museum",
  "Dinner at a local restaurant",
  "City park exploration",
  "Relax at the beach",
  "Sunset Cruise",
  // Add more activities as needed
];

const getRandomActivity = () => {
  const randomIndex = Math.floor(Math.random() * possibleActivities.length);
  return possibleActivities[randomIndex];
};

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
      generateRandomItinerary(numberOfDays);
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

  const generateRandomItinerary = (numberOfDays) => {
    setItinerary(
      Array.from({ length: numberOfDays }, () => ({
        activities: Array.from({ length: 3 }, () => getRandomActivity()), // Adjust the number of activities as needed
      }))
    );
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

  const handleEditActivity = (day, activityIndex) => {
    // Implement your logic for editing an activity here
    // For simplicity, let's just add a placeholder logic
    const updatedActivity = prompt(
      "Edit activity:",
      itinerary[day - 1].activities[activityIndex]
    );
    if (updatedActivity) {
      setItinerary((prevItinerary) => {
        const updatedItinerary = [...prevItinerary];
        updatedItinerary[day - 1].activities[activityIndex] = updatedActivity;
        return updatedItinerary;
      });
    }
  };

  const handleRemoveActivity = (day, activityIndex) => {
    // Implement your logic for removing an activity here
    setItinerary((prevItinerary) => {
      const updatedItinerary = [...prevItinerary];
      updatedItinerary[day - 1].activities.splice(activityIndex, 1);
      return updatedItinerary;
    });
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
              // ... (Other props)
            />
          ))}
          <Button onClick={handleAddDay}>Add Another Day</Button>
        </>
      )}
    </div>
  );
};

export default ItineraryPage;
