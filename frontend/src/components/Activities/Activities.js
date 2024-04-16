const locations = [
    { 
      lat: 36.1173, 
      lng: -115.1761, 
      popularLocations: [
        { name: 'Location 1', image: 'https://media-cdn.tripadvisor.com/media/photo-m/1280/2a/34/2d/28/caption.jpg' },
        { name: 'Location 2', image: 'https://a.cdn-hotels.com/gdcs/production37/d1139/a8a147d0-c31d-11e8-825c-0242ac110006.jpg?impolicy=fcrop&w=800&h=533&q=medium' },
        { name: 'Location 3', image: 'https://assets.editorial.aetnd.com/uploads/2009/12/gettyimages-108009569.jpg' }
      ]
    },
    // Add image paths for other locations as well
    // ...
  ];
  
  const handleClick = (location) => {
    // Perform an action when a location is clicked
    console.log(`You clicked ${location.name}`);
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
                <li key={index} onClick={() => handleClick(popularLocation)}>
                  {popularLocation.name}
                  <img src={popularLocation.image} alt={popularLocation.name} /> {/* Display image */}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };
  
  export default ActComponent;