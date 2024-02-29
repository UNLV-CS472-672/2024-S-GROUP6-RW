// 2024-S-GROUP6-RW\frontend\src\components\Navbar

import React, { useState } from "react";
import {
  Dialog,
  Button,
  IconButton,
  Typography,
  TextField,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const dialogContainerStyle = {
  backdropFilter: "blur(5px)",
  "& .MuiPaper-root": {
    borderRadius: "8px",
  },
};

const props = {
  open: Boolean,
  onClick: () => {}, // Define your onClick function here
  onClose: () => {},
  onSubmit: () => {},
};

const SignInDialog = ({ open, onClick, onClose, onSubmit }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = () => {
    // Define the API endpoint URL
    const apiUrl = "http://localhost:8080/signin";

    // Prepare the data to be sent in the request
    const userData = { username, email, password };

    // Make the API call using fetch
    fetch(apiUrl, {
      method: "POST", // Specify the method
      headers: {
        "Content-Type": "application/json", // Specify the content type as JSON
      },
      body: JSON.stringify(userData), // Convert the userData object into a JSON string
    })
      .then((response) => {
        if (response.ok) {
          return response.json(); // Parse the JSON response body
        }
        throw new Error("Network response was not ok."); // Handle server errors
      })
      .then((data) => {
        console.log(data); // Process the response data
        // Here you can redirect the user or show a success message
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        // Here you can show an error message to the user
      });
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} style={dialogContainerStyle}>
        <IconButton
          sx={{ position: "absolute", top: "8px", right: "8px" }}
          color="inherit"
          onClick={onClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
        <Box
          sx={{
            width: "500px",
            height: "350px",
            p: 2,
            overflow: "hidden",
          }}
        >
          {" "}
          {/* Adjust the width and height of the Box */}
          <Typography variant="h6" gutterBottom align="center">
            {" "}
            {/* Center align the text */}
            Sign In
          </Typography>
          <TextField
            id="outlined-basic-username"
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={handleUsernameChange}
          />
          <TextField
            id="outlined-basic-email"
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={handleEmailChange}
          />
          <TextField
            id="outlined-basic-password"
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={handlePasswordChange}
          />
          <Button
            onClick={handleSubmit}
            sx={{ mx: "auto", mt: 2, display: "block" }}
          >
            Submit
          </Button>
        </Box>
      </Dialog>
    </>
  );
};

export default SignInDialog;
