  import { alpha } from '@mui/material/styles';
  import Button from '@mui/material/Button';
  import Menu from '@mui/material/Menu';
  import MenuItem from '@mui/material/MenuItem';

  import React, { useState, useEffect } from "react";
  import { Link } from "react-router-dom";
  import Box from "@mui/material/Box";
  import Typography from "@mui/material/Typography";
  import Accordion from "@mui/material/Accordion";
  import AccordionDetails from "@mui/material/AccordionDetails";
  import { Grid, Card, CardActionArea, CardMedia } from "@mui/material";
  import { Redirect } from 'react-router-dom';

  import { Modal as BaseModal } from '@mui/base/Modal'
  import { styled } from '@mui/system'  

  // Icons used
  import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
  import AddIcon from '@mui/icons-material/Add';
  import UpdateIcon from '@mui/icons-material/Update';
  import RestoreIcon from '@mui/icons-material/Restore';

  import { deepPurple } from '@mui/material/colors'

  // To fetch trip information from backend
  import { getAllTrips } from '../../utils/ApiManager';
  import { getFromLocal } from '../../utils/LocalStorageManager';

  // Convert the ISO time to Month DD, year format
  // Example: 2024-04-19T07:00:00Z to April 19, 2024
  function convertDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  }

  // Upcoming trip 
  const currTrip = [];

  /// Function to add a new trip to currTrip array
  function addNewTrip() {
    // Retrieve trip data from local storage
    const location = getFromLocal('LocationName');
    const startDate = convertDate(getFromLocal('startDate'));
    const endDate = convertDate(getFromLocal('endDate'));
    const tripTitle = getFromLocal('tripTitle');

    // Create an object for the new trip
    const trip = {
      url: "mchouse.jpg", // Assuming this remains constant
      Title: tripTitle,
      width: "50%", // Assuming these remain constant
      height: "50%",
      LocationName: location,
      StartDate: startDate + ' - ' + endDate, // Combine start and end date
      itinerary: "Itinerary:\n Explore the city\n Visit the museum", // Assuming this remains constant
    };

    // Push the new trip object into the currTrip array
    currTrip.push(trip);
  }

 

  // Style for the modal
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  }


  // From MUI Menu documentation
  const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      {...props}
    />
  ))(({ theme }) => ({
    '& .MuiPaper-root': {
      backgroundColor: "#a3b9c9",   //Color of the drop down
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
      color: 
        theme.palette.mode === 'light' ? 'rgb(0, 0, 0)' : theme.palette.grey[300],
      boxShadow:
        'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
      '& .MuiMenu-list': {
        padding: '4px 0',
      },
      '& .MuiMenuItem-root': {
        '& .MuiSvgIcon-root': {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        '&:active': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
  }));


  // Past trips
  const photosPastTrips = [
    {
      url: 'Lago.jpg',
      title: "Lago",
      width: 900,
      height: 600,
    },
    {
      url: 'KingCounty.jpg',
      title: 'King County',
      width: 900,
      height: 600,
    },
    {
      url: 'LasVegas.jpg',
      title: 'Las Vegas',
      width: 900,
      height: 600,
    },
    {
      url: 'Laos.jpg',
      title: 'Laos',
      width: 900,
      height: 600,
    },
    {
      url: 'Hawaii.jpg',
      title: 'Hawaii',
      width: 900,
      height: 600,
    },
    {
      url: 'LosAngeles.jpg',
      title: 'Los Angeles',
      width: 900,
      height: 600,
    },
    {
      url: 'Tokyo.jpg',
      title: 'Tokyo',
      width: 900,
      height: 600,
    },
    {
      url: 'NewYork.jpg',
      title: 'New York',
      width: 900,
      height: 600,

    },
    {
      url: 'Rome.jpg',
      title: 'Rome',
      width: 900,
      height: 600,
    },
    {
      url: 'LaPaz.jpg',
      title: 'La Paz',
      width: 900,
      height: 600,
    },
    {
      url: 'paris.jpg',
      title: 'Paris',
      width: 900,
      height: 600,
    },
    {
      url: 'seoul.jpg',
      title: 'Seoul',
      width: 900,
      height: 600,
    },
  ]
  // Map trip titles to their corresponding photo names
  
  let pastTrip = [
    
  ];
  // Function to fetch and display all trips
  async function displayAllTrips() {
    try {
      // Fetch all trips
      const tripData = await getAllTrips();

      // Check if tripData is available
      if (!tripData || !Array.isArray(tripData)) {
        console.error('No trip data available');
        return null;
      }

     // Convert tripData into the format of pastTrip array
     const pastTrips = tripData.map(trip => ({
      url: photosPastTrips.find(photo => trip.LocationName.includes(photo.title))?.url,      
      width: "50%",
      height: "50%",
      LocationName: trip.LocationName,
      StartDate: convertDate(trip.StartDate) + ' - ' + convertDate(trip.EndDate),
      itinerary: trip.itinerary,
      title: trip.Title,
    }));

    console.log('URL for trip:', pastTrips.url); // Output the URL to the console
    // Update the pastTrip array
    pastTrip.push(...pastTrips);


      // Return the pastTrips array if needed
      return pastTrips;
    } catch (error) {
      console.error('Error fetching trips:', error);
      return null;
    }
  }
  
  export default function ShowTrips() {
    const [openModal, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [tripElements, setTripElements] = useState(null);
  
    const handleOpenModal = (image) => {
      setSelectedImage(image);
      setOpen(true);
    };
  
    const handleCloseModal = () => {
      setOpen(false);
    };
  
    const Modal = styled(BaseModal)`
      position: center;
      display: flex;
      align-items: center;
      justify-content: center;
    `;
  
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleMenuItemClick = (option) => {
      setSelectedOption(option);
      setAnchorEl(null);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
   // Add event listener to fetch and display trips when component mounts
  useEffect(() => {
    const fetchAndDisplayTrips = async () => {
      const elements = await displayAllTrips();
      setTripElements(elements);
    };

    // Check if trips have already been fetched
    if (!tripElements) {
      fetchAndDisplayTrips();
    }
  }, []); // Empty dependency array ensures the effect runs only once when component mounts

  
    return (
      <div className=''>
        <div>
          <h3>Past</h3>
          <Accordion sx={{ backgroundColor: "#afd2e9" }}>  
            <AccordionDetails sx={{ backgroundColor: "#afd2e9" }}>
              <Grid container spacing={5}>
                {pastTrip.map((trip, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <Card component={Link} to={trip.link}>
                      <CardActionArea onClick={() => handleOpenModal(trip)}>
                        <div style={{ position: 'relative' }}>
                          <CardMedia
                            component="img"
                            height="180"
                            image={trip.url}
                            alt={trip.Title}
                          />
                          <div className='text-container'>
                            <Typography variant="subtitle2" style={{ padding: '8px' }}>
                              {trip.LocationName}
                            </Typography>
                            <Typography variant="subtitle2" style={{ padding: '8px' }}>
                              {trip.StartDate}
                            </Typography>
                          </div>
                        </div>
                      </CardActionArea>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </AccordionDetails>
          </Accordion>
  
          <Modal 
            open={openModal} 
            onClose={handleCloseModal}
          > 
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backdropFilter: 'blur(5px)' }}>
              <Box sx={ modalStyle }>
                <img 
                  src={selectedImage && selectedImage.url} 
                  alt={selectedImage && selectedImage.Title} 
                  style={{ width: '100%', height: 'auto' }} 
                />
                <Typography variant="body1" style={{ whiteSpace: 'pre-line' }}>
                  {selectedImage && selectedImage.itinerary}
                </Typography>
                <Button onClick={handleCloseModal}> Close </Button>
              </Box>
            </div>
          </Modal>
        </div>
      </div>
    );
  }