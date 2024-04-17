// TripsTab.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const tripInfo = [
  {
    url: "/mchouse.jpg",
    title: "ur moms house",
    width: "50%",
    height: "50%",
  },
  {
    url: "/hobbithome.jpg",
    title: "Hobbit Home",
    width: "50%",
    height: "50%",
  },

  {
    url: "/paris.jpg",
    title: "Paris",
    width: "50%",
    height: "50%",
  },
  {
    url: "/seoul.jpg",
    title: "Seoul",
    width: "50%",
    height: "50%",
  },
  {
    url: "/test.jpg",
    title: "Las Vegas",
    width: "50%",
    height: "50%",
  },
  {
    url: "/tokyo.jpg",
    title: "Tokyo",
    width: "50%",
    height: "50%",
  },
  {
    url: "/mchouse.jpg",
    title: "ur moms house",
    width: "50%",
    height: "50%",
  },
  {
    url: "/hobbithome.jpg",
    title: "Hobbit Home",
    width: "50%",
    height: "50%",
  },

  {
    url: "/paris.jpg",
    title: "Paris",
    width: "50%",
    height: "50%",
  },
  {
    url: "/seoul.jpg",
    title: "Seoul",
    width: "50%",
    height: "50%",
  },
  {
    url: "/test.jpg",
    title: "Las Vegas",
    width: "50%",
    height: "50%",
  },
  {
    url: "/tokyo.jpg",
    title: "Tokyo",
    width: "50%",
    height: "50%",
  },
];

export default function TripsTab() {
  const theme = useTheme();
  // Mock friends list until we implement handlers to get data from backend

  return (
    <div
      style={{
        marginTop: "1vw",
        maxHeight: "31vw",
        overflowY: "auto", // Add overflowY to enable vertical scrolling
        scrollbarWidth: "none", // Hide scrollbar for Firefox
        "&::-webkit-scrollbar": {
          display: "none", // Hide scrollbar for webkit browsers (Chrome, Safari)
        },
      }}
    >
      <Grid
        container
        justifyContent="left"
        alignItems="start"
        spacing="0" // Set spacing to 0
        sx={{
          width: "38vw",
          marginLeft: "1.3vw",
        }}
      >
        {tripInfo.map((trip) => (
          <Grid
            item
            xs={3.8}
            style={{ marginRight: "0.6vw", marginBottom: "0.21vw" }}
          >
            <Card // Setup a clickable link for trip
              component={Link}
              to={trip.link}
            >
              <CardActionArea>
                <CardMedia // Display image of trip
                  component="img"
                  height="180"
                  image={trip.url}
                  alt={trip.title}
                  style={{ height: "19vh", position: "relative" }}
                />
                <Box
                  component="div"
                  sx={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "black",
                    color: "white",
                    opacity: 0.6,
                  }}
                >
                  <Typography // Overlay trip title on top of trip image
                    variant="h5"
                  >
                    {trip.title}
                  </Typography>
                </Box>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
