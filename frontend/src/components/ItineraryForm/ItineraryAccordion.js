import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Activity from "./Activity";
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import IconButton from "@mui/material/IconButton";
import SwapVertIcon from '@mui/icons-material/SwapVert';

const ItineraryAccordion = ({
  key,
  day,
  events,
  onClickEditButton
  // onAddActivity,
  // onEditActivity,
  // onRemoveActivity,
}) => {
  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const [newActivity, setNewActivity] = useState("");

  const handleAddClick = () => {
    setAddDialogOpen(true);
  };

  // const handleConfirmAdd = () => {
  //   if (newActivity) {
  //     // Generate a unique ID for the new activity
  //     const id = (Math.random() * 1000000).toFixed(0);
  
  //     // Create a new activity object
  //     const newActivityObj = { id: id, title: newActivity, location: "", date: "", time: "", description: "", photo: "" };
  
  //     // Update the activity list state with the new activity added
  //     setActivities((prevActivities) => [...prevActivities, newActivityObj]);
  
  //     // Clear the input field
  //     setNewActivity("");
  //   }
  // };

  const handleCancelAdd = () => {
    setAddDialogOpen(false);
  };

  /*Delete Function BUT I will implement this later*/
  // const handleDelete = (id) => {
  //   // Filter out the activity with the given id
  //   const updatedActivities = activities.filter(activity => activity.id !== id);
  //   // Update the list of activities
  //   setActivities(updatedActivities);
  // };

  return (
    <Accordion>
      <AccordionSummary>
        <Typography>{day}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Timeline>
          {events.map((event, index) => (
            <TimelineItem key={event.id}>
              <TimelineOppositeContent>
                {event.start.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot />
                {index !== events.length - 1 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent>
                <Activity
                  activity={event}
                  //onDelete={handleDelete}
                  key={event.id}
                />
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
        <IconButton
          aria-label="close"
          onClick={onClickEditButton}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <SwapVertIcon /> 
        </IconButton>
        <Button onClick={handleAddClick}>Add Activity</Button>

        {/* Add Activity Dialog */}
        <Dialog open={isAddDialogOpen} onClose={handleCancelAdd}>
          <DialogTitle>Add New Activity</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter the details for the new activity:
            </DialogContentText>
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
            <Button color="primary"> {/* Add Add Functionality */}
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </AccordionDetails>
    </Accordion>
  );
};

export default ItineraryAccordion;
