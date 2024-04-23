import React from "react";
import { Grid, Avatar, Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

// Import placeholder image
import Beagle from "../../images/avatars/beagle.jpg";

export default function FriendsTab({ textColor, behindTextBlur }) {

  // Mock friends list until we implement handlers to get data from backend
  const friendInfo = [
    { img: Beagle, username: "Bob" },
    { img: Beagle, username: "Joe" },
    { img: Beagle, username: "Paul" },
    { img: Beagle, username: "Emily" },
    { img: Beagle, username: "Dennis" },
    { img: Beagle, username: "Ashley" },
    { img: Beagle, username: "Cassandra" },
    { img: Beagle, username: "Brian" },
    { img: Beagle, username: "Sam" },
    { img: Beagle, username: "Montgomery" },
  ];
  console.log(textColor);

  return (
    <div
      style={{
        marginTop: "1vw",
        maxHeight: "24.5vw",
        overflowY: "auto", // Add overflowY to enable vertical scrolling
        scrollbarWidth: "none", // Hide scrollbar for Firefox
        "&::-webkit-scrollbar": {
          display: "none", // Hide scrollbar for webkit browsers (Chrome, Safari)
        },
      }}
    >
      <Grid // Grid used to display friends in two column format
        container
        justifyContent="left"
        alignItems="start"
        spacing="0" // Set spacing to 0
        sx={{
          width: "38vw",
          marginLeft: "1.2vw",
        }}
      >
        {friendInfo.map(
          (
            friend // For every friend in friends list generate Grid Item
          ) => (
            <Grid
              item
              xs={5.8}
              style={{ marginRight: "0.6vw", marginBottom: "0.21vw" }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "3.9vw",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  border: `0.15vw solid ${textColor}`,
                  background: `${behindTextBlur}`,
                }}
              >
                <Avatar // First show friend's profile image
                  src={friend.img}
                  alt={""}
                  style={{
                    width: "3vw",
                    height: "3vw",
                    margin: "1vw",
                    border: `0.1vw solid ${textColor}`,
                  }}
                />
                <Typography // To the right of image display username
                  sx={{ fontSize: "1.5vw", fontFamily: "Radley", textTransform: "uppercase", color: textColor }}
                >
                  {friend.username}
                </Typography>
              </Box>
            </Grid>
          )
        )}
      </Grid>
    </div>
  );
}
