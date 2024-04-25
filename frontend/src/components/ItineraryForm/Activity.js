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
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TodayIcon from "@mui/icons-material/Today";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CloseIcon from "@mui/icons-material/Close";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { useTheme } from "@mui/material/styles";
import "../../css/Activity.css"

import cityImg from "../../images/itinerary_img/los-angeles-city.jpg";

const Activity = ({ activity }) => {
  const { id, title, location, date, time, description, photo } = activity;

  const [isDialogOpen, setDialogOpen] = useState(false);
  const theme = useTheme();

  const handleOpenDialog = (event) => {
    console.log("Opening dialog...");
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <div className="activity">
      <Button onClick={handleOpenDialog}>{title}</Button>
      <Dialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <div className="dialog-content" style={{height: 600}}>
          <div className="x-button" style={{ position: 'absolute', top: 0, right: 0 }}>
            <IconButton
              aria-label="close"
              onClick={handleCloseDialog}
              sx={{
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon /> 
            </IconButton>
          </div>
          <CardMedia
            component="img"
            height="300"
            image={cityImg}
            alt={title}
            style={{
              marginBottom: 16,
              maxHeight: "225px",
              objectfit: "cover",
            }}
          />
          <Typography
            variant="subtitle1"
            style={{ paddingTop: 4, paddingBottom: 4 }}
          >
            <LocationOnIcon style={{ marginBottom: -6 }} /> {location}
          </Typography>
          <Typography
            variant="subtitle1"
            style={{ paddingTop: 4, paddingBottom: 4 }}
          >
            <TodayIcon style={{ marginBottom: -6 }} /> {date}
          </Typography>
          <Typography
            variant="subtitle1"
            style={{ paddingTop: 4, paddingBottom: 4 }}
          >
            <AccessTimeIcon style={{ marginBottom: -6 }} /> {time}
          </Typography>
          <DialogContentText style={{ marginTop: 16 }}>
            <header>Description:</header>
            {description}
          </DialogContentText>
        </div>
      </Dialog>
    </div>
  );
};

export default Activity;
