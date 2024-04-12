import React, { useState, useRef } from "react";
import ProfileCard from "../../components/Profile/ProfileCard";

export default function ProfileContainer() {
  // const isMobile = useMediaQuery(theme.breakpoints.down("sm")); Will implement later
  const profilePicButtonRef = useRef(null);

  return <ProfileCard />;
}
