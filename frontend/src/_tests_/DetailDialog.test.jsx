import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DetailDialog from "../components/ExpensesSplit/DetailDialog";

// 1. Test the DetailDialog component
describe("DetailDialog", () => {
	// mock the onClose and onEdit functions
	const mockOnClose = jest.fn();
	const mockOnEdit = jest.fn();

	// helper function clears mocks before each test
	beforeEach(() => {
		jest.clearAllMocks();
	});

	// 1.1. Test the dialog open or test rendering
	test("test open", () => {
		render(
			<DetailDialog
				open={true}
				onClose={mockOnClose}
				row={{ name: "John Doe", splitMethod: "equal" }}
				isEditing={false}
				onEdit={mockOnEdit}
			/>
		);
		expect(screen.getByText("Expense Details")).toBeInTheDocument();
	});

	// 1.2. Test the dialog close
	test("test close", () => {
		render(
			<DetailDialog
				open={false}
				onClose={mockOnClose}
				row={{ name: "John Doe", splitMethod: "equal" }}
				isEditing={false}
				onEdit={mockOnEdit}
			/>
		);
		expect(screen.queryByText("Expense Details")).not.toBeInTheDocument();
	});

	// 1.3. Test the dialog initialization
	test("test init", () => {
		render(
			<DetailDialog
				open={true}
				onClose={mockOnClose}
				row={{ name: "John Doe", splitMethod: "equal" }}
				isEditing={true}
				onEdit={mockOnEdit}
			/>
		);
		expect(screen.getByText("Expense Details")).toBeInTheDocument();
	});

	// 1.4. Test the dialog update
	test("test update", () => {
		const { rerender } = render(
			<DetailDialog
				open={true}
				onClose={mockOnClose}
				row={{ name: "John", splitMethod: "equal" }}
				isEditing={true}
				onEdit={mockOnEdit}
			/>
		);
		rerender(
			<DetailDialog
				open={true}
				onClose={mockOnClose}
				row={{ name: "Jane", splitMethod: "specific" }}
				isEditing={true}
				onEdit={mockOnEdit}
			/>
		);
		expect(screen.getByText("Expense Details")).toBeInTheDocument();
	});

	// 1.5. Test the dialog close button
	test("test onClose and cancel button", () => {
		render(
			<DetailDialog
				open={true}
				onClose={mockOnClose}
				row={{ name: "John Doe", splitMethod: "equal" }}
				isEditing={false}
				onEdit={mockOnEdit}
			/>
		);
		userEvent.click(screen.getByTestId("close-button"));
		expect(mockOnClose).toHaveBeenCalled();
	});

	// 1.6. Test the dialog save button
	test("test onEdit and add button", () => {
		render(
			<DetailDialog
				open={true}
				onClose={mockOnClose}
				row={{ name: "John Doe", splitMethod: "equal" }}
				isEditing={true}
				onEdit={mockOnEdit}
			/>
		);
		userEvent.click(screen.getByTestId("save-button"));
		expect(mockOnEdit).toHaveBeenCalledWith({
			name: "John Doe",
			splitMethod: "equal",
		});
		expect(mockOnClose).toHaveBeenCalled();
	});
});
