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

  // To fetch trip information from backend
  import { getAllTrips } from '../../utils/ApiManager';
  import { getFromLocal } from '../../utils/LocalStorageManager';

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

  // Photos to use for grid and modal
  const photosForTrips = [
    {
      url: 'Lago.jpg',
      title: "Lago",
      width: 900,
      height: 600,
      itinerary:"\nThe Emir's Place \n Yankari National Park and Game Reserve",
    },
    {
      url: 'KingCounty.jpg',
      title: 'King County',
      width: 900,
      height: 600,
      itinerary:"\nRiver Float \n San Antonio River Walk \n Space Center Houston",
    },
    {
      url: 'LasVegas.jpg',
      title: 'Las Vegas',
      width: 900,
      height: 600,
      itinerary:"\nVisit Fremont Street \n Go to Mob Musuem \n Drive Through Red Rock Canyon",
    },
    {
      url: 'Laos.jpg',
      title: 'Laos',
      width: 900, 
      height: 600,
      itinerary:"\nKuang Si Waterfall \n Pha That Luang Vietiane \n Wat Xiengthong",
    },
    {
      url: 'Hawaii.jpg',
      title: 'Hawaii',
      width: 900,
      height: 600,
      itinerary:"\nKihea Beach \n Pipiwai Trail \n Lahaina Banyan Court Park",
    },
    {
      url: 'LosAngeles.jpg',
      title: 'Los Angeles',
      width: 900,
      height: 600,
      itinerary:"\nZuma Beach \n Little Tokyo \n Angel's Crest",
    },
    {
      url: 'Tokyo.jpg',
      title: 'Japan',
      width: 900,
      height: 600,
      itinerary:"\nFushimi Inari-taisha Shrine \n Dotombori District \n Osaka\nDay trip to Mount Fuji",
    },
    {
      url: 'NewYork.jpg',
      title: 'New York',
      width: 900,
      height: 600,
      itinerary:"\nBrooklyn Bridge \n Central Park \n Empire State Building \n Top of The Rock",
    },
    {
      url: 'Rome.jpg',
      title: 'Rome',
      width: 900,
      height: 600,
      itinerary:"\nColosseum \n Vatican Musuem \n Galleria Doria Pamphilj",
    },
    {
      url: 'LaPaz.jpg',
      title: 'La Paz',
      width: 900,
      height: 600,
      itinerary:"\nValle de la Luna \n Plaza Murillo \n North Yungas Road",
    },
    {
      url: 'paris.jpg',
      title: 'France', 
      width: 900,
      height: 600,
      itinerary:"\nVisit Eiffel Tower and Louvre \n Breizh Cafe \n Nice, France",
    },
    {
      url: 'seoul.jpg',
      title: 'Korea',
      width: 900,
      height: 600,
      itinerary:"\nSeoul \n Busan \n Jeju Island ",
    },
    {
      url: 'Florence.jpg',
      title: 'Florence',
      width: 900,
      height: 600,
      itinerary:"\nPonte Vecchio \n Piazzale Michelangelo \n Day trip to Florence",
    },
    {
      url: 'HongKong.jpg',
      title: 'Hong Kong',
      width: 900,
      height: 600,
      itinerary:"\nTai Mo Shan Waterfall \n Tian Tan Buddha \n Hong Kong Disneyland",
    },
    {
      url: 'Faroe.jpg',
      title: 'Faroe Islands',
      width: 900,
      height: 600,
      itinerary:"\nThe Nordic House \n Kalsoy \n Mulafossur Waterfall ",
    },
    {
      url: 'London.jpg',
      title: 'London',
      width: 900,
      height: 600,
      itinerary:"\nStonehedge \n Private Tour of London \n Hyde Park",
    },  
    {
      url: 'BoraBora.jpg',
      title: 'Bora-Bora',
      width: 900,
      height: 600,
      itinerary:"\nMatira Beach \n Coral Gardens \n Mount Otemanu",
    },  
  ]

  // Convert the ISO time to Month DD, year format
  // Example: 2024-04-19T07:00:00Z to April 19, 2024
  function convertDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  }

  // Checks if date is before current date
  // ai-gen start (ChatGPT-3.5, 0)
  function isDateBeforeToday(date) {
    return (new Date(date.toDateString()) < new Date(new Date().toDateString()));
  }
  // ai-gen end

  // Store past trip information
  let upcomingTrip = [];
  let pastTrip = [];
  
  // Function to fetch and display all trips
  async function displayAllTrips() {
    try {
      // Fetch all trips
      const tripData = await getAllTrips();
      const currentDate = new Date();
     
      // Convert tripData into the format of pastTrip array
      const currentTrip = tripData.map(trip => ({
        // If the location name is contained in one of the photosForTrips title,
        // set the url to the corresponding photo
        url: photosForTrips.find(photo => trip.LocationName.includes(photo.title))?.url,      
        width: "50%",
        height: "50%",
        LocationName: trip.LocationName,
        StartDate: convertDate(trip.StartDate),
        EndDate: convertDate(trip.EndDate),
        itinerary: photosForTrips.find(photo => trip.LocationName.includes(photo.title))?.itinerary,
        title: trip.Title,
      }));

      currentTrip.forEach(trip => {
        const endDate = new Date(trip.EndDate);
        console.log("CurrentDate: ", convertDate(currentDate));
        console.log("EndDate: ", convertDate(endDate)); 
        console.log(trip);
        
        // Check if trip is upcoming or past, by checking if EndDate is before current date
        if (isDateBeforeToday(endDate)) {
          // Trip is before current date
          // Check if trip has been added to the list of past trips
          const existInPast = pastTrip.some(past => JSON.stringify(past) === JSON.stringify(trip));
          if(!existInPast){
            pastTrip.push(trip);
          }
        }else{
          // Trip is after current date
          // Checks if trip is in upcoming trips 
          const existInUpcoming = upcomingTrip.some(upcoming => JSON.stringify(upcoming) === JSON.stringify(trip));
          if(!existInUpcoming){
            upcomingTrip.push(trip);
          } 
        }  
      });
    } catch (error) { 
      console.error('Error fetching trips:', error);
      return null;
    }
  }
  
  // Show the trip in a grid format
  // and when clicked, show a modal version of the trip
  export default function ShowTrips() {
      {/* Handles the event open/close of a modal */}
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
  
    {/* Event handlers for the Menu - from MUI Menu documentation */}
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
  
    // Event handlers for rendering past trips
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
        {/*Drop down menu */}
        <Button
          
          id="demo-customized-button"
          aria-controls={anchorEl ? 'demo-customized-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={Boolean(anchorEl)}
          variant="contained"
          disableElevation
          onClick={handleClick}
          endIcon={<ArrowDropDownIcon />}
          
        >
          Options
        </Button>
        
        <StyledMenu
          id="demo-customized-menu"
          MenuListProps={{
            'aria-labelledby': 'demo-customized-button',
          }}
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => handleMenuItemClick('upcoming')} disableRipple>
            <UpdateIcon />
            Upcoming
          </MenuItem>
          <MenuItem onClick={() => handleMenuItemClick('past')} disableRipple>
            <RestoreIcon />
            Past
          </MenuItem>
        </StyledMenu>

        {/* New Trip Button */}
        <Button
          variant="contained"
          disableElevation
          component={Link}
          to="/gatheringinfo"
          style={{ marginLeft: '10px' }}
          startIcon={<AddIcon />}
        >
          New Trip
        </Button>
        {/* Conditional rendering based on selected option */}
        {/* Displays current trips when going to page and anytime current is selected*/}
        {selectedOption !== 'past' && 
          <div>
            <h3> Upcoming</h3>
          
            {/*Current trips*/}
            <Accordion >
              <AccordionDetails sx={{ backgroundColor: "#afd2e9" }}>
                
                {/*Grid for current trips */} 
                <Grid container spacing={5}>
                  {upcomingTrip.map((trip, index) => (
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
                            {/* Display location and date of the trip underneath the photo*/}
                            <div className='text-container'>
                              <Typography variant="subtitle2" style={{ padding: '8px' }}>
                                {trip.LocationName}
                              </Typography>
                            
                              <Typography variant="subtitle2" style={{ padding: '8px' }}>
                                {trip.StartDate} - {trip.EndDate}
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

            {/* Modal for upcoming trips */}
            <Modal 
              open={openModal} 
              onClose={handleCloseModal}
            >
              {/*ai-gen start (ChatGPT-3.5, 0) */}
              {/* Asked ChatGPT to center the modal and blur the background*/}
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backdropFilter: 'blur(5px)' }}>
                {/*ai-gen end */}
                <Box sx={ modalStyle }> 
                  
                  {/*Displays image and itinerary when image is clicked */}
                  <img
                    src={selectedImage && selectedImage.url} 
                    alt={selectedImage && selectedImage.Title} 
                    style={{ width: '100%', height: 'auto' }} 
                  />
                  
                  <Typography variant="body1" style={{ whiteSpace: 'pre-line' }}>
                    {selectedImage && (
                      <React.Fragment>
                        <strong>Itinerary: </strong> {selectedImage.itinerary}
                      </React.Fragment>
                    )}
                  </Typography>

                  <Button onClick={handleCloseModal}> Close </Button>
                </Box>
              </div>

            </Modal>
          </div>
        }

        {/*Renders Past trips grid and modal */}
        {selectedOption === 'past' && 
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
                                {trip.StartDate} - {trip.EndDate}
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
                    {selectedImage && (
                      <React.Fragment>
                        <strong>Itinerary: </strong> {selectedImage.itinerary}
                      </React.Fragment>
                    )}
                  </Typography>
                  <Button onClick={handleCloseModal}> Close </Button>
                </Box>
              </div>
            </Modal>
          </div>
        }
      </div>
    );
  }