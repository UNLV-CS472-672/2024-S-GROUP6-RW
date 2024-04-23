import React, { useState } from "react";
import DateAvailability from "../../components/GatheringInfo/DateAvailability";
import "../../css/PollPage.css";

function PollPage() {
  return (
    <>
      <div className="poll-div">
      <p className="poll-header">What days are you available?</p>
      <DateAvailability />
      </div>
    </>
  );
}

export default PollPage;
