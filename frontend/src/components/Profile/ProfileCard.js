import React, { useState, useRef } from "react";
import { Tabs, Tab, Box, IconButton } from "@mui/material";
import FriendsTab from "./FriendsTab";
import AboutTab from "./AboutTab";
import TripsTab from "./TripsTab";
import EditProfile from "./EditProfile";
import NameTag from "./NameTag";
import PaletteIcon from "@mui/icons-material/Palette";
import EditIcon from "@mui/icons-material/Edit";
import { useTheme } from "@mui/material/styles";
import { saveProfile } from "../../utils/ApiManager";

// Import images for avatars
import Beagle from "../../images/avatars/beagle.jpg";
import Bear from "../../images/avatars/bear.jpg";
import Tiger from "../../images/avatars/tiger.jpg";
import Camel from "../../images/avatars/camel.jpg";
import Dolphin from "../../images/avatars/dolphin.jpg";
import Eagle from "../../images/avatars/eagle.jpg";
import Fox from "../../images/avatars/fox.jpg";
import Iguana from "../../images/avatars/iguana.jpg";
import Panda from "../../images/avatars/panda.jpg";
import Red_Panda from "../../images/avatars/red_panda.jpg";

// Import SVG components for borders
import { ReactComponent as Default_Border } from "../../images/borders/Default_Border.svg";
import { ReactComponent as Star_Border } from "../../images/borders/Star_Border.svg";
import { ReactComponent as Spike_Border } from "../../images/borders/Spike_Border.svg";
import { ReactComponent as Flower_Border } from "../../images/borders/Flower_Border.svg";
import { ReactComponent as Hole_Border } from "../../images/borders/Hole_Border.svg";
import { ReactComponent as Bone_Border } from "../../images/borders/Bone_Border.svg";
import { ReactComponent as Wave_Border } from "../../images/borders/Wave_Border.svg";
import { ReactComponent as Helix_Border } from "../../images/borders/Helix_Border.svg";

// Import preview images for borders
import Default_Preview from "../../images/border_previews/Default_Preview.png";
import Star_Preview from "../../images/border_previews/Star_Preview.png";
import Spike_Preview from "../../images/border_previews/Spike_Preview.png";
import Flower_Preview from "../../images/border_previews/Flower_Preview.png";
import Hole_Preview from "../../images/border_previews/Hole_Preview.png";
import Bone_Preview from "../../images/border_previews/Bone_Preview.png";
import Wave_Preview from "../../images/border_previews/Wave_Preview.png";
import Helix_Preview from "../../images/border_previews/Helix_Preview.png";

// Import images for backdrops
import Valley from "../../images/backdrops/valley.jpg";
import Grass from "../../images/backdrops/grass.jpg";
import Ocean from "../../images/backdrops/ocean.jpg";
import City from "../../images/backdrops/city.jpg";
import Desert from "../../images/backdrops/desert.jpg";
import Space from "../../images/backdrops/space.jpg";

/**
 * ChatGPT was used to comment the following code
 * and provide recommendations of certain MUI components
 * and React functions I could use. However, the code
 * was my own implementation.
 * (ChatGPT 3.5, 2)
 */

export default function ProfileCard({ name, allowEdit, image, about, selection, setAlertMessage, setAlertSucceeded, setShowAlert }) {
  // useRef for the palette button
  const paletteButtonRef = useRef(null);
  const theme = useTheme();

  // Variables to hold user selections
  var userPicture;
  var userBorder;
  var userColor;
  var userBackdrop;

  // Destructure user selections from selection prop
  if (selection) {
    const [a, b, c, d] = selection.split('-');
    userPicture = a;
    userBorder = b;
    userColor = c;
    userBackdrop = d;
  }

  // State variables for previous selections
  const [previousPicture, setPreviousPicture] = useState(userPicture);
  const [previousBorder, setPreviousBorder] = useState(userBorder);
  const [previousColor, setPreviousColor] = useState(userColor);
  const [previousBackdrop, setPreviousBackdrop] = useState(userBackdrop);

  // Boolean to track if a custom picture is found
  var customPicFound = false;

  // Array of default avatar images
  var pics = [
    { img: Beagle, title: "Beagle", id: 1 },
    { img: Bear, title: "Bear", id: 2 },
    { img: Tiger, title: "Tiger", id: 3 },
    { img: Camel, title: "Camel", id: 4 },
    { img: Dolphin, title: "Dolphin", id: 5 },
    { img: Eagle, title: "Eagle", id: 6 },
    { img: Fox, title: "Fox", id: 7 },
    { img: Iguana, title: "Iguana", id: 8 },
    { img: Panda, title: "Panda", id: 9 },
    { img: Red_Panda, title: "Red_Panda", id: 10 },
  ];

  // Check if custom image is provided
  if (image !== "") {
    // If custom image exists, add it to the pics array
    pics = [{img: image, title: "Custom", id: 0}, ...pics];
    customPicFound = true;
  }

    // Array of border SVG components
  var borders = [
    { border: Default_Border, preview: Default_Preview, id: 0 },
    { border: Star_Border, preview: Star_Preview, id: 1 },
    { border: Spike_Border, preview: Spike_Preview, id: 2 },
    { border: Flower_Border, preview: Flower_Preview, id: 3 },
    { border: Hole_Border, preview: Hole_Preview, id: 4 },
    { border: Bone_Border, preview: Bone_Preview, id: 5 },
    { border: Wave_Border, preview: Wave_Preview, id: 6 },
    { border: Helix_Border, preview: Helix_Preview, id: 7 },
  ];

    // Array of backdrop images
  var backdrops = [
    { img: Grass, title: "Grass", textColor: "black", nameGradient: "linear-gradient(#57B000, #A1DF50)", id: 0 },
    { img: Ocean, title: "Ocean", textColor: "black", nameGradient: "linear-gradient(#00B0DC, lightblue)", id: 1 },
    { img: Valley, title: "Valley", textColor: "black", nameGradient: "linear-gradient(#9D92DF, #FFE5B4)", id: 2 },
    { img: City, title: "City", textColor: "white", nameGradient: "linear-gradient(#9300FF, #C8ADFD)", id: 3 },
    { img: Desert, title: "Desert", textColor: "black", nameGradient: "linear-gradient(#ED8438, #EDBB97)", id: 4 },
    { img: Space, title: "Space", textColor: "white", nameGradient: "linear-gradient(#A0A0A0, white)", id: 5 },
  ]

  const [pictures,setPictures] = useState(pics);
  const [selectedTab, setSelectedTab] = useState(0);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState(customPicFound ? pictures[userPicture] : pictures[userPicture-1]);
  const [SelectedBorder, setSelectedBorder] = useState(borders[userBorder]?.border || Default_Border);
  const [selectedBorderId, setSelectedBorderId] = useState(borders[userBorder]?.id || 0);
  const [borderColor, setBorderColor] = useState(userColor);
  const [selectedBackdrop, setSelectedBackdrop] = useState(backdrops[userBackdrop]);
  const [textColor, setTextColor] = useState(backdrops[userBackdrop]?.textColor || "black");
  const [description, setDescription] = useState(about);
  const [paletteEnabled, setPaletteEnabled] = useState(false);
  const [editEnabled, setEditEnabled] = useState(false);
  const [nameGradient, setNameGradient] = useState(backdrops[userBackdrop]?.nameGradient || "linear-gradient(#57B000, #A1DF50)");
  const [behindTextBlur, setBehindTextBlur] = useState((backdrops[userBackdrop]?.textColor || "black") === "white" ? "rgba(0, 0, 0, 0.4)" : "rgba(255, 255, 255, 0.4)");
  const [currentCount, setCurrentCount] = useState(description?.length || 0);
  const maxCharLimit = 300;

// Function to save profile data
const handleSaveData = () => {
  var dataString = "";
  // Check if any changes have been made to the profile
  if (selectedImg.id == previousPicture && selectedBorderId == previousBorder && borderColor == previousColor && selectedBackdrop.id == previousBackdrop) {
    // If no changes found, display a message and set showAlert to true
    setAlertMessage("No changes found...");
    setAlertSucceeded(false);
    setShowAlert(true);
  } else {
    // If changes found, construct the dataString for saving profile
    if (pictures[0].id === 0) {
      dataString = dataString + pictures[0].img;
    }
    dataString = dataString + "%" + description;
    dataString = dataString + "%" + (selectedImg?.id || 1) + "-" + selectedBorderId + "-" + borderColor + "-" + (selectedBackdrop?.id || 0);

    // Update previous selections with the current selections
    setPreviousPicture(selectedImg.id);
    setPreviousBorder(selectedBorderId)
    setPreviousColor(borderColor)
    setPreviousBackdrop(selectedBackdrop?.id || 0);

    // Log the dataString and save profile data via API
    console.log(dataString);
    saveProfile(dataString);
    // Display success message and set showAlert to true
    setAlertMessage("Changes have been saved!!");
    setAlertSucceeded(true);
    setShowAlert(true);
  }
}

// Function to toggle edit mode
const handleEditMode = () => {
  // Toggle editEnabled state between true and false
  if (!editEnabled) {
    setEditEnabled(true);
  } else {
    setEditEnabled(false);
  }
};

// Function to handle tab change
const handleChange = (event, newValue) => {
  // Update selectedTab state with the new tab value
  setSelectedTab(newValue);
};

// Function to open edit profile pic dialog
const handleEditProfileOpen = () => {
  // Enable palette button and open edit profile pic dialog
  setPaletteEnabled(true);
  setEditProfileOpen(true);
};

// Function to close edit profile pic dialog
const handleEditProfileClose = () => {
  // Disable palette button and close edit profile pic dialog
  setPaletteEnabled(false);
  setEditProfileOpen(false);
};

// Function to set new profile picture
const setNewPicture = (image) => {
  // Update selectedImg state with the new image
  setSelectedImg(image);
};

// Function to set new border
const setNewBorder = (border) => {
  // Update selectedBorder and selectedBorderId states with the new border
  setSelectedBorder(border.border);
  setSelectedBorderId(border.id);
};

// Function to set custom avatar
const setCustomAvatars = (avatars) => {
  // Update pictures state with custom avatar
  setPictures(avatars);
};

// Function to set new backdrop
const setNewBackdrop = (backdrop) => {
  // Update selectedBackdrop, textColor, nameGradient, and behindTextBlur states with the new backdrop
  setSelectedBackdrop(backdrop);
  setTextColor(backdrop.textColor);
  setNameGradient(backdrop.nameGradient);
  
  // Update behindTextBlur state based on the backdrop's text color
  if (backdrop.textColor === "white") {
    setBehindTextBlur("rgba(0, 0, 0, 0.4)");
  } else {
    setBehindTextBlur("rgba(255, 255, 255, 0.4)");
  }
}

  return (
    <>
    <Box data-testid="backdrop-image"
      style={{
        ...styles.container,
        border: "0.4vw solid black",
        backgroundImage: `url(${selectedBackdrop?.img || Valley})`,
        backgroundSize: "cover",
      }}
    >
      <Box style={styles.profileBox}>
        <Box style={styles.avatarBox}>
          <SelectedBorder
            style={styles.border}
            fill={borderColor}
            stroke="black"
            strokeWidth="0.15vw" // Corrected the attribute name
          />
          <img data-testid="profile-picture" src={selectedImg?.img || Beagle} style={styles.image} alt="Profile" />
        </Box>
        <NameTag name={name} nameGradient={nameGradient} />
      </Box>
      <div style={styles.tabBox}>
          {allowEdit && (<div
            style={{
              ...styles.paletteContainer,
              border: paletteEnabled
                ? "0.3vw solid #03a9f4" // Highlights the button in Edit Mode
                : "0.3vw solid transparent",
            }}
          >
            <IconButton data-testid="palette-button" style={{...styles.paletteButton, border: `0.15vw solid ${textColor}`}} onClick={handleEditProfileOpen} ref={paletteButtonRef}>
              <PaletteIcon style={{...styles.paletteIcon, color: textColor}}/>
            </IconButton>
          </div>)}
        {selectedTab === 0 && (<>
          {allowEdit && (<div
            style={{
              ...styles.editContainer,
              border: editEnabled
                ? "0.3vw solid #03a9f4" // Highlights the button in Edit Mode
                : "0.3vw solid transparent",
            }}
          >
            <IconButton style={{...styles.editButton, border: `0.15vw solid ${textColor}`}} onClick={handleEditMode}>
              <EditIcon style={{...styles.editIcon, color: textColor}}/>
            </IconButton>
          </div>)}
          {/* Display the fraction n/m */}
          {editEnabled && (<p style={{...styles.charCounter, color: textColor}}>{`${currentCount}/${maxCharLimit}`}</p>)}
        </>)}
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          centered={true}
          className="tabs-container"
          style={styles.tabs}
          TabIndicatorProps={{
            style: {
              backgroundColor: `${textColor}`,
            }
          }}
        >
          <Tab label="About" style={{...styles.tab, color: textColor}} />
          <Tab label="Friends" style={{...styles.tab, color: textColor}} />
          <Tab data-testid="trip-label" label="Trips" style={{...styles.tab, color: textColor}} />
        </Tabs>
        {selectedTab === 0 && (
          <AboutTab
            description={description}
            setDescription={setDescription}
            editMode={editEnabled}
            textColor={textColor}
            currentCount={setCurrentCount}
            maxCharLimit={maxCharLimit}
          />
        )}
        {selectedTab === 1 && <div data-testid="friends-tab"><FriendsTab  textColor={textColor} behindTextBlur={behindTextBlur} /></div>}
        {selectedTab === 2 && <div data-testid="trips-tab"><TripsTab /></div>}
      </div>
      <EditProfile // Pop up that displays only when profile picture is clicked
        open={editProfileOpen}
        onClose={handleEditProfileClose}
        anchorEl={paletteButtonRef.current}
        selectedImg={(image) => setNewPicture(image)}
        selectedBorder={(border) => setNewBorder(border)}
        selectedBackdrop={(backdrop) => setNewBackdrop(backdrop)}
        setBorderColor={setBorderColor}
        addCustomAvatar={(avatar) => setCustomAvatars(avatar)}
        pictures={pictures}
        borders={borders}
        backdrops={backdrops}
        onSave={handleSaveData}
      />
    </Box>
    </>
  );
}

// Styles for the ProfileCard component
const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    position: "relative",
    width: "80vw",
    height: "40vw",
    marginLeft: "auto",
    marginRight: "auto",
    borderRight: "0.4vw solid black",
  },
  profileBox: {
    width: "50%",
    position: "relative",
  },
  bannerBox: {
    width: "100%",
    height: "10vw",
    backgroundColor: "white",
    marginBottom: "10px",
    position: "relative",
  },
  input: {
    display: "none",
    width: "100%",
    height: "10vw",
  },
  avatarBox: {
    width: "21vw",
    height: "21vw",
    backgroundColor: "lightgray",
    marginBottom: "10px",
    position: "absolute",
    borderRadius: "50%",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    userSelect: "none",
  },
  border: {
    width: "100%",
    height: "100%",
    top: "0",
    right: "0",
    position: "absolute",
    transform: "translate(0, 0) scale(1.32)",
    filter: "drop-shadow(0.1vw 0.1vw black)",
  },
  button: {
    width: "auto",
    height: "auto",
    border: "none",
    background: "transparent",
    padding: 0,
    borderRadius: "50%",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    outline: "0.15vw solid black",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    border: "none",
    background: "transparent",
    objectFit: "cover",
    objectPosition: "center",
    padding: 0,
    borderRadius: "50%",
    position: "relative",
  },

  bannerImage: {
    width: "100%",
    height: "100%",
    border: "none",
    background: "transparent",
    objectFit: "cover",
    objectPosition: "center",
    padding: 0,
    position: "relative",
  },
  tabBox: {
    position: "relative",
    width: "50%",
    display: "flex",
    flexDirection: "column",
    justfityContent: "center",
  },
  tabs: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: "5vw",
  },
  tab: { 
    width: "2vw",
    height: "100%",
    padding: "1vw 0vw",
    fontSize: "1.2vw", 
    fontWeight: "500",
    fontFamily: "Radley",
    minWidth: "10vw",
    minHeight: "2vw",
    color: "black",
  },

  paletteContainer: {
    position: "absolute",
    width: "3vw", // Adjust width to match EditHighlight width
    height: "3vw", // Adjust height to match EditHighlight height
    top: "1vw",
    right: "1vw",
    borderRadius: "18%",
    cursor: "pointer",
    zIndex: "999",
    justifyContent: "center",
    alignItems: "center",
  },

  paletteButton: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: "0",
    right: "0",
    top: "0",
    top: "0",
    borderRadius: "10%",
    zIndex: "999",
  },
  paletteIcon: {
    width: "1.5vw",
    height: "1.5vw",
  },
  
  editContainer: {
    position: "absolute",
    width: "3vw", // Adjust width to match EditHighlight width
    height: "3vw", // Adjust height to match EditHighlight height
    top: "1vw",
    left: "1vw",
    borderRadius: "18%",
    cursor: "pointer",
    zIndex: "999",
    justifyContent: "center",
    alignItems: "center",
  },
  editButton: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: "0",
    right: "0",
    top: "0",
    top: "0",
    borderRadius: "10%",
    zIndex: "999",
  },
  editIcon: {
    width: "1.5vw",
    height: "1.5vw",
  },
  charCounter: {
    position: "absolute",
    top: "3.3vw",
    left: "1vw",
  }
};
