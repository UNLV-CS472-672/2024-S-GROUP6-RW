import React, { useState, useEffect } from "react";
import ProfileCard from "../../components/Profile/ProfileCard"; // Importing the ProfileCard component
import { useAuth } from "../../auth/AuthContext"; // Importing the useAuth hook from AuthContext
import { useLocation } from "react-router-dom"; // Importing the useLocation hook from react-router-dom
import { getFromLocal } from "../../utils/LocalStorageManager"; // Importing a utility function for local storage management
import { getProfile } from "../../utils/ApiManager"; // Importing a utility function for API management
import { Alert } from "@mui/material"; // Importing the Alert component from MUI

function ProfilePage() {
  // Destructuring properties from the useAuth hook
  const { isAuth } = useAuth();
  // State variables for managing profile data and UI states
  const [allowEdit, setAllowEdit] = useState(false);
  const [username, setUsername] = useState(getFromLocal("username")); // Initializing username from local storage
  const location = useLocation(); // Getting the current location from react-router-dom
  const [foundUser, setFoundUser] = useState(false); // State variable to track if the user is found
  const [image, setImage] = useState(""); // State variable for the user's profile image
  const [desc, setDesc] = useState(""); // State variable for the user's profile description
  const [customize, setCustomize] = useState(""); // State variable for customizations
  const [alertMessage, setAlertMessage] = useState("Hello"); // State variable for alert message
  const [alertSucceeded, setAlertSucceded] = useState(false); // State variable to track alert success
  const [showAlert, setShowAlert] = useState(false); // State variable to control alert visibility
  const [loading, setLoading] = useState(true); // State variable to track loading state

  useEffect(() => {
    handleFetchUserData(); // Call handleFetchUserData when the component mounts
  }, []); // Empty dependency array to ensure it runs only once

  useEffect(() => {
    // Effect to handle alert visibility
    if (showAlert) {
      const timeout = setTimeout(() => {
        setShowAlert(false); // Hiding the alert after 2 seconds
      }, 2000);

      return () => clearTimeout(timeout); // Cleanup function to clear the timeout
    }
  }, [showAlert]); // Dependency array to watch for changes in showAlert

  const handleFetchUserData = async () => {
    try {
      if (isAuth && location) {
        let tmp = location.pathname.split("/").slice(-1)[0]; // Extracting the username from the URL

        // Determine if this is the user's profile
        if (tmp === username) {
          console.log("This is the user's profile.");
          setAllowEdit(true); // Allowing editing if it's the user's profile
        } else {
          console.log("This is not the user's profile.");
          setAllowEdit(false); // Disabling editing if it's not the user's profile
        }

        // Fetch user data
        const data = await getProfile(tmp); // Getting profile data from the API
        setUsername(data.Username); // Setting the username from the fetched data

        console.log("User Data: ", data);
        if (data === null) {
          console.log("User does not exist, display nothing.");
          setFoundUser(false); // Setting foundUser to false if the user doesn't exist
        } else {
          setFoundUser(true); // Setting foundUser to true if the user exists
          parseData(data); // Parsing the fetched data
        }
        setLoading(false); // Data fetched, set loading to false
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const parseData = (data) => {
    var data = data.About;
    var customImage = "";
    var description;
    var customization;

    if (data !== "") {
      if (data.substring(0, 4) === "data") {
        console.log("Contains user picture.");
        customImage = data.substring(0, data.indexOf("%"));
        data = data.substring(data.indexOf("%"));
      }
      // Cut off the first %
      data = data.substring(1);
      description = data.substring(0, data.lastIndexOf("%"));
      customization = data.substring(data.lastIndexOf("%") + 1);
    } else {
      description =
        "“Twenty years from now you will be more disappointed by the things you didn’t do than by the ones you did do. So throw off the bowlines. Sail away from the safe harbor. Catch the trade winds in your sails. Explore. Dream. Discover.”\n― Mark Twain";
      customization = "1-0-#000000-0";
    }

    setImage(customImage);
    setDesc(description);
    setCustomize(customization);
  };

  return (
    <div style={styles.container}>
      {loading ? ( // Check if loading
        <h2 style={styles.loading}>Loading Profile...</h2>
      ) : (
        <>
          {isAuth && foundUser ? (
            <>
              <ProfileCard
                name={username.toUpperCase()}
                allowEdit={allowEdit}
                image={image}
                about={desc}
                selection={customize}
                setAlertMessage={setAlertMessage}
                setAlertSucceeded={setAlertSucceded}
                setShowAlert={setShowAlert}
              />
            </>
          ) : (
            <h2>ERROR 404</h2>
          )}
        </>
      )}
      {/* Display the alert at the bottom of the page */}
      {showAlert && (
        <Alert
          severity={alertSucceeded ? "success" : "error"}
          style={styles.alert}
          onClose={() => setShowAlert(false)}
        >
          {alertMessage}
        </Alert>
      )}
      <style>{styles.animation}</style>
    </div>
  );
}

export default ProfilePage;

// Styles for the component
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    flexDirection: "column",
  },
  loading: {
    margin: 0, // Removing margin for the loading text
  },
  alert: {
    position: "fixed",
    bottom: 20,
    left: "50%",
    transform: "translateX(-50%)",
    animation: "fadeOut 1.5s ease-in-out forwards", // Animation for the alert
  },
  animation: `
    @keyframes fadeOut {
      0% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }
  `,
};
