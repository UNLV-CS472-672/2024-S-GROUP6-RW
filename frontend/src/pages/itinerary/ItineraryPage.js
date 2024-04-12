import React, { useState } from "react";
import ActivityList from "../../components/ItineraryForm/ActivityList";
import ItineraryAccordion from "../../components/ItineraryForm/ItineraryAccordion"; // Importing the ItineraryAccordion component
import EditView from "../../components/ItineraryForm/EditView";
import { format } from "date-fns"; // Importing the format function from date-fns library

// Functional component for the ItineraryPage
const ItineraryPage = () => {
  // State variables using useState hook
  const [currentCity] = useState("N/A"); // Current city, set to "Your City"
  const [itinerary, setItinerary] = useState([]); // Itinerary array state
  const [selectedStartDate, setSelectedStartDate] = useState(null); // Selected start date
  const [showEditScreen, setShowEditScreen] = useState(false);

  const handleShowEditScreen = () => {
    setShowEditScreen(true); // Show Edit View when button is clicked
  };

  const handleCloseEditScreen = () => {
    setShowEditScreen(false); // Show Edit View when button is clicked
  };

  // Event handler for selecting start date
  const handleStartDateSelect = (date) => {
    if (date instanceof Date) {
      setSelectedStartDate(date);
    } else {
      setSelectedStartDate(new Date(date));
    }
  };

  // Event handler for adding a new day to the itinerary
  const handleAddDay = () => {
    setItinerary((prevItinerary) => {
      const startDate = selectedStartDate || new Date(); // Use selectedStartDate if available, otherwise use current date
      const newDay = new Date(
        startDate.getTime() + prevItinerary.length * 24 * 60 * 60 * 1000
      );
      return [
        ...prevItinerary,
        {
          //activities: [],
          day: format(newDay, "EEEE, MMMM dd, yyyy"), // Convert newDay to a string representation
        },
      ];
    });
  };

  // JSX rendering
  return (
    <div>
      <div>
        {showEditScreen ? (
          <EditView 
            onClickCloseButton={handleCloseEditScreen}
          />
        ) : (
          <>
            <h1>Itinerary</h1>
            <h2>Current City: {currentCity}</h2>
            {itinerary.map((day, index) => (
              <ItineraryAccordion
                key={index}
                day={day.day}
                events={ActivityList}
                onClickEditButton={handleShowEditScreen}
              />
            ))}
            <button onClick={handleAddDay}>Add Another Day</button>
          </>
        )}
      </div>
    </div>
  );
};

export default ItineraryPage; // Exporting the ItineraryPage component
