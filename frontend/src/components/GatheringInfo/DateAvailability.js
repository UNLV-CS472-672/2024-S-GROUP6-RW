import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const DateAvailability = () => {
  const [events, setEvents] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [stayDuration, setStayDuration] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleStayDurationChange = (event) => {
    setStayDuration(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = () => {
    if (!startDate || !stayDuration || !name) {
      // Handle invalid input
      return;
    }

    const start = moment(startDate).toDate();
    const end = moment(start).add(Number(stayDuration), "days").toDate();
    let color = "#" + Math.floor(Math.random() * 16777215).toString(16); // Generate random color
    const existingEvent = events.find((event) => event.title === name);
    if (existingEvent) {
      color = existingEvent.color; // Use the same color as the existing event with the same name
    }
    const daysInRange = [];
    let currentDate = moment(start);
    while (currentDate <= moment(end)) {
      daysInRange.push(moment(currentDate).toDate());
      currentDate = moment(currentDate).add(1, "days");
    }
    const newEvents = [
      ...events,
      {
        title: name,
        start: start,
        end: end,
        color: color,
        daysInRange: daysInRange,
      },
    ];
    setEvents(newEvents);
    setSubmitted(true);
    // Clear input fields after submission
    setStartDate("");
    setStayDuration("");
    setName("");
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    let style = {
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

  const DayCell = ({ children, day }) => {
    const event = events.find((event) => {
      return (
        moment(day).isSameOrAfter(event.start) &&
        moment(day).isSameOrBefore(event.end)
      );
    });

    if (event) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
            backgroundColor: event.color,
            opacity: 0.3,
            borderRadius: "50%",
          }}
        >
          {children}
        </div>
      );
    }
    return children;
  };

  return (
    <div>
      <div>
        <input type="date" value={startDate} onChange={handleStartDateChange} />
        <input
          type="number"
          value={stayDuration}
          placeholder="Stay Duration (in days)"
          onChange={handleStayDurationChange}
        />
        <input
          type="text"
          value={name}
          placeholder="Name"
          onChange={handleNameChange}
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
            eventPropGetter={eventStyleGetter}
            dayPropGetter={() => ({ style: { height: "50px" } })}
            components={{
              dayWrapper: DayCell,
            }}
            style={{ margin: "50px" }}
          />
        </div>
      )}
    </div>
  );
};

export default DateAvailability;
