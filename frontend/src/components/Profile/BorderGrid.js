import React from "react";
import { Grid, Avatar, Box } from "@mui/material";

// BorderGrid component for displaying a grid of border previews
export default function BorderGrid({ borders, selectedBorder }) {

  // Function to handle the selection of a border
  const selectBorder = (border) => {
    selectedBorder(border); // Call the selectedBorder function passed as prop
  };

  // Return the BorderGrid component
  return (
    <Box>
      {/* Grid container to display the border previews */}
      <Grid
        container
        xs={12} // Set the width to 12 columns for responsiveness
        justifyContent="left" // Align items to the left
        style={styles.borderGrid} // Apply custom styles
      >
        {/* Map through the borders array to generate Avatar components */}
        {borders.map((border, index) => (
          <Grid
            item
            xs={3} // Set the width to 3 columns for responsiveness
            justifyContent="left" // Align items to the left
            key={index} // Unique key for each Avatar component
          >
            {/* Avatar component representing the border preview */}
            <Avatar
              src={border.preview} // Set the source of the Avatar image
              alt={border.title} // Alt text for the Avatar image
              style={styles.border} // Apply custom styles
              onClick={() => selectBorder(border)} // Handle click event to select the border
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

// Styles for the BorderGrid component
const styles = {
  borderGrid: {
    display: "flex", // Display as flex container
    width: "100%", // Full width
  },
  border: {
    width: "5vw", // Set width of the Avatar
    height: "5vw", // Set height of the Avatar
    margin: "1vw", // Set margin around the Avatar
    cursor: "pointer", // Set cursor to pointer on hover
    border: "0.1vw solid black", // Add border around the Avatar
  },
};
