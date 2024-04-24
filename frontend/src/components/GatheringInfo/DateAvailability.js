import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";

import "../../css/PollPage.css";
import "./DateAvailability.css";

/**
 * ChatGPT was used in order to assist the documenting of this component. The component was examined,
 * and ChatGPT was requested to comment sections of code extensively. This set a baseline
 * for me to read through the documentation and make adjustments whereever I felt it was necessary.
 * (ChatGPT-3.5, 2)
 */

// Initialize momentLocalizer for react-big-calendar
const localizer = momentLocalizer(moment);

/**
 * Component for managing date availability and events.
 * Allows users to input their availability, view events on a calendar, and edit/delete events.
 */
const DateAvailability = () => {
  // State variables for managing events, form input, and UI state
  const [events, setEvents] = useState([]); // Array of events
  const [startDate, setStartDate] = useState(""); // Start date input
  const [endDate, setEndDate] = useState(""); // End date input
  const [name, setName] = useState(""); // Name input
  const [submitted, setSubmitted] = useState(false); // Form submission flag
  const [usedColors, setUsedColors] = useState([]); // Array of used colors for events
  const [selectedEvent, setSelectedEvent] = useState(null); // Selected event for edit/delete
  const [editDialogOpen, setEditDialogOpen] = useState(false); // Edit dialog open/close flag
  const [selectedDate, setSelectedDate] = useState(null); // Selected date for displaying events
  const [selectedDateEvents, setSelectedDateEvents] = useState([]); // Events for the selected date

  // Define color palette for events
  // ChatGPT was used in order to recommend these hex codes

  // ai-gen start (ChatGPT-3.5, 1)
  const colorPalette = [
    "#007bff", // Blue
    "#e83e8c", // Pink
    "#dc3545", // Red
    "#fd7e14", // Orange
    "#ffc107", // Yellow
    "#28a745", // Green
    "#20c997", // Teal
    "#17a2b8", // Cyan
  ];
  // ai-gen end

  // Function to handle form submission
  const handleSubmit = () => {
    // Validate form inputs
    if (!startDate || !endDate || !name) {
      return;
    }

    // Convert dates to moment objects
    const start = moment(startDate).toDate();
    const end = moment(endDate).endOf("day").toDate(); // Set the end of the day

    // Ensure start and end dates are valid
    if (
      moment(start).isBefore(moment().startOf("day")) ||
      moment(end).isBefore(moment().startOf("day"))
    ) {
      return;
    }

    // Find color for the name or generate a new one
    // ChatGPT was used in order to assist with the creation of assigning unique colors

    // ai-gen start (ChatGPT-3.5, 1)
    let color = usedColors.find((entry) => entry.name === name)?.color;
    if (!color) {
      color = colorPalette.find(
        (color) => !usedColors.some((entry) => entry.color === color)
      );
      if (!color) {
        color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      }
      setUsedColors([...usedColors, { name, color }]); // Add new name-color pair to usedColors
    }
    // ai-gen end

    // Create new event object
    const newEvent = {
      title: name,
      start: start,
      end: end,
      color: color,
    };

    // Update events array
    setEvents([...events, newEvent]);

    // Clear form fields
    setStartDate("");
    setEndDate("");
    setName("");
    setSubmitted(true); // Set form submission flag
  };

  // Function to handle editing an event
  const handleEditSubmit = () => {
    // Ensure start and end dates are valid
    if (!startDate || !endDate) {
      return;
    }

    // Create updated event object
    const updatedEvent = {
      ...selectedEvent,
      start: moment(startDate).toDate(),
      end: moment(endDate).toDate(),
    };

    // Update events array
    const updatedEvents = events.map((event) =>
      event === selectedEvent ? updatedEvent : event
    );
    setEvents(updatedEvents);

    // Close edit dialog
    setEditDialogOpen(false);
  };

  // Function to handle deleting an event
  const handleDeleteEvent = () => {
    const updatedEvents = events.filter((event) => event !== selectedEvent);
    setEvents(updatedEvents);
    setEditDialogOpen(false); // Close the edit dialog after deletion
  };

  // Function to handle clicking on an event
  const handleEventClick = (event) => {
    setSelectedEvent(event); // Set selected event
    setEditDialogOpen(true); // Open edit dialog
  };

  // Function to handle clicking on "x more" text
  const handleMoreTextClick = (date) => {
    setSelectedDate(date);
    const eventsForSelectedDate = events.filter(
      (event) =>
        moment(event.start).isSameOrBefore(date) &&
        moment(event.end).isSameOrAfter(date)
    );
    setSelectedDateEvents(eventsForSelectedDate);
  };

  // JSX for edit dialog
  const editDialog = (
    <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
      <div>
        <h2>Edit Event</h2>
        <p>Name: {selectedEvent?.title}</p>
        <input
          type="date"
          data-testid="editStartDate"
          value={startDate}
          min={moment().format("YYYY-MM-DD")}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          data-testid="editEndDate"
          value={endDate}
          min={startDate || moment().format("YYYY-MM-DD")}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <Button onClick={handleEditSubmit} variant="contained" color="primary">
          Save
        </Button>
        <Button
          onClick={handleDeleteEvent}
          variant="contained"
          color="secondary"
        >
          Delete
        </Button>
      </div>
    </Dialog>
  );

  // Function to customize event styles
  // ChatGPT was used in order to assist with the CSS of this section
  // ai-gen start (ChatGPT-3.5, 0)
  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: event.color,
      borderRadius: "0px",
      opacity: 0.8,
      color: "black",
      border: "none",
    };
    return {
      style: style,
    };
  };
  // ai-gen end

  // Function to customize the rendering of the day slot with "x more" text
  const customDayPropGetter = (date) => {
    const eventsForDate = events.filter(
      (event) =>
        moment(event.start).isSameOrBefore(date) &&
        moment(event.end).isSameOrAfter(date)
    );
    if (eventsForDate.length > 2) {
      return {
        className: "has-more-events",
        onClick: () => handleMoreTextClick(date),
      };
    }
    return {};
  };

  // Function to calculate potential travel dates
  const getPotentialTravelDates = () => {
    const travelDates = [];

    // Loop through each day
    const startDate = moment(
      events.reduce(
        (min, event) => (event.start < min ? event.start : min),
        events[0]?.start
      )
    );
    const endDate = moment(
      events.reduce(
        (max, event) => (event.end > max ? event.end : max),
        events[0]?.end
      )
    );

    for (
      let date = startDate.clone();
      date.isBefore(endDate);
      date.add(1, "day")
    ) {
      const overlappingEvents = events.filter((event) =>
        moment(date).isBetween(
          moment(event.start),
          moment(event.end),
          null,
          "[]"
        )
      );

      if (
        overlappingEvents.length >= 2 &&
        moment(date).isSameOrAfter(startDate) &&
        moment(date).isSameOrBefore(endDate)
      ) {
        travelDates.push(date.format("MMMM D, YYYY"));
      }
    }

    return travelDates;
  };

  // Calculate potential travel dates
  const potentialTravelDates = getPotentialTravelDates();

  return (
    <div>
      {/* Form for inputting availability */}
      <div>
        <input
          type="date"
          data-testid="startDate"
          value={startDate}
          min={moment().format("YYYY-MM-DD")}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          data-testid="endDate"
          value={endDate}
          min={startDate ? startDate : moment().format("YYYY-MM-DD")}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <input
          type="text"
          data-testid="name"
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>

      {/* Display calendar after form submission */}
      {submitted && (
        <div style={{ height: "500px" }}>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            onSelectEvent={handleEventClick}
            style={{ margin: "50px" }}
            eventPropGetter={eventStyleGetter} // Apply custom event styles
            dayPropGetter={customDayPropGetter} // Customize the rendering of day slots
          />
        </div>
      )}

      {/* Display edit dialog */}
      {editDialog}

      {/* Display events for selected date */}
      {selectedDate && (
        <div>
          <h2>{moment(selectedDate).format("MMM D, YYYY")}</h2>
          <ul>
            {selectedDateEvents.map((event, index) => (
              <li key={index}>{event.title}</li>
            ))}
          </ul>
        </div>
      )}
{/* Display potential travel dates */}
      <p className="pot-header">Potential Travel Dates:</p>

      
  
      <ul>
        {potentialTravelDates.map((date, index) => (
          <li key={index}>{date}</li>
        ))}
      </ul>
    </div>
  );
};

export default DateAvailability;
