import React from "react";
import { render, screen } from "@testing-library/react";
import ExpenseDashBoard, {
	updateCategoriesWithNewExpense,
	createExpense,
} from "../components/Expense2.0/ExpenseDashBoard.js";
import {
	generateData,
	generateNewId,
	randomDate,
} from "../components/Expense2.0/DataGen.js";

describe("ExpenseDashBoard", () => {
	test("generateNewId", () => {
		expect(generateNewId()).toBeLessThanOrEqual(1000);
	});

	test("generateData", () => {
		let data = generateData("Sudo");
		expect(data).not.toBeNull();
	});

	test("randomDate", () => {
		let date = randomDate(new Date(2023, 10, 1), new Date());
		expect(date).toBeInstanceOf(Date);
	});

	test("ExpenseDashBoard renders", () => {
		render(<ExpenseDashBoard />);
		expect(screen.getByText("Total spend")).toBeInTheDocument();
		expect(screen.getByText("You owe")).toBeInTheDocument();
		expect(screen.getByText("You get back")).toBeInTheDocument();
		expect(screen.getByText("Activities")).toBeInTheDocument();
		expect(screen.getByText("History")).toBeInTheDocument();
		expect(screen.getByText("Add Expense")).toBeInTheDocument();
	});
});
