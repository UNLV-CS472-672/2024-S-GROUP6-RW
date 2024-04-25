import React, { useCallback, useState } from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from "moment";

// Styles
import "../../css/CalendarView.css";
import "../../css/ReactBigCalendar.css";

// Material-UI Icons and Components
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
  Input,
  InputLabel,
  FormControl,
  Typography,
} from "@mui/material";

// Date and Time Picker components from MUI
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { red } from "@mui/material/colors";

const DnDCalendar = withDragAndDrop(Calendar); //Adds drag and drop functionality to calendar

const localizer = momentLocalizer(moment); //Initialize momentLocalizer for calendar

const EditView = ({
  day,
  userActivities,
  onUpdatedActivities,
  onClickCloseButton,
}) => {

  const dayObj = new Date(day); //Convert day string to date object

  //State Variables
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [title, setTitle] = useState("");
  const [selectedActivity, setSelectedActivity] = useState(null);

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

  // ai-gen start (ChatGPT-3.5, 1)
  //Saves changes that the user put in the edit dialogue
  const handleSave = () => {
    if (selectedActivity) { //If any activity is selected
      const index = userActivities.findIndex(
        (item) => item.id === selectedActivity.id //Finds which activity is selected 
      );
      if (index !== -1) { //If it finds a proper index.
        console.log(startTime);
        const updatedEvents = [...userActivities];
        updatedEvents[index] = {
          ...selectedActivity,
          start: startTime ? new Date(startTime) : selectedActivity.start,
          end: endTime ? new Date(endTime) : selectedActivity.end,
          title: title || selectedActivity.title,
        }; //Update activity with new information
        updatedEvents.sort((actObjx, actObjy) => {
          return actObjx.start - actObjy.start;
        }); //Sort them depending on the activites start time
        onUpdatedActivities(updatedEvents); //Pass the updated activity back to the parent
      }
      setShowEditDialog(false); //Close the dialogue
      setSelectedActivity(null); //No activities is selected yet.
    }
  };

  //
  const handleDelete = () => {
    if (selectedActivity) {
      const updatedUserActivities = userActivities.filter(
        (item) => item.id !== selectedActivity.id //Filter all activities except the one we are deleting
      )
      onUpdatedActivities(updatedUserActivities); //Pass new array to the parent.
      setShowEditDialog(false); //Close the dialogue
      setSelectedActivity(null); //No activities is selected yet.
    }
  };

  // Calendar Events Customization Functions
  //Sets events with the new start/end time according to the new time slots dropped to
  const moveEvent = useCallback(
    ({ event, start, end, isAllDay: dropToAllDaySlot = false}) => {
      const { allDay } = event; //Extract allDay prop from an event
      if (!allDay && dropToAllDaySlot) { //If event is not an all day event and put to the all day slot
        event.allDay = true; //Now event becomes an all day event
      }

      const index = userActivities.findIndex((item) => item.id === event.id); //Find index of existing events
      if (index !== -1) {
        const updatedActivities = [...userActivities];
        updatedActivities[index] = {
          ...updatedActivities[index],
          start,
          end,
        }; //Update the activity with the new start time and end time 
        onUpdatedActivities(updatedActivities);
      }
    },
    [userActivities, onUpdatedActivities]
  );
  //ai-gen end

  return (
    <>
      <div className="calendar-div">
        {/* Adjust height as needed */}
        <DnDCalendar
          className="big-calendar"
          events={userActivities}
          defaultView={Views.DAY} // Display day view by default
          views={[Views.DAY, Views.WEEK, Views.MONTH]} // Only show day view
          selectable={true} // Allow selecting time slots
          step={15} // 15 min time slot
          timeslots={4} // Number of time slots per hour (4x15 = hr)
          defaultDate={dayObj} // Display chosen day of the itinerary
          localizer={localizer}
          onSelectEvent={handleEditButtonClick}
          draggableAccessor={ (event) => true}
          resizable={false} //Events not resizable
          onEventDrop={moveEvent}
          components={{
            event: CustomEventComponent
          }}
        />
      </div>
      <div className="cal-close-btn-container">
        <IconButton className="calendar-close-btn" onClick={onClickCloseButton}>
          <CloseIcon />
        </IconButton>
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
    </>
  );
};

// ai-gen start (ChatGPT-3.5, 2)
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
// ai-gen end
