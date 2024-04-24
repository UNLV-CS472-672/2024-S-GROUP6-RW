import React, { useState, useRef } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import AddRemoveFriends from "../../components/FriendsPage/AddRemoveFriends";
import FriendList from "../../components/FriendsPage/BoxFriend";
import "../../css/FriendsPage.css";


//Contains the box for tabs that the user can click on
function FriendsContainer() {
	const [value, setValue] = React.useState(0);
	//Handles when you select a tab for the value to change and switch to that content
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Box class="container" //Sets Background color of box area
			sx={{ width: "100%", bgcolor: "background.paper" }}>

			<FriendList />
		</Box>
	);
}

export default FriendsContainer;