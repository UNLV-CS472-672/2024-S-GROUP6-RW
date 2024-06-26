import React from 'react'

import { useLottie, useLottieInteractivity } from "lottie-react";

// Free Animations from LottieFiles
import Animation_share from "../../components/GettingStarted/Animation_share.json";
import Animation_car from "../../components/GettingStarted/Animation_car.json";
import Animation_directions from "../../components/GettingStarted/Animation_directions.json";
import Animation_calendar from "../../components/GettingStarted/Animation_calendar.json";

import "../../css/HowItWorks.css"

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

function HowItWorks() {
  return (
    <div className='howitworks-container'>
			<h1 > 
				HOW IT WORKS
			</h1>

			{/* Directions on how to use the website with animations */}
      <div>
        {/* Step 1: Interests, location, budget */}
        <div className="animation-container">
          <div className="Animation_1">
            <CursorVerticalSync animationName={Animation_directions} />
          </div>
          <p>
            Start your adventure by entering your desired destination
          </p>
        </div>

        {/* Step 2: Share with friends */}
        <div className="animation-container-2">
            <p>
              Choose your dates
            </p>
            <div className="Animation_1">
            <CursorVerticalSync animationName={Animation_calendar} />
            </div>
        </div>

        {/* Step 3: Get ready for your trip */}
        <div className="animation-container-2">
          <p>
            Personalize your group experience
          </p>
          <div className="Animation_1">
          <CursorVerticalSync animationName={Animation_share} />
          </div>
        </div>

        {/* Step 4: Share with friends */}
        <div className="animation-container">
          <div className="Animation_1">
            <CursorHorizontalSync animationName={Animation_car} />
          </div>
          <p>
            Ready to roll? Summon your crew
          </p>
        </div>
      </div>
    </div>
  )
}

export default HowItWorks