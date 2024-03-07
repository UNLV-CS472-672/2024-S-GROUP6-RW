import React from "react";
import BannerBackground from "../../components/GettingStarted/sample.jpg"
import "../../css/GettingStarted.css"

function GettingStartedBanner(props) {
  return(
    <>
        <div className={props.cName}>
            <img src={props.BannerBackground} alt="" />

            <div className={props.textSection}>
                <h1>{props.title}</h1>
                <h2>{props.text}</h2>
                <p>{props.text1}</p>

                <a href={props.url} className={props.buttonClass}> {props.buttonText}
                </a>

            </div>
        </div>

        <div className={props.directions}>
          <div className={props.directionText}>
            
          </div>
        </div>
    </>
  );
}

export default GettingStartedBanner;
