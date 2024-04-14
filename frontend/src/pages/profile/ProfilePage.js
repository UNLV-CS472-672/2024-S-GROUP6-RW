import React, { useState, useEffect } from "react";
import ProfileCard from "../../components/Profile/ProfileCard";
import { useAuth } from "../../auth/AuthContext";
import { useLocation } from "react-router-dom";
import { getFromLocal } from "../../utils/LocalStorageManager";
import { getProfile } from "../../utils/ApiManager";

function ProfilePage() {
  const { isAuth } = useAuth();
  const [enableEdit, setEnableEdit ] = useState(false);
  const [userData, setUserData ] = useState(null);
  const username = getFromLocal("username");
  const location = useLocation();
  const [foundUser, setFoundUser ] = useState(true);

//   useEffect(() => {
//     const fetchUserData = async () => {
//         try {
//             if (isAuth && location) {
//                 let tmp = location.pathname.split("/").slice(-1)[0];

//                 // Determine if this is the user's profile
//                 if (tmp === username) {
//                     console.log("This is the user's profile.");
//                     setEnableEdit(true);
//                 } else {
//                     console.log("This is not the user's profile.");
//                     setEnableEdit(false);
//                 }

//                 // Fetch user data
//                 const data = await getProfile(tmp);
//                 setUserData(data); // Set the fetched user data in state
//                 if (data == null) {
//                   console.log("User does not exist, display nothing.");
//                   setFoundUser(false);
//                 }
//                 console.log("User Data: ", data);
//             }
//         } catch (error) {
//             console.error('Error fetching user data:', error);
//         }
//     };

//     fetchUserData();
// }, [isAuth, location, username]);
  return (
    <>
      {(isAuth && {/*foundUser*/}) ? (
        <>
          <h2>Profile Page</h2>
          <ProfileCard name={"MMMMMMMMMM"} enableEdit={enableEdit} userData={userData}/>
        </>
      ) : (
        <h2>ERROR 404</h2>
      )}
    </>
  );
}

export default ProfilePage;
