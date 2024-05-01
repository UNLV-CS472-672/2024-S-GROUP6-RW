import React, { useState, useEffect } from "react";
import ItineraryAccordion from "../../components/ItineraryForm/ItineraryAccordion"; // Importing the ItineraryAccordion component
import CalendarView from "../../components/ItineraryForm/CalendarView"; //Import Calendar View
import "../../css/ItineraryPage.css"; // CSS File
import { format } from "date-fns"; // Importing the format function from date-fns library
import { getFromLocal } from "../../utils/LocalStorageManager";
import { PiCalendarPlusLight } from "react-icons/pi";
import { IconContext } from "react-icons";

//Material UI
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
import AddIcon from "@mui/icons-material/Add";
import NotesSharpIcon from "@mui/icons-material/NotesSharp";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
//import AddressAutoFill from "../../components/ItineraryForm/AddressAutoFill";


const ItineraryPage = () => {
  //User entered start / end date from getting started page
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
    setSelectedItinDay(day); // Set the calendar views date to the one selected by the user
    setCreateStartTime(dayjs(day)); //Set the start time according to each day's accordion
    setCreateEndTime(dayjs(day)); //Set the start time according to each day's accordion
  };

  const handleCloseCalendarView = () => {
    setShowCalendarView(false); // Show Edit View when button is clicked
    setCreateStartTime(null); //Initialize the state
    setCreateEndTime(null); //Initialize the state
  };

  useEffect(() => {
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

  //Function generates the itinerary based on a given start date and end date
  // ai-gen start (ChatGPT-3.5, 1)
  const generateItinerary = (startDate) => {
    if (endDate) { //If there is an end date available
      const end = new Date(endDate);
      if (startDate && end.toString() !== "Invalid Date") { //If start date exists and end date is valid
        const tripLength = calculateNumberOfDays(startDate, end); //Calculate number of days between the start and end date
        const newItinerary = Array.from({ length: tripLength }, (_, index) => //Populate itinerary array
          new Date(startDate.getTime() + index * 86400000).toDateString() //Calculate date and turn to dateString()
        );
        setItinerary(newItinerary);
      }
    }
  };
  //ai-gen end

  // ai-gen start (ChatGPT-3.5, 0)
  const calculateNumberOfDays = (startDate, endDate) => {
    return Math.round(Math.abs((startDate - endDate) / 86400000)) + 1;
  };
  // ai-gen end

  // Adds a day to the list of itineraries at the end. 
  // ai-gen start (ChatGPT-3.5, 1)
  const handleAddDay = () => {
    setItinerary((prevItinerary) => {
      let newDay;
      if (prevItinerary.length === 0) { //If there are no days
        newDay = new Date(selectedStartDate.getTime());
        newDay.setDate(newDay.getDate()); //startDate being added
      } else {
        const lastDayString = prevItinerary[prevItinerary.length - 1];
        const lastDay = new Date(lastDayString);
        newDay = new Date(lastDay.getTime());
        newDay.setDate(newDay.getDate() + 1); //Day after the last day in the itinerary is added
      }
      return [...prevItinerary, newDay.toDateString()];
    });
  };
  // ai-gen end


  /* Deletes the itinerary/day that was selected by the user */
  // ai-gen start (ChatGPT-3.5, 1)
  const handleDeleteDay = (deletingDay) => {
    const confirmDelete = window.confirm("Delete Day?");
    if (confirmDelete) {
      setItinerary((prevItinerary) =>
        prevItinerary.filter((day) => day !== deletingDay)
      );
    }
  };
  // ai-gen end

  /* Any time an activity is updated, is handled by this */
  const handleUpdateActivities = (updatedActivities) => {
    setUserActivities(updatedActivities);
  };

  /* Creates a new event/activity from given user input */
  // ai-gen start (ChatGPT-3.5, 2)
  const handleCreateEvent = () => {
    if (
      createStartTime &&
      createEndTime &&
      createStartTime.isBefore(createEndTime)
    ) { //If the user provided a input for the start and end time, and if the start date is before end date.
      const newEvent = {
        id: userActivities.length + 1,
        title: createTitle || "No Title", // No event title default to "No Title"
        start: createStartTime.toDate(), // Convert Dayjs object to JavaScript Date object
        end: createEndTime.toDate(), // Convert Dayjs object to JavaScript Date object
        description: createDescription || "",
        location: createLocation || "",
      };
      const updatedActivity = [...userActivities, newEvent];
      updatedActivity.sort((actObjx, actObjy) => {
        return actObjx.start - actObjy.start;
      }); //Sort them depending on the activites start time
      setUserActivities(updatedActivity); //Pass to the parent component.
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

  /* Create event button shows the dialogue for user input */
  const handleCreateEventBtnClick = () => {
    setShowCreateEventDialog(true);
  };

  /* When closing the dialogue, reset the states of the input (if user closed dialogue without finishing input) */
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
      <div className="itinerary-banner">
        <div className="itin-title-date-btn">
          <Typography className="itinerary-title">
            Itinerary for: Las Vegas
          </Typography>
          <Typography className="itin-dates">
            {" "}
            04/24/2024 - 04/30/2024{" "}
          </Typography>
          <div className="create-event-btn-div">
            <button
              className="create-event-btn"
              onClick={handleCreateEventBtnClick}
            >
              <div className="create-event-btn-contents">
                Create Event
                <IconContext.Provider
                  value={{
                    color: "black",
                    size: "27px",
                    className: "create-event-icon",
                  }}
                >
                  <PiCalendarPlusLight />
                </IconContext.Provider>
              </div>
            </button>
          </div>
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
        <DialogContent className="create-event-dialog-content" sx={{height: 295}}>
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
          <div className="address-input-itin-page">
            <LocationOnIcon style={{ marginBottom: 3, marginLeft: -3}} />
            <InputBase
              placeholder="Search Address"
              value={createLocation}
              onChange={(e) => setCreateLocation(e.target.value)}
            />
          </div>
          <div className="description-input-itin-page">
            <NotesSharpIcon style={{ marginBottom: -6, paddingRight: 5 }} />
            <InputBase
              className="description-inputbase-itin-page"
              placeholder="Description"
              value={createDescription}
              onChange={(e) => setCreateDescription(e.target.value)}
              multiline
              minRows={4}
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
        <div className="itin-accordion-container">
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
        </div>
      )}
    </div>
  );
};

export default ItineraryPage; // Exporting the ItineraryPage component
