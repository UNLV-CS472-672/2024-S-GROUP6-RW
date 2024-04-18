import React from 'react'

import { useLottie, useLottieInteractivity } from "lottie-react";

// Free Animations from LottieFiles
import Animation_share from "../../components/GettingStarted/Animation_share.json";
import Animation_car from "../../components/GettingStarted/Animation_car.json";
import Animation_directions from "../../components/GettingStarted/Animation_directions.json";

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
    <div>
			<h1> 
				HOW IT WORKS
			</h1>

			{/* Directions on how to use the website with animations */}
      <div>
        {/* Step 1: Interests, location, budget */}
        <div className="animation-container">
          <div className="Animation_1">
            <CursorVerticalSync animationName={Animation_directions} />
          </div>
          <h1>
            Start your adventure by entering your desired destination
          </h1>
        </div>

        {/* Step 2: Share with friends */}
        <div className="animation-container-2">
            <h1>
              Choose your dates
            </h1>
            <div className="Animation_1">
            <CursorVerticalSync animationName={Animation_share} />
            </div>
        </div>

        {/* Step 3: Get ready for your trip */}
        <div className="animation-container-2">
          <h1>
            Personalize your experience
          </h1>
          <div className="Animation_1">
          <CursorVerticalSync animationName={Animation_share} />
          </div>
        </div>

        {/* Step 4: Share with friends */}
        <div className="animation-container">
          <div className="Animation_1">
            <CursorHorizontalSync animationName={Animation_car} />
          </div>
          <h1>
            Ready to roll? Summon your crew
          </h1>
        </div>


      </div>
    </div>
  )
}

export default HowItWorks