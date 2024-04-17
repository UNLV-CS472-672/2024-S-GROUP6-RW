import React from "react";
import ButtonBaseDemo from "../../components/ExpensesTripStuff/TripsList";
import "../../css/MyTrips.css"
import TripDropDown from "../../components/ExpensesTripStuff/TripDropDown";


function MyTripsPage() {
  return (
    <div className="trips-container">
      <div className="container">
        <div className="title-container">
          <h2>My Trips</h2>
            <TripDropDown />
        </div>
      </div>
    </div>
  )
};

export default MyTripsPage;
