import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";

const Activity = ({ activity, onEdit, onRemove }) => {
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
            <DialogContentText>
              Are you sure you want to remove this activity?
            </DialogContentText>
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

export default Activity;
