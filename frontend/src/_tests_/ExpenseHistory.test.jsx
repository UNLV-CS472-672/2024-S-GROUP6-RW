import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import History from "../components/Expense2.0/History.js";

describe("History", () => {
	test("History renders", () => {
		render(<History />);
		expect(screen.getByText("History")).toBeInTheDocument();
	});

	const transactions = {
		1: {
			id: "1",
			date: "01 January 2022",
			amount: 100,
			payer: "Sudo",
			payee: "Bob",
		},
		2: {
			id: "2",
			date: "15 January 2022",
			amount: 200,
			payer: "Bob",
			payee: "Sudo",
		},
		3: {
			id: "3",
			date: "03 February 2022",
			amount: 300,
			payer: "Sudo",
			payee: "Bob",
		},
	};

	const sudoUser = "Sudo";

	test("renders transactions grouped by month", () => {
		render(<History transactions={transactions} sudoUser={sudoUser} />);

		expect(screen.getByText("January 2022")).toBeInTheDocument();
		expect(screen.getByText("February 2022")).toBeInTheDocument();
	});

	test("renders transactions correctly", () => {
		render(<History transactions={transactions} sudoUser={sudoUser} />);

		expect(screen.getByText("You paid Bob $100")).toBeInTheDocument();
		expect(screen.getByText("Bob paid you $200")).toBeInTheDocument();
		expect(screen.getByText("You paid Bob $300")).toBeInTheDocument();
	});
});
