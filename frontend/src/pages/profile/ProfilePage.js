import React, { useState, useEffect } from "react";
import ProfileContainer from "../../components/Profile/ProfileContainer";
import { useAuth } from "../../auth/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
// import { getToken } from "../../auth/authService";

function ProfilePage() {
  const { isAuth } = useAuth();
  // const token = getToken();
  const [username, setUsername] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (isAuth && location) {
  //     let tmp = location.pathname.split("/").slice(-1)[0];
  //     console.log(tmp);

  //     if (tmp !== "profile") {
  //       navigate("/profile/axelauda");
  //     } else {
  //       navigate("/profile/bruh");
  //     }
  //   }
  // }, [location]);

  // useEffect(() => {
  //   if (token) {
  //     const [header, payload, signature] = token.split("."); // Split the JWT token into its components

  //     // Decode the payload using base64 decoding
  //     const decodedPayload = JSON.parse(atob(payload));

  //     if (decodedPayload && decodedPayload.username) {
  //       setUsername(decodedPayload.username);
  //     }
  //   }
  // }, [token]);

  // const handleLogUsername = () => {
  //   const [header, payload, signature] = token.split("."); // Split the JWT token into its components

  //   // Decode the payload using base64 decoding
  //   const decodedPayload = JSON.parse(atob(payload));
  //   console.log(decodedPayload);

  //   if (decodedPayload && decodedPayload.username) {
  //     setUsername(decodedPayload.username);
  //   }

  //   if (username) {
  //     console.log("Decoded username:", username);
  //   } else {
  //     console.log("Username not available.");
  //   }
  // };

  return (
    <>
      {isAuth ? (
        <>
          <h2>Profile Page</h2>
          <ProfileContainer />
          {/* <button onClick={handleLogUsername}>Log Decoded Username</button> */}
        </>
      ) : (
        <h2>Please log in first.</h2>
      )}
    </>
  );
}

export default ProfilePage;
