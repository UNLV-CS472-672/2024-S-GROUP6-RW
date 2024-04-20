import React, { useState } from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import "../../css/EditView.css";
import "../../css/ReactBigCalendar.css";

import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import NotesSharpIcon from "@mui/icons-material/NotesSharp";

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
  TextField,
} from "@mui/material";

import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { deepOrange, orange, red } from "@mui/material/colors";

const localizer = momentLocalizer(moment);

const EditView = ({
  day,
  userActivities,
  onUpdatedActivities,
  onClickCloseButton,
}) => {
  const dayObj = new Date(day); //Convert day string to date object

  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showCreateEventDialog, setShowCreateEventDialog] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [title, setTitle] = useState("");
  const [selectedActivity, setSelectedActivity] = useState(null);

  //State Variables for New Event (Create Event)
  const [createTitle, setCreateTitle] = useState("");
  const [createStartTime, setCreateStartTime] = useState(dayjs(dayObj));
  const [createEndTime, setCreateEndTime] = useState(dayjs(dayObj));
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
    //Reset States
    setCreateTitle("");
    setCreateLocation("");
    setCreateDescription("");
  };

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
        updatedEvents.sort((actObjx, actObjy) => {
          return actObjx.start - actObjy.start;
        }); //Sort them depending on the activites start time
        onUpdatedActivities(updatedEvents); //Pass the updated activity back to the parent
      }
      setShowEditDialog(false);
      setSelectedActivity(null);
    }
  };

  const handleDelete = () => {
    if (selectedActivity) {
      const updatedUserActivities = userActivities.filter(
        (item) => item.id !== selectedActivity.id
      );
      onUpdatedActivities(updatedUserActivities); //Pass new array to the parent.
      setShowEditDialog(false);
      setSelectedActivity(null);
    }
  };

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
      const updatedActivity = [...userActivities, newEvent];
      updatedActivity.sort((actObjx, actObjy) => {
        return actObjx.start - actObjy.start;
      }); //Sort them depending on the activites start time
      onUpdatedActivities(updatedActivity); //Pass to the parent component.
      setShowCreateEventDialog(false); //Close the create event dialog

      //Reset states
      setCreateTitle("");
      setCreateStartTime(dayjs(dayObj));
      setCreateEndTime(dayjs(dayObj));
      setCreateLocation("");
      setCreateDescription("");
    } else {
      /* Required Fields are missing case */
    }
  };

  return (
    <>
      <br></br>
      <br></br>
      <div className="button-section">
        <IconButton className="calendar-close-btn" onClick={onClickCloseButton}>
          <CloseIcon />
        </IconButton>
      </div>
      <div className="calendar-div">
        {/* Adjust height as needed */}
        <Calendar
          className="big-calendar"
          events={userActivities}
          defaultView={Views.DAY} // Display day view by default
          views={[Views.DAY, Views.WEEK, Views.MONTH]} // Only show day view
          selectable={true} // Allow selecting time slots
          step={15} // Time slot interval in minutes
          timeslots={4} // Number of time slots per hour
          defaultDate={dayObj} // Display chosen day of the itinerary
          localizer={localizer}
          onSelectEvent={handleEditButtonClick}
          components={{
            event: CustomEventComponent
          }}
        />
      </div>
      <Dialog
        className="edit-dialog"
        open={showEditDialog}
        onClose={handleEditDialogClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit Event</DialogTitle>
        <DialogContent className="edit-dialog-content">
          <div
            className="edit-delete-btn"
            style={{ position: "absolute", top: 12, right: 5 }}
          >
            <IconButton
              className="delete-event-btn"
              onClick={handleDelete}
              sx={{
                color: "transparent",
                "&:hover": {
                  color: red[700],
                  cursor: "pointer",
                },
              }}
            >
              <DeleteIcon />
            </IconButton>
          </div>
          {selectedActivity && (
            <div>
              <div className="activity-titleform-div">
                <FormControl variant="standard">
                  <InputLabel>Title</InputLabel>
                  <Input
                    className="activity-title-input"
                    label="Enter Title"
                    defaultValue={selectedActivity.title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </FormControl>
              </div>
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
          <div className="activity-titleform-div">
            <FormControl
              className="activity-title-formcontrol"
              variant="standard"
            >
              <TextField
                className="activity-title-input"
                label="Title"
                variant="standard"
                value={createTitle}
                onChange={(e) => setCreateTitle(e.target.value)}
              ></TextField>
            </FormControl>
          </div>
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
            <InputBase
              placeholder="Search Address"
              value={createLocation}
              onChange={(e) => setCreateLocation(e.target.value)}
            />
          </div>
          <div className="description-input">
            <NotesSharpIcon style={{ marginBottom: -6, paddingRight: 5 }} />
            <InputBase
              className="description-inputbase"
              placeholder="Description"
              value={createDescription}
              onChange={(e) => setCreateDescription(e.target.value)}
              multiline
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreateEventDialogClose}>Cancel</Button>
          <Button onClick={handleCreateEvent}>Save</Button>
        </DialogActions>
      </Dialog>
      <Button
        className="create-event-btn"
        variant="outlined"
        endIcon={<AddIcon />}
        onClick={() => setShowCreateEventDialog(true)}
        sx={{
          marginTop: 2,
        }}
      >
        Create
      </Button>
    </>
  );
};

const CustomEventComponent = (event) => {
  return (
    <div className="activity-title-div">
      <Typography
        sx={{
          fontSize: "15px",
          height: "100%",
          position: "relative",
          top: "-3px",
          left: "2px",
        }}
      >
        {event.title}
      </Typography>
    </div>
  );
};
export default EditView;
