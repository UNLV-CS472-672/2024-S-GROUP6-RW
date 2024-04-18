import React from "react";
import { Grid, Avatar, Box } from "@mui/material";

export default function BorderGrid({ borders, selectedBorder }) {
  const svgToUrl = (svg) => {
    const blob = new Blob([svg], { type: "image/svg+xml" });
    return URL.createObjectURL(blob);
  };

  const selectBorder = (border) => {
    selectedBorder(border);
  };

  return (
    <Box>
      <Grid
        container
        xs={12}
        justifyContent="left"
        style={styles.borderGrid}
      >
        {borders.map((border, index) => (
          <Grid
            item
            xs={3}
            justifyContent="left"
            key={index}
          >
            <Avatar
              src={border.preview}
              alt={border.title}
              style={styles.border}
              onClick={() => selectBorder(border.border)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

const styles = {
  borderGrid: {
    display: "flex",
    width: "100%",
  },
  border: {
    width: "5vw",
    height: "5vw",
    margin: "1vw",
    cursor: "pointer",
    border: "0.1vw solid black",
  },
}