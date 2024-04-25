import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Activity from "../components/ItineraryForm/Activity.js";

// 1. Test to see if the Activity component renders properly
describe("Activity", () => {
	// mock activity data
	const mockActivity = {
		id: 1,
		title: "Test Activity",
		location: "Test Location",
		date: "Test Date",
		time: "Test Time",
		description: "Test Description",
		photo: "Test Photo",
	};

	// 1.1 Test to see if the Activity component renders properly
	test("renders the component", () => {
		render(<Activity activity={mockActivity} />);

		expect(screen.getByText("Test Activity")).toBeInTheDocument();
	});
});
