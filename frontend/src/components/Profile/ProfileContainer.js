import React, { useState, useRef } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import FriendsTab from "./FriendsTab";
import AboutTab from "./AboutTab";
import TripsTab from "./TripsTab";
import EditProfilePic from "./EditProfilePic";
import NameTag from "./NameTag";

import defaultPic from "../../images/avatars/Terence.jpg";
import { ReactComponent as DefaultBorder } from "../../images/borders/Default_Border.svg";

export default function ProfileContainer() {
  // const isMobile = useMediaQuery(theme.breakpoints.down("sm")); Will implement later
  const profilePicButtonRef = useRef(null);

  const profilePic = { img: defaultPic, title: "default picture" };
  const [selectedTab, setSelectedTab] = useState(0);
  const [editProfilePicOpen, setEditProfilePicOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState(profilePic);
  const [SelectedBorder, setSelectedBorder] = useState(DefaultBorder);
  const [borderColor, setBorderColor] = useState("black");
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [customAvatars, setCustomAvatars] = useState([]);
  const name = "USERNAME"; // Replace with the actual name

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
      const reader = new FileReader();
      reader.onload = () => {
        const imgData = reader.result;
        setSelectedBanner({ img: imgData, title: "Custom Picture" });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box style={styles.container}>
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
      <div>
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          centered={true}
          className="tabs-container"
          style={styles.tabs}
        >
          <Tab label="About" />
          <Tab label="Friends" />
          <Tab label="Trips" />
        </Tabs>
        {selectedTab === 0 && <AboutTab />}
        {selectedTab === 1 && <FriendsTab />}
        {selectedTab === 2 && <TripsTab />}
      </div>
      <EditProfilePic
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
    border: "0.5vw solid black",
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
  tabs: {
    width: "40vw",
    paddingTop: "1vw",
  },
};
