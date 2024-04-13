import React, { useState, useEffect } from "react";
import { Container, Grid, Paper, Box, Typography } from "@mui/material";
import Overview from "./Overview";
import Activity from "./Activity";
import History from "./History";
import AddExpenseForm from "./AddExpense";
import { generateData, generateNewId } from "./DataGen";
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

function deleteActivity(activityId, expenses, categories) {
	const updatedExpenses = expenses.filter(
		(activity) => activity.id !== activityId
	);

	const updatedCategories = categories
		.map(([categoryName, activities]) => {
			const updatedActivities = activities.filter(
				(activity) => activity.id !== activityId
			);
			return [categoryName, updatedActivities];
		})
		.filter(([categoryName, activities]) => activities.length > 0);

	return { updatedExpenses, updatedCategories };
}

function deleteCategory(categoryName, expenses, categories) {
	const updatedCategories = categories.filter(
		([category]) => category !== categoryName
	);

	// Filter out the expenses associated with the category to be deleted
	const updatedExpenses = expenses.filter(
		(expense) => expense.category !== categoryName
	);

	return { updatedExpenses, updatedCategories };
}

function createExpense(newExpense, expenses, sudoUser) {
	return {
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
}

function updateCategoriesWithNewExpense(newExpenseItem, categories) {
	const newCategories = [...categories];
	const categoryIndex = newCategories.findIndex(
		([categoryName]) => categoryName === newExpenseItem.category
	);

	if (categoryIndex !== -1) {
		newCategories[categoryIndex][1].push(newExpenseItem);
	} else {
		newCategories.push([newExpenseItem.category, [newExpenseItem]]);
	}

	return newCategories;
}

function addExpense(newExpense, expenses, categories, sudoUser) {
	const newExpenseItem = createExpense(newExpense, expenses, sudoUser);
	const updatedExpenses = [...expenses, newExpenseItem];
	const updatedCategories = updateCategoriesWithNewExpense(
		newExpenseItem,
		categories
	);

	return { updatedExpenses, updatedCategories };
}

function ExpenseDashBoard() {
	// Flatten the initial data into a single array of expenses
	const initialExpenses = Object.values(Data).flat();

	// Initialize state variables for categories and expenses
	const [categories, setCategories] = useState(Object.entries(Data));
	const [expenses, setExpenses] = useState(initialExpenses);

	const onAddExpense = (newExpense) => {
		const { updatedExpenses, updatedCategories } = addExpense(
			newExpense,
			expenses,
			categories,
			sudoUser
		);
		setExpenses(updatedExpenses);
		setCategories(updatedCategories);
	};

	const handleDeleteActivity = (activityId) => {
		const { updatedExpenses, updatedCategories } = deleteActivity(
			activityId,
			expenses,
			categories
		);
		setExpenses(updatedExpenses);
		setCategories(updatedCategories);

		//check the activity after delete
		//console.log("After delete act1: ", updatedExpenses);
		//console.log("After delete act2: ", updatedCategories);
	};

	const handleDeleteCategory = (categoryName) => {
		const { updatedExpenses, updatedCategories } = deleteCategory(
			categoryName,
			expenses,
			categories
		);
		setExpenses(updatedExpenses);
		setCategories(updatedCategories);

		//check the activity after delete
		//console.log("After delete cat1: ", updatedExpenses);
		//console.log("After delete cat2: ", updatedCategories);
	};

	const totalSpend = expenses
		.filter((e) => e.payer === sudoUser)
		.reduce((acc, cur) => acc + Number(cur.amount || 0), 0);
	const totalOwe = expenses
		.filter((e) => e.type === "owe")
		.reduce((acc, cur) => acc + Number(cur.amount || 0), 0);
	const totalGetBack = expenses
		.filter((e) => e.type === "get back")
		.reduce((acc, cur) => acc + Number(cur.amount || 0), 0);

	//console.log("Initial Data:", Data);
	//console.log("Expenses:", expenses);
	//console.log("Calculated Totals:", { totalSpend, totalOwe, totalGetBack });

	// Render the Expense Dashboard
	return (
		<Box sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}>
			<Container maxWidth="xl">
				<Grid container spacing={3}>
					{/* Overview Component */}
					<Grid item xs={12} sm={12} md={7} lg={8}>
						<Item elevation={3}>
							<Overview
								totalSpend={totalSpend}
								totalOwe={totalOwe}
								totalGetBack={totalGetBack}
							/>
						</Item>
					</Grid>

					{/* Add Expense Form Component */}
					<Grid item xs={12} sm={12} md={5} lg={4}>
						<Item elevation={3}>
							<AddExpenseForm
								onAddExpense={onAddExpense}
								categories={categories}
								setCategories={setCategories}
							/>
						</Item>
					</Grid>

					{/* Activity Component */}
					<Grid
						item
						xs={12}
						sm={12}
						md={7}
						lg={8}
						sx={{
							mt: {
								xs: 0,
								sm: 0,
								md: -35,
								lg: -25,
							},
						}}
					>
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
								onDeleteActivity={handleDeleteActivity}
								onDeleteCategory={handleDeleteCategory}
							/>
						</Item>
					</Grid>

					{/* History Component */}
					<Grid item xs={12} sm={12} md={5} lg={4}>
						<Item
							elevation={3}
							sx={{
								height: {
									xs: "auto",
									sm: "auto",
									md: "395px",
									lg: "435px",
								},
							}}
						>
							<History transactions={expenses} sudoUser={sudoUser} />
						</Item>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
}

export default ExpenseDashBoard;
