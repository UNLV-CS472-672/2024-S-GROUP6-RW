import React, { useState, useRef } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import AddRemoveFriends from "../../components/FriendsPage/AddRemoveFriends";
import FriendList from "../../components/FriendsPage/BoxFriend";


//Contains the box for tabs that the user can click on
function FriendsContainer() {
	const [value, setValue] = React.useState(0);
	//Handles when you select a tab for the value to change and switch to that content
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Box //Sets Background color of box area
			sx={{ width: "100%", bgcolor: "background.paper" }}>
			<Tabs //Sets the names and style for each tab name
				value={value}
				onChange={handleChange}
				textColor="secondary"
				indicatorColor="secondary"
				centered
			>
                <Tab label="Add/Remove Friend" />
				<Tab label="Friend List" />
			</Tabs>
			{value  //Links each tab to a component file 
				=== 0 && <AddRemoveFriends />}
			{value
				=== 1 && <FriendList />}
		</Box>
	);
}

export default FriendsContainer;