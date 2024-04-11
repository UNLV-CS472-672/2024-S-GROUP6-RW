import React, { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs'; 
import "../../css/DatePicker.css"

const ItineraryDatePickerComponent = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const navigate = useNavigate();

  // Generate today's date using dayjs
  const today = dayjs().startOf('day'); // Removes the time part to start from 00:00 today

  //For onclick start date
  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  //For onclick end date
  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const calculateNumberOfDays = (startDate, endDate) => {
    const oneDay = 24 * 60 * 60 * 1000;
    return Math.round(Math.abs((startDate - endDate) / oneDay)) + 1;
  };

  const isDateSelectionComplete = startDate && endDate && startDate <= endDate;

  const handleComplete = () => {
    if (isDateSelectionComplete) {
      localStorage.setItem('startDate', startDate?.toISOString());
      localStorage.setItem('endDate', endDate?.toISOString());
      navigate('/prefselection');
    }
  };


  const triplength = calculateNumberOfDays();

  const handleIdk = () => {
    console.log("User is not sure.");
    navigate('/map');
  };

  return (
    <div className="itinerary-date-picker-container">

      <p className="header-3"> Select the dates of your trip </p>

      <LocalizationProvider dateAdapter={AdapterDayjs}>

      <div className="date-picker-container">
        <DatePicker
          label="Start Date"
          value={startDate}
          onChange={handleStartDateChange}
          renderInput={(params) => <TextField {...params} />}
          minDate={today}
        />

        <DatePicker
          label="End Date"
          value={endDate}
          onChange={handleEndDateChange}
          renderInput={(params) => <TextField {...params} />}
          minDate={startDate || today}
        />
      </div>

      </LocalizationProvider>
      
      <button onClick={handleIdk} className="idkButton">Not sure yet? Create a poll!</button>
      
    </div>
  );
};

export default ItineraryDatePickerComponent;
