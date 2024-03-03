// ItineraryAccordion.js

import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const ItineraryAccordion = ({ day, activities }) => {
  const [newActivity, setNewActivity] = useState('');

  const handleAddActivity = () => {
    if (newActivity.trim() !== '') {
      // You can further validate or format the new activity as needed
      console.log(`Adding activity for Day ${day}: ${newActivity}`);
      // TODO: Implement the logic to add the activity to your data structure
    }
  };

  return (
    <Accordion>
      <AccordionSummary>
        <Typography>Day {day}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div>
          <ul>
            {activities.map((activity, index) => (
              <li key={index}>
                <Typography>{activity}</Typography>
              </li>
            ))}
          </ul>
          <TextField
            label="New Activity"
            variant="outlined"
            value={newActivity}
            onChange={(e) => setNewActivity(e.target.value)}
          />
          <Button onClick={handleAddActivity} variant="contained" color="primary">
            Add Activity
          </Button>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default ItineraryAccordion;
