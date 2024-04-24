import React, { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import FriendsContainer from "../../components/FriendsPage/FriendsContainer";
import "../../css/FriendsPage2.css";

//This page is to showcase any friends the user has.
//The data shown on the page will come from the FriendsContainer.js
function FriendsPage() {
  return (
    <>
      <div className="friends-container">
        <p className="friends-header">Friends</p>
        <FriendsContainer />
      </div>
    </>
  );
}

export default FriendsPage;
