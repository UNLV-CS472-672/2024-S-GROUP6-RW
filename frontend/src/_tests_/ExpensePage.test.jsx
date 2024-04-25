import React from "react";
import { render, screen } from "@testing-library/react";
import ExpensesPage from "../pages/expenses/ExpensesPage.js";

// 1. Test to see if the ExpensesPage component renders properly
describe("ExpensesPage", () => {
	// 1.1 Test to see if the ExpensesPage component renders properly
	test("renders the component", () => {
		render(<ExpensesPage />);

		expect(screen.getByText("Expenses Dashboard")).toBeInTheDocument();
	});
});
