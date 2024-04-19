import React, { useState } from "react";
import DateAvailability from "../../components/GatheringInfo/DateAvailability";

function PollPage() {
  return (
    <>
      <h2>What are your availabilities?</h2>
      <DateAvailability />
    </>
  );
}

export default PollPage;
