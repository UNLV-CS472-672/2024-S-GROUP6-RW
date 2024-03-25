import React from "react";
import { Grid, Avatar, Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

// Import placeholder image
import Red from "../../images/avatars/Red.jpg";

export default function FriendsTab() {
  const theme = useTheme();

  // Mock friends list until we implement handlers to get data from backend
  const friendInfo = [
    { img: Red, username: "Friend 1" },
    { img: Red, username: "Friend 2" },
    { img: Red, username: "Friend 3" },
    { img: Red, username: "Friend 4" },
    { img: Red, username: "Friend 5" },
    { img: Red, username: "Friend 6" },
    { img: Red, username: "Friend 7" },
    { img: Red, username: "Friend 8" },
    { img: Red, username: "Friend 9" },
    { img: Red, username: "Friend 10" },
    { img: Red, username: "Friend 11" },
    { img: Red, username: "Friend 12" },
    { img: Red, username: "Friend 13" },
    { img: Red, username: "Friend 14" },
    { img: Red, username: "Friend 15" },
    { img: Red, username: "Friend 16" },
  ];

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
                  border: `0.15vw solid ${theme.palette.text.primary}`,
                }}
              >
                <Avatar // First show friend's profile image
                  src={friend.img}
                  alt={""}
                  style={{
                    width: "3vw",
                    height: "3vw",
                    margin: "1vw",
                    border: "0.1vw solid black",
                  }}
                />
                <Typography // To the right of image display username
                  sx={{ fontSize: "1.5vw", textTransform: "uppercase" }}
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
