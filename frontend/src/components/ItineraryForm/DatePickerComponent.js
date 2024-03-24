import React, { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

const ItineraryDatePickerComponent = ({ onSelectStartDate, onSelectEndDate, onDateSelectionComplete }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (date) => {
    setStartDate(date);
    onSelectStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    onSelectEndDate(date);
  };

  const isDateSelectionComplete = startDate && endDate;

  const handleComplete = () => {
    if (isDateSelectionComplete) {
      onDateSelectionComplete();
    }
  }

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
          onClick={() => {handleComplete()}}
          variant='contained'
          disabled={!isDateSelectionComplete}
        >Start</Button>
      </LocalizationProvider>
    </div>
  );
};

export default ItineraryDatePickerComponent;