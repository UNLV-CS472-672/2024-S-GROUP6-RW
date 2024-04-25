import React, { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import FriendList from "../../components/FriendsPage/BoxFriend";
import "../../css/FriendsPage2.css";

//This page is to showcase any friends the user has.
//The data shown on the page will come from the FriendsContainer.js
function FriendsPage() {
  return (
    <>
      <div className="friends-container">
        <p className="friends-header">Friends</p>
        <FriendList />
      </div>
    </>
  );
}

export default FriendsPage;
