import React from "react";
import { Grid, Avatar, Box } from "@mui/material";

export default function BorderGrid({ backdrops, selectedBackdrop }) {

  const selectBackdrop = (backdrop) => {
    selectedBackdrop(backdrop);
  };

  return (
    <Box>
      <Grid
        container
        xs={12}
        justifyContent="left"
        style={styles.backdropGrid}
      >
        {backdrops.map((backdrop, index) => (
          <Grid
            item
            xs={6}
            justifyContent="left"
            key={index}
          >
            <Box
                style={{...styles.backdrop, backgroundImage: `url(${backdrop.img})`}}
                onClick={() => selectBackdrop(backdrop)}
                >
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

const styles = {
  backdropGrid: {
    display: "flex",
    width: "100%",
  },
  backdrop: {
    width: "13.5vw",
    height: "6.75vw",
    cursor: "pointer",
    backgroundSize: "cover",
  },
}