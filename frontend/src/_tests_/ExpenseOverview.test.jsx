import React from "react";
import { render, screen } from "@testing-library/react";
import Overview from "../components/Expense2.0/Overview.js";

// block test 1 -> test Overview component
describe("Overview", () => {
	test("renders Overview component", () => {
		render(<Overview totalSpend={100} totalOwe={0} totalGetBack={-100} />);

		expect(screen.getByText("Total spend")).toBeInTheDocument();
		expect(screen.getByText("$100.00")).toBeInTheDocument();

		expect(screen.getByText("You owe")).toBeInTheDocument();
		expect(screen.getByText("$0.00")).toBeInTheDocument();

		expect(screen.getByText("You get back")).toBeInTheDocument();
		expect(screen.getByText("$-100.00")).toBeInTheDocument();
	});
});
