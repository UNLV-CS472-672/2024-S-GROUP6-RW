import React, { useState, useCallback } from "react";
import {
	AppBar,
	Toolbar,
	Typography,
	Button,
	List,
	ListItem,
	ListItemText,
	Container,
	Paper,
	TextField,
	Select,
	MenuItem,
	Box,
	Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import NewExpenseDialog from "./NewExpensesDialog";

// hard code for testing as we not have databse/back end yet
const placesData = [
	{ id: 1, name: "Paris" },
	{ id: 2, name: "London" },
	{ id: 3, name: "New York" },
	{ id: 4, name: "Tokyo" },
	{ id: 5, name: "Sydney" },
	// ... other places
];

//rand for testing
const randomPlace = placesData[Math.floor(Math.random() * placesData.length)];

// make new functions that auto generate the expenseData
const generateRandomExpenseData = () => {
	//use rand to generate the id
	const id = Math.floor(Math.random() * 1000);
	//generate name by using random string
	const name = "Expense " + Math.floor(Math.random() * 1000);
	const amount = Math.floor(Math.random() * 1000);
	const payer = "User " + Math.floor(Math.random() * 1000);
	return { id, name, amount, payer };
};

const ExpenseForm = () => {
	//Use for loop to generate the expenseData 20x
	const [expensesData, setExpensesData] = useState(
		Array.from({ length: 20 }, () => generateRandomExpenseData())
	);

	// sort array
	expensesData.sort((a, b) => String(a.name).localeCompare(String(b.name)));

	//state to manage the dialog open and close
	const [dialogExpense, setDialogExpense] = useState(null);
	const [dialogOpen, setDialogOpen] = useState(false);

	// function to handle the remove event of the expense
	// use useCallback to prevent the function from being recreated on every render
	const handleRemoveExpense = useCallback((id) => {
		// remove the expense from the expensesData array using the id of the expense to filter the array
		setExpensesData((prevExpenses) =>
			prevExpenses.filter((expense) => expense.id !== id)
		);
	}, []);

	// function to handle the add event of the expense
	// use useCallback to prevent the function from being recreated on every render
	const handleAddExpense = useCallback((expense) => {
		// add the new expense to the expensesData array
		setExpensesData((prevExpenses) => {
			// add the new expense to the array
			const newExpenses = [...prevExpenses, expense];
			// sort the array by the name of the expense
			newExpenses.sort((a, b) => a.name.localeCompare(b.name));
			// return the sorted array
			return newExpenses;
		});
		// set the dialogExpense to null and open the dialog
		setDialogExpense(null);
		// open the dialog
		setDialogOpen(true);
	}, []);

	// Add new state variables for the search term and search type
	const [searchTerm, setSearchTerm] = useState("");
	const [searchType, setSearchType] = useState("name");

	// Create a new function for the search logic
	const filterExpenses = () => {
		return expensesData.filter((expense) => {
			// need to conver to lower case to make the search case insensitive
			// but we might need to take care of the case sensitive in the future?
			if (searchType === "payer") {
				return expense.payer
					.toLowerCase()
					.includes(searchTerm.toLowerCase());
			} else if (searchType === "name") {
				return expense.name
					.toLowerCase()
					.includes(searchTerm.toLowerCase());
			}
			return true;
		});
	};

	return (
		// Container = used to center the content and set the max-width
		<Container maxWidth="md" sx={{ mt: 4 }}>
			{/* Paper = used to create a surface to display the content */}
			<Paper elevation={3} sx={{ mb: 2 }}>
				{/* AppBar = used to create a header for the content */}
				<AppBar
					position="static"
					color="inherit"
					elevation={0}
					sx={{
						border: "inherit",
						borderColor: "text.primary",
						borderRadius: 2,
						maxHeight: "400px",
						paddingBottom: 2,
						paddingTop: 2,
					}}
				>
					{/* Toolbar = used to create a container for the content */}
					<Toolbar>
						{/* Grid = used to create a grid layout for the responsive web/phone */}
						<Grid container spacing={1}>
							<Grid item xs={12} sm={6}>
								{/* Typography = used to display text in fancy MUI style */}
								<Typography
									variant="h6"
									color="inherit"
									sx={{ flexGrow: 1 }}
								>
									{randomPlace.name}
								</Typography>
							</Grid>

							<Grid item xs={12} sm={2}>
								{/* Our custom function that used to handle logic */}
								<NewExpenseDialog
									onAddExpense={handleAddExpense} // pass the function to the dialog
									expense={dialogExpense} // pass the expense
									open={dialogOpen} // pass the open state
									onClose={() => setDialogOpen(false)} // pass the function to close the dialog
									newData={dialogExpense === null} // pass the newData
								/>
							</Grid>

							<Grid item xs={12} sm={2}>
								{/* Add search input */}
								<TextField
									label="Search"
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									fullWidth
								/>
							</Grid>

							<Grid item xs={12} sm={2}>
								{/* Add select dropdown */}
								<Select
									value={searchType}
									onChange={(e) => setSearchType(e.target.value)}
									fullWidth
								>
									<MenuItem value="name">Name</MenuItem>
									<MenuItem value="payer">Payer</MenuItem>
								</Select>
							</Grid>
						</Grid>
					</Toolbar>
				</AppBar>
			</Paper>

			{/* Box = used to create a container for the content and to make it consistence with rest of design */}
			<Box
				sx={{
					border: 2,
					borderColor: "divider",
					borderRadius: 2,
					overflow: "hidden",
				}}
			>
				{/* List = used to create a list of items and we use dense to make the list more compact.
    			We will also set max-height and display the scrollbar if the content is too long */}
				<List dense sx={{ maxHeight: "400px", overflow: "auto" }}>
					{/* Use the new function to filter the expensesData array */}
					{filterExpenses().map((expense) => (
						<ListItem key={expense.id} divider>
							<ListItemText
								primary={expense.name}
								secondary={`Amount: $${expense.amount} - Paid by: ${expense.payer}`}
							/>
							<NewExpenseDialog
								onAddExpense={handleAddExpense}
								expense={dialogExpense}
								open={dialogOpen}
								onClose={() => setDialogOpen(false)}
								newData={false}
							/>
							<Button onClick={() => handleRemoveExpense(expense.id)}>
								<DeleteIcon />
							</Button>
						</ListItem>
					))}
				</List>
			</Box>
		</Container>
	);
};

export default ExpenseForm;
