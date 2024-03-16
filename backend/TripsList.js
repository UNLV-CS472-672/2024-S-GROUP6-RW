import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const images = [
  {
    url: '/test.jpg',
    title: 'Create Trip',
    width: '30%',
    method: "POST",
    api: '/create_trip',
    request_data: {
      "Username": "wsimpson",
      "TripTitle": "Test Title",
      "LocationName": "Test Location Name"
    }
  },
  {
    url: '/test.jpg',
    title: 'Get Trips',
    width: '30%',
    method: "POST",
    api: '/get_all_trips',
    request_data: {
      "Username": "wsimpson"
    }
  },
  {
    url: '/test.jpg',
    title: 'Get Trip Details (Before)',
    width: '30%',
    method: "POST",
    api: '/get_trip_details',
    request_data: {
      "Username": "wsimpson",
      "TripTitle": "Test Title"
    }
  },
  {
    url: '/hobbithome.jpg',
    title: 'Edit Trip',
    width: '30%',
    method: "POST",
    api: '/edit_trip',
    request_data: {
      "Username": "wsimpson",
      "TripTitle": "Test Title",
      "Modifications": [
        {"FieldName": "TripTitle", "Data": "NEW Title"},
        {"FieldName": "LocationName", "Data": "NEW Location Name"},
        {"FieldName": "TripMembers", "Data": ["wsimpson", "jdoe"]}
      ]
    }
  },
  {
    url: '/test.jpg',
    title: 'Get Trip Details (After)',
    width: '30%',
    method: "POST",
    api: '/get_trip_details',
    request_data: {
      "Username": "wsimpson",
      "TripTitle": "NEW Title"
    }
  },
  {
    url: 'mchouse.jpg',
    title: 'Delete Trip',
    width: '30%',
    method: "POST",
    api: '/delete_trip',
    request_data: {
      "Username": "wsimpson",
      "TripTitle": "NEW Title"
    }
  },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  margin: '35px', // Add margin to create space between buttons
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const mockHTTP = (image) => {
  const apiUrl = "http://localhost:8080" + image.api;
  
  console.log("Mocking " + image.api);
  
  fetch(apiUrl, {
    method: image.method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(image.request_data),
  })
  .then(response => response.json())
  .then(data => {
    console.log("Received: " + JSON.stringify(data))
  })
  .catch(error => {
      // Handle any errors
      console.error("There was a problem with the trip request:", error);
  })
}

//fill the image to the button container
const ImageSrc = styled('span')({
  position: 'absolute',
  left: 3,
  right: 3,
  top: 3,
  bottom: 3,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

//hover over effect
const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

export default function ButtonBaseDemo() {
  //console.log(images)
  return (
    <Box sx={{ display: 'block', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
      {images.map((image, index) => (
        <React.Fragment key={index}>
          {image.link ? ( // Check if a link is specified for the button
            <Link to={image.link}>
              <ImageButton
                focusRipple
                style={{
                  width: image.width,
                }}
              >
                <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
                <ImageBackdrop className="MuiImageBackdrop-root" />
                <Image>
                  <Typography
                    component="span"
                    variant="subtitle1"
                    color="inherit"
                    sx={{
                      position: 'relative',
                      p: 4,
                      pt: 2,
                      pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                    }}
                  >
                    {image.title}
                    <ImageMarked className="MuiImageMarked-root" />
                  </Typography>
                </Image>
              </ImageButton>
            </Link>
          ) : (
            <ImageButton
              focusRipple
              key={image.title}
              style={{
                width: image.width,
              }}
              onClick={() => mockHTTP(image)}
            >
              <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
              <ImageBackdrop className="MuiImageBackdrop-root" />
              <Image>
                <Typography
                  component="span"
                  variant="subtitle1"
                  color="inherit"
                  sx={{
                    position: 'relative',
                    p: 4,
                    pt: 2,
                    pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                  }}
                >
                  {image.title}
                  <ImageMarked className="MuiImageMarked-root" />
                </Typography>
              </Image>
            </ImageButton>
          )}
        </React.Fragment>
      ))}
    </Box>
  );
}