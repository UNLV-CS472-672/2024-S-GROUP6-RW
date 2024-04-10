import React from "react";
import { Tabs, Tab, Box } from "@mui/material";
// import expenses form
import ExpenseDashBoard from "../../components/Expense2.0/ExpenseDashBoard";

function ExpensesPage() {
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Box sx={{ width: "100%", bgcolor: "background.paper", mt: 9 }}>
			<Tabs
				value={value}
				onChange={handleChange}
				textColor="secondary"
				indicatorColor="secondary"
				centered
			>
				{/* This is now not need due to major overhaul of UI 
				<Tab label="Expenses Form" />
				*/}
				<Tab label="Expenses Dashboard" />
			</Tabs>
			{/* This is now not need due to major overhaul of UI 
			{value === 0 && <ExpensesForm />}
			*/}

			{value === 0 && <ExpenseDashBoard />}
		</Box>
	);
}

export default ExpensesPage;
