import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddPersonDialog from "../components/ExpensesSplit/AddPersonDialog";

// Mock the PeopleTable component so that we can use it in the test
const mockFunctions = {
	onAdd: jest.fn(),
	onClose: jest.fn(),
};

// shorthand for rendering the AddPersonDialog component
const setup = (open = true) =>
	render(<AddPersonDialog open={open} {...mockFunctions} />);

// 1. Test the AddPersonDialog component
describe("AddPersonDialog", () => {
	beforeEach(() => {
		// Reset mocks before each test
		jest.clearAllMocks();
	});

	// 1.1. Test init to see if it renders the grid w/o crash
	test("try init the data", () => {
		setup();
		expect(screen.getAllByRole("row").length).toBeGreaterThan(1);
	});

	//1.2 Test the selection of rows
	test("try select row", async () => {
		setup();
		const checkboxes = screen.getAllByRole("checkbox");
		userEvent.click(checkboxes[1]);
		await waitFor(() => expect(checkboxes[1]).toBeChecked());
	});

	// 1.3. Test the add selected button
	// and this fail bc i did not populate yet the people
	test('calls onAdd with selected people on "Add Selected" button click', () => {
		setup();
		const checkboxes = screen.getAllByRole("checkbox");
		userEvent.click(checkboxes[1]); // Select the first person
		userEvent.click(screen.getByText("Add Selected"));
		expect(mockFunctions.onAdd).toHaveBeenCalledWith(
			expect.arrayContaining([
				expect.objectContaining({ name: expect.any(String) }),
			])
		);
	});

	// 1.4. Test the cancel button
	// not sure why this fail
	test("calls onClose when the cancel button is clicked", () => {
		setup();
		userEvent.click(screen.getByText("Cancel"));
		expect(mockFunctions.onClose).toHaveBeenCalledTimes(1);
	});
});
