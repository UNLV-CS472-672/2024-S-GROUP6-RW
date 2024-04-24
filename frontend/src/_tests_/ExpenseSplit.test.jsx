import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import ExpensesSplit from "../components/ExpensesSplit/ExpensesSplit";

// set up code to render the ExpensesSplit component and test the AddPersonDialog
const setup = () => {
	render(<ExpensesSplit />);
	fireEvent.click(screen.getByText("Add Expense"));
	fireEvent.click(screen.getAllByRole("row")[1]);
	fireEvent.click(screen.getByText("Add Selected"));
};

// 1. Test the ExpensesSplit component
describe("ExpensesSplit", () => {
	// 1.1. Test the rendering of the ExpensesSplit component
	test("renders without crashing", () => {
		render(<ExpensesSplit />);
		expect(screen.getByText("Split Menu")).toBeInTheDocument();
	});

	// 1.2. Test the AddPersonDialog open
	test('opens the AddPersonDialog when the "Add Expense" button is clicked', () => {
		render(<ExpensesSplit />);
		fireEvent.click(screen.getByText("Add Expense"));
		expect(screen.getByText("Split Method")).toBeInTheDocument();
	});

	// 1.3. Test the AddPersonDialog close
	test('adds a person when the "Add" button in the AddPersonDialog is clicked', () => {
		setup();
		expect(screen.getByText("Split Menu")).toBeInTheDocument();
	});

	// 1.4. Test the DetailDialog open
	test("opens the DetailDialog when the edit icon is clicked", () => {
		setup();
		expect(screen.getByText("Split Menu")).toBeInTheDocument();
		//the edit icon is not work or cant find
		expect(screen.getByTestId("edit-icon")).toBeInTheDocument();
		fireEvent.click(screen.getByTestId("edit-icon"));
		expect(screen.getByText("Edit Person")).toBeInTheDocument();
	});

	// 1.5. Test the DetailDialog close
	test('edits a person when the "Save" button in the DetailDialog is clicked', async () => {
		setup();
		//same for this as cant find
		fireEvent.click(screen.getByTestId("edit-icon"));

		// Change the name in the DetailDialog
		fireEvent.change(screen.getByLabelText("Name"), {
			target: { value: "Person 0" },
		});

		fireEvent.click(screen.getByText("Add"));
		expect(await screen.findByText("Person 0")).toBeInTheDocument();
	});
});
