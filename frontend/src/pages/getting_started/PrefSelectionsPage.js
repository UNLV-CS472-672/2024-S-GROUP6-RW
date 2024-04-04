import React, { useState } from "react";
import PrefButtons from "../../components/PrefSelect/PrefButtons";
import DateAvailability from "../../components/GatheringInfo/DateAvailability";

function PrefSelectionPage() {
  return (
    <>
      <h2>What are you interested in?</h2>
      <PrefButtons />

      <h2>What are your availabilities?</h2>
      <DateAvailability />
    </>
  );
}

export default PrefSelectionPage;
