import React, { useState, useRef } from "react";
import { Tabs, Tab, Box } from "@mui/material";

function AddRemoveFriends() {
    // a test to contain when setting list of friends to store temporarily
    const [friends, setFriends] = React.useState([    //List of friends
        //{id: 1, name: 'Test 1'},
        //list of friends would be added here
    ]);
    const [newFriendName, setNewFriendName] = useState('');  //create const for setting new friend

    const addFriend = () => {     //Handles adding a new friend
        if(newFriendName.trim() != '')
        {
            const newFriend = {id: friends.length+1, name: newFriendName};  //If name does not exist in friend list, then add id and name
            setFriends([...friends, newFriend]);
            setNewFriendName('');
        }
    }

    const removeFriend = (id) => {     //handles removing a friend
        const updatedFriends = friends.filter((friend) => friend.id != id);
        setFriends(updatedFriends);
    }

    //Showing a textbox to add a person as a friend which shows in a list. You can also remove someone with a button next to the person's name
    return (
        <>
        <input  //shows a textbox for user to enetr a person's name
            type="text"
            value={newFriendName}
            onChange={(e) => setNewFriendName(e.target.value)}
            placeholder="Enter friend's name:"
        />
        <button  //Button that will add the friend name to a list 
            onClick={addFriend}>Add Friend</button>
        <ul>
            {friends.map((friend) => (
                <li //Lists out all names in the friends list
                    key={friend.id}>
                        {friend.name}
                        <button   //button to click to remover a friend's name off of the list
                            onClick={() => removeFriend(friend.id)}>Remove</button>
                </li>
            ))}
        </ul>
        </>
    )
}

export default AddRemoveFriends;