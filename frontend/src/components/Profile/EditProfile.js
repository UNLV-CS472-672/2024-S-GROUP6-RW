import React, { useState } from "react";
import { CompactPicker } from "react-color";
import { Popover, Typography, Tabs, Tab, Box, Button } from "@mui/material";
import AvatarGrid from "./AvatarGrid";
import BorderGrid from "./BorderGrid";
import BackdropGrid from "./BackdropGrid";

// EditProfilePic component for customizing profile picture, border, and backdrop
export default function EditProfilePic({
  open,
  onClose,
  anchorEl,
  selectedImg,
  selectedBorder,
  selectedBackdrop,
  setBorderColor,
  addCustomAvatar,
  pictures,
  borders,
  backdrops,
  onSave,
}) {
  // State for managing selected tab and color picker visibility
  const [selectedTab, setSelectedTab] = useState(0);
  const [color, setColor] = React.useState("black");

  // Function to handle tab change
  const handleChange = (event, newValue) => {
    // Set the selected tab
    setSelectedTab(newValue);
  };

  // Update borderColor state when color changes
  const handleColorChange = (updatedColor) => {
    setColor(updatedColor.hex); // Update color state
    setBorderColor(updatedColor.hex); // Update borderColor state
  };

  // Function to handle save button click
  const handleSaveButtonClick = () => {
    onSave(); // Call the onSave function passed as prop
  };

  return (
    // Popover component for displaying customization options
    <Popover
      open={open}
      onClose={onClose}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      {/* Popover content */}
      <div style={styles.popoverContainer}>
        {/* Header */}
        <Typography
          align="center"
          variant="h6"
          style={{ marginTop: "1vw", fontSize: "2vw", fontFamily: "Radley" }}
        >
          Customize
        </Typography>
        {/* Tabs for selecting customization options */}
        <Box style={styles.tabBox}>
          <Tabs
            value={selectedTab}
            onChange={handleChange}
            centered
            style={styles.tabs}
            TabIndicatorProps={{
              style: {
                backgroundColor: "black",
              },
            }}
            variant="fullWidth"
          >
            <Tab label="Picture" style={styles.tab} />
            <Tab label="Border" style={styles.tab} />
            <Tab label="Backdrop" style={styles.tab} />
          </Tabs>
          {/* Content for the tabs */}
          {selectedTab === 0 && (
            <div style={{ height: "21vw" }}>
              <AvatarGrid
                avatars={pictures}
                selectedImg={selectedImg}
                addCustomAvatar={(avatar) => addCustomAvatar(avatar)}
              />
            </div>
          )}
          {selectedTab === 1 && (
            <div data-testid="color-picker" style={{ height: "21vw", overflow: "auto", }}>
              <BorderGrid borders={borders} selectedBorder={selectedBorder} />
              {/* Color picker for selecting border color */}
              <div  style={styles.colorPickers}>
                <CompactPicker color={color} onChange={handleColorChange} />
              </div>
            </div>
          )}
          {selectedTab === 2 && (
            <div style={{ height: "21vw", overflow: "auto", }}>
              <BackdropGrid
                backdrops={backdrops}
                selectedBackdrop={selectedBackdrop}
              />
            </div>
          )}
        </Box>
        {/* Save button */}
        <Button data-testid="save-button" variant="contained" style={styles.saveButton} onClick={handleSaveButtonClick}>
          Save Changes...
        </Button>
      </div>
    </Popover>
  );
}

// Styles for the EditProfilePic component
const styles = {
  popoverContainer: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between", // Add this property
    width: "32vw",
    height: "34vw",
  },
  tabBox: {
    width: "95%",
    height: "100%",
    padding: "0.75vw",
    marginBottom: "auto", // Add margin-bottom auto to push content to the top
  },
  tabs: {
    alignItems: "center",
    width: "95%",
    height: "3vw",
    marginLeft: "auto",
    marginRight: "auto",
  },
  tab: {
    height: "100%",
    padding: "1vw 0vw",
    fontSize: "1vw",
    fontWeight: "500",
    fontFamily: "Radley",
    minWidth: "6vw",
    minHeight: "2vw",
    color: "black",
  },
  colorPickers: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
    margin: "0.2vw 0vw",
  },
  bannerBox: {
    width: "100%",
    height: "80%",
    display: "flex",
    position: "relative",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  saveButton: {
    backgroundColor: "black",
    fontFamily: "Radley",
    fontSize: "1vw",
    lineHeight: "1vw",
    padding: "0.8vw",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "2vw",
  },
};
