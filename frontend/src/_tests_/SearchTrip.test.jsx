import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import SearchBar from "../components/ExpensesTripStuff/SearchTrip";

// 1. Test the SearchBar component
describe("SearchBar", () => {
	// 1.1. Test the SearchBar component render
	test("renders without crashing", () => {
		const setSearch = jest.fn();
		render(<SearchBar search="" setSearch={setSearch} />);
	});

	// 1.2. Test the SearchBar component input change
	test("try setSearch when we update the val", () => {
		const setSearch = jest.fn();
		render(<SearchBar search="" setSearch={setSearch} />);

		fireEvent.change(screen.getByLabelText("Search trips..."), {
			target: { value: "Testing" },
		});

		expect(setSearch).toHaveBeenCalledWith("Testing");
	});

	// 1.3. Test the SearchBar component click event
	test("try clicking", () => {
		const setSearch = jest.fn();
		const handleClick = jest.fn();
		render(<SearchBar search="" setSearch={setSearch} />);

		fireEvent.click(screen.getByLabelText("Search trips..."), {
			bubbles: true,
			cancelable: true,
		});

		expect(handleClick).not.toHaveBeenCalled();
	});
});
