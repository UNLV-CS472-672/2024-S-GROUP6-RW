import { alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import React, { useState } from "react";
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

// Upcoming trip 
const currTrip = [
  {
    url: "mchouse.jpg",
    title: "ur moms house",
    width: "50%",
    height: "50%",
    location: "ur house",
    date: "June 10-12, 2024",
    itinerary: "Itinerary: \n Explore the city \n Visit the musuem",
  },
];

// Past trips
const pastTrip = [
  {
    url: "/test.jpg",
    title: "Las Vegas",
    width: "50%",
    height: "50%",
    location: "Las Vegas, Nevada",
    date: "Dec 30, 2023 - Jan 2, 2024 ",
    itinerary: "Itinerary: \n Visit Fremont Street \n Go to Mob Musuem \n Drive Through Red Rock Canyon",
  },
  {
    url: "hobbithome.jpg",
    title: "New Zealand",
    width: "50%",
    height: "50%",
    location: "Matamata, New Zealand",
    date: "Nov 2 - 12 2023",
    itinerary: "Itinerary: \n Walk through Hobbinton Movie Set \n Waitomo Caves \n  Nelson - Greymouth \n Fox Glacier - Wanaka",
  },
  {
    url: "seoul.jpg",
    title: "South Korea",
    width: "50%",
    height: "50%",
    location: "Seoul, South Korea",
    date: "Oct 14 - 29, 2023",
    itinerary: "Itinerary: \n Seoul \n Busan \n Jeju Island ",
  },
  {
    url: "tokyo.jpg",
    title: "Japan",
    width: "50%",
    height: "50%",
    location: "Tokyo, Japan",
    date: "Sep 29- Oct 13, 2023",
    itinerary: "Itinerary: \n Fushimi Inari-taisha Shrine \n Dotombori District \n Osaka\nDay trip to Mount Fuji \n",
  },
  {
    url: "paris.jpg",
    title: "France",
    width: "50%",
    height: "50%",
    location: "Paris, France",
    date: "Aug 2-8, 2023",
    itinerary: "Itinerary: \n Visit Eiffel Tower and Louvre \n Breizh Cafe\n Nice, France \n ",
  },
];

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
      theme.palette.mode === 'light' ? 'rgb(24, 20, 38)' : theme.palette.grey[300],
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

// Makes the button for New Trip purple
const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(deepPurple[500]),
  backgroundColor: deepPurple[500],
  '&:hover': {
    backgroundColor: deepPurple[700],
  },
}));

export default function TripDropDown() {
  {/* Handles the event open/close of a modal */}
  const [openModal, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

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
      {selectedOption === 'upcoming' && 
        <div>
          <h3> Upcoming</h3>
         
          {/*Current trips*/}
          <Accordion >
            <AccordionDetails sx={{ backgroundColor: "#afd2e9" }}>
              
              {/*Grid for current trips */} 
              <Grid container spacing={5}>
                {currTrip.map((trip, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <Card component={Link} to={trip.link}>
                      <CardActionArea onClick={() => handleOpenModal(trip)}>
                        <div style={{ position: 'relative' }}>
                          <CardMedia
                            component="img"
                            height="180"
                            image={trip.url}
                            alt={trip.title}
                          />
                          {/* Display location and date of the trip underneath the photo*/}
                          <div className='text-container'>
                            <Typography variant="subtitle2" style={{ padding: '8px' }}>
                              {trip.location}
                            </Typography>

                            <Typography variant="subtitle2" style={{ padding: '8px' }}>
                              {trip.date}
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
            {/* Asked ChatGPT to center the modal and blur the background*/}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backdropFilter: 'blur(5px)' }}>
              <Box sx={ modalStyle }>
                
                {/*Displays image and itinerary when image is clicked */}
                <img
                  src={selectedImage && selectedImage.url} 
                  alt={selectedImage && selectedImage.title} 
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
      }

      {/*Renders Past trips modal */}
      {selectedOption === 'past' && 
        <div>
          <h3>Past</h3>
          {/*Past trips*/}
          <Accordion sx={{ backgroundColor: "#afd2e9" }}>  
            <AccordionDetails sx={{ backgroundColor: "#afd2e9" }}>
              {/*This is for the grid of images */}
              
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
                            alt={trip.title}
                          />

                           {/* Display location and date of the trip underneath the photo*/}
                          <div className='text-container'>
                           <Typography variant="subtitle2" style={{ padding: '8px' }}>
                             {trip.location}
                            </Typography>
                            <Typography variant="subtitle2" style={{ padding: '8px' }}>
                              {trip.date}
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

          {/* Modal for Past trips */}
          <Modal 
            open={openModal} 
            onClose={handleCloseModal}
          > 
            {/* Asked ChatGPT to center the modal and blur the background*/}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backdropFilter: 'blur(5px)' }}>
              <Box sx={ modalStyle }>
                
                {/*Displays the image and itinerary */}
                <img 
                  src={selectedImage && selectedImage.url} 
                  alt={selectedImage && selectedImage.title} 
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
      }
    </div>
  );
}