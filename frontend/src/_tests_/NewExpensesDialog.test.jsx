import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NewExpenseDialog from "../components/ExpensesForm/NewExpensesDialog";

//1. Test the NewExpenseDialog component
describe("NewExpenseDialog", () => {
	// mock the onAddExpense and onEditExpense functions
	const mockAdd = jest.fn();
	const mockEdit = jest.fn();

	// setup the NewExpenseDialog component for testing
	const setup = (newData = true, expense = null) => {
		render(
			<NewExpenseDialog
				newData={newData}
				expense={expense}
				onAddExpense={mockAdd}
				onEditExpense={mockEdit}
			/>
		);
	};

	// helper function to test the dialog open and close
	beforeEach(() => {
		setup();
	});

	// 1.2. Test the dialog open and close
	test("try open and close", async () => {
		userEvent.click(screen.getByTestId("new-expense-button"));
		expect(
			await screen.findByText(/Enter the details of the new expense\./i)
		).toBeInTheDocument();

		const closeButton = screen.getByTestId("close-button");
		userEvent.click(closeButton);
		// ai-gen start (ChatGPT-4.0, 1)
		await waitFor(() => {
			expect(
				screen.queryByText(/Enter the details of the new expense\./i)
			).not.toBeInTheDocument();
		});
		// ai-gen end
	});

	// 1.3. Test the form inputs validation
	test("try form validation", async () => {
		userEvent.click(screen.getByTestId("new-expense-button"));
		const addButton = await screen.findByTestId("add-button");
		userEvent.click(addButton);

		expect(await screen.findByText(/name is required/i)).toBeInTheDocument();
	});

	// 1.4. Test adding a new expense but this is not work ughhh
	test("try add", async () => {
		userEvent.click(screen.getByTestId("new-expense-button"));
		await screen.findByText(/enter the details of the new expense/i);

		userEvent.type(screen.getByLabelText(/name/i), "Dinner");
		userEvent.type(screen.getByLabelText(/amount/i), "50");
		userEvent.type(screen.getByLabelText(/paid by:/i), "Alice");
		userEvent.type(screen.getByTestId("date-field"), "2022-05-20");

		userEvent.click(screen.getByTestId("add-button"));
		// why this is not work
		expect(mockAdd).toHaveBeenCalledTimes(1);
		expect(mockAdd).toHaveBeenCalledWith({
			id: expect.any(Number),
			name: "Dinner",
			amount: "50",
			payer: "Alice",
			date: "2022-05-20",
			description: "",
		});
	});

	// 1.5. Test editing an expense
	test("try update", async () => {
		userEvent.click(screen.getByTestId("new-expense-button"));
		await screen.findByText(/enter the details of the new expense/i);

		const nameField = screen.getByTestId("name-field");
		const amountField = screen.getByTestId("amount-field");

		//add some value to the fields
		userEvent.type(nameField, "Dinner");
		userEvent.type(amountField, "50");

		//this is not work too
		expect(nameField).toHaveValue("Dinner");
		expect(amountField).toHaveValue("50");

		userEvent.clear(nameField);
		userEvent.clear(amountField);
	});
});

//2. Test the NewExpenseDialog component but junk test because this code not work
// ai-gen start (ChatGPT-4.0, 2)
describe("NewExpenseDialog Junk test that make me mad", () => {
	test("adds a new expense when form is filled correctly", async () => {
		const clearForm = jest.fn();
		const setName = jest.fn();
		const setAmount = jest.fn();
		const setPayer = jest.fn();
		const setDate = jest.fn();
		const setDescription = jest.fn();
		const formatDateForInput = jest.fn();

		const expense = {
			name: "Testing Expense",
			amount: 100,
			payer: "Alice",
			date: new Date(),
			description: "Test description",
		};
		render(
			<NewExpenseDialog
				clearForm={clearForm}
				setName={setName}
				setAmount={setAmount}
				setPayer={setPayer}
				setDate={setDate}
				setDescription={setDescription}
				formatDateForInput={formatDateForInput}
				newData={false}
				expense={expense}
			/>
		);

		expect(setName).toHaveBeenCalledWith(expense.name);
		expect(setAmount).toHaveBeenCalledWith(expense.amount.toString());
		expect(setPayer).toHaveBeenCalledWith(expense.payer);
		expect(setDate).toHaveBeenCalledWith(formatDateForInput(expense.date));
		expect(setDescription).toHaveBeenCalledWith(expense.description);
	});
});
// ai-gen end
