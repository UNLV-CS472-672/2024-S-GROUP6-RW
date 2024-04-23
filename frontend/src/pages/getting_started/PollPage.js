import React, { useState } from "react";
import DateAvailability from "../../components/GatheringInfo/DateAvailability";
import "../../css/PollPage.css"; // Import CSS file for styling

function PollPage() {
  return (
    <div className="poll-page-container">
      {" "}
      {/* Wrap content in a container */}
      <h2>What are your availabilities?</h2>
      <DateAvailability />
    </div>
  );
}

export default PollPage;
