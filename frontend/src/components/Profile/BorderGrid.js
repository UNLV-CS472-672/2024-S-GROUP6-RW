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
        style={{ display: "flex", width: "20vw" }}
      >
        {borders.map((border, index) => (
          <Grid
            item
            xs={3}
            justifyContent="left"
            key={index}
            style={{ width: "50vw" }}
          >
            <Avatar
              src={border.preview}
              alt={border.title}
              style={{
                width: "3vw",
                height: "3vw",
                margin: "1vw",
                cursor: "pointer",
                border: "0.1vw solid black",
              }}
              onClick={() => selectBorder(border.border)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
