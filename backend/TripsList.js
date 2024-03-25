import * as React from 'react';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { TextField } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const images = [
  {
    url: '/test.jpg',
    title: 'Create Trip',
    width: '30%',
    method: "POST",
    api: '/create_trip',
    user: 'YES',
    tripTitle: 'YES',
    locationName: 'YES',
    request_data: {
      "Username": "",
      "TripTitle": "",
      "LocationName": "Test Location Name"
    }
  },
  {
    url: '/test.jpg',
    title: 'Get All Trips',
    width: '30%',
    method: "POST",
    api: '/get_all_trips',
    user: 'YES',
    request_data: {
      "Username": ""
    }
  },
  {
    url: '/test.jpg',
    title: 'Get Single Trip Details',
    width: '30%',
    method: "POST",
    api: '/get_trip_details',
    user: 'YES',
    tripTitle: 'YES',
    request_data: {
      "Username": "",
      "TripTitle": ""
    }
  },
  {
    url: '/hobbithome.jpg',
    title: 'Edit Trip',
    width: '30%',
    method: "POST",
    api: '/edit_trip',
    user: 'YES',
    tripTitle: 'YES',
    modifications: 'YES',
    request_data: {
      "Username": "",
      "TripTitle": "",
      "Modifications": [
        {"FieldName": "LocationName", "Data": "Paris"},
        {"FieldName": "TripTitle", "Data": "New Title"}
      ]
    }
  },
  {
    url: 'mchouse.jpg',
    title: 'Delete Trip',
    width: '30%',
    method: "POST",
    api: '/delete_trip',
    user: 'YES',
    tripTitle: 'YES',
    request_data: {
      "Username": "",
      "TripTitle": ""
    }
  },
  {
    url: '/test.jpg',
    title: 'Delete User',
    width: '30%',
    method: "POST",
    api: '/delete_user',
    user: 'YES',
    request_data: {
      "Username": ""
    }
  },
  {
    url: '/test.jpg',
    title: 'Get Friends',
    width: '30%',
    method: "POST",
    api: '/get_friends',
    user: 'YES',
    request_data: {
      "Username": ""
    }
  },
  {
    url: '/test.jpg',
    title: 'Send Friend Request',
    width: '30%',
    method: "POST",
    api: '/add_friend',
    sender: 'YES',
    target: 'YES',
    request_data: {
      "SenderUsername": "",
      "TargetUsername": "",
    }
  },
  {
    url: '/test.jpg',
    title: 'Get Friend Requests',
    width: '30%',
    method: "POST",
    api: '/get_friend_requests',
    user: 'YES',
    request_data: {
      "Username": ""
    }
  },
  {
    url: '/test.jpg',
    title: 'Acknowledge Friend Request',
    width: '30%',
    method: "POST",
    api: '/acknowledge_friend_request',
    sender: 'YES',
    target: 'YES',
    accept: 'YES',
    request_data: {
      "SenderUsername": "",
      "TargetUsername": "",
      "AcceptRequest": "",
    }
  }
];

const Container = styled('div')({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr', // Two columns
  gap: '20px',
  alignItems: 'top',
  justifyContent: 'center',
  textAlign: 'center',
});

const ImageContainer = styled('div')({
  display: 'grid',
  gridTemplateRows: 'auto auto', // Two rows
  gap: '10px', // Gap between rows
  alignItems: 'top',
  justifyContent: 'center',
});

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  minWidth: 400, // Adjust as needed
  minHeight: 200, // Adjust as needed
  [theme.breakpoints.down('sm')]: {
    width: '100%', // Take full width on small screens
  },
  '& .MuiImage': {
    width: '100%', // Ensure image takes full width inside the button
    height: '100%', // Ensure image takes full height inside the button
    objectFit: 'cover', // Maintain aspect ratio and cover entire space
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
  const [UsernameValues, setUsernameValues] = useState(Array(images.length).fill(""));
  const [SenderUsernameValues, setSenderUsernameValues] = useState(Array(images.length).fill(""));
  const [TargetUsernameValues, setTargetUsernameValues] = useState(Array(images.length).fill(""));
  const [TripTitleValues, setTripTitleValues] = useState(Array(images.length).fill(""));
  const [LocationNameValues, setLocationNameValues] = useState(Array(images.length).fill(""));
  const [ModifyFieldName, setModifyFieldName] = useState("");
  const [ModifyFieldValue, setModifyFieldValue] = useState("");
  const [AcceptFieldValues, setAcceptFieldValues] = useState(Array(images.length).fill(false));

  const handleUsernameChange = (event, index) => {
    const newValues = [...UsernameValues];
    newValues[index] = event.target.value;
    setUsernameValues(newValues);
  }

  const handleSenderUsernameChange = (event, index) => {
    const newValues = [...SenderUsernameValues];
    newValues[index] = event.target.value;
    setSenderUsernameValues(newValues);
  }
  
  const handleTargetUsernameChange = (event, index) => {
    const newValues = [...TargetUsernameValues];
    newValues[index] = event.target.value;
    setTargetUsernameValues(newValues);
  }
  
  const handleTripTitleChange = (event, index) => {
    const newValues = [...TripTitleValues];
    newValues[index] = event.target.value;
    setTripTitleValues(newValues);
  }

  const handleLocationNameChange = (event, index) => {
    const newValues = [...LocationNameValues];
    newValues[index] = event.target.value;
    setLocationNameValues(newValues);
  }

  const handleModifyFieldNameChange = (event) => {
    setModifyFieldName(event.target.value)
  }

  const handleModifyFieldValueChange = (event) => {
    setModifyFieldValue(event.target.value)
  }
  
  const handleAcceptFieldValues = (index) => {
    const newValues = [...AcceptFieldValues];
    newValues[index] = !AcceptFieldValues[index];
    setAcceptFieldValues(newValues);
  }

  const mockHTTP = (image, index) => {
    const apiUrl = "http://localhost:8080" + image.api;
    
    console.log("Mocking " + image.api);

    var request_data = image.request_data;

    if (image.user) {
      request_data["Username"] = UsernameValues[index];
    }
    
    if (image.sender) {
      request_data["SenderUsername"] = SenderUsernameValues[index];
    }
    
    if (image.target) {
      request_data["TargetUsername"] = TargetUsernameValues[index];
    }

    if (image.tripTitle) {
      request_data["TripTitle"] = TripTitleValues[index];
    }

    if (image.locationName) {
      request_data["LocationName"] = LocationNameValues[index];
    }

    if (image.modifications) {
      var modifList = [];

      switch(ModifyFieldName) {
        case "TripTitle":
          modifList.push({
            "FieldName": "TripTitle", "Data": ModifyFieldValue
          });
          break;
        case "LocationName":
          modifList.push({
            "FieldName": "LocationName", "Data": ModifyFieldValue
          });
          break;
        case "TripMembers":
          const memberList = ModifyFieldValue.split(" ")

          modifList.push({
            "FieldName": "TripMembers", "Data": memberList
          });
          break;
        default:
          console.log("Unknown field name:", ModifyFieldName, " Valid fields: 'TripTitle', 'LocationName', 'TripMembers'.");
      }

      request_data["Modifications"] = modifList;
    }
    
    if (image.accept) {
      request_data["AcceptRequest"] = AcceptFieldValues[index];
    }

    console.log(request_data);
    
    fetch(apiUrl, {
      method: image.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request_data),
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

  //console.log(images)
  return (
    <Box sx={{ display: 'block', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
      <Container>
        {images.map((image, index) => (
          <React.Fragment key={index}>
            <ImageContainer>
              {image.link ? ( // Check if a link is specified for the button
                <Link to={image.link}>
                  <ImageButton
                    focusRipple
                    style={{
                      width: image.width,
                    }}
                  >
                    <Image>
                      <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
                      <ImageBackdrop className="MuiImageBackdrop-root" />
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
                <>
                  <ImageButton
                    focusRipple
                    key={image.title}
                    style={{
                      width: image.width,
                    }}
                    onClick={() => mockHTTP(image, index)}
                  >
                    <Image>
                      <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
                      <ImageBackdrop className="MuiImageBackdrop-root" />
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
                </>
              )}
              {image.user ? (
                <TextField
                  id={`outlined-username-field-${index}`}
                  label="Username"
                  variant="outlined"
                  margin="normal"
                  value={UsernameValues[index]}
                  onChange={(event) => handleUsernameChange(event, index)}
                />
              ) : (
                <></>
              )}
              {image.sender ? (
                <TextField
                  id={`outlined-username-field-${index}`}
                  label="Sender User"
                  variant="outlined"
                  margin="normal"
                  value={SenderUsernameValues[index]}
                  onChange={(event) => handleSenderUsernameChange(event, index)}
                />
              ) : (
                <></>
              )}
              {image.target ? (
                <TextField
                  id={`outlined-username-field-${index}`}
                  label="Target User"
                  variant="outlined"
                  margin="normal"
                  value={TargetUsernameValues[index]}
                  onChange={(event) => handleTargetUsernameChange(event, index)}
                />
              ) : (
                <></>
              )}
              {image.tripTitle ? (
                <TextField
                  id={`outlined-title-field-${index}`}
                  label="Trip Title"
                  variant="outlined"
                  margin="normal"
                  value={TripTitleValues[index]}
                  onChange={(event) => handleTripTitleChange(event, index)}
                />
              ) : (
                <></>
              )}
              {image.locationName ? (
                <TextField
                  id={`outlined-location-field-${index}`}
                  label="Location Name"
                  variant="outlined"
                  margin="normal"
                  value={LocationNameValues[index]}
                  onChange={(event) => handleLocationNameChange(event, index)}
                />
              ) : (
                <></>
              )}
              {image.modifications ? (
                <>
                  <select value={ModifyFieldName} onChange={handleModifyFieldNameChange}>
                    {/* Option elements */}
                    <option value="">Select a field to change...</option>
                    <option value="TripTitle">Trip Title</option>
                    <option value="LocationName">Location Name</option>
                    <option value="TripMembers">Trip Members</option>
                  </select>
                  <TextField
                    id={`outlined-modify-content-${index}`}
                    label="Field Value"
                    variant="outlined"
                    margin="normal"
                    value={ModifyFieldValue}
                    onChange={(event) => handleModifyFieldValueChange(event)}
                  />
                </>
              ) : (
                <></>
              )}
              {image.accept ? (
                <FormControlLabel
                  control={<Checkbox/>}
                  label="Accept Request"
                  onChange={() => handleAcceptFieldValues(index)}
                />
              ) : (
                <></>
              )}
            </ImageContainer>
          </React.Fragment>
        ))}
      </Container>
    </Box>
  );
}