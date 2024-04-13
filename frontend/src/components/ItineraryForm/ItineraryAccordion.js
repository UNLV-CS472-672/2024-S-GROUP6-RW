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

const ItineraryAccordion = ({
  key,
  day,
  //activities,
  // onAddActivity,
  // onEditActivity,
  // onRemoveActivity,
}) => {
  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const [newActivity, setNewActivity] = useState("");
  const [activities, setActivities] = useState([  //Preset itineraries
  {
    id: "1", 
    title: "Explore the city", 
    location: "City Center", 
    date: "2024-03-25", 
    time: "10:00 AM",
    description: "Take a walking tour around the city center to explore landmarks and attractions.",
    photo: "city.jpg"
  },
  {
    id: "2", 
    title: "Visit a museum", 
    location: "Local Museum", 
    date: "2024-03-26", 
    time: "1:00 PM",
    description: "Discover the rich history and art of the region at the local museum.",
    photo: "museum.jpg"
  },
  {
    id: "3",
    title: "Dinner at a local restaurant",
    location: "Restaurant XYZ",
    date: "2024-03-25",
    time: "7:00 PM",
    description: "Enjoy a delicious dinner at a popular local restaurant.",
    photo: "https://example.com/restaurant-photo.jpg",
  },
  {
    id: "4",
    title: "City park exploration",
    location: "City Park",
    date: "2024-03-26",
    time: "9:00 PM",
    description: "Explore the beautiful City Park and enjoy nature.",
    photo: "https://example.com/park-photo.jpg",
  },
  {
    id: "5",
    title: "Relax at the beach",
    location: "Beach Resort",
    date: "2024-03-27",
    time: "10:00 PM",
    description: "Spend a relaxing day at the beach and soak up the sun.",
    photo: "https://example.com/beach-photo.jpg",
  },
  {
    id: "6",
    title: "Sunset Cruise",
    location: "Harbor",
    date: "2024-03-28",
    time: "11:00 PM",
    description: "Experience a breathtaking sunset cruise along the coast.",
    photo: "https://example.com/cruise-photo.jpg",
  },
  ]);

  const handleAddClick = () => {
    setAddDialogOpen(true);
  };

  const handleConfirmAdd = () => {
    if (newActivity) {
      // Generate a unique ID for the new activity
      const id = (Math.random() * 1000000).toFixed(0);
  
      // Create a new activity object
      const newActivityObj = { id: id, title: newActivity, location: "", date: "", time: "", description: "", photo: "" };
  
      // Update the activity list state with the new activity added
      setActivities((prevActivities) => [...prevActivities, newActivityObj]);
  
      // Clear the input field
      setNewActivity("");
    }
  };

  const handleCancelAdd = () => {
    setAddDialogOpen(false);
  };

  const handleDelete = (id) => {
    // Filter out the activity with the given id
    const updatedActivities = activities.filter(activity => activity.id !== id);
    // Update the list of activities
    setActivities(updatedActivities);
  };

  return (
    <Accordion>
      <AccordionSummary>
        <Typography>{day}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Timeline>
          {activities.map((activity, index) => (
            <TimelineItem key={activity.id}>
              <TimelineOppositeContent>
                {activity.time}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot />
                {index !== activities.length - 1 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent>
                <Activity
                  activity={activity}
                  onDelete={handleDelete}
                  key={activity.id}
                />
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
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
            <Button onClick={handleConfirmAdd} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </AccordionDetails>
    </Accordion>
  );
};

export default ItineraryAccordion;
