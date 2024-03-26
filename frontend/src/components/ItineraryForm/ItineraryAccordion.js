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
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { DndContext, KeyboardSensor, PointerSensor, TouchSensor, closestCorners, useSensor, useSensors } from "@dnd-kit/core";

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
    time: "10:00 AM - 4:00 PM",
    description: "Take a walking tour around the city center to explore landmarks and attractions.",
    photo: "city.jpg"
  },
  {
    id: "2", 
    title: "Visit a museum", 
    location: "Local Museum", 
    date: "2024-03-26", 
    time: "1:00 PM - 3:00 PM",
    description: "Discover the rich history and art of the region at the local museum.",
    photo: "museum.jpg"
  },
  {
    id: "3",
    title: "Dinner at a local restaurant",
    location: "Restaurant XYZ",
    date: "2024-03-25",
    time: "19:00",
    description: "Enjoy a delicious dinner at a popular local restaurant.",
    photo: "https://example.com/restaurant-photo.jpg",
  },
  {
    id: "4",
    title: "City park exploration",
    location: "City Park",
    date: "2024-03-26",
    time: "10:00",
    description: "Explore the beautiful City Park and enjoy nature.",
    photo: "https://example.com/park-photo.jpg",
  },
  {
    id: "5",
    title: "Relax at the beach",
    location: "Beach Resort",
    date: "2024-03-27",
    time: "14:00",
    description: "Spend a relaxing day at the beach and soak up the sun.",
    photo: "https://example.com/beach-photo.jpg",
  },
  {
    id: "6",
    title: "Sunset Cruise",
    location: "Harbor",
    date: "2024-03-28",
    time: "17:30",
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

  /*FOR DRAGGABLE COMPONENTS*/ 
  const getActivityPos = id => activities.findIndex(activities => activities.id === id)

  const handleDragEnd = (event) => {
    const { active, over } = event; //active: element being dragged, over: element being replaced

    if (active.id === over.id) return;

    setActivities(activities => {
      const originalPos = getActivityPos(active.id);
      const newPos = getActivityPos(over.id);

      return arrayMove(activities, originalPos, newPos);
    })
  };

  //For mobile or keyboard compatibility
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <Accordion>
      <AccordionSummary>
        <Typography>{day}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div>
          <ul>
            <DndContext sensors={sensors} onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
              <SortableContext
                items={activities}
                strategy={verticalListSortingStrategy}
              >
                {activities.map((activity) => (
                  <Activity
                    activity={activity}
                    onDelete={handleDelete}
                    key={activity.id} // Required for dnd-kit
                    // onEdit={() => onEditActivity(day, index)}
                    // onRemove={() => onRemoveActivity(day, index)}
                  />
                ))}
              </SortableContext>
            </DndContext>
          </ul>
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
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default ItineraryAccordion;
