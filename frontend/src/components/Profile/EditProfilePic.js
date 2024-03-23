import React, { useState } from "react";
import { SketchPicker } from "react-color";
import {
  Popover,
  Typography,
  Tabs,
  Tab,
  ImageList,
  ImageListItem,
  Box,
  Button,
} from "@mui/material";
import Draggable from "react-draggable"; // Import Draggable from react-draggable
import AvatarGrid from "./AvatarGrid";
import BorderGrid from "./BorderGrid";

// Import your images
import Red from "../../images/avatars/Red.jpg";
import Blues from "../../images/avatars/Blues.jpg";
import Chuck from "../../images/avatars/Chuck.jpg";
import Bomb from "../../images/avatars/Bomb.jpg";
import Matilda from "../../images/avatars/Matilda.jpg";
import Hal from "../../images/avatars/Hal.jpg";
import Terence from "../../images/avatars/Terence.jpg";
import Bubbles from "../../images/avatars/Bubbles.jpg";
import Stella from "../../images/avatars/Stella.jpg";

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

export default function EditProfilePic({
  open,
  onClose,
  anchorEl,
  selectedImg,
  selectedBorder,
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
    { img: Red, title: "Red" },
    { img: Blues, title: "Blues" },
    { img: Chuck, title: "Chuck" },
    { img: Bomb, title: "Bomb" },
    { img: Matilda, title: "Matilda" },
    { img: Hal, title: "Hal" },
    { img: Terence, title: "Terence" },
    { img: Bubbles, title: "Bubbles" },
    { img: Stella, title: "Stella" },
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
  // Calculate the width of the Popover based on whether the Border tab is selected
  const popoverWidth = selectedTab === 1 ? "36vw" : "22vw";

  return (
    <Popover
      open={open}
      onClose={onClose}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "center",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "center",
        horizontal: "left",
      }}
      style={{
        marginLeft: "3vw",
      }}
      PaperProps={{
        style: {
          width: popoverWidth,
        },
      }}
    >
      {/* Make the popover draggable */}
      <div style={{ postion: "relative" }}>
        <div
          style={{
            position: "absolute",
            right: "0.20vw",
            top: "0.15vw",
          }}
        >
          {chromePickerOpen && (
            <SketchPicker
              width="13vw"
              disableAlpha={true}
              color={color}
              onChange={handleColorChange}
            />
          )}
        </div>
        <div style={{ width: "22vw" }}>
          <Typography
            align="center"
            variant="h6"
            style={{ marginTop: "1vw", fontSize: "2vw" }}
          >
            Edit Profile Picture
          </Typography>
          <Box style={{ width: "20vw", height: "28vh", padding: "0.75vw" }}>
            <Tabs
              value={selectedTab}
              onChange={handleChange}
              centered
              sx={{ width: "20vw" }}
            >
              <Tab label="Picture" sx={{ fontSize: "1vw" }} />
              <Tab label="Border" sx={{ fontSize: "1vw" }} />
            </Tabs>
            {/* Content for the tabs */}
            {selectedTab === 0 && (
              <div style={{ maxHeight: "10vw", overflowY: "auto" }}>
                <AvatarGrid
                  avatars={pictures}
                  selectedImg={selectedImg}
                  addCustomAvatar={(avatar) => addCustomAvatar(avatar)}
                  customAvatars={currentCustomAvatars}
                />
              </div>
            )}
            {selectedTab === 1 && (
              <div style={{ maxHeight: "10vw", overflowY: "auto" }}>
                <BorderGrid borders={borders} selectedBorder={selectedBorder} />
              </div>
            )}
          </Box>
        </div>
      </div>
    </Popover>
  );
}
