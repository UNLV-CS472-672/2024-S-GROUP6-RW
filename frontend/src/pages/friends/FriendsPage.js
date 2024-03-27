import React, { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import FriendsContainer from "../../components/FriendsPage/FriendsContainer";

//This page is to showcase any friends the user has.
//The data shown on the page will come from the FriendsContainer.js 
function FriendsPage() {
    return (
      <>
        <h2>Friends Page</h2>
        <FriendsContainer />
      </>
    );
  }

export default FriendsPage;