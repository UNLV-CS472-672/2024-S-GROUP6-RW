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

const ItineraryAccordion = ({
  day,
  activities,
  onAddActivity,
  onEditActivity,
  onRemoveActivity,
}) => {
  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const [newActivity, setNewActivity] = useState("");

  const handleAddClick = () => {
    setAddDialogOpen(true);
  };

  const handleConfirmAdd = () => {
    setAddDialogOpen(false);
    if (newActivity) {
      onAddActivity(day, newActivity);
      setNewActivity("");
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
                <Activity
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
