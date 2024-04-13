import React, { useState, useEffect } from "react";
import ItineraryAccordion from "../../components/ItineraryForm/ItineraryAccordion"; // Importing the ItineraryAccordion component
import { format } from "date-fns"; // Importing the format function from date-fns library
import { getFromLocal } from "../../utils/LocalStorageManager";

 
const ItineraryPage = () => {

  const [itinerary, setItinerary] = useState([]);
  const [selectedStartDate, setSelectedStartDate] = useState(null);

  useEffect(() => {
    //const startDateFromStorage = localStorage.getItem('startDate');
    const startDate = getFromLocal('startDate');

    if (startDate) {
      const start = new Date(startDate);
      if (start.toString() !== "Invalid Date") {
        setSelectedStartDate(start);
        generateItinerary(start);
      } else {
        console.error("Invalid start date from storage");
      }
    }
  }, []);

  const generateItinerary = (startDate) => {
    //const endDateFromStorage = localStorage.getItem('endDate');
    const endDate = getFromLocal('endDate');

    if (endDate) {
      const end = new Date(endDate);
      if (startDate && end.toString() !== "Invalid Date") {
        const tripLength = calculateNumberOfDays(startDate, end);
        const newItinerary = Array.from({ length: tripLength }, (_, index) => ({
          day: format(new Date(startDate.getTime() + index * 86400000), "EEEE, MMMM dd, yyyy")
        }));
        setItinerary(newItinerary);
      }
    }
  };

  const calculateNumberOfDays = (startDate, endDate) => {
    return Math.round(Math.abs((startDate - endDate) / 86400000)) + 1;
  };

/*
  const handleAddDay = () => {
    setItinerary(prevItinerary => {
      const newDay = new Date(startDate.getTime() + prevItinerary.length * 86400000);
      return [...prevItinerary, { day: format(newDay, "EEEE, MMMM dd, yyyy") }];
    });
  }; */

  return (
    <div>

      {itinerary.map((day, index) => (
        <ItineraryAccordion key={index} day={day.day} />
      ))}
      {/*<button onClick={handleAddDay}>Add Another Day</button>*/}

    </div>
  );
};

export default ItineraryPage;
