import React, { useState } from "react";
import ActivityList from "../../components/ItineraryForm/ActivityList";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import "../../css/EditView.css";
import "../../css/ReactBigCalendar.css";

import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from '@mui/icons-material/Delete';
import NotesSharpIcon from '@mui/icons-material/NotesSharp';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Input,
  InputLabel,
  InputBase,
  FormControl,
  Typography,
} from "@mui/material";

import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { deepOrange, orange, red } from "@mui/material/colors";

const localizer = momentLocalizer(moment);

const EditView = ({ onClickCloseButton }) => {
  const [userActivities, setUserActivities] = useState(ActivityList);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showCreateEventDialog, setShowCreateEventDialog] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [title, setTitle] = useState("");
  const [selectedActivity, setSelectedActivity] = useState(null);

  //State Variables for New Event (Create Event)
  const [createTitle, setCreateTitle] = useState("");
  const [createStartTime, setCreateStartTime] = useState(null);
  const [createEndTime, setCreateEndTime] = useState(null);
  const [createLocation, setCreateLocation] = useState("");
  const [createDescription, setCreateDescription] = useState("");

  const handleEditButtonClick = (event, e) => {
    setSelectedActivity(event);
    setShowEditDialog(true);
    setStartTime(dayjs(event.start)); //Previously entered start time for the event before editing
    setEndTime(dayjs(event.end)); //Previously entered end time for the event before editing
  };

  const handleEditDialogClose = () => {
    setShowEditDialog(false);
    setSelectedActivity(null);
  };

  const handleCreateEventDialogClose = () => {
    setShowCreateEventDialog(false);
  }

  const handleSave = () => {
    if (selectedActivity) {
      const index = userActivities.findIndex(
        (item) => item.id === selectedActivity.id
      );
      if (index !== -1) {
        console.log(startTime);
        const updatedEvents = [...userActivities];
        updatedEvents[index] = {
          ...selectedActivity,
          start: startTime ? new Date(startTime) : selectedActivity.start,
          end: endTime ? new Date(endTime) : selectedActivity.end,
          title: title || selectedActivity.title,
        };
        // const newActivityList = [...ActivityList];
        // newActivityList[index] = updatedEvents;
        setUserActivities(updatedEvents);
      }
      setShowEditDialog(false);
      setSelectedActivity(null);
    }
    // if (selectedActivity) {
    //   const currentActivityIndex = ActivityList.findIndex( (item) => item.id === selectedActivity.id );
    //   if (currentActivityIndex !== -1) {
    //     const updatedActivities = [...ActivityList];
    //   }
    // }
  };
  // const handleSave = () => {
  //   if (selectedActivity) {
  //     const index = ActivityList.findIndex((item) => item.id === selectedActivity.id);
  //     if (index !== -1) {
  //       const updatedEvents = [...ActivityList];
  //       // Extract year, month, and day from the original start and end dates
  //       const year = selectedActivity.start.getFullYear();
  //       const month = selectedActivity.start.getMonth();
  //       const day = selectedActivity.start.getDate();
  //       // Create new date objects with the same year, month, day, and updated time
  //       const newStartTime = new Date(year, month, day, startTime.getHours(), startTime.getMinutes());
  //       const newEndTime = new Date(year, month, day, endTime.getHours(), endTime.getMinutes());
  //       updatedEvents[index] = {
  //         ...selectedActivity,
  //         start: newStartTime,
  //         end: newEndTime,
  //       };
  //       setUserActivities(updatedEvents);
  //     }
  //     setShowEditDialog(false);
  //     setSelectedActivity(null);
  //   }
  // };

  const handleDelete = () => {
    if (selectedActivity) {
      const updatedUserActivities = userActivities.filter(
        (item) => item.id !== selectedActivity.id
      );
      setUserActivities(updatedUserActivities);
      setShowEditDialog(false);
      setSelectedActivity(null);
    }
  }

  const handleCreateEvent = () => {
    if (createStartTime && createEndTime) {
      const newEvent = {
        id: userActivities.length + 1,
        title: createTitle || "No Title",
        start: createStartTime.toDate(), // Convert Dayjs object to JavaScript Date object
        end: createEndTime.toDate(), // Convert Dayjs object to JavaScript Date object
        description: createDescription || "",
        location: createLocation || "",
      };
      setUserActivities([...userActivities, newEvent]);
      setShowCreateEventDialog(false); //Close the create event dialog
      setCreateTitle("");
      setCreateStartTime(null);
      setCreateEndTime(null);
      setCreateLocation("");
      setCreateDescription("");
    } else {
      /* Required Fields are missing case */
    }
  }

  return (
    <>
      <div className="big-calendar">
        {" "}
        {/* Adjust height as needed */}
        <Calendar
          events={userActivities}
          defaultView={Views.DAY} // Display day view by default
          views={[Views.DAY]} // Only show day view
          selectable={true} // Allow selecting time slots
          step={15} // Time slot interval in minutes
          timeslots={4} // Number of time slots per hour
          defaultDate={new Date()} // Display current date
          localizer={localizer}
          components={{
            event: (props) => (
              <CustomEventComponent
                {...props}
                onEditButtonClick={handleEditButtonClick}
              />
            ),
          }}
          //   onSelectSlot={handleSelectSlot} // Handle slot selection
        />
        <Dialog
          className="edit-dialog"
          open={showEditDialog}
          onClose={handleEditDialogClose}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Edit Event</DialogTitle>
          <DialogContent className="edit-dialog-content">
            <div className="edit-delete-btn" style={{position: 'absolute', top: 12, right: 5,}}>
              <IconButton 
                className="delete-event-btn" 
                onClick={handleDelete} 
                sx={{
                  color: 'transparent',
                  "&:hover": {
                    color: red[700],
                    cursor: "pointer", 
                  }
                }}
                >
                <DeleteIcon />
              </IconButton>
            </div>
            {selectedActivity && (
              <div>
                <FormControl variant="standard">
                  <InputLabel>Title</InputLabel>
                  <Input label="Enter Title" defaultValue={selectedActivity.title}  onChange={(e) => setTitle(e.target.value)}/>
                </FormControl>
                {/* Other event details */}
                <div className="start-end-timepicker">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      label="Start Time"
                      value={startTime}
                      onChange={(newStartTime) => setStartTime(newStartTime)}
                    />
                    <DateTimePicker
                      label="End Time"
                      value={endTime}
                      onChange={(newEndTime) => setEndTime(newEndTime)}
                    />
                  </LocalizationProvider>
                </div>
              </div>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditDialogClose}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogActions>
        </Dialog>
        <Dialog
          className="create-event-dialog"
          open={showCreateEventDialog}
          onClose={handleCreateEventDialogClose}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Create Event</DialogTitle>
          <DialogContent className="create-event-dialog-content">
            <FormControl variant="standard">
              <InputLabel>Activity Title</InputLabel>
              <Input label="Enter Title" value={createTitle} onChange={(e) => setCreateTitle(e.target.value)} />
            </FormControl>
            <div className="start-end-timepicker">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="Start Time"
                  value={createStartTime}
                  onChange={(newStartTime) => setCreateStartTime(newStartTime)}
                />
                <DateTimePicker
                  label="End Time"
                  value={createEndTime}
                  onChange={(newEndTime) => setCreateEndTime(newEndTime)}
                />
              </LocalizationProvider>
            </div>
            <div className="address-input">
              <InputBase placeholder="Search Address" value={createLocation} onChange={(e) => setCreateLocation(e.target.value)} />
            </div>
            <div className="description-input">
              <NotesSharpIcon style={{ marginBottom: -6 , paddingRight: 5 }}/>
              <InputBase placeholder="Description" value={createDescription} onChange={(e) => setCreateDescription(e.target.value)} multiline/>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCreateEventDialogClose}>Cancel</Button>
            <Button onClick={handleCreateEvent}>Save</Button>
          </DialogActions>
        </Dialog>
        <IconButton className="calendar-close-btn" onClick={onClickCloseButton}>
          <CloseIcon />
        </IconButton>
        <Button variant="outlined" endIcon={<AddIcon />} onClick={() => setShowCreateEventDialog(true)}> Create </Button>
      </div>
    </>
  );
};

const CustomEventComponent = ({ event, onEditButtonClick }) => {
  const handleEditClick = () => {
    onEditButtonClick(event);
  };

  return (
    <div className="activity-title-editbtn">
      <Typography className="activity-title-label">{event.title}</Typography>
      <Button
        className="activity-edit-btn"
        variant="contained"
        onClick={handleEditClick}
        sx={{
          bgcolor: deepOrange[500],
        }}
      >
        Edit
      </Button>
    </div>
  );
};

export default EditView;
