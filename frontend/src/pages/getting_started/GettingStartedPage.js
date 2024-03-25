import React from "react";
import GettingStartedBanner from "../../components/GettingStarted/GettingStartedBanner.js";
import BannerBackground from "../../components/GettingStarted/sample.jpg"

import "../../css/GettingStartedBanner.css"
import { Link } from 'react-router-dom';

function GettingStartedPage() {
  
  return(
    <>
      <GettingStartedBanner
        cName="banner"
        BannerBackground={BannerBackground}
        textSection="home-text-section"
        title="RightWay"
        text="Make memories with friends"
        text1="From weekend getaways to epic adventures"


        buttonText="Getting Started"
        buttonClass="show"
        url="/gatheringinfo"
        
       
        
        directions="directions"
        directionsText="dText"
      />

    </>
   
  );

}

export default GettingStartedPage;
