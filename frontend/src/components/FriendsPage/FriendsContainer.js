import React, { useState, useRef } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import AddRemoveFriends from "../../components/FriendsPage/AddRemoveFriends";
import FriendList from "../../components/FriendsPage/BoxFriend";


function FriendsContainer() {
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Box sx={{ width: "100%", bgcolor: "background.paper" }}>
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
			{value === 0 && <AddRemoveFriends />}
			{value === 0 && <FriendList />}
		</Box>
	);
}

export default FriendsContainer;