import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Activities from "../components/Expense2.0/Activity";

// some hard code data for the form
const activitiesData = [
	{
		id: 1,
		name: "Activity 1",
		amount: 10,
		payer: "Sudo",
		payee: "User 2",
		type: "owe",
	},
	{
		id: 2,
		name: "Activity 2",
		amount: 20,
		payer: "User 2",
		payee: "Sudo",
		type: "get back",
	},
	{
		id: 3,
		name: "Activity 3",
		amount: 30,
		payer: "User 2",
		payee: "Sudo",
		type: "paid",
	},
];
const categories = [["Category 1", activitiesData]];
const sudoUser = "Sudo";

const defaultProps = {
	activitiesData,
	sudoUser,
	categories,
	setCategories: jest.fn(),
	onEditActivity: jest.fn(),
	onDeleteActivity: jest.fn(),
	onEditCategory: jest.fn(),
	onDeleteCategory: jest.fn(),
};

// function to render the Activities component to make it easier for us to test
const renderActivities = (props = {}) => {
	render(<Activities {...defaultProps} {...props} />);
};

// block test 1 -> test Activities component
describe("Activities", () => {
	// test 1.1 -> test if the component renders correctly
	test("renders Activities component and activities correctly", () => {
		renderActivities({ activitiesData: [], sudoUser: "", categories: [] });
		expect(screen.getByText("Activities")).toBeInTheDocument();

		renderActivities();
		expect(screen.getByText("Activity 1")).toBeInTheDocument();
		expect(screen.getByText("Activity 2")).toBeInTheDocument();
		expect(screen.getByText("$10 - You paid User 2")).toBeInTheDocument();
		expect(
			screen.getByText("$20 - You get back from User 2")
		).toBeInTheDocument();
	});

	// test 1.2 -> test if the dialog opens and closes correctly and submit
	test("handles dialog open/close and submit", () => {
		renderActivities();
		fireEvent.click(screen.getByText("Add Category"));
		expect(screen.getByRole("dialog")).toBeInTheDocument();
		expect(
			screen.getByText("Please enter the name of the new category.")
		).toBeInTheDocument();

		const input = screen.getByLabelText("Category Name");
		const submitButton = screen.getByText("Add");
		fireEvent.change(input, { target: { value: "New Category" } });
		fireEvent.click(submitButton);
		expect(defaultProps.setCategories).toHaveBeenCalled();

		fireEvent.click(screen.getByText("Cancel"));
	});

	// test 1.3 -> test color code for different types of activities
	test("renders color code correctly", () => {
		renderActivities();
		expect(screen.getByText("$10 - You paid User 2")).toHaveStyle(
			"color: default"
		);
		expect(screen.getByText("$20 - You get back from User 2")).toHaveStyle(
			"color: green"
		);
		expect(screen.getByText("$30 - User 2 paid You")).toHaveStyle(
			"color: red"
		);
	});
});
