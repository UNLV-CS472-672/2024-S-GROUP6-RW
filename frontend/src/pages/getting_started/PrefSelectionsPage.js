import React, { useState } from "react";
import PrefButtons from "../../components/PrefSelect/PrefButtons";
import Map from "../../components/GooglePlaces/places";
import { LoadScript } from "@react-google-maps/api";

const lib = ["places"];

function PrefSelectionPage() {
  const [userPreference, setUserPreference] = useState('restaurant');

    return (
    <>
        <h2>What are you interested in?</h2>
        <PrefButtons />
        <div>
          <input type="text" value={userPreference} onChange={e => setUserPreference(e.target.value)} />
            <Map userPreference={userPreference} />
        </div>
    </>
  );
};

export default PrefSelectionPage;
