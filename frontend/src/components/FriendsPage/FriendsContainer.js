import React, { useState, useRef } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import AddRemoveFriends from "../../components/FriendsPage/AddRemoveFriends";
import FriendList from "../../components/FriendsPage/BoxFriend";


//Contains the box for tabs that the user can click on
function FriendsContainer() {
	const [value, setValue] = React.useState(0);
	
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Box 
			sx={{ width: "100%", bgcolor: "background.paper" }}>
			<Tabs 
				value={value}
				onChange={handleChange}
				textColor="secondary"
				indicatorColor="secondary"
				centered
			>
                <Tab label="Add/Remove Friend" />
				<Tab label="Friend List" />
			</Tabs>
			{value  
				=== 0 && <AddRemoveFriends />}
			{value
				=== 1 && <FriendList />}
		</Box>
	);
}

export default FriendsContainer;