import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ExpensesForm, { cols } from "../components/ExpensesForm/ExpensesForm";

// Mock the NewExpensesDialog component so that we can use it in the test
jest.mock(
	"../components/ExpensesForm/NewExpensesDialog.js",
	() =>
		({ onEditExpense, onAddExpense, onClose, open }) =>
			(
				// test data for the dialog click add
				<div>
					<button
						onClick={() => onAddExpense({ id: 1, name: "Test Expense" })}
					>
						Add Expense
					</button>
					<button
						onClick={() =>
							onEditExpense({ id: 1, name: "Edited Expense" })
						}
					>
						Edit Expense
					</button>
					<button onClick={onClose}>Close</button>
					{open && <span>Dialog Hola</span>}
				</div>
			)
);

// shorthand for rendering the ExpensesForm component
const setup = () => {
	const { container } = render(<ExpensesForm />);
	return container;
};

// 1. Test the whole expenses form
describe("ExpenseForm", () => {
	// 1.1. Test ope and close the NewExpenseDialog
	// have to use async/await to wait for the dialog to open and close
	test("try open and close", async () => {
		setup();
		userEvent.click(screen.getByText("Add Expense"));
		await waitFor(() => {
			expect(screen.getByText(/dialog hola/i)).toBeInTheDocument();
		});
	});

	// 1.2.render the component with necessary elements
	test("renders the component w/o crash", () => {
		setup();
		expect(screen.getByRole("grid")).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: /add expense/i })
		).toBeInTheDocument();
	});

	// 1.3. Test the search toggle between name and payer
	test("try update seatch bar", async () => {
		setup();
		userEvent.click(screen.getByLabelText("Search Type"));
		const option = await screen.findByRole("option", { name: "Name" });
		userEvent.click(option);
		expect(screen.getByLabelText("Search Type").textContent).toContain(
			"Name"
		);
	});
});

// 2. Test the valueGetter for date columns which is used in the table
describe("valueGetter for date columns", () => {
	const valueGetter = cols.find((col) => col.field === "date").valueGetter;

	// 2.1. Test the valueGetter for date columns w/ Date objects
	test("formats Date objects correctly", () => {
		//ai-gen start (ChatGPT-4.0, 0)
		const params = { value: new Date("2022-01-01T00:00:00Z") }; // Use UTC time to avoid time zone issues
		const expectedDate = new Date("2022-01-01T00:00:00Z").toDateString();
		//ai-gen end
		expect(valueGetter(params)).toBe(expectedDate);
	});

	// 2.2. Test the valueGetter for date columns w/ valid date strings
	test("formats valid date strings correctly", () => {
		const params = { value: "2022-01-01T00:00:00Z" }; // Use UTC time
		const expectedDate = new Date("2022-01-01T00:00:00Z").toDateString();
		expect(valueGetter(params)).toBe(expectedDate);
	});

	// 2.3. Test the valueGetter for date columns w/ invalid date strings
	test("returns 'Invalid Date' for invalid date strings", () => {
		setup();
		const params = { value: "not a date" };
		expect(valueGetter(params)).toBe("Invalid Date");
	});
});
