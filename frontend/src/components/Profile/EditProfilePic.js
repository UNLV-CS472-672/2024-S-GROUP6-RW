import React, { useState } from "react";
import { CompactPicker } from "react-color";
import { Popover, Typography, Tabs, Tab, Box } from "@mui/material";
import AvatarGrid from "./AvatarGrid";
import BorderGrid from "./BorderGrid";
import BackdropGrid from "./BackdropGrid";

// Import your images
import Beagle from "../../images/avatars/beagle.jpg";
import Bear from "../../images/avatars/bear.jpg";
import Camel from "../../images/avatars/camel.jpg";
import Dolphin from "../../images/avatars/dolphin.jpg";
import Eagle from "../../images/avatars/eagle.jpg";
import Fox from "../../images/avatars/fox.jpg";
import Iguana from "../../images/avatars/iguana.jpg";
import Panda from "../../images/avatars/panda.jpg";
import Red_Panda from "../../images/avatars/red_panda.jpg";

import { ReactComponent as Default_Border } from "../../images/borders/Default_Border.svg";
import { ReactComponent as Star_Border } from "../../images/borders/Star_Border.svg";
import { ReactComponent as Spike_Border } from "../../images/borders/Spike_Border.svg";
import { ReactComponent as Flower_Border } from "../../images/borders/Flower_Border.svg";
import { ReactComponent as Hole_Border } from "../../images/borders/Hole_Border.svg";
import { ReactComponent as Bone_Border } from "../../images/borders/Bone_Border.svg";
import { ReactComponent as Wave_Border } from "../../images/borders/Wave_Border.svg";
import { ReactComponent as Helix_Border } from "../../images/borders/Helix_Border.svg";
import Default_Preview from "../../images/border_previews/Default_Preview.png";
import Star_Preview from "../../images/border_previews/Star_Preview.png";
import Spike_Preview from "../../images/border_previews/Spike_Preview.png";
import Flower_Preview from "../../images/border_previews/Flower_Preview.png";
import Hole_Preview from "../../images/border_previews/Hole_Preview.png";
import Bone_Preview from "../../images/border_previews/Bone_Preview.png";
import Wave_Preview from "../../images/border_previews/Wave_Preview.png";
import Helix_Preview from "../../images/border_previews/Helix_Preview.png";

// Import your images
import Valley from "../../images/backdrops/valley.jpg";
import Grass from "../../images/backdrops/grass.jpg";
import Ocean from "../../images/backdrops/ocean.jpg";
import City from "../../images/backdrops/city.jpg";
import Desert from "../../images/backdrops/desert.jpg";
import Space from "../../images/backdrops/space.jpg";

export default function EditProfilePic({
  open,
  onClose,
  anchorEl,
  selectedImg,
  selectedBorder,
  selectedBackdrop,
  setBorderColor,
  addCustomAvatar,
  currentCustomAvatars,
}) {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [chromePickerOpen, setChromePickerOpen] = useState(false);
  const [color, setColor] = React.useState("black");

  const handleChange = (event, newValue) => {
    if (newValue === 1) {
      setChromePickerOpen(true);
    } else {
      setChromePickerOpen(false);
    }

    setSelectedTab(newValue);
  };

  // Update borderColor state when color changes
  const handleColorChange = (updatedColor) => {
    setColor(updatedColor.hex); // Update color state
    setBorderColor(updatedColor.hex); // Update borderColor state
  };

  // Array of image paths
  // Array of image objects with required properties
  const pictures = [
    { img: Beagle, title: "Beagle" },
    { img: Bear, title: "Bear" },
    { img: Camel, title: "Camel" },
    { img: Dolphin, title: "Dolphin" },
    { img: Eagle, title: "Eagle" },
    { img: Fox, title: "Fox" },
    { img: Iguana, title: "Iguana" },
    { img: Panda, title: "Panda" },
    { img: Red_Panda, title: "Red_Panda" },
  ];
  const borders = [
    { border: Default_Border, preview: Default_Preview },
    { border: Star_Border, preview: Star_Preview },
    { border: Spike_Border, preview: Spike_Preview },
    { border: Flower_Border, preview: Flower_Preview },
    { border: Hole_Border, preview: Hole_Preview },
    { border: Bone_Border, preview: Bone_Preview },
    { border: Wave_Border, preview: Wave_Preview },
    { border: Helix_Border, preview: Helix_Preview },
  ];

  const backdrops = [
    { img: Valley, title: "Valley", textColor: "black" },
    { img: Grass, title: "Grass", textColor: "black" },
    { img: Ocean, title: "Ocean", textColor: "black" },
    { img: City, title: "City", textColor: "#EDEBFF" },
    { img: Desert, title: "Desert", textColor: "black" },
    { img: Space, title: "Space", textColor: "white" },
  ]
  // Calculate the width of the Popover based on whether the Border tab is selected
  //const popoverWidth = selectedTab === 1 ? "36vw" : "22vw";

  return (
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
      sx={styles.popover}
    >
      {/* Make the popover draggable */}
      <div style={styles.popoverContainer}>
        <Typography
          align="center"
          variant="h6"
          style={{ marginTop: "1vw", fontSize: "2vw", fontFamily: "Radley" }}
        >
          Customize
        </Typography>
        <Box style={styles.tabBox}>
          <Tabs
            value={selectedTab}
            onChange={handleChange}
            centered
            style={styles.tabs}
            indicatorColor="black"
          >
            <Tab label="Picture" style={styles.tab} />
            <Tab label="Border"  style={styles.tab} />
            <Tab label="Backdrop"  style={styles.tab} />
          </Tabs>
          {/* Content for the tabs */}
          {selectedTab === 0 && (
              <AvatarGrid
                avatars={pictures}
                selectedImg={selectedImg}
                addCustomAvatar={(avatar) => addCustomAvatar(avatar)}
                customAvatars={currentCustomAvatars}
              />
          )}
          {selectedTab === 1 && (
              <BorderGrid borders={borders} selectedBorder={selectedBorder} />
          )}
          {chromePickerOpen && (
            <>
            <div style={styles.colorPickers}>
              <CompactPicker
              color={color}
              onChange={handleColorChange}
            />
            </div>
            </>
          )}
          {selectedTab === 2 && (
              <BackdropGrid backdrops={backdrops} selectedBackdrop={selectedBackdrop} />
          )}
        </Box>
        </div>
    </Popover>
  );
}

const styles = {
  popover: {
     postion: "relative",
  },
  popoverContainer: {
    postion: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "30vw",
    height: "30vw",
  },
  tabBox: {
    width: "95%",
    height: "100%",
    padding: "0.75vw",
  },
  tabs: {
    alignItems: "center",
    width: "100%",
    height: "3vw",
  },
  tab: { 
    height: "100%",
    padding: "1vw 0vw",
    fontSize: "1vw", 
    fontWeight: "500",
    fontFamily: "Radley",
    minWidth: "6vw",
    minHeight: "2vw",
  },
  colorPickers: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
    margin: "0.2vw 0vw",
  }
}