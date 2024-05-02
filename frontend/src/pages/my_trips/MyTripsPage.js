import React from "react";
import "../../css/MyTrips.css";
import ShowTrips from "../../components/ExpensesTripStuff/ShowTrips";


function MyTripsPage() {
  return (
    <div className="trips-container">
      <div className="container">
        <div className="title-container">
          <h2 style={{fontSize: "3vw", lineHeight: "1.5vw"}}>My Trips</h2>
            <ShowTrips />
        </div>
      </div>
    </div>
  )
};

export default MyTripsPage;
