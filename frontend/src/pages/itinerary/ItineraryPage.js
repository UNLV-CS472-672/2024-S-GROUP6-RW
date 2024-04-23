import React, { useState, useEffect } from "react";
import ItineraryAccordion from "../../components/ItineraryForm/ItineraryAccordion"; // Importing the ItineraryAccordion component
import CalendarView from "../../components/ItineraryForm/CalendarView";
import "../../css/ItineraryPage.css";
import { format } from "date-fns"; // Importing the format function from date-fns library
import { getFromLocal } from "../../utils/LocalStorageManager";

import AddIcon from "@mui/icons-material/Add";
import NotesSharpIcon from "@mui/icons-material/NotesSharp";
import { LuCalendarPlus } from "react-icons/lu";
import { PiCalendarPlusLight } from "react-icons/pi";
import { IconContext } from "react-icons";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  InputBase,
  IconButton,
  FormControl,
  Typography,
  TextField,
} from "@mui/material";

import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const ItineraryPage = () => {
  //User entered start / end date
  const startDate = getFromLocal("startDate");
  const endDate = getFromLocal("endDate");
  const startDateObj = dayjs(startDate);
  const endDateObj = dayjs(endDate);

  // State variables using useState hook
  const [itinerary, setItinerary] = useState([]); // Itinerary array state
  const [selectedStartDate, setSelectedStartDate] = useState(null); // Selected start date
  const [selectedItinDay, setSelectedItinDay] = useState(null); // Maintains which itinerary clicked the edit button
  const [showCalendarView, setShowCalendarView] = useState(false);
  const [userActivities, setUserActivities] = useState([]);
  const [showCreateEventDialog, setShowCreateEventDialog] = useState(false);

  //State Variables for New Event (Create Event)
  const [createTitle, setCreateTitle] = useState("");
  const [createStartTime, setCreateStartTime] = useState(null);
  const [createEndTime, setCreateEndTime] = useState(null);
  const [createLocation, setCreateLocation] = useState("");
  const [createDescription, setCreateDescription] = useState("");


  const handleShowCalendarView = (day) => {
    setShowCalendarView(true); // Show Calendar View when button is clicked
    setSelectedItinDay(day);
    setCreateStartTime(dayjs(day)); //Set the start time according to each day's accordion
    setCreateEndTime(dayjs(day)); //Set the start time according to each day's accordion
  };

  const handleCloseCalendarView = () => {
    setShowCalendarView(false); // Show Edit View when button is clicked
    setCreateStartTime(null); //Initialize the state
    setCreateEndTime(null); //Initialize the state
  };

  useEffect(() => {
    //const startDateFromStorage = localStorage.getItem('startDate');
    //const startDate = getFromLocal("startDate");

    if (startDate) {
      const start = new Date(startDate);
      if (start.toString() !== "Invalid Date") {
        setSelectedStartDate(start);
        generateItinerary(start);
      } else {
        console.error("Invalid start date from storage");
      }
    }
  }, []);

  const generateItinerary = (startDate) => {
    //const endDateFromStorage = localStorage.getItem('endDate');
    //const endDate = getFromLocal("endDate");

    if (endDate) {
      const end = new Date(endDate);
      if (startDate && end.toString() !== "Invalid Date") {
        const tripLength = calculateNumberOfDays(startDate, end);
        const newItinerary = Array.from({ length: tripLength }, (_, index) =>
          new Date(startDate.getTime() + index * 86400000).toDateString()
        );
        setItinerary(newItinerary);
      }
    }
  };

  const calculateNumberOfDays = (startDate, endDate) => {
    return Math.round(Math.abs((startDate - endDate) / 86400000)) + 1;
  };

  const handleAddDay = () => {
    console.log(selectedStartDate)
    setItinerary((prevItinerary) => {
      let newDay;
      if (prevItinerary.length === 0) { //If there are no days
        newDay = new Date(selectedStartDate.getTime());
        newDay.setDate(newDay.getDate()); //startDate being adde
      } else {
        const lastDayString = prevItinerary[prevItinerary.length - 1];
        const lastDay = new Date(lastDayString);
        newDay = new Date(lastDay.getTime());
        newDay.setDate(newDay.getDate() + 1); //Day after the last day in the itinerary is added
      }
      return [...prevItinerary, newDay.toDateString()];
    });
  };
  //day: format(newDay, "EEEE, MMMM dd, yyyy"), // Convert newDay to a string representation

  const handleDeleteDay = (deletingDay) => {
    setItinerary(prevItinerary => prevItinerary.filter(day => day !== deletingDay));
  }

  const handleUpdateActivities = (updatedActivities) => {
    setUserActivities(updatedActivities);
  };

  const handleCreateEvent = () => {
    if (createStartTime && createEndTime && createStartTime.isBefore(createEndTime)) {
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
      setUserActivities(updatedActivity) //Pass to the parent component.
      setShowCreateEventDialog(false); //Close the create event dialog

      //Reset states
      setCreateTitle("");
      setCreateStartTime(null);
      setCreateEndTime(null);
      setCreateLocation("");
      setCreateDescription("");
    } else {
      /* Required Fields are missing case */
    }
  };

  const handleCreateEventBtnClick = () => {
    setShowCreateEventDialog(true);
  }

  const handleCreateEventDialogClose = () => {
    setShowCreateEventDialog(false);
    //Reset States
    setCreateTitle("");
    setCreateLocation("");
    setCreateDescription("");
  };

  // JSX rendering
  return (
    <div>
      <div className="title-event-bar">
        <Typography className="itinerary-title">Itinerary</Typography>
        <div className="spacer" />
        {/* <Button
          className="create-event-btn"
          onClick={handleCreateEventBtnClick}
          variant="outlined"
          endIcon={<AddIcon />}
          disableRipple
        >
          Create
        </Button> */}
        <div className="create-event-btn-cpy">
          <button onClick={handleCreateEventBtnClick}>
            <div className="create-event-btn-contents">
              Create Event
              <IconContext.Provider value={{ color: "black", size: '27px', className: "create-event-icon"}}>
                <PiCalendarPlusLight/>
              </IconContext.Provider>
            </div>  
          </button>
        </div>
      </div>
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
                minDate={startDateObj}
              />
              <DateTimePicker
                label="End Time"
                value={createEndTime}
                onChange={(newEndTime) => setCreateEndTime(newEndTime)}
                minDate={startDateObj}
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
      {showCalendarView ? (
        <CalendarView
          day={selectedItinDay}
          userActivities={userActivities}
          onUpdatedActivities={handleUpdateActivities}
          onClickCloseButton={handleCloseCalendarView}
        />
      ) : (
        <>
          {itinerary.map((day, index) => (
            <ItineraryAccordion
              key={index}
              day={day}
              dayNum={index + 1}
              events={userActivities}
              onClickEditButton={() => handleShowCalendarView(day)}
              onDeleteDay={() => handleDeleteDay(day)}
            />
          ))}
          <IconButton className="add-day-btn" onClick={handleAddDay}>
            <AddIcon
              shapeRendering="crispEdges"
              sx={{ color: "black", fontSize: 32 }}
            />
          </IconButton>
        </>
      )}
    </div>
  );
};

export default ItineraryPage; // Exporting the ItineraryPage component
