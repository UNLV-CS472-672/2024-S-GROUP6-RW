// 2024-S-GROUP6-RW\frontend\src\components\ItineraryForm\DatePickerComponent.js

import React, { useState,useEffect } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs'; 
import "../../css/DatePicker.css"
import { saveToLocal } from '../../utils/LocalStorageManager';

const DatePickerComponent = ({ startDateKey, endDateKey }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const navigate = useNavigate();

  // Generate today's date using dayjs
  const today = dayjs().startOf('day'); // Removes the time part to start from 00:00 today

  //For onclick start date
  const handleStartDateChange = (date) => {
    setStartDate(date);
    //localStorage.setItem('startDate', date?.toISOString());
    saveToLocal('startDate', date?.toISOString());
    console.log(startDate);
  };

  //For onclick end date
  const handleEndDateChange = (date) => {
    setEndDate(date);
    //localStorage.setItem('endDate', date?.toISOString());
    saveToLocal('endDate', date?.toISOString());
  };

  
  const handleComplete = () => {
    if (startDate && endDate && startDate <= endDate) {
      navigate('/prefselection');
    }
  };



  // Effect to save start date to local storage
  useEffect(() => {
    if (startDate && startDateKey) {
      saveToLocal(startDateKey, startDate);
      console.log(startDate)
    }
  }, [startDate, startDateKey]);

  // Effect to save end date to local storage
  useEffect(() => {
    if (endDate && endDateKey) {
      saveToLocal(endDateKey, endDate);
    }
  }, [endDate, endDateKey]);
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

export default DatePickerComponent;
