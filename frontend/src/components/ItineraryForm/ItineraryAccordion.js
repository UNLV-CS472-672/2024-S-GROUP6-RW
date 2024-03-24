// ItineraryAccordion.js

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
  activities,
  onAddActivity,
  onEditActivity,
  onRemoveActivity,
}) => {
  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const [newActivity, setNewActivity] = useState("");
  const [tasks, setTasks] = useState([  //Preset itineraries
    { id: "1", title: "Explore the city" },
    { id: "2", title: "Visit a museum" },
    { id: "3", title: "Dinner at a local restaurant" },
    { id: "4", title: "City park exploration" },
    { id: "5", title: "Relax at the beach" },
    { id: "6", title: "Sunset Cruise" },
  ]);

  const handleAddClick = () => {
    setAddDialogOpen(true);
  };

  const handleConfirmAdd = () => {
    if (newActivity) {
      // Generate a unique ID for the new activity
      const id = (Math.random() * 1000000).toFixed(0);
  
      // Create a new activity object
      const newTask = { id: id, title: newActivity };
  
      // Update the tasks state with the new activity added
      setTasks((prevTasks) => [...prevTasks, newTask]);
  
      // Clear the input field
      setNewActivity("");
    }
  };

  const handleCancelAdd = () => {
    setAddDialogOpen(false);
  };

  const getTaskPos = id => tasks.findIndex(task => task.id === id)

  const handleDragEnd = (event) => {
    const { active, over } = event; //active: element being dragged, over: element being replaced

    if (active.id === over.id) return;

    setTasks(tasks => {
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);

      return arrayMove(tasks, originalPos, newPos);
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
        <Typography>Day {day}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div>
          <ul>
            <DndContext  onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
              <SortableContext
                items={tasks}
                strategy={verticalListSortingStrategy}
              >
                {tasks.map((task) => (
                  <Activity
                    id={task.id}
                    title={task.title}
                    key={task.id}
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
