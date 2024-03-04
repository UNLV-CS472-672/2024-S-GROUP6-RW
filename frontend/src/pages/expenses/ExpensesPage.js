import React from "react";
// import expenses form
import ExpensesForm from "../../components/ExpensesForm/ExpensesForm";
import ExpensesSplit from "../../components/ExpensesSplit/ExpensesSplit";

function ExpensesPage() {
	return (
		<div className="container">
			<div className="row">
				<div className="col-12">
					<h1>Expenses</h1>
				</div>
			</div>
			<div className="row">
				<div className="col-lg-6">
					<ExpensesForm />
				</div>
				<div className="col-lg-6">
					<ExpensesSplit />
				</div>
			</div>
		</div>
	);
}

export default ExpensesPage;
