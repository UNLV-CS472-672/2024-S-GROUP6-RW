import React from "react";
import { Tabs, Tab, Box } from "@mui/material";
// import expenses form
import ExpensesForm from "../../components/ExpensesForm/ExpensesForm";

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
			</Tabs>
			{value === 0 && <ExpensesForm />}
		</Box>
	);
}

export default ExpensesPage;
