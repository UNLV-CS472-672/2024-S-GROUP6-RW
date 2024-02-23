import React, { useState, useCallback, useEffect } from "react";
import {
	AppBar,
	Toolbar,
	Typography,
	Button,
	Container,
	Paper,
	TextField,
	Select,
	MenuItem,
	Box,
	Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

//use dataGrid for fancy display and sorting with pagination
import { DataGrid } from "@mui/x-data-grid";

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

//this will be used to store data from database later on
// will ahve to modify
const cols = [
	{ field: "name", headerName: "Name", width: 150 },
	{ field: "amount", headerName: "Amount", width: 150 },
	{ field: "payer", headerName: "Payer", width: 150 },
	{
		field: "date",
		headerName: "Date",
		width: 150,
		valueGetter: (params) => params.value.toDateString(),
	},
	{ field: "actions", headerName: "", width: 150, sortable: false },
];

//rand for testing
const randomPlace = placesData[Math.floor(Math.random() * placesData.length)];
let idUniqueSet = new Set();

// make new functions that auto generate the expenseData
const generateRandomExpenseData = () => {
	//use rand to generate the id
	let id = Math.floor(Math.random() * 1000);
	//do unique id to prevent duplicate
	while (idUniqueSet.has(id)) {
		id = Math.floor(Math.random() * 1000);
	}
	idUniqueSet.add(id);
	//generate name by using random string
	const name = "Expense " + Math.floor(Math.random() * 1000);
	const amount = Math.floor(Math.random() * 1000);
	const payer = "User " + Math.floor(Math.random() * 1000);
	//make some date so that we can do the history of the expense
	const date = new Date();
	date.setDate(date.getDate() - Math.floor(Math.random() * 1000));
	return { id, name, amount, payer, date };
};

const ExpenseForm = () => {
	//Use for loop to generate the expenseData 20x
	// Generate and sort the expenseData
	const [expensesData, setExpensesData] = useState(() => {
		const expenses = Array.from({ length: 20 }, () =>
			generateRandomExpenseData()
		);
		expenses.sort((a, b) =>
			a.name.toLowerCase().localeCompare(b.name.toLowerCase())
		);
		return expenses;
	});

	// sort array
	//expensesData.sort((a, b) => String(a.name).localeCompare(String(b.name)));

	//state to manage the dialog open and close
	const [dialogExpense, setDialogExpense] = useState(null);
	const [dialogOpen, setDialogOpen] = useState(false);
	// Add new state variables for the search term and search type
	const [searchTerm, setSearchTerm] = useState("");
	const [searchType, setSearchType] = useState("name");
	const [filteredExpenses, setFilteredExpenses] = useState([]);

	// Use the useEffect hook to filter the expensesData array based on the search term and search type
	// and doing this will help to filter the data without the need to refresh the page
	useEffect(() => {
		// arrow function to filter the expensesData array based on the search term and search type
		setFilteredExpenses(
			expensesData.filter((expense) => {
				// if the search type is payer, use the payer field to filter the array
				if (searchType === "payer") {
					return expense.payer
						.toLowerCase()
						.includes(searchTerm.toLowerCase());
				} else if (searchType === "name") {
					// if the search type is name, use the name field to filter the array
					return expense.name
						.toLowerCase()
						.includes(searchTerm.toLowerCase());
				}
				return true;
			})
		);
		// add the expensesData, searchTerm, and searchType to the dependency array
	}, [expensesData, searchTerm, searchType]);

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
			// add the new expense to the array at the beginning
			const newExpenses = [expense, ...prevExpenses];
			// return the sorted array
			return newExpenses;
		});
		// set the dialogExpense to null and open the dialog
		setDialogExpense(null);
		// open the dialog
		setDialogOpen(true);
	}, []);

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
									newData={true} // pass the newData
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

			{/* Use the new DataGrid component to display the expensesData array for fancy UI
				row per page = 5 and options to show row per oage 5, 10, 15, 20
			*/}
			<DataGrid
				// set the height and width of the data grid (esp the ehight to make it scrollable)
				sx={{ height: 400, width: "100%" }}
				// populate the data grid with the expensesData array
				{...expensesData}
				// set the initial state of the data grid with the expensesData array
				// and we also set the pagination to show 5 rows per page
				initialState={{
					...expensesData.initialState,
					pagination: { paginationModel: { pageSize: 5 } },
				}}
				// set the page size options to show 5, 10, 25, 50, and 100 rows per page
				pageSizeOptions={[5, 10, 25, 50, 100]}
				// set the columns of the data grid
				columns={cols.map((col) => ({
					...col,
					// we have to do it this way bc the way I set up the NewExpenseDialog component
					// TODO: Think of better way to redo the NewExpenseDialog component
					// so that we wont have to do renderCell if we ever want to add more columns
					renderCell: (params) => {
						if (col.field === "actions") {
							return (
								// Box = used to create a container for the content
								// this will be like div in html but with more features
								<Box display="flex" flexDirection="row">
									<NewExpenseDialog
										onAddExpense={handleAddExpense}
										expense={dialogExpense}
										open={dialogOpen}
										onClose={() => setDialogOpen(false)}
										newData={false}
									/>
									{/* delete button*/}
									<Button
										onClick={() => handleRemoveExpense(params.value)}
									>
										<DeleteIcon />
									</Button>
								</Box>
							);
						}
						// return the value of the cell if it is not the actions column
						return params.value;
					},
				}))}
				// set the rows of the data grid to the filteredExpenses array to display the filtered expenses
				rows={filteredExpenses.map((expense) => ({
					...expense,
					actions: expense.id,
				}))}
			/>
		</Container>
	);
};

export default ExpenseForm;
