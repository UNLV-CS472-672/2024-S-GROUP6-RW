import React, { useState } from "react";
import { Button, TextField, Box } from "@mui/material";

const SignUpForm = ({ open, onClick, onClose, onSubmit }) => {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = () => {
    // Check for errors in username, email, and password
    const usernameValid = isValidName(username);
    const firstNameValid = isValidName(firstName);
    const lastNameValid = isValidName(lastName);
    const emailValid = isValidEmailAddress(email);
    const passwordValid = isValidPassword(password);

    // Check if any of the fields are empty
    const fieldsNotEmpty =
      username.trim() !== "" &&
      firstName.trim() !== "" &&
      lastName.trim() !== "" &&
      email.trim() !== "" &&
      password.trim() !== "";

    // Define the API endpoint URL
    const apiUrl = "http://localhost:8080/register";

    // Prepare the data to be sent in the request
    const userData = { username, firstName, lastName, email, password };

    // Call onSubmit only if there are no errors
    if (
      usernameValid &&
      firstNameValid &&
      lastNameValid &&
      emailValid &&
      passwordValid &&
      fieldsNotEmpty
    ) {
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
          return response.json().then((errData) => {
            throw new Error(errData.error || "Network response was not ok.");
          });
        
        })
        .then((data) => {
          console.log(data); // Process the response data
          // Here you can redirect the user or show a success message
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
          // Here you can show an error message to the user
        });

    } else {
      console.log("ERROR");
    }
    
  };

  const isValidName = (name) => {
    // Regular expression to validate email address
    const usernameRegex = /^[a-zA-Z0-9]*$/;
    return usernameRegex.test(name);
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
      <Box
        sx={{
          width: "500px",
          p: 2,
          overflow: "hidden",
          margin: "auto",
        }}
      >
        {/* Adjust the width and height of the Box */}
        <TextField
          id="outlined-basic-username"
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={handleUsernameChange}
          error={!isValidName(username)}
          helperText={
            isValidName(username)
              ? ""
              : "Username cannot contain spaces or special characters"
          }
        />
        <div style={{ display: "flex" }}>
          {/* Adjust the width and height of the Box */}
          <TextField
            id="outlined-basic-username"
            label="First Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={firstName}
            onChange={handleFirstNameChange}
            error={!isValidName(firstName)}
            helperText={
              isValidName(firstName)
                ? ""
                : "First Name cannot contain spaces or special characters"
            }
          />
          {/* Adjust the width and height of the Box */}
          <TextField
            id="outlined-basic-username"
            label="Last Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={lastName}
            onChange={handleLastNameChange}
            error={!isValidName(lastName)}
            helperText={
              isValidName(lastName)
                ? ""
                : "Last Name cannot contain spaces or special characters"
            }
          />
        </div>
        <TextField
          id="outlined-basic-email"
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={handleEmailChange}
          error={!isValidEmailAddress(email)}
          helperText={
            isValidEmailAddress(email) ? "" : "Format: johndoe@gmail.com"
          }
        />
        <TextField
          id="outlined-basic-password"
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={handlePasswordChange}
          error={!isValidPassword(password)}
          helperText={
            isValidPassword(password) ? "" : "Password cannot contain spaces"
          }
        />
        <Button onClick={handleSubmit} sx={{ marginRight: 1 }}>
          Submit
        </Button>
      </Box>
    </>
  );
};

export default SignUpForm;