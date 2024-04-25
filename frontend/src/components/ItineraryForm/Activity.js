import React, { useState, useContext } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TodayIcon from "@mui/icons-material/Today";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import "../../css/Activity.css"

import cityImg from "../../images/itinerary_img/los-angeles-city.jpg";

const Activity = ({ activity }) => {
  const { id, title, location, date, time, description, photo } = activity; //Get all activity information as a prop

  const [isDialogOpen, setDialogOpen] = useState(false); //Control pop up window visibility
  const theme = useTheme();

  //Handles open dialogue 
  const handleOpenDialog = (event) => {
    console.log("Opening dialog...");
    setDialogOpen(true);
  };

  //Handles closing the dialogue
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <div className="activity">
      <div className="activity-title-btn-container">
        <Button onClick={handleOpenDialog}>
          <Typography>{title}</Typography>
        </Button>
      </div>
      <Dialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth //Uses the biggest dialogue size
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
