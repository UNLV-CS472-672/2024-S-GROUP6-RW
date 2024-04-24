import React, { useState, useEffect } from "react";
import { Container, Grid, Paper, Box, Typography } from "@mui/material";
import Overview from "./Overview";
import Activity from "./Activity";
import History from "./History";
import AddExpenseForm from "./AddExpense";
import { generateData, generateNewId } from "./DataGen";
import { styled } from "@mui/material/styles";

// hard code data for now and the user
const sudoUser = "Sudo";
const Data = generateData(sudoUser);

// notes: need to export functions to be able to do unit test with it

// Styling for the Paper component that wraps the components in the Expense Dashboard page
// ai-gen start (chatGPT 4.0, 1)
const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
	...theme.typography.body2,
	padding: theme.spacing(2),
	textAlign: "center",
	color: theme.palette.text.secondary,
}));
// ai-gen end

/*
// Function to delete an activity **note -> this is not work yet as
// the data is link to multiple users so this will ned to be responsible for that too
function deleteActivity(activityId, expenses, categories) {
	// Filter out the activity to be deleteds
	const updatedExpenses = expenses.filter(
		(activity) => activity.id !== activityId
	);

	// Filter out the activity from the categories
	// -> this part not work like expected -> no touch
	// ai-gen start (ChatGPT-4.0, 1)
	const updatedCategories = categories
		// Map over each category and filter out the activity to be deleted
		.map(([categoryName, activities]) => {
			const updatedActivities = activities.filter(
				(activity) => activity.id !== activityId
			);
			return [categoryName, updatedActivities];
		})
		.filter(([categoryName, activities]) => activities.length > 0);
	// ai-gen end

	return { updatedExpenses, updatedCategories };
}

// Function to delete a category -> this still not work as it not delete correct expense when
// the category is delete
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
*/

// Function to create a new expense item based on the struct of the data
export function createExpense(newExpense, expenses, sudoUser) {
	return {
		id: generateNewId(),
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

// Function to update the categories with the new expense item added to the data
export function updateCategoriesWithNewExpense(newExpenseItem, categories) {
	// Check if the category of the new expense item already exists
	const newCategories = [...categories]; // copy the data
	const categoryIndex = newCategories.findIndex(
		([categoryName]) => categoryName === newExpenseItem.category
	);

	// If the category exists, add the new expense item to the category
	// If not, create a new category with the new expense item
	if (categoryIndex !== -1) {
		newCategories[categoryIndex][1].push(newExpenseItem); // add the new expense item to the category
	} else {
		newCategories.push([newExpenseItem.category, [newExpenseItem]]); // create a new category with the new expense item
	}

	return newCategories;
}

// Function to add a new expense item to the data and this will be responsible for the
// update of the categories and expenses
export function addExpense(newExpense, expenses, categories, sudoUser) {
	const newExpenseItem = createExpense(newExpense, expenses, sudoUser);
	const updatedExpenses = [...expenses, newExpenseItem]; // add the new expense item to the expenses
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

	// Function to add a new expense item to the data when user submits the form
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

	/*
	// Function to delete an activity from the data
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

	// Function to delete a category from the data
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
	*/

	// Calculate the total spend, total owe, and total get back
	// and this will be responsible for the calculation of the total spend, total owe, and total get back
	// that we get from teh Data and then pass it to the Overview component
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
				{/* spacing -> adjust to control the space between the components */}
				<Grid container spacing={3}>
					{/* Overview Component  and adjust the xs, sm... to fix the scalling */}
					<Grid item xs={12} sm={12} md={7} lg={8}>
						{/*elevation -> this is for the shadow of the component and can be adjust to change the shadow */}
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
								//onDeleteActivity={handleDeleteActivity}
								//onDeleteCategory={handleDeleteCategory}
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
