import React, { useState } from "react";
import {
	TextField,
	Button,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Box,
	Typography,
	Alert,
	Grid,
} from "@mui/material";
import { names } from "./DataGen";

// Initial data for the form or kind hard code this
const initialExpenseData = {
	userName: "",
	title: "",
	category: "",
	description: "",
	splitMethod: "none",
	amount: "",
};

// Function to validate the form data
export function validateFormData(expenseData) {
	const { userName, title, category, amount } = expenseData;

	//we only check user name if split method is not none
	if (expenseData.splitMethod !== "none" && !userName.trim())
		return "User Name is required";

	if (!title.trim()) return "Title is required";
	if (!category.trim()) return "Category is required";
	if (!amount.trim()) return "Amount is required";
	if (isNaN(amount) || parseFloat(amount) <= 0)
		return "Amount must be a positive number";

	return null;
}

// Function to handle the split method
export function handleSplitMethod(expenseData) {
	if (expenseData.splitMethod === "equal") {
		expenseData.amount = (parseFloat(expenseData.amount) / 2).toFixed(2);
	}

	if (expenseData.splitMethod === "none") {
		expenseData.payee = null;
	}

	return expenseData;
}

// AddExpenseForm component
const AddExpenseForm = ({ onAddExpense, categories }) => {
	// State variables for the form data and message
	const [expenseData, setExpenseData] = useState(initialExpenseData);
	const [message, setMessage] = useState("");

	// Function to handle the form data change
	const handleChange = ({ target }) => {
		let updatedExpenseData = {
			//this is the updated expense data that will be set to the states
			...expenseData,
			[target.name]: target.value,
		};

		// Clear the user name if split method is none
		if (target.name === "splitMethod" && target.value === "none") {
			updatedExpenseData.userName = "";
		}

		setExpenseData(updatedExpenseData);
	};

	// Function to reset the form bc im lazy
	const resetForm = () => {
		setExpenseData(initialExpenseData);
	};

	// Function to handle the form submit
	const handleSubmit = (event) => {
		event.preventDefault(); // prevent the default form submission

		// Validate the form data and set the message if there's an error
		const errorMessage = validateFormData(expenseData);
		if (errorMessage) {
			setMessage(errorMessage);
			return;
		}

		// Clear the error message if there's no error and add the expense data to the list
		const updatedExpenseData = handleSplitMethod(expenseData);

		// Call the onAddExpense function from the parent components to add the expense
		// and reset the form
		onAddExpense(updatedExpenseData);
		resetForm();
	};

	// we will destructure the expense data to make it easier to use in the form
	const { userName, title, category, description, splitMethod, amount } =
		expenseData;

	return (
		<Box
			// ai-gen start (ChatGPT-4.0, 1)
			component="form"
			fontFamily="Radley"
			sx={{
				"& .MuiTextField-root": { m: 1, width: "25ch" },
				p: 2,
				display: "flex",
				flexDirection: "column",
				fontFamily: "Radley",
			}}
			// ai-gen end
			noValidate={false} // do extra validation
			autoComplete="off"
			onSubmit={handleSubmit}
		>
			{/* Display the error message if there's any */}
			{message && <Alert severity="error">{message}</Alert>}

			<Typography
				variant="h6"
				fontFamily="Radley"
				sx={{ fontFamily: "Radley" }}
			>
				Add Expense
			</Typography>

			<Grid container spacing={3}>
				<Grid
					item
					xs={12}
					sm={12}
					mt={5}
					lg={5}
					sx={{
						marginTop: {
							xs: "-10px",
							sm: "-20px",
							md: "5px",
							lg: "-5px",
						},
					}}
				>
					{/* Split Method */}
					<FormControl
						fullWidth
						margin="normal"
						fontFamily="Radley"
						sx={{ fontFamily: "Radley" }}
					>
						<InputLabel
							id="split-method-label"
							sx={{ color: "black", fontFamily: "Radley" }}
							fontFamily="Radley"
						>
							Split Method
						</InputLabel>
						<Select
							labelId="split-method-label"
							id="split-method"
							value={splitMethod}
							label="Split Method"
							name="splitMethod"
							fontFamily="Radley"
							onChange={handleChange}
							sx={{ fontFamily: "Radley" }}
						>
							<MenuItem
								value="none"
								fontFamily="Radley"
								sx={{ fontFamily: "Radley" }}
							>
								No Split
							</MenuItem>
							<MenuItem
								value="equal"
								fontFamily="Radley"
								sx={{ fontFamily: "Radley" }}
							>
								Split Equally
							</MenuItem>
							<MenuItem
								value="specific"
								fontFamily="Radley"
								sx={{ fontFamily: "Radley" }}
							>
								Specific Costs
							</MenuItem>
						</Select>
					</FormControl>

					{/* User Name */}
					<FormControl
						fullWidth
						fontFamily="Radley"
						sx={{ fontFamily: "Radley" }}
					>
						<InputLabel
							id="userName-label"
							sx={{ color: "black", fontFamily: "Radley" }}
							fontFamily="Radley"
						>
							User Name
						</InputLabel>
						<Select
							labelId="userName-label"
							id="userName"
							name="userName"
							value={userName}
							onChange={handleChange}
							disabled={splitMethod === "none"}
							fontFamily="Radley"
							sx={{
								// ai-gen start (ChatGPT-4.0, 0)
								"&.Mui-disabled": {
									color: "black",
									backgroundColor: "#ddd",
								},
								fontFamily: "Radley",
								// ai-gen end
							}}
						>
							{names.map((person) => (
								<MenuItem key={person} value={person}>
									{person}
								</MenuItem>
							))}
						</Select>
					</FormControl>

					{/* Category */}
					<FormControl
						fullWidth
						margin="normal"
						fontFamily="Radley"
						sx={{ fontFamily: "Radley" }}
					>
						<InputLabel
							id="category-label"
							sx={{ color: "black", fontFamily: "Radley" }}
							fontFamily="Radley"
						>
							Category
						</InputLabel>
						<Select
							labelId="category-label"
							id="expense-category"
							name="category"
							value={category}
							onChange={handleChange}
							fontFamily="Radley"
							sx={{ fontFamily: "Radley" }}
						>
							{categories.map(([categoryName]) => (
								<MenuItem
									sx={{ fontFamily: "Radley" }}
									key={categoryName}
									value={categoryName}
								>
									{categoryName}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>

				<Grid
					item
					xs={12}
					sm={12}
					mt={5}
					lg={5}
					sx={{
						marginTop: {
							xs: "-10px",
							sm: "-120px",
							md: "-20px",
							lg: "0px",
						},

						marginLeft: {
							xs: "0px",
							sm: "20px",
							md: "-60px",
							lg: "5px",
						},
					}}
				>
					<Grid container spacing={3}>
						<Grid
							item
							xs={12}
							sm={12}
							md={5}
							lg={5}
							sx={{
								marginTop: {
									xs: "-10px",
									sm: "100px",
									md: "5px",
									lg: "0px",
								},

								marginLeft: {
									xs: "-20px",
									sm: "-20px",
									md: "50px",
									lg: "0px",
								},
							}}
						>
							{/* Title, Amount, Description */}
							<TextField
								fontFamily="Radley"
								required
								fullWidth
								id="expense-title"
								label="Title"
								name="title"
								value={title}
								onChange={handleChange}
								InputLabelProps={{
									style: { color: "black", fontFamily: "Radley" },
								}}
								sx={{ fontFamily: "Radley" }}
							/>
							<TextField
								fontFamily="Radley"
								required
								fullWidth
								id="expense-amount"
								label="Amount"
								name="amount"
								value={amount}
								onChange={handleChange}
								type="number"
								InputLabelProps={{
									style: { color: "black", fontFamily: "Radley" },
								}}
								sx={{ fontFamily: "Radley" }}
							/>
							<TextField
								fontFamily="Radley"
								fullWidth
								id="expense-description"
								label="Description"
								name="description"
								value={description}
								multiline
								rows={1}
								onChange={handleChange}
								margin="normal"
								InputLabelProps={{
									style: { color: "black", fontFamily: "Radley" },
								}}
								sx={{ fontFamily: "Radley" }}
							/>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12}>
					<Button
						variant="contained"
						type="submit"
						fontFamily="Radley"
						sx={{ fontFamily: "Radley", backgroundColor: "#36446C" }}
					>
						Save Expense
					</Button>
				</Grid>
			</Grid>
		</Box>
	);
};

export default AddExpenseForm;
