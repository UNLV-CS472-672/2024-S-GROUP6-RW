import React, { useState, useContext } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TodayIcon from "@mui/icons-material/Today";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from '@mui/icons-material/Edit';
import { useTheme } from "@mui/material/styles";
import {
  Typography,
  Button,
  Dialog,
  DialogContentText,
  DialogActions,
  CardMedia,
  IconButton,
  Input,
  InputBase,
} from "@mui/material"

import "../../css/Activity.css"
import AddressAutoFill from "../../components/ItineraryForm/AddressAutoFill";


import cityImg from "../../images/itinerary_img/los-angeles-city.jpg";

const Activity = ({ activity }) => {
  const { id, title, start, end, description, location } = activity; //Get all activity information as a prop

  const [isDialogOpen, setDialogOpen] = useState(false); //Control pop up window visibility
  const [isEditMode, setIsEditMode] = useState(false);
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

  //Toggle Edit Mode
  const toggleEditMode = () => {
    setIsEditMode((prev) => !prev); //Set it to the opposite mode.
  }

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
      >
        <div className="dialog-content" style={{height: 550, width: 650}}>
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
            image={cityImg}
            alt={title}
            style={{
              marginBottom: 5,
              maxHeight: "160px",
              objectfit: "cover",
            }}
          />
          <div className="editable-content">
            <div className="title-input-container">
              <InputBase className={`title-input ${isEditMode ? 'title-input-editmode' : ''}`} defaultValue={title} readOnly={!isEditMode} />
            </div>
            <div className="dt-tm-lc-dsc-container">
              <div className="date-time-container">
                <div className="date-section-container">
                  <TodayIcon/>
                  {isEditMode ? (
                    <button className="date-btn">
                      <Typography>{start.toLocaleString('default', {weekday: 'long', month: 'short', day:'2-digit'})}</Typography>
                    </button>
                  ) : (
                    <Typography>{start.toLocaleString('default', {weekday: 'long', month: 'short', day:'2-digit'})}</Typography>
                  )}
                </div>
                <div className="time-section-container">
                  <AccessTimeIcon/>
                  {isEditMode ? (
                    <button className="time-btn">
                      <Typography>{start.toLocaleString('default', {hour: 'numeric', minute: 'numeric'})} ~ {end.toLocaleString('default', {hour: 'numeric', minute: 'numeric'})}</Typography>
                    </button>
                  ) : (
                    <Typography>{start.toLocaleString('default', {hour: 'numeric', minute: 'numeric'})} ~ {end.toLocaleString('default', {hour: 'numeric', minute: 'numeric'})}</Typography>
                  )}
                </div>
              </div>
              <div className="location-address-container">
                <LocationOnIcon style={{ marginBottom: 1 }} />
                <AddressAutoFill isEditMode={isEditMode}></AddressAutoFill>
              </div>
              <Typography className="description-text-activity" >Description</Typography>
              <InputBase
                className={`description-inputbase-activity ${isEditMode ? 'description-inputbase-activity-editmode' : ''}`}
                defaultValue={description}
                placeholder={!isEditMode ? '' : 'Enter description...'}
                minRows={5}
                multiline
                readOnly={!isEditMode}
              />
            </div>
          </div>
          <DialogActions>
            {isEditMode ? (
              <Button onClick={toggleEditMode}>Cancel</Button>
            ) : (
              <IconButton
                onClick={toggleEditMode}
                sx={{
                  color: "black",
                }}
              >
                <EditIcon /> 
              </IconButton>
            )}
            {isEditMode && <Button>Save</Button>}
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
};

export default Activity;
