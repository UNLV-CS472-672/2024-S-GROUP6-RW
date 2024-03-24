import React, { useState, useContext } from "react";
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
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useTheme } from "@mui/material/styles";
import "./Activity.css";

const Activity = ({ id, title }) => {
  const [isConfirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const theme = useTheme();

  const handleRemoveClick = () => {
    setConfirmDialogOpen(true);
  };

  const handleConfirmRemove = () => {
    setConfirmDialogOpen(false);
    //onRemove();
  };

  const handleCancelRemove = () => {
    setConfirmDialogOpen(false);
  };

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    backgroundColor:
      theme.palette.mode === "dark" ? "#424242" : "#f0f0f0", // Adjust background color based on theme
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="task"
    >
      {title}

      {/* You can include your dialog here */}
    </div>
  );
};

export default Activity;
