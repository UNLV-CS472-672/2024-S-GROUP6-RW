import React, { useState, useRef } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import "../../css/FriendsPage.css";

function BoxFriend() {

    return (
        <div class="container">
    <div class="row">
        <div class="col-md-12 col-lg-6">
            <div class="card">
                <div class="header">
                    <h2><strong>New</strong> Friends <small>Add new friend in last month</small></h2>
                </div>
                <div class="body">
                    <ul class="new_friend_list list-unstyled row">
                        <li>
                            <a href="">
                                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" class="avatar" alt="User Image" width="100" height="100"></img>
                                <h6 class="users_name">Jackson</h6>
                                <small class="join_date">Today</small>
                            </a>
                        </li>
                        <li class="col-lg-4 col-md-2 col-sm-6 col-4">
                            <a href="">
                                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" class="avatar" alt="User Image"></img>
                                <h6 class="users_name">Aubrey</h6>
                                <small class="join_date">Yesterday</small>
                            </a>
                        </li>
                        <li class="col-lg-4 col-md-2 col-sm-6 col-4">
                            <a href="">
                                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" class="avatar" alt="User Image"></img>
                                <h6 class="users_name">Oliver</h6>
                                <small class="join_date">08 Nov</small>
                            </a>
                        </li>
                        <li class="col-lg-4 col-md-2 col-sm-6 col-4">
                            <a href="">
                                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" class="avatar" alt="User Image"></img>
                                <h6 class="users_name">Isabella</h6>
                                <small class="join_date">12 Dec</small>
                            </a>
                        </li>
                        <li class="col-lg-4 col-md-2 col-sm-6 col-4">
                            <a href="">
                                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" class="avatar" alt="User Image"></img>
                                <h6 class="users_name">Jacob</h6>
                                <small class="join_date">12 Dec</small>
                            </a>
                        </li>
                        <li class="col-lg-4 col-md-2 col-sm-6 col-4">
                            <a href="">
                                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" class="avatar" alt="User Image"></img>
                                <h6 class="users_name">Matthew</h6>
                                <small class="join_date">17 Dec</small>
                            </a>
                        </li>                            
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
        
    );
}

export default BoxFriend;