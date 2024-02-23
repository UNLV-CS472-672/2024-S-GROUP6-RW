import React from "react";
import ExpenseForm from "../../components/ExpensesForm/ExpensesForm";

function ExpensesPage() {
	return (
		<div>
			{/* Form for adding new expenses as well as list of expenses */}
			<ExpenseForm />
			{/* ...other components if necessary */}
		</div>
	);
}

export default ExpensesPage;
