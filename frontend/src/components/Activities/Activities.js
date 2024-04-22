
import React, { useState, useEffect } from 'react';
import '../../css/PopUp.css'
import '../../css/closeButton.css'
import StarRatings from 'react-star-ratings';
import axios from 'axios';

const locations = [
  { 
    lat: 36.1173, 
    lng: -115.1761, //las vegas
    popularLocations: [
      { name: 'Las Vegas Welcome Sign', description: "The Welcome to Fabulous Las Vegas sign is a Las Vegas landmark.", rating: 5, image: 'https://media-cdn.tripadvisor.com/media/photo-m/1280/2a/34/2d/28/caption.jpg', price: '$' },
      { name: 'MGM Park', description: "Park MGM Las Vegas is in the heart of all there is to do on the Las Vegas Strip.", rating: 3, image: 'https://ik.imgkit.net/3vlqs5axxjf/external/ik-seo/https://www.cfmedia.vfmleonardo.com/imageRepo/7/0/143/431/660/Park_MGM_-_Hero_2_Cropped_O/Park-MGM-Exterior.jpg?tr=w-780%2Ch-437%2Cfo-auto', price: '$$' },
      { name: 'Sphere', description: "Sphere is a music and entertainment arena", rating: 4, image: 'https://www.rollingstone.com/wp-content/uploads/2023/06/MSG-Sphere1_credit-MSG-Sphere.jpg?w=1581&h=1028&crop=1', price: '$$$' }
    ]
  },
  { 
    lat: 51.1657, 
    lng: 10.4515, 
    popularLocations: [
      { name: 'Germany', description: "Germany is a country in Central Europe.", image: 'https://www.deutschland.de/sites/default/files/styles/image_carousel_mobile/public/media/image/tdt_29092020_1_staat_16_laender_schwerin.jpg?itok=4PP80WP4', price: '$$', rating: 4 }
    ]
  },
  { 
    lat: 46.2276, 
    lng: 2.2137, 
    popularLocations: [
      { name: 'France', description: "France is a country located in Western Europe.", image: 'https://www.travelandleisure.com/thmb/9xr8CFGR14sLvR4IhLwKV64fEV0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/TAL-Eiffel-Tower-BESTFRANCE0323-dada0673f8764c099b68d01695ef8057.jpg', price: '$$$', rating: 5 }
    ]
  },
  { 
    lat: 19.8987, 
    lng: 155.6659, 
    popularLocations: [
      { name: 'Hawaii', description: "Hawaii is a U.S. state located in the Pacific Ocean.", image: 'https://www.travelandleisure.com/thmb/9xr8CFGR14sLvR4IhLwKV64fEV0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/TAL-Eiffel-Tower-BESTFRANCE0323-dada0673f8764c099b68d01695ef8057.jpg', price: '$$$', rating: 4 }
    ]
  },
  { 
    lat: 41.8967, 
    lng: 12.4822, 
    popularLocations: [
      { name: 'Rome', description: "Rome is the capital city of Italy.", image: 'https://www.travelandleisure.com/thmb/9xr8CFGR14sLvR4IhLwKV64fEV0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/TAL-Eiffel-Tower-BESTFRANCE0323-dada0673f8764c099b68d01695ef8057.jpg', price: '$$$', rating: 5 }
    ]
  },
  { 
    lat: 35.6764, 
    lng: 139.6500, 
    popularLocations: [
      { name: 'Tokyo', description: "Tokyo is the capital city of Japan.", image: 'https://hips.hearstapps.com/hmg-prod/images/high-angle-view-of-tokyo-skyline-at-dusk-japan-royalty-free-image-1664309926.jpg', price: '$$', rating: 4 }
    ]
  },
  { 
    lat: 20.7984, 
    lng: 156.3319, 
    popularLocations: [
      { name: 'Maui', description: "Maui is an island in Hawaii.", image: 'https://a.cdn-hotels.com/gdcs/production81/d1269/0cffe15a-7fdf-4e75-9415-92eaf78e2f73.jpg', price: '$$$', rating: 5 }
    ]
  },
  { 
    lat: 25.0343, 
    lng: 77.3963, 
    popularLocations: [
      { name: 'Bahamas', description: "The Bahamas is a country in the Caribbean.", image: 'https://thepointsguy.global.ssl.fastly.net/us/originals/2022/03/HI_B_KSchaler.jpg', price: '$$$', rating: 4 }
    ]
  },
  { 
    lat: 51.5072, 
    lng: 0.1276, 
    popularLocations: [
      { name: 'London', description: "London is the capital city of England.", image: 'https://a.cdn-hotels.com/gdcs/production153/d1371/e6c1f55e-51ac-41d5-8c63-2d0c63faf59e.jpg', price: '$$$', rating: 5 }
    ]
  },
  { 
    lat: 16.5004, 
    lng: 151.7415, 
    popularLocations: [
      { name: 'Bora Bora', description: "Bora Bora is an island in French Polynesia.", image: 'https://cache.marriott.com/content/dam/marriott-renditions/BOBXR/bobxr-exterior-aerialview-1580-hor-wide.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=2880px:*', price: '$$$$', rating: 5 }
    ]
  },
  { 
    lat: 17.6509, 
    lng: 149.4260, 
    popularLocations: [
      { name: 'Tahiti', description: "Tahiti is the largest island in French Polynesia.", image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE6IkkwdqD57Dvlbe3JEwPtwEMNxX_0UKfeIIjADevwA&s', price: '$$$$', rating: 4 }
    ]
  },
  { 
    lat: 40.7128, 
    lng: 74.0060, 
    popularLocations: [
      { name: 'New York', description: "New York City is the most populous city in the United States.", image: 'https://cdn.britannica.com/61/93061-050-99147DCE/Statue-of-Liberty-Island-New-York-Bay.jpg', price: '$$$', rating: 5 }
    ]
  },
  { 
    lat: 8.4095, 
    lng: 115.1889, 
    popularLocations: [
      { name: 'Bali', description: "Bali is an island and province of Indonesia.", image: 'https://media.cntraveler.com/photos/63f4f4fc0630e21ed8088321/1:1/w_1280%2Ch_1280%2Cc_limit/GettyImages-1145042281.jpeg', price: '$$$', rating: 4 }
    ]
  },
  {
    lat: 43.7700, 
    lng: 11.2577,
    popularLocations:[
      { name: "Florence", description: "Florence is the capital city of the Italian region of Tuscany.", image: "https://content.r9cdn.net/rimg/dimg/ee/c3/840e901d-city-25345-158f32d4e66.jpg?width=1366&height=768&xhint=1940&yhint=1356&crop=true", price:'$$$', rating: 5 }
    ]
  },
  {
    lat: 13.1632, 
    lng: 72.5453, 
    popularLocations: [
      {name: "Machu Picchu", description: "Machu Picchu is an Incan citadel set high in the Andes Mountains in Peru.", image: "https://travel.home.sndimg.com/content/dam/images/travel/fullset/2014/05/28/50/Machu-Picchu-Mountain.rend.hgtvcom.1280.1280.suffix/1491584261034.jpeg",price: '$$$', rating: 5 }
    ]
  }
]

const apiKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
const lat = 36.1173;
const lng = -115.1761;
const radius = 5000; // 5km
const type = 'restaurant';

async function getNearbyPlaces(lat, lng, radius, type) {
  const url = `http://localhost:5000/nearbyPlaces?location=${lat},${lng}&radius=${radius}&type=${type}`;

  try {
    const response = await axios.get(url);
    console.log('Response data:', response.data);
    return response.data.results;
  } catch (error) {
    console.error(error);
  }
}

getNearbyPlaces(lat, lng, radius, type)
  .then(places => console.log(places))
  .catch(error => console.error(error));
 
  
  const ActComponent = ({ lat, lng }) => {
    const location = locations.find(location => location.lat === lat && location.lng === lng);
    const [popupLocation, setPopupLocation] = useState(null);
    const [nearbyPlaces, setNearbyPlaces] = useState([]);
  
    useEffect(() => {
      getNearbyPlaces(lat, lng, radius, type)
        .then(places => setNearbyPlaces(places))
        .catch(error => console.error(error));
    }, [lat, lng]);
  
    const handleClickImage = (popularLocation) => {
      setPopupLocation(popularLocation);
    };
  
    function handleClose() {
      setPopupLocation(null);
    }
  
    const handleAddToList = () => {
      console.log(`Added ${popupLocation.name} to the list`);
      setPopupLocation(null); // Close the popup
    }

  return (
    <div className="map-container">
      {location && (
        <div className="side-menu">
          <h2>Popular</h2>
          <ul>
            {location.popularLocations.map((popularLocation, index) => (
              <li key={index}>
                {popularLocation.name}
                <img 
                  src={popularLocation.image} 
                  alt={popularLocation.name} 
                  onClick={() => handleClickImage(popularLocation)}
                />
                <StarRatings
                  rating={popularLocation.rating}
                  starRatedColor="gold"
                  numberOfStars={5}
                  name='rating'
                  starDimension="20px" // Set the size of the stars
                />
                <p>{popularLocation.price}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
      {popupLocation && (
        <div className="popup">
          <button className="close-button" onClick={handleClose}>X</button>
          <img src={popupLocation.image} alt={popupLocation.name} />
          <h2>{popupLocation.name}</h2>
          <StarRatings
            rating={popupLocation.rating}
            starRatedColor="gold"
            numberOfStars={5}
            name='rating'
            starDimension="20px"
          />
          <p>{popupLocation.description}</p>
          <button onClick={handleAddToList}>Add to List</button>
        </div>
      )}
    </div>
  );
};
  
  export default ActComponent;