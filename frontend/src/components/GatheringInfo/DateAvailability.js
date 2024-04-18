import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";

const localizer = momentLocalizer(moment);

const DateAvailability = () => {
  const [events, setEvents] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [usedColors, setUsedColors] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDateEvents, setSelectedDateEvents] = useState([]);

  // Define color palette
  const colorPalette = [
    "#007bff", // Blue
    "#6610f2", // Purple
    "#6f42c1", // Indigo
    "#e83e8c", // Pink
    "#dc3545", // Red
    "#fd7e14", // Orange
    "#ffc107", // Yellow
    "#28a745", // Green
    "#20c997", // Teal
    "#17a2b8", // Cyan
  ];

  // Handle submit event
  const handleSubmit = () => {
    // Handle form validation
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
    setSubmitted(true);
  };

  // Handle edit event
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

  // Handle delete event
  const handleDeleteEvent = () => {
    const updatedEvents = events.filter((event) => event !== selectedEvent);
    setEvents(updatedEvents);
    setEditDialogOpen(false); // Close the edit dialog after deletion
  };

  // Handle event click
  const handleEventClick = (event) => {
    setSelectedEvent(event); // Set selected event
    setEditDialogOpen(true); // Open edit dialog
  };

  // Handle click on "x more" text
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
          value={startDate}
          min={moment().format("YYYY-MM-DD")}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
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

  // Customize event styles
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

  // Customize the rendering of the day slot with "x more" text
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

  // Get potential travel dates
  const potentialTravelDates = getPotentialTravelDates();

  return (
    <div>
      <div>
        <input
          type="date"
          value={startDate}
          min={moment().format("YYYY-MM-DD")}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          value={endDate}
          min={startDate ? startDate : moment().format("YYYY-MM-DD")}
          onChange={(e) => setEndDate(e.target.value)}
        />

        <input
          type="text"
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
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
      {editDialog}
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
      <h2>Potential Travel Dates:</h2>
      <ul>
        {potentialTravelDates.map((date, index) => (
          <li key={index}>{date}</li>
        ))}
      </ul>
    </div>
  );
};

export default DateAvailability;
