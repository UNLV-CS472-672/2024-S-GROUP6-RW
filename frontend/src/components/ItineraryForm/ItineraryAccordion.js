import React, { useState } from "react";
import { red } from "@mui/material/colors";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Activity from "./Activity";
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from "@mui/icons-material/Delete";
import TodayIcon from '@mui/icons-material/Today';
import "../../css/ItineraryAccordion.css"

const ItineraryAccordion = ({
  day,
  dayNum,
  events,
  onClickEditButton,
  onDeleteDay,
}) => {

  const dayObj = new Date(day); // Date object to store the specific day of the itinerary

  //Filters only the itinerary on the specific day
  const filteredActivities = events.filter((item) => {
    return (item.start.getDate() === dayObj.getDate() 
         && item.start.getMonth() === dayObj.getMonth()
         && item.start.getYear() === dayObj.getYear());
  });

  const handleDeleteDayClick = () => {
    onDeleteDay(day);
  }

  return (
    <div className="itin-accordion">
      <Accordion sx={{width: '80%'}}>
        <AccordionSummary 
          expandIcon={<ExpandMoreIcon />}
          sx={{
            flexDirection: 'row-reverse',
          }}
        >
        <div className="accordion-contents-div">
          <Typography>Day {dayNum}: {dayObj.toLocaleString('default', {month: 'short', day:'2-digit', year: 'numeric'})}</Typography>
          <button className="calendar-view-btn" onClick={onClickEditButton}>
            <TodayIcon sx={{color: "black", fontSize: 22, marginTop: '2px'}} /> 
          </button>
        </div>
        </AccordionSummary>
        <AccordionDetails>
          <Timeline>
            {filteredActivities.map((event, index) => (
              <TimelineItem key={event.id}>
                <TimelineOppositeContent>
                  {event.start.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot />
                  {index !== events.length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent>
                  <Activity
                    activity={event}
                    //onDelete={handleDelete}
                    key={event.id}
                  />
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
          <div
            className="edit-delete-btn"
            style={{ position: "absolute", bottom: 5, right: 11 }}
          >
            <IconButton
              className="delete-event-btn"
              onClick={handleDeleteDayClick}
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
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default ItineraryAccordion;
