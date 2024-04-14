import React, { useState, useRef } from "react";
import { Tabs, Tab, Box, IconButton } from "@mui/material";
import FriendsTab from "./FriendsTab";
import AboutTab from "./AboutTab";
import TripsTab from "./TripsTab";
import EditProfilePic from "./EditProfilePic";
import NameTag from "./NameTag";
import PaletteIcon from "@mui/icons-material/Palette";
import EditIcon from "@mui/icons-material/Edit";
import { useTheme } from "@mui/material/styles";

import { useAuth } from "../../auth/AuthContext";

import defaultPic from "../../images/avatars/beagle.jpg";
import { ReactComponent as DefaultBorder } from "../../images/borders/Default_Border.svg";
import defaultBackdrop from "../../images/backdrops/grass.jpg";

export default function ProfileContainer({ name, enableEdit, userData }) {
  // const isMobile = useMediaQuery(theme.breakpoints.down("sm")); Will implement later
  const paletteButtonRef = useRef(null);
  const theme = useTheme();

  const profilePic = { img: defaultPic, title: "default picture" };
  const [selectedTab, setSelectedTab] = useState(0);
  const [editProfilePicOpen, setEditProfilePicOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState(profilePic);
  const [SelectedBorder, setSelectedBorder] = useState(DefaultBorder);
  const [borderColor, setBorderColor] = useState("black");
  const [selectedBackdrop, setSelectedBackdrop] = useState({img: defaultBackdrop, title: "Grass", textColor: "black"});
  const [textColor, setTextColor] = useState("black");
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [displayBanner, setDisplayBanner] = useState(false);
  const [customAvatars, setCustomAvatars] = useState([]);
  const [description, setDescription] = useState("“Twenty years from now you will be more disappointed by the things you didn’t do than by the ones you did do. So throw off the bowlines. Sail away from the safe harbor. Catch the trade winds in your sails. Explore. Dream. Discover.”\n― Mark Twain");
  const [paletteEnabled, setPaletteEnabled] = useState(false);
  const [editEnabled, setEditEnabled] = useState(false);
  const [textGradient, setTextGradient] = useState("linear-gradient(#57B000, #A1DF50)");
  const [behindTextBlur, setBehindTextBlur] = useState("rgba(255, 255, 255, 0.4)");
  const [currentCount, setCurrentCount] = useState(description.length);
  const maxCharLimit = 300;

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
    setPaletteEnabled(true);
    setEditProfilePicOpen(true);
  };

  const handleEditProfilePicClose = () => {
    setPaletteEnabled(false);
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

  const setNewBackdrop = (backdrop) => {
    setSelectedBackdrop(backdrop);
    setTextColor(backdrop.textColor);
    if (backdrop.title === "Grass") {
      setTextGradient("linear-gradient(#57B000, #A1DF50)");
    } else if (backdrop.title === "Ocean") {
      setTextGradient("linear-gradient(#00B0DC, lightblue)");
    } else if (backdrop.title === "Valley") {
      setTextGradient("linear-gradient(#9D92DF, #FFE5B4)");
    } else if (backdrop.title === "City") {
      setTextGradient("linear-gradient(#9300FF, #C8ADFD)");
    } else if (backdrop.title === "Desert") {
      setTextGradient("linear-gradient(#ED8438, #EDBB97)");
    } else if (backdrop.title === "Space") {
      setTextGradient("linear-gradient(#A0A0A0, white)");
    }
    
    if (backdrop.textColor === "white") {
      setBehindTextBlur("rgba(0, 0, 0, 0.4)");
    } else {
      setBehindTextBlur("rgba(255, 255, 255, 0.4)");
    }
  }

  return (
    <Box
      style={{
        ...styles.container,
        border: "0.4vw solid black",
        backgroundImage: `url(${selectedBackdrop.img})`,
        backgroundSize: "cover",
      }}
    >
      <Box style={styles.profileBox}>
          {displayBanner && (<Box style={styles.bannerBox}>
            {selectedBanner && (
              <img
                src={selectedBanner.img}
                style={styles.bannerImage}
                alt="Banner"
              />
            )}
          </Box>)}
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
          >
            <img src={selectedImg.img} style={styles.image} alt="Profile" />
          </button>
        </Box>
        <NameTag name={name} textGradient={textGradient} />
      </Box>
      <div style={styles.tabBox}>
      <div
            style={{
              ...styles.paletteContainer,
              border: paletteEnabled
                ? "0.3vw solid #03a9f4" // Highlights the button in Edit Mode
                : "0.3vw solid transparent",
            }}
          >
            <IconButton style={{...styles.paletteButton, border: `0.15vw solid ${textColor}`}} onClick={handleEditProfilePicOpen} ref={paletteButtonRef}>
              <PaletteIcon style={{...styles.paletteIcon, color: textColor}}/>
            </IconButton>
          </div>
        {selectedTab === 0 && (<>
          <div
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
          </div>
          {/* Display the fraction n/m */}
          {editEnabled && (<p style={styles.charCounter}>{`${currentCount}/${maxCharLimit}`}</p>)}
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
          <Tab label="Trips" style={{...styles.tab, color: textColor}} />
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
        {selectedTab === 1 && <FriendsTab textColor={textColor} behindTextBlur={behindTextBlur} />}
        {selectedTab === 2 && <TripsTab  />}
      </div>
      <EditProfilePic // Pop up that displays only when profile picture is clicked
        open={editProfilePicOpen}
        onClose={handleEditProfilePicClose}
        anchorEl={paletteButtonRef.current}
        selectedImg={(image) => setNewPicture(image)}
        selectedBorder={(border) => setNewBorder(border)}
        selectedBanner={(banner) => setSelectedBanner(banner)}
        displayBanner={displayBanner}
        setDisplayBanner={setDisplayBanner}
        selectedBackdrop={(backdrop) => setNewBackdrop(backdrop)}
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
