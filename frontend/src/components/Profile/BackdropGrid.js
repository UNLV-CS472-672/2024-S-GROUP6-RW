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
        justifyContent="center"
        style={styles.backdropGrid}
      >
        {backdrops.map((backdrop, index) => (
          <Grid
            item
            xs={6}
            display="flex"
            justifyContent="center"
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
    width: "13vw",
    height: "6.5vw",
    margin: "0.2vw",
    cursor: "pointer",
    backgroundSize: "cover",
  },
}