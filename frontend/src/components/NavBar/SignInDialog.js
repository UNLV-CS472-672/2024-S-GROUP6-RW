import React, { useState } from "react";
import useAuth from '../../auth/useAuth';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  Button,
  IconButton,
  Typography,
  TextField,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { convertLength } from "@mui/material/styles/cssUtils";

const dialogContainerStyle = {
  backdropFilter: "blur(5px)",
  "& .MuiPaper-root": {
    borderRadius: "8px",
  },
  margin: "auto",
};

const SignInDialog = ({ open, onClick, onClose}) => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Message, SetMessage] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async () => {
    // Check for errors in username, email, and password
    const emailValid = isValidEmailAddress(Email);

    // Check if any of the fields are empty
    const fieldsNotEmpty = Email.trim() !== "" && Password.trim() !== "";

    // Define the API endpoint URL
    const apiUrl = "http://localhost:8080/signin";

    // Prepare the data to be sent in the request
    const credentials = { Email, Password };

      try {
        const response = await axios.post(apiUrl, credentials);
        login(response.data.token);
        navigate("/map");
      } catch (error) {
          if (error.response) {
              // The request was made and the server responded with a status code
              console.log(error.response.data.error);

              if (!emailValid){
                SetMessage("Not a real email");
              }else if(!fieldsNotEmpty){
                SetMessage("Cannot have empty fields");
              }else{
                SetMessage(error.response.data.error);
              }
          } else if (error.request) {
              // The request was made but no response was received
              console.log(error.request);
          } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
          }
      }
  };

  const isValidEmailAddress = (email) => {
    // Regular expression to validate email address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "") {
      return true;
    }
    return emailRegex.test(email);
  };

  const isValidPassword = (password) => {
    // Regular expression to validate string (no spaces and special characters)
    return !password.includes(" ");
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} style={dialogContainerStyle}>
        <p          
          sx={{ position: "absolute", top: "8px", right: "8px" }}
          color="inherit"
          onClick={onClose}
          aria-label="close">{Message}</p>

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
            height: "300px",
            p: 2,
            overflow: "hidden",
            margin: "auto",
          }}
        >
          {/* Adjust the width and height of the Box */}
          <Typography variant="h6" gutterBottom align="center">
            {/* Center align the text */}
            Sign In
          </Typography>
          <TextField
            id="outlined-basic-email"
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={Email}
            onChange={handleEmailChange}
            error={!isValidEmailAddress(Email)}
            helperText={
              isValidEmailAddress(Email) ? "" : "Format: johndoe@gmail.com"
            }
          />
          <TextField
            id="outlined-basic-password"
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={Password}
            onChange={handlePasswordChange}
            error={!isValidPassword(Password)}
            helperText={
              isValidPassword(Password) ? "" : "Password cannot contain spaces"
            }
          />
          <Button onClick={handleSubmit} sx={{ marginRight: 1 }}>
            Submit
          </Button>
          <p>
            Don't have an account? <a href="/register">Sign Up</a>.
          </p>
        </Box>
      </Dialog>
    </>
  );
};

export default SignInDialog;