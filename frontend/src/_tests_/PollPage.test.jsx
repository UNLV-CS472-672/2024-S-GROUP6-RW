import React from "react";
import { render, screen } from "@testing-library/react";
import PollPage from "../pages/getting_started/PollPage.js";

// 1. Test to see if the PollPage component renders properly
describe("PollPage", () => {
	// 1.1 Test to see if the PollPage component renders properly
	test("renders the component", () => {
		render(<PollPage />);

		expect(
			screen.getByText("What days are you available?")
		).toBeInTheDocument();
		expect(screen.getByTestId("date-availability")).toBeInTheDocument();
	});
});
