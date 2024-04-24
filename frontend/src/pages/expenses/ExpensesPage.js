import React from "react";
import { Tabs, Tab, Box, Typography } from "@mui/material";
// import expenses form
import ExpenseDashBoard from "../../components/Expense2.0/ExpenseDashBoard";
import ExpensesForm from "../../components/ExpensesForm/ExpensesForm";

function ExpensesPage() {
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Box sx={{ width: "100%", bgcolor: "background.paper", mt: 9 }}>
			{/*<Tabs
				value={value}
				onChange={handleChange}
				textColor="secondary"
				indicatorColor="secondary"
				centered
			>
				<Tab label="Expenses Dashboard" />
				{/*
				<Tab label="Expenses Form" />
				*/}
			{/*
			</Tabs>
			{value === 0 && <ExpenseDashBoard />}
			
			{value === 1 && <ExpensesForm />}
			*/}
			<Typography
				variant="h4"
				align="left"
				gutterBottom
				fontFamily="Radley"
				marginLeft={6}
			>
				Expenses Dashboard
			</Typography>
			<ExpenseDashBoard />
		</Box>
	);
}

export default ExpensesPage;
