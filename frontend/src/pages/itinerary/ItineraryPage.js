import React, { useState, useEffect } from "react";
import ItineraryAccordion from "../../components/ItineraryForm/ItineraryAccordion"; // Importing the ItineraryAccordion component
import CalendarView from "../../components/ItineraryForm/CalendarView";
import "../../css/ItineraryPage.css";
import { format } from "date-fns"; // Importing the format function from date-fns library
import { getFromLocal } from "../../utils/LocalStorageManager";

import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import { Typography } from "@mui/material";

const ItineraryPage = () => {
  // State variables using useState hook
  const [currentCity] = useState("N/A"); // Current city, set to "Your City"
  const [itinerary, setItinerary] = useState([]); // Itinerary array state
  const [selectedStartDate, setSelectedStartDate] = useState(null); // Selected start date
  const [selectedItinDay, setSelectedItinDay] = useState(null); // Maintains which itinerary clicked the edit button
  const [showCalendarView, setShowCalendarView] = useState(false);
  const [userActivities, setUserActivities] = useState([]);

  const handleShowCalendarView = (day) => {
    setShowCalendarView(true); // Show Calendar View when button is clicked
    setSelectedItinDay(day);
  };

  const handleCloseCalendarView = () => {
    setShowCalendarView(false); // Show Edit View when button is clicked
  };

  useEffect(() => {
    //const startDateFromStorage = localStorage.getItem('startDate');
    const startDate = getFromLocal("startDate");

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
    const endDate = getFromLocal("endDate");

    if (endDate) {
      const end = new Date(endDate);
      if (startDate && end.toString() !== "Invalid Date") {
        const tripLength = calculateNumberOfDays(startDate, end);
        const newItinerary = Array.from({ length: tripLength }, (_, index) =>
          new Date(startDate.getTime() + index * 86400000).toDateString()
        );
        setItinerary(newItinerary);
      }
    }
  };

  const calculateNumberOfDays = (startDate, endDate) => {
    return Math.round(Math.abs((startDate - endDate) / 86400000)) + 1;
  };

  const handleAddDay = () => {
    setItinerary((prevItinerary) => {
      const newDay = new Date(
        selectedStartDate.getTime() + prevItinerary.length * 86400000
      );
      return [...prevItinerary, newDay.toDateString()];
    });
  };
  //day: format(newDay, "EEEE, MMMM dd, yyyy"), // Convert newDay to a string representation

  const handleUpdateActivities = (updatedActivities) => {
    setUserActivities(updatedActivities);
  };

  // JSX rendering
  return (
    <div>
      <div>
        {showCalendarView ? (
          <CalendarView
            day={selectedItinDay}
            userActivities={userActivities}
            onUpdatedActivities={handleUpdateActivities}
            onClickCloseButton={handleCloseCalendarView}
          />
        ) : (
          <>
            <Typography className="itinerary-title">Itinerary</Typography>
            {itinerary.map((day, index) => (
              <ItineraryAccordion
                key={index}
                day={day}
                dayNum={index + 1}
                events={userActivities}
                onClickEditButton={() => handleShowCalendarView(day)}
              />
            ))}
            <IconButton className="calendar-close-btn" onClick={handleAddDay}>
              <AddIcon
                shapeRendering="crispEdges"
                sx={{ color: "black", fontSize: 32 }}
              />
            </IconButton>
          </>
        )}
      </div>
    </div>
  );
};

export default ItineraryPage; // Exporting the ItineraryPage component
