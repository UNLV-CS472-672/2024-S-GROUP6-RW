import React, { useState, useRef } from "react";
import { Tabs, Tab, Box } from "@mui/material";

function AddRemoveFriends() {
    
    const [friends, setFriends] = React.useState([    //List of friends
        //{id: 1, name: 'Test 1'},
        //list of friends would be added here
    ]);
    const [newFriendName, setNewFriendName] = useState('');  //create const for setting new friend

    const addFriend = () => {     //Handles adding a new friend
        if(newFriendName.trim() != '')
        {
            const newFriend = {id: friends.length+1, name: newFriendName};
            setFriends([...friends, newFriend]);
            setNewFriendName('');
        }
    }

    const removeFriend = (id) => {     //handles removing a friend
        const updatedFriends = friends.filter((friend) => friend.id != id);
        setFriends(updatedFriends);
    }

    return (
        <>
        <input
            type="text"
            value={newFriendName}
            onChange={(e) => setNewFriendName(e.target.value)}
            placeholder="Enter friend's name:"
        />
        <button onClick={addFriend}>Add Friend</button>
        <ul>
            {friends.map((friend) => (
                <li key={friend.id}>
                    {friend.name}
                    <button onClick={() => removeFriend(friend.id)}>Remove</button>
                </li>
            ))}
        </ul>
        </>
    )
}

export default AddRemoveFriends;