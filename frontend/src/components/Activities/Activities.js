const locations = [
  { 
    lat: 36.1173, 
    lng: -115.1761, //las vegas
    popularLocations: [
      { name: 'Location 1', image: 'https://media-cdn.tripadvisor.com/media/photo-m/1280/2a/34/2d/28/caption.jpg' },
      { name: 'Location 2', image: 'https://a.cdn-hotels.com/gdcs/production37/d1139/a8a147d0-c31d-11e8-825c-0242ac110006.jpg?impolicy=fcrop&w=800&h=533&q=medium' },
      { name: 'Location 3', image: 'https://assets.editorial.aetnd.com/uploads/2009/12/gettyimages-108009569.jpg' }
    ]
  },
  { 
    lat: 51.1657, 
    lng: 10.4515, 
    popularLocations: [
      { name: 'Germany', image: 'https://www.deutschland.de/sites/default/files/styles/image_carousel_mobile/public/media/image/tdt_29092020_1_staat_16_laender_schwerin.jpg?itok=4PP80WP4' }
    ]
  },
  { 
    lat: 46.2276, 
    lng: 2.2137, 
    popularLocations: [
      { name: 'France', image: 'https://www.travelandleisure.com/thmb/9xr8CFGR14sLvR4IhLwKV64fEV0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/TAL-Eiffel-Tower-BESTFRANCE0323-dada0673f8764c099b68d01695ef8057.jpg' }
    ]
  },
  { 
    lat: 19.8987, 
    lng: 155.6659, 
    popularLocations: [
      { name: 'Hawaii', image: 'https://www.travelandleisure.com/thmb/9xr8CFGR14sLvR4IhLwKV64fEV0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/TAL-Eiffel-Tower-BESTFRANCE0323-dada0673f8764c099b68d01695ef8057.jpg' }
    ]
  },
  { 
    lat: 41.8967, 
    lng: 12.4822, 
    popularLocations: [
      { name: 'Rome', image: 'https://www.travelandleisure.com/thmb/9xr8CFGR14sLvR4IhLwKV64fEV0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/TAL-Eiffel-Tower-BESTFRANCE0323-dada0673f8764c099b68d01695ef8057.jpg' }
    ]
  },
  { 
    lat: 35.6764, 
    lng: 139.6500, 
    popularLocations: [
      { name: 'Tokyo', image: 'https://hips.hearstapps.com/hmg-prod/images/high-angle-view-of-tokyo-skyline-at-dusk-japan-royalty-free-image-1664309926.jpg' }
    ]
  },
  { 
    lat: 20.7984, 
    lng: 156.3319, 
    popularLocations: [
      { name: 'Maui', image: 'https://a.cdn-hotels.com/gdcs/production81/d1269/0cffe15a-7fdf-4e75-9415-92eaf78e2f73.jpg' }
    ]
  },
  { 
    lat: 25.0343, 
    lng: 77.3963, 
    popularLocations: [
      { name: 'Bahamas', image: 'https://thepointsguy.global.ssl.fastly.net/us/originals/2022/03/HI_B_KSchaler.jpg' }
    ]
  },
  { 
    lat: 51.5072, 
    lng: 0.1276, 
    popularLocations: [
      { name: 'London', image: 'https://a.cdn-hotels.com/gdcs/production153/d1371/e6c1f55e-51ac-41d5-8c63-2d0c63faf59e.jpg' }
    ]
  },
  { 
    lat: 16.5004, 
    lng: 151.7415, 
    popularLocations: [
      { name: 'Bora Bora', image: 'https://cache.marriott.com/content/dam/marriott-renditions/BOBXR/bobxr-exterior-aerialview-1580-hor-wide.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=2880px:*' }
    ]
  },
  { 
    lat: 17.6509, 
    lng: 149.4260, 
    popularLocations: [
      { name: 'Tahiti', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE6IkkwdqD57Dvlbe3JEwPtwEMNxX_0UKfeIIjADevwA&s' }
    ]
  },
  { 
    lat: 40.7128, 
    lng: 74.0060, 
    popularLocations: [
      { name: 'New York', image: 'https://cdn.britannica.com/61/93061-050-99147DCE/Statue-of-Liberty-Island-New-York-Bay.jpg' }
    ]
  },
  { 
    lat: 8.4095, 
    lng: 115.1889, 
    popularLocations: [
      { name: 'Bali', image: 'https://media.cntraveler.com/photos/63f4f4fc0630e21ed8088321/1:1/w_1280%2Ch_1280%2Cc_limit/GettyImages-1145042281.jpeg' }
    ]
  }
]
 
  
const handleClickImage = (popularLocation) => {
  // Perform an action when an image is clicked
  console.log(`You clicked the image of ${popularLocation.name}`);
};

const ActComponent = ({ lat, lng }) => {
  const location = locations.find(location => location.lat === lat && location.lng === lng);

  return (
    <div>
      {/* Your Google Map Block */}
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
                  onClick={() => handleClickImage(popularLocation)} // Add click event to the image
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
  
  export default ActComponent;