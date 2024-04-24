import React, { useState, useEffect } from "react";
import {
	Button,
	TextField,
	Box,
	InputAdornment,
	IconButton,
} from "@mui/material";
import { useAuth } from "../../auth/AuthContext";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { saveToLocal, getFromLocal } from "../../utils/LocalStorageManager";
import { useNavigate } from 'react-router-dom';
import { CreateTrip } from "../../utils/ApiManager";

const SignUpForm = ({ open, onClick, onClose, onSubmit }) => {
	const { login } = useAuth();
	const navigate = useNavigate();
	const [Username, setUsername] = useState("");
	const [FirstName, setFirstName] = useState("");
	const [LastName, setLastName] = useState("");
	const [Email, setEmail] = useState("");
	const [Password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);

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

	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleSubmit = () => {
		// Check for errors in username, email, and password
		const usernameValid = isValidName(Username);
		const firstNameValid = isValidName(FirstName);
		const lastNameValid = isValidName(LastName);
		const emailValid = isValidEmailAddress(Email);
		const passwordValid = isValidPassword(Password);

		// Check if any of the fields are empty
		const fieldsNotEmpty =
			Username.trim() !== "" &&
			FirstName.trim() !== "" &&
			LastName.trim() !== "" &&
			Email.trim() !== "" &&
			Password.trim() !== "";

		// Define the API endpoint URL
		const apiUrl = "http://localhost:8080/register";

		// Prepare the data to be sent in the request
		const userData = { Username, FirstName, LastName, Email, Password };

		console.log(userData);

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
				.then((response) => response.json())
				.then((data) => {
					if (data.token) {
						// Use the login function to save the token and update auth state
						login(data.token);
						// console.log(data.token); //Needs to be deleted after testing
						// Store username and email in local storage
						saveToLocal('username', Username);
						saveToLocal('email', Email);

						CreateTrip();

						navigate('/my-trips');
					} else {
						// Handle the case where no token is returned
						throw new Error("No token received after registration.");
					}
				})
				.catch((error) => {
					// Handle any errors
					console.error(
						"There was a problem with the registration:",
						error
					);
				});
		} else {
			// Handle validation errors
			console.log("ERROR: Invalid input.");
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
					value={Username}
					onChange={handleUsernameChange}
					error={!isValidName(Username)}
					helperText={
						isValidName(Username)
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
						value={FirstName}
						onChange={handleFirstNameChange}
						error={!isValidName(FirstName)}
						helperText={
							isValidName(FirstName)
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
						value={LastName}
						onChange={handleLastNameChange}
						error={!isValidName(LastName)}
						helperText={
							isValidName(LastName)
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
					type={showPassword ? "text" : "password"}
					value={Password}
					onChange={handlePasswordChange}
					error={!isValidPassword(Password)}
					helperText={
						isValidPassword(Password)
							? ""
							: "Password cannot contain spaces"
					}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton onClick={toggleShowPassword}>
									{showPassword ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
				<Button onClick={handleSubmit} sx={{ marginRight: 1 }}>
					Submit
				</Button>
			</Box>
		</>
	);
};

export default SignUpForm;
