import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import SearchBar from "../components/GatheringInfo/SearchBar.js";
import { saveToLocal } from "../utils/LocalStorageManager.js";

// some data to mock the fetch API
const mockJsonPromise = Promise.resolve([
	{ display_name: "Las Vegas", lat: "36.1699", lon: "-115.1398" },
	{ display_name: "Los Angeles", lat: "34.0522", lon: "-118.2437" },
]);

// mock the fetch API response
// ai-gen start (ChatGPT-4.0, 0)
jest.mock("../utils/LocalStorageManager.js");
const mockFetchPromise = Promise.resolve({
	ok: true,
	json: () => mockJsonPromise,
});
// ai-gen end

// 1. Test the SearchBar component
describe("SearchBar", () => {
	//ai-gen start (ChatGPT-4.0, 0)
	// global fetch mock implementation
	beforeEach(() => {
		global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
	});

	// clear all mocks
	afterEach(() => {
		jest.clearAllMocks();
	});
	//ai-gen end

	// 1.1. Test the SearchBar component render
	test("renders without crashing", () => {
		render(<SearchBar />);

		expect(
			screen.getByPlaceholderText("Enter destination..")
		).toBeInTheDocument();
	});

	// 1.2. Test the SearchBar component input change
	test("update input field", async () => {
		render(<SearchBar />);

		const input = screen.getByPlaceholderText("Enter destination..");
		fireEvent.change(input, { target: { value: "Las Vegas" } });

		await waitFor(() => expect(input.value).toBe("Las Vegas"));
	});

	// 1.3. Test the SearchBar component fetch API
	test("renders suggestions when update", async () => {
		render(<SearchBar />);

		const input = screen.getByPlaceholderText("Enter destination..");
		fireEvent.change(input, { target: { value: "Las Vegas" } });

		const suggestion = await screen.findByText("Las Vegas");
		expect(suggestion).toBeInTheDocument();
	});

	// 1.4. Test the SearchBar component click event
	test("clicking on a suggestion updates the input field and clears the suggestions", async () => {
		render(<SearchBar />);

		const input = screen.getByPlaceholderText("Enter destination..");
		fireEvent.change(input, { target: { value: "Las Vegas" } });

		const suggestion = await screen.findByText("Las Vegas");
		fireEvent.click(suggestion);

		expect(input.value).toBe("Las Vegas");
		expect(screen.queryByText("Las Vegas")).not.toBeInTheDocument();
		expect(saveToLocal).toHaveBeenCalledTimes(2);
	});

	// 1.5. Test the SearchBar component clear suggestions
	test("clears suggestions when input is null", async () => {
		render(<SearchBar />);

		const input = screen.getByPlaceholderText("Enter destination..");
		fireEvent.change(input, { target: { value: "Las Vegas" } });

		const suggestion = await screen.findByText("Las Vegas");
		expect(suggestion).toBeInTheDocument();

		fireEvent.change(input, { target: { value: "" } });
		await waitFor(() =>
			expect(screen.queryByText("Las Vegas")).not.toBeInTheDocument()
		);
	});

	// 1.6. Test the SearchBar component network error
	test("handles network errors", async () => {
		// Mock the fetch API to return an error
		// ai-gen start (ChatGPT-4.0, 0)
		global.fetch = jest.fn(() =>
			Promise.resolve({
				ok: false,
			})
		);

		// Spy on console.error to check that it gets called
		const consoleSpy = jest.spyOn(console, "error");
		// ai-gen end

		render(<SearchBar />);

		const input = screen.getByPlaceholderText("Enter destination..");
		fireEvent.change(input, { target: { value: "Las Vegas" } });

		// Wait for the error to be logged
		await waitFor(() =>
			expect(consoleSpy).toHaveBeenCalledWith(
				"Error:",
				new Error("Network response was not ok")
			)
		);

		// Clean up
		// ai-gen start (ChatGPT-4.0, 0)
		consoleSpy.mockRestore();
		// ai-gen end
	});
});
