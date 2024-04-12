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

const AddExpenseForm = ({ onAddExpense, categories }) => {
	const initialExpenseData = {
		userName: "",
		title: "",
		category: "",
		description: "",
		splitMethod: "equal",
		amount: "",
	};

	const [expenseData, setExpenseData] = useState(initialExpenseData);
	const [message, setMessage] = useState("");

	const handleChange = ({ target }) => {
		setExpenseData({
			...expenseData,
			[target.name]: target.value,
		});
	};

	const validateFormData = () => {
		const { userName, title, category, amount } = expenseData;

		if (!userName.trim()) return "User Name is required";
		if (!title.trim()) return "Title is required";
		if (!category.trim()) return "Category is required";
		if (!amount.trim()) return "Amount is required";
		if (isNaN(amount) || parseFloat(amount) <= 0)
			return "Amount must be a positive number";

		return null;
	};

	const resetForm = () => {
		setExpenseData(initialExpenseData);
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		const errorMessage = validateFormData();
		if (errorMessage) {
			setMessage(errorMessage);
			return;
		}

		if (expenseData.splitMethod === "equal") {
			expenseData.amount = (parseFloat(expenseData.amount) / 2).toFixed(2);
		}

		onAddExpense(expenseData);
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
			<Grid container spacing={2}>
				<Grid item xs={12} sm={6} mt={1}>
					<FormControl fullWidth>
						<InputLabel id="userName-label">User Name</InputLabel>
						<Select
							labelId="userName-label"
							id="userName"
							name="userName"
							value={userName}
							onChange={handleChange}
						>
							{names.map((person) => (
								<MenuItem key={person} value={person}>
									{person}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<FormControl fullWidth margin="normal">
						<InputLabel id="split-method-label">Split Method</InputLabel>
						<Select
							labelId="split-method-label"
							id="split-method"
							value={splitMethod}
							label="Split Method"
							name="splitMethod"
							onChange={handleChange}
						>
							<MenuItem value="equal">Split Equally</MenuItem>
							<MenuItem value="specific">Specific Costs</MenuItem>
						</Select>
					</FormControl>
					<FormControl fullWidth margin="normal">
						<InputLabel id="category-label">Category</InputLabel>
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
				<Grid item xs={12} sm={6}>
					<Grid container spacing={1}>
						<Grid item xs={12} md={6}>
							<TextField
								required
								fullWidth
								id="expense-title"
								label="Title"
								name="title"
								value={title}
								onChange={handleChange}
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
							/>
						</Grid>
					</Grid>
					<Grid container>
						<Grid item xs={6}>
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
