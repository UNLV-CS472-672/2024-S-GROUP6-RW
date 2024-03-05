import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import DatePickerComponent from '../../components/ItineraryForm/DatePickerComponent'; // Import your DatePickerComponent


const ActivityAccordion = ({ activity, onEdit, onRemove }) => {
  const [isConfirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const handleRemoveClick = () => {
    setConfirmDialogOpen(true);
  };

  const handleConfirmRemove = () => {
    setConfirmDialogOpen(false);
    onRemove();
  };

  const handleCancelRemove = () => {
    setConfirmDialogOpen(false);
  };

  return (
    <Accordion>
      <AccordionSummary>
        <Typography>{activity}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div>
          <Button onClick={onEdit}>Edit</Button>
          <Button onClick={handleRemoveClick}>Remove</Button>
        </div>

        {/* Remove Confirmation Dialog */}
        <Dialog open={isConfirmDialogOpen} onClose={handleCancelRemove}>
          <DialogTitle>Confirm Removal</DialogTitle>
          <DialogContent>
            <DialogContentText>Are you sure you want to remove this activity?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelRemove} color="primary">
              Cancel
            </Button>
            <Button onClick={handleConfirmRemove} color="primary">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </AccordionDetails>
    </Accordion>
  );
};

const ItineraryAccordion = ({ day, activities, onAddActivity, onEditActivity, onRemoveActivity }) => {
  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const [newActivity, setNewActivity] = useState('');

  const handleAddClick = () => {
    setAddDialogOpen(true);
  };

  const handleConfirmAdd = () => {
    setAddDialogOpen(false);
    if (newActivity) {
      onAddActivity(day, newActivity);
      setNewActivity('');
    }
  };

  const handleCancelAdd = () => {
    setAddDialogOpen(false);
  };

  return (
    <Accordion>
      <AccordionSummary>
        <Typography>Day {day}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div>
          <ul>
            {activities.map((activity, index) => (
              <li key={index}>
                <ActivityAccordion
                  activity={activity}
                  onEdit={() => onEditActivity(day, index)}
                  onRemove={() => onRemoveActivity(day, index)}
                />
              </li>
            ))}
          </ul>
          <Button onClick={handleAddClick}>Add Activity</Button>

          {/* Add Activity Dialog */}
          <Dialog open={isAddDialogOpen} onClose={handleCancelAdd}>
            <DialogTitle>Add New Activity</DialogTitle>
            <DialogContent>
              <DialogContentText>Enter the details for the new activity:</DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="activity"
                label="Activity"
                type="text"
                fullWidth
                value={newActivity}
                onChange={(e) => setNewActivity(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCancelAdd} color="primary">
                Cancel
              </Button>
              <Button onClick={handleConfirmAdd} color="primary">
                Add
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

const possibleActivities = [
  'Explore the city',
  'Visit a museum',
  'Dinner at a local restaurant',
  'City park exploration',
  'Relax at the beach',
  'Sunset Cruise',
  // Add more activities as needed
];

const getRandomActivity = () => {
  const randomIndex = Math.floor(Math.random() * possibleActivities.length);
  return possibleActivities[randomIndex];
};

const ItineraryPage = () => {
  const [currentCity] = useState('Your City');
  const [itinerary, setItinerary] = useState([]);
  const [currentStep, setCurrentStep] = useState('datePicker');

  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const handleStartDateSelect = (date) => {
    setSelectedStartDate(date);
  };

  const handleEndDateSelect = (date) => {
    setSelectedEndDate(date);
  };

  const handleDateSelectionComplete = () => {
    const numberOfDays = calculateNumberOfDays(selectedStartDate, selectedEndDate);

    if (numberOfDays > 0) {
      generateRandomItinerary(numberOfDays);
      setCurrentStep('itinerary');
    } else {
      // Handle invalid date range
      alert('Please select a valid date range.');
    }
  };

  const calculateNumberOfDays = (startDate, endDate) => {
    const oneDay = 24 * 60 * 60 * 1000;
    return Math.round(Math.abs((startDate - endDate) / oneDay)) + 1;
  };

  const generateRandomItinerary = (numberOfDays) => {
    setItinerary(Array.from({ length: numberOfDays }, () => ({
      activities: Array.from({ length: 3 }, () => getRandomActivity()), // Adjust the number of activities as needed
    })));
  };

  const generateItinerary = (numberOfDays) => {
    setItinerary(Array.from({ length: numberOfDays }, (_, index) => ({
      activities: [],
    })));
  };

  const handleAddActivity = (day, newActivity) => {
    setItinerary((prevItinerary) => {
      const updatedItinerary = [...prevItinerary];
      updatedItinerary[day - 1].activities.push(newActivity);
      return updatedItinerary;
    });
  };

  const handleAddDay = () => {
    setItinerary((prevItinerary) => [
      ...prevItinerary,
      {
        activities: [],
      },
    ]);
  };

  const handleEditActivity = (day, activityIndex) => {
    // Implement your logic for editing an activity here
    // For simplicity, let's just add a placeholder logic
    const updatedActivity = prompt('Edit activity:', itinerary[day - 1].activities[activityIndex]);
    if (updatedActivity) {
      setItinerary((prevItinerary) => {
        const updatedItinerary = [...prevItinerary];
        updatedItinerary[day - 1].activities[activityIndex] = updatedActivity;
        return updatedItinerary;
      });
    }
  };

  const handleRemoveActivity = (day, activityIndex) => {
    // Implement your logic for removing an activity here
    setItinerary((prevItinerary) => {
      const updatedItinerary = [...prevItinerary];
      updatedItinerary[day - 1].activities.splice(activityIndex, 1);
      return updatedItinerary;
    });
  };

  return (
    <div>
      <h1>Itinerary</h1>
      <h2>Current City: {currentCity}</h2>

      {currentStep === 'datePicker' && (
        <DatePickerComponent
          onSelectStartDate={handleStartDateSelect}
          onSelectEndDate={handleEndDateSelect}
          onDateSelectionComplete={handleDateSelectionComplete}
        />
      )}

      {currentStep === 'itinerary' && (
        <>
          {itinerary.map((day, index) => (
            <ItineraryAccordion
              key={index}
              day={index + 1}
              activities={day.activities}
              onAddActivity={handleAddActivity}
              // ... (Other props)
            />
          ))}
          <Button onClick={handleAddDay}>Add Another Day</Button>
        </>
      )}
    </div>
  );
};

export default ItineraryPage;
