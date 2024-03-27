import React, { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import FriendsContainer from "../../components/FriendsPage/FriendsContainer";


function FriendsPage() {
    return (
      <>
        <h2>Friends Page</h2>
        <FriendsContainer />
      </>
    );
  }

export default FriendsPage;