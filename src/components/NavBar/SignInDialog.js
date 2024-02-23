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
		// Call onSubmit with username and password values
		onSubmit({ username, email, password });
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
