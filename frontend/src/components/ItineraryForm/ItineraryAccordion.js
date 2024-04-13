import React, { useState } from "react";
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
import EditIcon from '@mui/icons-material/Edit';

const ItineraryAccordion = ({
  key,
  day,
  events,
  onClickEditButton,
}) => {

  const dayObj = new Date(day); // Date object to store the specific day of the itinerary

  //Filters only the itinerary on the specific day
  const filteredActivities = events.filter((item) => {
    return (item.start.getDate() === dayObj.getDate() 
         && item.start.getMonth() === dayObj.getMonth()
         && item.start.getYear() === dayObj.getYear());
  });

  return (
    <Accordion>
      <AccordionSummary>
        <Typography>{day}</Typography>
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
        <IconButton
          aria-label="close"
          onClick={onClickEditButton}
        >
          <EditIcon sx={{color: "black", fontSize: 25}} /> 
        </IconButton>
      </AccordionDetails>
    </Accordion>
  );
};

export default ItineraryAccordion;
