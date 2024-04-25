//ai-gen (ChatGPT 4.0, 0)
import "jest-canvas-mock"; //ai suggestion lib
//ai-gen end
import React from "react";
import { render, screen } from "@testing-library/react";
import HowItWorks from "../pages/getting_started/HowItWorks.js";

// 1. Test to see if the HowItWorks component renders properly
describe("HowItWorks", () => {
	// 1.1 Test to see if the HowItWorks component renders properly
	test("renders the component", () => {
		render(<HowItWorks />);

		expect(screen.getByText("HOW IT WORKS")).toBeInTheDocument();
		expect(
			screen.getByText(
				"Start your adventure by entering your desired destination"
			)
		).toBeInTheDocument();
		expect(screen.getByText("Choose your dates")).toBeInTheDocument();
		expect(
			screen.getByText("Personalize your group experience")
		).toBeInTheDocument();
		expect(
			screen.getByText("Ready to roll? Summon your crew")
		).toBeInTheDocument();
	});
});
