import React, { useState } from "react";
import DatePickerComponent from "../../components/ItineraryForm/DatePickerComponent"; // Importing the DatePickerComponent
import ItineraryAccordion from "../../components/ItineraryForm/ItineraryAccordion"; // Importing the ItineraryAccordion component
import { format } from "date-fns"; // Importing the format function from date-fns library
import { useEffect } from 'react';

// Functional component for the ItineraryPage
const ItineraryPage = () => {
  // State variables using useState hook
  const [itinerary, setItinerary] = useState([]); // Itinerary array state
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  useEffect(() => {
    // Read the dates from local storage when the component mounts
    const startDateFromStorage = localStorage.getItem('startDate');
    const endDateFromStorage = localStorage.getItem('endDate');

    if (startDateFromStorage && endDateFromStorage) {
      const start = new Date(startDateFromStorage);
      const end = new Date(endDateFromStorage);
      setSelectedStartDate(start);
      setSelectedEndDate(end);

      const tripLength = calculateNumberOfDays(start, end);
      generateItinerary(tripLength);
    }
  }, []);


  // Function to calculate the number of days between two dates
  const calculateNumberOfDays = (startDate, endDate) => {
    const oneDay = 24 * 60 * 60 * 1000;
    return Math.round(Math.abs((startDate - endDate) / oneDay)) + 1;
  };
  

  // Function to generate itinerary based on the number of days
  const generateItinerary = (numberOfDays) => {
    const newItinerary = Array.from({ length: numberOfDays }, (_, index) => ({
      //activities: [],
      day: format(
        new Date(selectedStartDate.getTime() + index * 24 * 60 * 60 * 1000),
        "EEEE, MMMM dd, yyyy"
      ),
    }));
    setItinerary(newItinerary);
  };


  // Event handler for adding a new day to the itinerary
  const handleAddDay = () => {
    /*setItinerary((prevItinerary) => {
      const startDate = selectedStartDate || new Date(); // Use selectedStartDate if available, otherwise use current date
      const newDay = new Date(startDate.getTime() + prevItinerary.length * 24 * 60 * 60 * 1000);
      return [
        ...prevItinerary,
        {
          //activities: [],
          day: format(newDay, "EEEE, MMMM dd, yyyy"), // Convert newDay to a string representation
        },
      ];
    });*/
    setItinerary(prevItinerary => {
      const newDay = new Date(selectedStartDate.getTime() + prevItinerary.length * 24 * 60 * 60 * 1000);
      return [...prevItinerary, { day: format(newDay, "EEEE, MMMM dd, yyyy") }];
    });
  };
  
  // JSX rendering
  return (
    <div>

      {/* Render ItineraryAccordion components for each day in the itinerary */}
      
        <>
          {itinerary.map((day, index) => (
            <ItineraryAccordion
              key={index}
              day={day.day}
            />
          ))}
          <button onClick={handleAddDay}>Add Another Day</button>
        </>
      )
    </div>
  );
};


export default ItineraryPage; // Exporting the ItineraryPage component