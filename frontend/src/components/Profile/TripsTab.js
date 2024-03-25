// TripsTab.js
import React, { useState } from "react";
import { Grid, Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function TripsTab() {
  const tripInfo = [];
  const theme = useTheme();
  // Mock friends list until we implement handlers to get data from backend

  return (
    <div
      style={{
        marginTop: "1vw",
        height: "63vh",
        overflowY: "auto", // Add overflowY to enable vertical scrolling
        scrollbarWidth: "none", // Hide scrollbar for Firefox
        "&::-webkit-scrollbar": {
          display: "none", // Hide scrollbar for webkit browsers (Chrome, Safari)
        },
      }}
    >
      {/* Replace this with actual Friends content from your PDF */}
      <Grid
        container
        justifyContent="left"
        alignItems="start"
        spacing="0" // Set spacing to 0
        sx={{
          width: "38vw",
          marginLeft: "1.2vw",
        }}
      >
        {tripInfo.map(() => (
          <Grid
            item
            xs={3.8}
            style={{ marginRight: "0.6vw", marginBottom: "0.21vw" }}
          ></Grid>
        ))}
      </Grid>
    </div>
  );
}
