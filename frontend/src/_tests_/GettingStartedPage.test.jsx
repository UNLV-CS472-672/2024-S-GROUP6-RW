import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import GettingStartedPage from "../pages/getting_started/GettingStartedPage.js";

// Mocking the next page that we have
function GatheringInfoPage() {
	return <div>Gathering Info Page</div>;
}

// 1. Test to see if the GettingStartedPage component renders properly
describe("GettingStartedPage", () => {
	// 1.1 Test to see if the GettingStartedPage component renders properly
	// need to use the damm memory router to test the routes otherwise it will throw an error
	// because the routes are not defined in the test
	test("renders the component", () => {
		render(
			<MemoryRouter>
				<GettingStartedPage />
			</MemoryRouter>
		);

		expect(screen.getByText("Plan your trip")).toBeInTheDocument();
		expect(screen.getByText("the RightWay")).toBeInTheDocument();
		expect(screen.getByText("Group trips made easy")).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: "Get Started" })
		).toBeInTheDocument();
	});

	// 1.2 Test to see if the GettingStartedPage component navigates to the next page when the Get Started button is clicked
	test("navigates to the next page when click the Get Started", () => {
		render(
			<MemoryRouter initialEntries={["/"]}>
				<Routes>
					<Route path="/" element={<GettingStartedPage />} />
					<Route path="/gatheringinfo" element={<GatheringInfoPage />} />
				</Routes>
			</MemoryRouter>
		);

		fireEvent.click(screen.getByText(/get started/i));
		expect(screen.getByText("Gathering Info Page")).toBeInTheDocument();
	});
});
