import React from "react";
import { Grid, Avatar, Box } from "@mui/material";

// BackdropGrid component for displaying a grid of backdrop images
export default function BackdropGrid({ backdrops, selectedBackdrop }) {

  // Function to handle the selection of a backdrop
  const selectBackdrop = (backdrop) => {
    selectedBackdrop(backdrop); // Call the selectedBackdrop function passed as prop
  };

  // Return the BackdropGrid component
  return (
    <Box>
      {/* Grid container to display the backdrop images */}
      <Grid
        container
        xs={12} // Set the width to 12 columns for responsiveness
        justifyContent="center" // Align items to the center
        style={styles.backdropGrid} // Apply custom styles
      >
        {/* Map through the backdrops array to generate Box components */}
        {backdrops.map((backdrop, index) => (
          <Grid
            item
            xs={6} // Set the width to 6 columns for responsiveness
            display="flex" // Display as flex
            justifyContent="center" // Align items to the center
            key={index} // Unique key for each Box component
          >
            {/* Box component representing the backdrop image */}
            <Box
                style={{...styles.backdrop, backgroundImage: `url(${backdrop.img})`}} // Set background image
                onClick={() => selectBackdrop(backdrop)} // Handle click event to select the backdrop
                >
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

// Styles for the BackdropGrid component
const styles = {
  backdropGrid: {
    display: "flex", // Display as flex container
    width: "100%", // Full width
  },
  backdrop: {
    width: "13vw", // Set width of the Box
    height: "6.5vw", // Set height of the Box
    margin: "0.2vw", // Set margin around the Box
    cursor: "pointer", // Set cursor to pointer on hover
    backgroundSize: "cover", // Cover the entire Box with background image
  },
};
