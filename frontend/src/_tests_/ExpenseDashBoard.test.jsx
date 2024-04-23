import React from "react";
import { render, screen } from "@testing-library/react";
import ExpenseDashBoard, {
	updateCategoriesWithNewExpense,
	createExpense,
	addExpense,
} from "../components/Expense2.0/ExpenseDashBoard.js";
import {
	generateData,
	generateNewId,
	randomDate,
} from "../components/Expense2.0/DataGen.js";

// some hard code data for the form
const newExpense = {
	userName: "John",
	amount: "100",
	splitMethod: "equal",
	title: "Test Expense",
	description: "This is a test expense",
	category: "Test Category",
};

const dupExpense = {
	...newExpense,
	category: "Existing Category",
};

const expenses = [];
const categories = [["Existing Category", []]];
const sudoUser = "Sudo";

// function to render the ExpenseDashBoard component to make it easier for us to test
const renderDashBoard = () => render(<ExpenseDashBoard />);

// block test 1 -> test ExpenseDashBoard component
describe("ExpenseDashBoard", () => {
	// test 1.1 -> test if the component renders correctly
	test("renders correctly w/o crash", () => {
		renderDashBoard();
		const texts = [
			"Total spend",
			"You owe",
			"You get back",
			"Activities",
			"History",
			"Add Expense",
		];
		texts.forEach((text) =>
			expect(screen.getByText(text)).toBeInTheDocument()
		);
	});

	// test 1.2 -> test some utility functions
	test("utility functions work correctly", () => {
		expect(generateNewId()).toBeLessThanOrEqual(1000);
		expect(generateData("Sudo")).not.toBeNull();
		expect(randomDate(new Date(2023, 10, 1), new Date())).toBeInstanceOf(
			Date
		);
	});

	// test 1.3 -> test createExpense function
	test("createExpense() will gen new expense", () => {
		const result = createExpense(newExpense, expenses, sudoUser);
		expect(result).toMatchObject({
			payer: sudoUser,
			payee: newExpense.userName,
			amount: parseFloat(newExpense.amount),
			type: "paid",
			name: newExpense.title,
			description: newExpense.description,
			category: newExpense.category,
		});
		expect(result).toHaveProperty("id");
		expect(result).toHaveProperty("date");
		expect(result).toHaveProperty("owe");
		expect(result).toHaveProperty("paid");
		expect(result).toHaveProperty("getBack");
		expect(result).toHaveProperty("total");
	});

	// test 1.4 -> test updateCategoriesWithNewExpense function
	test("updateCategoriesWithNewExpense() will update cat with new gen", () => {
		const newExpenseItem = { ...newExpense, id: 1 };
		const result = updateCategoriesWithNewExpense(newExpenseItem, categories);
		expect(result).toContainEqual([
			newExpenseItem.category,
			[newExpenseItem],
		]);
	});

	// test 1.5 -> test addExpense function
	test("addExpense() -> add new expense into expenses list and update cat", () => {
		const result = addExpense(newExpense, expenses, categories, sudoUser);
		expect(result.updatedExpenses).toContainEqual(
			expect.objectContaining({ name: newExpense.title })
		);
		expect(result.updatedCategories).toContainEqual([
			newExpense.category,
			expect.any(Array),
		]);
	});

	// test 1.6 -> test addExpense function with duplicate expense
	test("addExpense() -> add dup expense into expenses list and update cat", () => {
		const result = addExpense(dupExpense, expenses, categories, sudoUser);
		expect(result.updatedExpenses).toContainEqual(
			expect.objectContaining({ name: dupExpense.title })
		);
		expect(result.updatedCategories).toContainEqual([
			dupExpense.category,
			expect.any(Array),
		]);
	});
});
