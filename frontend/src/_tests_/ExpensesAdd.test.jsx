import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import AddExpenseForm, {
	validateFormData,
	handleSplitMethod,
} from "../components/Expense2.0/AddExpense";

//some hard code data for the form
const categories = [["Food"], ["Hotel"], ["Utilities"]];
const mockOnAddExpense = jest.fn();

// function to render the AddExpenseForm component to make it easier for us to test
const renderAddExpenseForm = () =>
	render(
		<AddExpenseForm onAddExpense={mockOnAddExpense} categories={categories} />
	);

// block test 1 -> test form in general
describe("AddExpenseForm", () => {
	// test 1.1 -> test form fields and submit button
	test("renders form fields and submit button", () => {
		renderAddExpenseForm();

		const formFields = [
			/Split Method/i,
			/User Name/i,
			/Category/i,
			/Title/i,
			/Amount/i,
			/Description/i,
		];
		formFields.forEach((field) =>
			expect(screen.getByLabelText(field)).toBeInTheDocument()
		);

		expect(
			screen.getByRole("button", { name: /Save Expense/i })
		).toBeInTheDocument();
	});

	// test 1.2 -> test render if we change the form fields
	test("handleChange updates the form fields", () => {
		renderAddExpenseForm();
		const titleInput = screen.getByLabelText("Title *");
		fireEvent.change(titleInput, { target: { value: "Test Title" } });
		expect(titleInput.value).toBe("Test Title");
	});

	// test 1.3 -> test if the form is submitted
	test("handleSubmit calls onAddExpense", () => {
		renderAddExpenseForm();
		const titleInput = screen.getByLabelText("Title *");
		fireEvent.change(titleInput, { target: { value: "Test Title" } });
	});
});

// block test 2 -> test validateFormData function
describe("validateFormData", () => {
	// hard code test cases
	const testCases = [
		{ field: "userName", value: "", error: "User Name is required" },
		{ field: "title", value: "", error: "Title is required" },
		{ field: "category", value: "", error: "Category is required" },
		{ field: "amount", value: "", error: "Amount is required" },
		{
			field: "amount",
			value: "-100",
			error: "Amount must be a positive number",
		},
	];

	// loop through the test cases and test each one
	testCases.forEach(({ field, value, error }) => {
		test(`returns error when ${field} is ${value}`, () => {
			const expenseData = {
				userName: "Test User",
				title: "Test Title",
				category: "Test Category",
				amount: "100",
				splitMethod: "equal",
				[field]: value,
			};
			expect(validateFormData(expenseData)).toBe(error);
		});
	});

	// test 2.1 -> test if all fields are valid
	test("returns error null when all fields are valid", () => {
		const expenseData = {
			userName: "Test User",
			title: "Test Title",
			category: "Test Category",
			amount: "100",
			splitMethod: "none",
		};
		expect(validateFormData(expenseData)).toBeNull();
	});
});

// block test 3 -> test handleSplitMethod function
describe("handleSplitMethod", () => {
	// test 3.1 -> test if the amount is divided by 2 when splitMethod is equal
	test('divides the amount by 2 when splitMethod is "equal"', () => {
		expect(
			handleSplitMethod({ amount: "100", splitMethod: "equal" }).amount
		).toBe("50.00");
	});

	// test 3.2 -> test if the payee is set to null when splitMethod is none
	test('sets payee to null when splitMethod is "none"', () => {
		expect(
			handleSplitMethod({ payee: "Test User", splitMethod: "none" }).payee
		).toBeNull();
	});

	// test 3.3 -> test if the amount or payee is not modified when splitMethod is not equal or none
	test('does not modify the amount or payee when splitMethod is not "equal" or "none"', () => {
		const expenseData = {
			amount: "100",
			payee: "Test User",
			splitMethod: "other",
		};
		const result = handleSplitMethod(expenseData);
		expect(result.amount).toBe("100");
		expect(result.payee).toBe("Test User");
	});
});
