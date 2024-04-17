import React, { useState, useRef } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import "../../css/FriendsPage.css";

function BoxFriend() {

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12 col-lg-6">
                    <div className="card">
                        <div className="header">
                            <h2><strong>Current</strong> Friends</h2>
                        </div>
                        <div className="body">
                            <ul className="new_friend_list list-unstyled">
                                {['Jackson', 'Aubrey', 'Oliver', 'Isabella', 'Jacob', 'Matthew', 'Austin', 'Tyler'].map((name, index) => (
                                    <li key={index} className="friend-item">
                                        <a href="">
                                            <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" className="avatar" alt="User Image" />
                                            <h6 className="users_name">{name}</h6>
                                            <small className="join_date">Added {index % 2 === 0 ? 'Today' : 'Yesterday'}</small>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BoxFriend;