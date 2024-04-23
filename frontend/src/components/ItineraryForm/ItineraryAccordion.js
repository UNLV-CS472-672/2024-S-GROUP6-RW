import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import "../../css/ItineraryAccordion.css"

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
    <div className="itin-accordion">
      <Accordion defaultExpanded sx={{width: '80%'}}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography style={{ fontFamily: 'Radley, serif' }}>{day}</Typography>
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
    </div>
  );
};

export default ItineraryAccordion;
