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

const initialExpenseData = {
	userName: "",
	title: "",
	category: "",
	description: "",
	splitMethod: "none",
	amount: "",
};

function validateFormData(expenseData) {
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

function handleSplitMethod(expenseData) {
	if (expenseData.splitMethod === "equal") {
		expenseData.amount = (parseFloat(expenseData.amount) / 2).toFixed(2);
	}

	if (expenseData.splitMethod === "none") {
		expenseData.payee = null;
	}

	return expenseData;
}

const AddExpenseForm = ({ onAddExpense, categories }) => {
	const [expenseData, setExpenseData] = useState(initialExpenseData);
	const [message, setMessage] = useState("");

	const handleChange = ({ target }) => {
		let updatedExpenseData = {
			...expenseData,
			[target.name]: target.value,
		};

		if (target.name === "splitMethod" && target.value === "none") {
			updatedExpenseData.userName = "";
		}

		setExpenseData(updatedExpenseData);
	};

	const resetForm = () => {
		setExpenseData(initialExpenseData);
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		const errorMessage = validateFormData(expenseData);
		if (errorMessage) {
			setMessage(errorMessage);
			return;
		}

		const updatedExpenseData = handleSplitMethod(expenseData);

		onAddExpense(updatedExpenseData);
		resetForm();
	};

	const { userName, title, category, description, splitMethod, amount } =
		expenseData;

	return (
		<Box
			component="form"
			sx={{
				"& .MuiTextField-root": { m: 1, width: "25ch" },
				p: 2,
				display: "flex",
				flexDirection: "column",
			}}
			noValidate
			autoComplete="off"
			onSubmit={handleSubmit}
		>
			{message && <Alert severity="error">{message}</Alert>}

			<Typography variant="h6">Add Expense</Typography>
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
					<FormControl fullWidth margin="normal">
						<InputLabel id="split-method-label" sx={{ color: "black" }}>
							Split Method
						</InputLabel>
						<Select
							labelId="split-method-label"
							id="split-method"
							value={splitMethod}
							label="Split Method"
							name="splitMethod"
							onChange={handleChange}
						>
							<MenuItem value="none">No Split</MenuItem>
							<MenuItem value="equal">Split Equally</MenuItem>
							<MenuItem value="specific">Specific Costs</MenuItem>
						</Select>
					</FormControl>
					<FormControl fullWidth>
						<InputLabel id="userName-label" sx={{ color: "black" }}>
							User Name
						</InputLabel>
						<Select
							labelId="userName-label"
							id="userName"
							name="userName"
							value={userName}
							onChange={handleChange}
							disabled={splitMethod === "none"}
							sx={{
								"&.Mui-disabled": {
									color: "black",
									backgroundColor: "#ddd",
								},
							}}
						>
							{names.map((person) => (
								<MenuItem key={person} value={person}>
									{person}
								</MenuItem>
							))}
						</Select>
					</FormControl>

					<FormControl fullWidth margin="normal">
						<InputLabel id="category-label" sx={{ color: "black" }}>
							Category
						</InputLabel>
						<Select
							labelId="category-label"
							id="expense-category"
							name="category"
							value={category}
							onChange={handleChange}
						>
							{categories.map(([categoryName]) => (
								<MenuItem key={categoryName} value={categoryName}>
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
							<TextField
								required
								fullWidth
								id="expense-title"
								label="Title"
								name="title"
								value={title}
								onChange={handleChange}
								InputLabelProps={{
									style: { color: "black" },
								}}
							/>
							<TextField
								required
								fullWidth
								id="expense-amount"
								label="Amount"
								name="amount"
								value={amount}
								onChange={handleChange}
								type="number"
								InputLabelProps={{
									style: { color: "black" },
								}}
							/>
							<TextField
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
									style: { color: "black" },
								}}
							/>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12}>
					<Button variant="contained" type="submit">
						Save Expense
					</Button>
				</Grid>
			</Grid>
		</Box>
	);
};

export default AddExpenseForm;
