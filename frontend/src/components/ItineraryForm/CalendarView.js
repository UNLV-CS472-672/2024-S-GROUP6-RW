import React, { useCallback, useState } from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import moment from "moment";
import "../../css/CalendarView.css";
import "../../css/ReactBigCalendar.css";

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Input,
  InputLabel,
  FormControl,
  Typography,
} from "@mui/material";

import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { red } from "@mui/material/colors";

const DnDCalendar = withDragAndDrop(Calendar)

const localizer = momentLocalizer(moment);

const EditView = ({
  day,
  userActivities,
  onUpdatedActivities,
  onClickCloseButton,
}) => {
  const dayObj = new Date(day); //Convert day string to date object

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

  // Calendar Events Customization Functions
  const moveEvent = useCallback(
    ({ event, start, end, isAllDay: dropToAllDaySlot = false}) => {
      const { allDay } = event;
      if (!allDay && dropToAllDaySlot) {
        event.allDay = true;
      }

      const index = userActivities.findIndex((item) => item.id === event.id);
      if (index !== -1) {
        const updatedActivities = [...userActivities];
        updatedActivities[index] = {
          ...updatedActivities[index],
          start,
          end,
        };
        onUpdatedActivities(updatedActivities);
      }
    },
    [userActivities, onUpdatedActivities]
  );

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
          step={15} // Time slot interval in minutes
          timeslots={4} // Number of time slots per hour
          defaultDate={dayObj} // Display chosen day of the itinerary
          localizer={localizer}
          onSelectEvent={handleEditButtonClick}
          draggableAccessor={ (event) => true}
          resizable={false}
          onEventDrop={moveEvent}
          components={{
            event: CustomEventComponent
          }}
        />
      </div>
      <div className="button-section">
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
