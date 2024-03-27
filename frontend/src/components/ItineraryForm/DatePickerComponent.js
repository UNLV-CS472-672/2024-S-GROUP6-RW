import React, { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

  const ItineraryDatePickerComponent = ({ onSelectStartDate, onSelectEndDate, onDateSelectionComplete }) => {
  const [itinerary, setItinerary] = useState([]); // Itinerary array state
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedStartDate, setSelectedStartDate] = useState(null); // Selected start date
  const [selectedEndDate, setSelectedEndDate] = useState(null); // Selected end date
  const navigate = useNavigate();
  
  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  //Complete only if start date and end date is selected AND the end date is later or on that date of the start date.
  const isDateSelectionComplete = startDate && endDate && startDate <= endDate; 

  const handleStartDateSelect = (date) => {
    if (date instanceof Date) {
      setSelectedStartDate(date);
    } else {
      setSelectedStartDate(new Date(date));
    }
  };

  // Event handler for selecting end date
  const handleEndDateSelect = (date) => {
    if (date instanceof Date) {
      setSelectedEndDate(date);
    } else {
      setSelectedEndDate(new Date(date));
    }
  };

  const handleComplete = () => {
    if (isDateSelectionComplete) {
      //THIS SHOULD BE WHERE THE DATES GET SENT TO DATABASE
      navigate('/map');
    }
  }


  // Event handler for completing date selection
  const handleDateSelectionComplete = () => {
    if (selectedStartDate && selectedEndDate) {
      const numberOfDays = calculateNumberOfDays(
        selectedStartDate,
        selectedEndDate
      );

      if (numberOfDays < 0) {
        alert("Please select a valid date range.");
      }
    }
  };

  // Function to calculate the number of days between two dates
  const calculateNumberOfDays = (startDate, endDate) => {
    const oneDay = 24 * 60 * 60 * 1000;
    return Math.round(Math.abs((startDate - endDate) / oneDay)) + 1;
  };

  
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Start Date"
          value={startDate}
          onChange={handleStartDateChange}
          renderInput={(params) => <TextField {...params} />}
        />

        <DatePicker
          label="End Date"
          value={endDate}
          onChange={handleEndDateChange}
          renderInput={(params) => <TextField {...params} />}
        />
        <Button
          onClick={handleComplete}
          variant='contained'
          disabled={!isDateSelectionComplete}
        >Start</Button>
      </LocalizationProvider>

 
    </div>
  );
};

export default ItineraryDatePickerComponent;