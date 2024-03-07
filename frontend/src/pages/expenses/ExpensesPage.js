import React, { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
// import expenses form
import ExpensesForm from "../../components/ExpensesForm/ExpensesForm";
import ExpensesSplit from "../../components/ExpensesSplit/ExpensesSplit";

function ExpensesPage() {
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Box sx={{ width: "100%", bgcolor: "background.paper" }}>
			<Tabs
				value={value}
				onChange={handleChange}
				textColor="secondary"
				indicatorColor="secondary"
				centered
			>
				<Tab label="Expenses Form" />
				<Tab label="Expenses Split" />
			</Tabs>
			{value === 0 && <ExpensesForm />}
			{value === 1 && <ExpensesSplit />}
		</Box>
	);
}

export default ExpensesPage;
