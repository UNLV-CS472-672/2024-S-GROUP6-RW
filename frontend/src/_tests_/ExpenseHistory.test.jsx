import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import History, {
	groupTransactionsByMonth,
	sortTransactionsByDate,
} from "../components/Expense2.0/History.js";

// some hard code data for the form
const transactions = [
	{
		id: 1,
		date: "Friday 01 Jan 2022",
		payer: "Sudo",
		payee: "Bob",
		amount: 100,
	},
	{
		id: 2,
		date: "Saturday 02 Feb 2022",
		payer: "Bob",
		payee: "Sudo",
		amount: 200,
	},
	{
		id: 3,
		date: "Sunday 03 Jan 2022",
		payer: "Sudo",
		payee: "Bob",
		amount: 300,
	},
];

// function to render the History component to make it easier for us to tests
const renderHistory = (props = {}) => render(<History {...props} />);

// block test 1 -> test helper functions for history components
describe("History compoennt", () => {
	describe("helper functions", () => {
		// test 1.1 -> test groupTransactionsByMonth function to group transactions by month correctly
		// test 1.2 -> test sortTransactionsByDate function to sort transactions by date correctly
		test("groups and sorts transactions correctly", () => {
			const grouped = groupTransactionsByMonth(transactions);
			const sorted = sortTransactionsByDate(grouped);

			expect(grouped).toEqual({
				"Jan 2022": [transactions[0], transactions[2]],
				"Feb 2022": [transactions[1]],
			});

			expect(sorted).toEqual({
				"Jan 2022": [transactions[2], transactions[0]],
				"Feb 2022": [transactions[1]],
			});
		});
	});

	describe("History component", () => {
		test("renders correctly", () => {
			renderHistory();
			expect(screen.getByText("History")).toBeInTheDocument();
		});

		test("renders transactions grouped by month", () => {
			renderHistory({ transactions, sudoUser: "Sudo" });

			expect(screen.getByText("January 2022")).toBeInTheDocument();
			expect(screen.getByText("February 2022")).toBeInTheDocument();
		});

		test("renders transactions correctly", () => {
			renderHistory({ transactions, sudoUser: "Sudo" });

			expect(screen.getByText("You paid Bob $100")).toBeInTheDocument();
			expect(screen.getByText("Friday 01 Jan 2022")).toBeInTheDocument();
			expect(screen.getByText("Bob paid you $200")).toBeInTheDocument();
			expect(screen.getByText("Saturday 02 Feb 2022")).toBeInTheDocument();
			expect(screen.getByText("You paid Bob $300")).toBeInTheDocument();
			expect(screen.getByText("Sunday 03 Jan 2022")).toBeInTheDocument();
		});

		test("updates search field on change", () => {
			renderHistory();
			const input = screen.getByLabelText("Search");

			fireEvent.change(input, { target: { value: "test" } });

			expect(input.value).toBe("test");
		});
	});
});
