import React, { useState, useRef } from "react";
import { Tabs, Tab, Box, IconButton } from "@mui/material";
import FriendsTab from "./FriendsTab";
import AboutTab from "./AboutTab";
import TripsTab from "./TripsTab";
import EditProfilePic from "./EditProfilePic";
import NameTag from "./NameTag";
import EditIcon from "@mui/icons-material/Edit";
import { useTheme } from "@mui/material/styles";

import defaultPic from "../../images/avatars/Terence.jpg";
import { ReactComponent as DefaultBorder } from "../../images/borders/Default_Border.svg";

export default function ProfileContainer() {
  // const isMobile = useMediaQuery(theme.breakpoints.down("sm")); Will implement later
  const profilePicButtonRef = useRef(null);
  const theme = useTheme();

  const profilePic = { img: defaultPic, title: "default picture" };
  const [selectedTab, setSelectedTab] = useState(0);
  const [editProfilePicOpen, setEditProfilePicOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState(profilePic);
  const [SelectedBorder, setSelectedBorder] = useState(DefaultBorder);
  const [borderColor, setBorderColor] = useState("black");
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [customAvatars, setCustomAvatars] = useState([]);
  const [description, setDescription] = useState("I am super awesome.");
  const name = "USERNAME"; // Replace with the actual name

  const [editEnabled, setEditEnabled] = useState(false);

  const handleEditMode = () => {
    if (!editEnabled) {
      setEditEnabled(true);
    } else {
      setEditEnabled(false);
    }
  };

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleEditProfilePicOpen = () => {
    setEditProfilePicOpen(true);
  };

  const handleEditProfilePicClose = () => {
    setEditProfilePicOpen(false);
  };

  const setNewPicture = (image) => {
    setSelectedImg(image);
  };

  const setNewBorder = (border) => {
    setSelectedBorder(border);
  };

  const setNewCustomAvatars = (avatars) => {
    if (customAvatars.length === 3) {
      customAvatars.pop();
    }
    setCustomAvatars(avatars);
  };

  const uploadBanner = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader(); // User selects a file and is set as the selected banner.
      reader.onload = () => {
        const imgData = reader.result;
        setSelectedBanner({ img: imgData, title: "Custom Picture" });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box
      style={{
        ...styles.container,
        border: `0.5vw solid ${theme.palette.text.primary}`,
      }}
    >
      <Box style={styles.profileBox}>
        <label htmlFor="banner-upload">
          <Box style={styles.bannerBox}>
            {selectedBanner && (
              <img
                src={selectedBanner.img}
                style={styles.bannerImage}
                alt="Banner"
              />
            )}
          </Box>
        </label>
        <input
          type="file"
          id="banner-upload"
          accept="image/*"
          style={styles.input}
          onChange={uploadBanner}
        />

        <Box style={styles.avatarBox}>
          <SelectedBorder
            style={styles.border}
            fill={borderColor}
            stroke="black"
            strokeWidth="0.15vw" // Corrected the attribute name
          />
          <button
            style={styles.button}
            onClick={handleEditProfilePicOpen}
            ref={profilePicButtonRef}
          >
            <img src={selectedImg.img} style={styles.image} alt="Profile" />
          </button>
        </Box>
        <NameTag name={name} />
      </Box>
      <div style={styles.tabBox}>
        {selectedTab === 0 && (
          <div
            style={{
              ...styles.editContainer,
              border: editEnabled
                ? "0.3vw solid #03a9f4" // Highlights the button in Edit Mode
                : "0.3vw solid transparent",
            }}
          >
            <IconButton style={styles.editButton} onClick={handleEditMode}>
              <EditIcon />
            </IconButton>
          </div>
        )}
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          centered={true}
          className="tabs-container"
          style={styles.tabs}
        >
          <Tab label="About" sx={{ fontSize: "1vw" }} />
          <Tab label="Friends" sx={{ fontSize: "1vw" }} />
          <Tab label="Trips" sx={{ fontSize: "1vw" }} />
        </Tabs>
        {selectedTab === 0 && (
          <AboutTab
            description={description}
            setDescription={setDescription}
            editMode={editEnabled}
          />
        )}
        {selectedTab === 1 && <FriendsTab editMode={editEnabled} />}
        {selectedTab === 2 && <TripsTab editMode={editEnabled} />}
      </div>
      <EditProfilePic // Pop up that displays only when profile picture is clicked
        open={editProfilePicOpen}
        onClose={handleEditProfilePicClose}
        anchorEl={profilePicButtonRef.current}
        selectedImg={(image) => setNewPicture(image)}
        selectedBorder={(border) => setNewBorder(border)}
        setBorderColor={setBorderColor}
        addCustomAvatar={(avatar) => setNewCustomAvatars(avatar)}
        currentCustomAvatars={customAvatars}
      />
    </Box>
  );
}

const styles = {
  container: {
    display: "flex",
    width: "80vw",
    height: "75vh",
    marginLeft: "auto",
    marginRight: "auto",
  },
  profileBox: {
    position: "relative",
  },
  bannerBox: {
    width: "40vw",
    height: "10vw",
    backgroundColor: "lightgray",
    marginBottom: "10px",
    position: "relative",
    cursor: "pointer",
  },
  input: {
    display: "none",
    width: "40vw",
    height: "10vw",
  },
  avatarBox: {
    width: "18vw",
    height: "18vw",
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
    cursor: "pointer",
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
    width: "40vw",
    display: "flex",
    flexDirection: "column",
    justfityContent: "center",
  },
  tabs: {
    width: "40vw",
    paddingTop: "1vw",
  },
  editContainer: {
    position: "absolute",
    width: "2.6vw", // Adjust width to match EditHighlight width
    height: "2.6vw", // Adjust height to match EditHighlight height
    top: "1vw",
    right: "1vw",
    borderRadius: "18%",
    cursor: "pointer",
    zIndex: "999",
    justifyContent: "center",
    alignItems: "center",
  },
  editButton: {
    width: "2.6vw", // Adjust width to match EditHighlight width
    height: "2.6vw", // Adjust height to match EditHighlight height
    borderRadius: "10%",
    border: "0.15vw solid gray",
    zIndex: "999",
  },
};
