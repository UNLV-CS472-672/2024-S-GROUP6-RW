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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import NewExpenseDialog from "./NewExpensesDialog";

const placesData = [
	{ id: 1, name: "Paris" },
	{ id: 2, name: "London" },
	{ id: 3, name: "New York" },
	// ... other places
];

const randomPlace = placesData[Math.floor(Math.random() * placesData.length)];

const ExpenseForm = () => {
	const [expensesData, setExpensesData] = useState([
		{ id: 1, name: "Food", amount: 150, payer: "Chris" },
		{ id: 2, name: "Drink", amount: 120, payer: "John" },
		// ... other expenses
	]);

	const [dialogExpense, setDialogExpense] = useState(null);
	const [dialogOpen, setDialogOpen] = useState(false);

	const handleRemoveExpense = useCallback((id) => {
		setExpensesData((prevExpenses) =>
			prevExpenses.filter((expense) => expense.id !== id)
		);
	}, []);

	const handleAddExpense = useCallback((expense) => {
		setExpensesData((prevExpenses) => [...prevExpenses, expense]);
		setDialogExpense(null);
		setDialogOpen(true);
	}, []);

	return (
		<Container maxWidth="md" sx={{ mt: 4 }}>
			<Paper elevation={3} sx={{ mb: 2 }}>
				<AppBar position="static" color="inherit" elevation={0}>
					<Toolbar>
						<Typography variant="h6" color="inherit" sx={{ flexGrow: 1 }}>
							{randomPlace.name}
						</Typography>
						<NewExpenseDialog
							onAddExpense={handleAddExpense}
							expense={dialogExpense}
							open={dialogOpen}
							onClose={() => setDialogOpen(false)}
							newData={dialogExpense === null}
						/>
						<Button color="primary" variant="contained">
							Settle up
						</Button>
					</Toolbar>
				</AppBar>
			</Paper>

			<List dense>
				{expensesData.map((expense) => (
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
		</Container>
	);
};

export default ExpenseForm;
