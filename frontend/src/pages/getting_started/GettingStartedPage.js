import React from "react";
import "../../css/GettingStartedBanner.css";
import "../../css/GettingStarted.css";

import { useRef } from "react";
import { useNavigate } from 'react-router-dom';

// Main banner of Getting Started
function GettingStartedBanner(props) {
  return (
    <>
      <div className={props.cName}>
        {/*<ImageSlider images={props.sliderImages} />*/}
        
        {/*Displays text on top of images */}
        <div className={props.textSection}>
          <h1>{props.title}</h1>
          <h2>{props.text}</h2>
          <p>{props.text1}</p>
          <a href={props.url} className={props.buttonClass}>
            {" "}
            {props.buttonText}
          </a>
        </div>
      </div>
    </>
  );
}



function GettingStartedPage() {
  
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate('/gatheringinfo');
  };

  return (
    <>
      <div class="first-section">

        <div className="testbg">
        <p className = "first-description">
          Plan your trip </p>

        <p className="rw-line"> the RightWay</p>
        </div>

        <p className="headerr"> Group trips made easy</p>


        <img className="background" 
        src="thatNEWnew.jpg" />

        <button onClick={handleSubmit}
          className="getStartedButton">
          Get Started
        </button>

      </div>
    </>
  );
}
export default GettingStartedPage;
