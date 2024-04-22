import React, { useState, useEffect } from "react";
import "../../css/GatheringInfo.css";
import DatePickerComponent from "../../components/ItineraryForm/DatePickerComponent";
import SearchBar from "../../components/GatheringInfo/SearchBar";
import PrefButtons from "../../components/PrefSelect/PrefButtons";
import { Link } from "react-router-dom";

function GatheringInfoPage() {
  const [activeScreen, setActiveScreen] = useState('screen1');
  const [randomImages, setRandomImages] = useState([]);

  const goToScreen2 = () => setActiveScreen('screen2');
  const goToScreen3 = () => setActiveScreen('screen3');

  useEffect(() => {
    const shuffleArray = array => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    const images = [
      { lat: 36.1173, lng: -115.1761, message: "Las Vegas", src: "https://media.istockphoto.com/id/458236925/photo/caesars-palace-hotel-casino.jpg?s=612x612&w=0&k=20&c=D4Ub55Ne1CswmoXRqtGigSXv0cRK6P0Rg73vQSXuz7k=" },
      { lat: 51.0844, lng: 10.4057,  message: "Germany", src: "https://www.deutschland.de/sites/default/files/styles/image_carousel_mobile/public/media/image/tdt_29092020_1_staat_16_laender_schwerin.jpg?itok=4PP80WP4" },
      { lat: 46.6870, lng: 2.4018, message: "France", src: "https://www.travelandleisure.com/thmb/9xr8CFGR14sLvR4IhLwKV64fEV0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/TAL-Eiffel-Tower-BESTFRANCE0323-dada0673f8764c099b68d01695ef8057.jpg" },
      { lat: 20.2855, lng: -158.3992, message: "Hawaii", src: "https://www.exoticca.com/us/blog/wp-content/uploads/2019/05/The-12-most-spectacular-beaches-in-hawaii-that-you-cannot-miss.jpg" },
      { lat: 41.8908, lng: 12.4783, message: "Rome", src: "https://tourismmedia.italia.it/is/image/mitur/20220127150143-colosseo-roma-lazio-shutterstock-756032350-1?wid=1600&hei=900&fit=constrain,1&fmt=webp" },
      
      { lat: 35.9784,  lng: 139.7402, message: "Tokyo", src: "https://hips.hearstapps.com/hmg-prod/images/high-angle-view-of-tokyo-skyline-at-dusk-japan-royalty-free-image-1664309926.jpg" },
      { lat: 20.7936,  lng: -156.3311, message: "Maui", src: "https://a.cdn-hotels.com/gdcs/production81/d1269/0cffe15a-7fdf-4e75-9415-92eaf78e2f73.jpg" },
      { lat: 24.5571,  lng: -78.0586, message: "Bahamas", src: "https://thepointsguy.global.ssl.fastly.net/us/originals/2022/03/HI_B_KSchaler.jpg" },
      { lat: 51.5093,  lng: -0.1222, message: "London", src: "https://a.cdn-hotels.com/gdcs/production153/d1371/e6c1f55e-51ac-41d5-8c63-2d0c63faf59e.jpg" },
      { lat: -16.5085, lng: -151.7429, message: "Bora Bora", src: "https://cache.marriott.com/content/dam/marriott-renditions/BOBXR/bobxr-exterior-aerialview-1580-hor-wide.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=2880px:*" },
  
      { lat: -17.6499, lng: -149.4379, message: "Tahiti", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE6IkkwdqD57Dvlbe3JEwPtwEMNxX_0UKfeIIjADevwA&s" },
      { lat: 40.7110,  lng: -74.0127, message: "New York", src: "https://cdn.britannica.com/61/93061-050-99147DCE/Statue-of-Liberty-Island-New-York-Bay.jpg" },
      { lat: -8.4087,  lng: 115.1839, message: "Bali", src: "https://media.cntraveler.com/photos/63f4f4fc0630e21ed8088321/1:1/w_1280%2Ch_1280%2Cc_limit/GettyImages-1145042281.jpeg" },
      { lat: 43.7692,  lng: 11.2601, message: "Florence", src: "https://content.r9cdn.net/rimg/dimg/ee/c3/840e901d-city-25345-158f32d4e66.jpg?width=1366&height=768&xhint=1940&yhint=1356&crop=true" },
      { lat: -13.1611, lng: -72.5502, message: "Machu Picchu", src: "https://travel.home.sndimg.com/content/dam/images/travel/fullset/2014/05/28/50/Machu-Picchu-Mountain.rend.hgtvcom.1280.1280.suffix/1491584261034.jpeg" }
      
    ];

    const shuffledImages = shuffleArray(images);
    const randomSubset = shuffledImages.slice(0, 5);
    setRandomImages(randomSubset);
  }, []);

  const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  return (
    <>
      <div className="whole-page">
        <div className={`screen ${activeScreen === 'screen1' ? 'slide-in' : 'slide-out'}`}>
          <div className="form-half">
            <p className="header-1">Let's plan your next trip together</p>
            <p className="where"> Where would you like to go? </p>
            <SearchBar />
            <button className="next-button" onClick={goToScreen2}>
              Next
            </button>
          </div>
          <div className="destination-half">
            <h3 className="header-2"> Popular Destinations </h3>
            <div className="image-container">
              {randomImages.map((image, index) => (
                <Link
                  key={index}
                  to={`/map?lat=${image.lat}&lng=${image.lng}`}
                >
                  <img 
                    src={image.src} 
                    alt={image.message} 
                    className="rounded-img"
                  />
                  <div className="image-message">{image.message}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className={`screen ${activeScreen === 'screen2' ? 'slide-in' : 'slide-out'}`}>
          <DatePickerComponent />
          <button
            className="secondNext-button"
            onClick={goToScreen3}
            variant='contained'
          >
            Next
          </button>
        </div>
        <div className={`screen ${activeScreen === 'screen3' ? 'slide-in' : 'slide-out'}`}>
          <div className="third-section">
            <p className="header-4"> What are your group preferences? </p>
            <PrefButtons />
          </div>
        </div>
      </div>
    </>
  );
}

export default GatheringInfoPage;
