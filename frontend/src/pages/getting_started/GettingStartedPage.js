import React from "react";
import "../../css/GettingStartedBanner.css";
import "../../css/GettingStarted.css";

import { useRef } from "react";
import { useLottie, useLottieInteractivity } from "lottie-react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { useNavigate } from 'react-router-dom';

// Free Animations from LottieFiles
import Animation_share from "../../components/GettingStarted/Animation_share.json";
import Animation_car from "../../components/GettingStarted/Animation_car.json";
import Animation_directions from "../../components/GettingStarted/Animation_directions.json";

import ImageSlider from "../../components/GettingStarted/ImageSlider.js";

// Images used
const Highland = [
  {
    url: "/Highland.jpg",
    title: "Highland_Golf",
    width: "100%",
    height: "100%",
  },
];

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

// Syncs animation with scroll/cursor (vertical)
const CursorVerticalSync = ({ animationName }) => {
  const style = {
    height: 550,
  };

  const options = {
    animationData: animationName,
  };

  const lottieObj = useLottie(options, style);
  const Animation = useLottieInteractivity({
    lottieObj,
    mode: "scroll",
    actions: [
      {
        visibility: [0, 1],
        type: "seek",
        frames: [0, 120],
      },
    ],
  });

  return Animation;
};

// Syncs animation with scroll/cursor (horizonal)
// From
const CursorHorizontalSync = ({ animationName }) => {
  const style = {
    height: 550,
  };

  const options = {
    animationData: animationName,
  };

  const lottieObj = useLottie(options, style);
  const Animation = useLottieInteractivity({
    lottieObj,
    mode: "cursor",
    actions: [
      {
        position: { x: [0, 1], y: [-1, 2] },
        type: "seek",
        frames: [0, 120],
      },
      {
        position: { x: -1, y: -1 },
        type: "stop",
        frames: [0],
      },
    ],
  });

  return Animation;
};


function GettingStartedPage() {
  const travelRef = useRef < LottieRefCurrentProps > null;
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate('/gatheringinfo');
  };
  return (
    <>
      {/*Shows Title with Image Slider and Getting Started Button 
      <GettingStartedBanner
        
        cName="banner"
        textSection="home-text-section"
        text="From weekend getaways to epic adventures"
        buttonText="Getting Started"
        url="/gatheringinfo"
        buttonClass="show"
      />*/}
      <div class="diagonal-split">
        <div class="top-half">
          <img src="yo.jpg" />
        </div>
        <div class="bottom-half">
          <img src="SanSebastian.jpg" />
        </div>
        <h2 className="headerr">From weekend getaways to epic adventures</h2>
        <button onClick={handleSubmit}
          className="getStartedButton">
          Get Started
        </button>
      </div>

      {/* Directions on how to use the website with animations */}
      <div>
        {/* Step 1: Interests, location, budget */}
        <div className="animation-container">
          <div className="Animation_1">
            <CursorVerticalSync animationName={Animation_directions} />
          </div>
          <h1>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </h1>
        </div>

        {/* Step 2: Share with friends */}
        <div className="animation-container-2">
          <h1>nec dui nunc mattis enim ut</h1>
          <div className="Animation_1">
            <CursorVerticalSync animationName={Animation_share} />
          </div>
        </div>

        {/* Step 3: Get ready for your trip */}
        <div className="animation-container">
          <div className="Animation_1">
            <CursorHorizontalSync animationName={Animation_car} />
          </div>
          <h1>
            mattis pellentesque id nibh tortor id aliquet lectus proin nibh
          </h1>
        </div>
      </div>

      {/* About RightWay */}
      <div>
        <div className="banner">
          <img src="/Highland.jpg" alt="" />

          <div className="about-text-section">
            <div>
              <h1>About us</h1>
            </div>
            <div>
              <p>
                {" "}
                At RightWay, we believe that the journey is just as important as
                the destination. That's why we've created a platform designed to
                bring friends together through unforgettable travel experiences,
                tailored just for you. Whether you're planning a weekend getaway
                or an adventure of a lifetime, RightWay takes the hassle out of
                trip planning.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default GettingStartedPage;
