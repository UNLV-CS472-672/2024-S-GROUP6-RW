import React from "react";
import { render, screen } from "@testing-library/react";
import AboutUs from "../pages/getting_started/AboutUs.js";

// Test to see if the AboutUs component renders properly
describe("AboutUs", () => {
	test("renders the component", () => {
		render(<AboutUs />);

		expect(screen.getByText("About us")).toBeInTheDocument();
		expect(
			screen.getByAltText(
				"At RightWay, we believe that the journey is just as important as the destination. That's why we've created a platform designed to bring friends together through unforgettable travel experiences, tailored just for you. Whether you're planning a weekend getaway or an adventure of a lifetime, RightWay takes the hassle out of trip planning."
			)
		).toBeInTheDocument();
	});
});
