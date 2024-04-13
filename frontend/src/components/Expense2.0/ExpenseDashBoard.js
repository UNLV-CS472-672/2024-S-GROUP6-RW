import React, { useState, useEffect } from "react";
import { Container, Grid, Paper, Box, Typography } from "@mui/material";
import Overview from "./Overview";
import Activity from "./Activity";
import History from "./History";
import AddExpenseForm from "./AddExpense";
import { generateData } from "./DataGen";
import { styled } from "@mui/material/styles";

const sudoUser = "Sudo";
const Data = generateData(sudoUser);

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
	...theme.typography.body2,
	padding: theme.spacing(2),
	textAlign: "center",
	color: theme.palette.text.secondary,
}));

function ExpenseDashBoard() {
	// Initialize state variables for categories and expenses
	const [categories, setCategories] = useState(Object.entries(Data));
	const [expenses, setExpenses] = useState(
		Array.isArray(Data) ? Data : Object.values(Data)
	);

	// Function to handle adding a new expense
	const onAddExpense = (newExpense) => {
		// Create a new expense item
		const newExpenseItem = {
			id: `${Date.now()}-${expenses.length.toString()}`,
			date: new Date().toDateString(),
			payer: sudoUser,
			payee: newExpense.userName,
			amount: parseFloat(newExpense.amount),
			type: newExpense.splitMethod === "equal" ? "paid" : "owe",
			name: newExpense.title,
			description: newExpense.description,
			owe: (Math.random() * 1000).toFixed(2),
			paid: (Math.random() * 1000).toFixed(2),
			getBack: (Math.random() * 1000).toFixed(2),
			total: (Math.random() * 1000).toFixed(2),
			category: newExpense.category,
		};

		// Add the new expense item to the existing expenses
		setExpenses((prevExpenses) => [...prevExpenses, newExpenseItem]);

		// Update the categories
		const newCategories = [...categories];
		const categoryIndex = newCategories.findIndex(
			([categoryName]) => categoryName === newExpense.category
		);

		if (categoryIndex !== -1) {
			// Update the category with the new expense
			newCategories[categoryIndex][1].push(newExpenseItem);
		} else {
			// Add a new category with the new expense
			newCategories.push([newExpense.category, [newExpenseItem]]);
		}

		setCategories(newCategories);

		//fix history and cat & expense
	};

	// Render the Expense Dashboard
	return (
		<Box sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}>
			<Container maxWidth="xl">
				<Grid container spacing={3}>
					{/* Overview Component */}
					<Grid item xs={12} md={7}>
						<Item elevation={3}>
							<Overview />
						</Item>
					</Grid>

					{/* Add Expense Form Component */}
					<Grid item xs={12} md={5}>
						<Item elevation={3}>
							<AddExpenseForm
								onAddExpense={onAddExpense}
								categories={categories}
								setCategories={setCategories}
							/>
						</Item>
					</Grid>

					{/* Activity Component */}
					<Grid item xs={12} md={7} mt={-25}>
						<Item
							elevation={3}
							sx={{
								height: "632px",
							}}
						>
							<Activity
								activitiesData={expenses}
								sudoUser={sudoUser}
								categories={categories}
								setCategories={setCategories}
							/>
						</Item>
					</Grid>

					{/* History Component */}
					<Grid item xs={12} md={5}>
						<Item elevation={3}>
							<History transactions={expenses} sudoUser={sudoUser} />
						</Item>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
}

export default ExpenseDashBoard;
