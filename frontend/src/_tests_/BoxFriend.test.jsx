import React from "react";
import { render, screen } from "@testing-library/react";
import BoxFriend from "../components/FriendsPage/BoxFriend";

// List of friend names to display - hard code
const friendNames = [
	"Jackson",
	"Aubrey",
	"Oliver",
	"Isabella",
	"Jacob",
	"Matthew",
	"Austin",
	"Tyler",
];

// 1. Test the BoxFriend component
describe("BoxFriend", () => {
	// 1.1. Test the BoxFriend component render
	test("renders without crashing", () => {
		render(<BoxFriend />);
	});

	// 1.2. Test the BoxFriend component list of friends
	test("displays a list of friends", () => {
		render(<BoxFriend />);

		friendNames.forEach((name) => {
			expect(screen.getByText(name)).toBeInTheDocument();
		});
	});

	// 1.3. Test the BoxFriend component join date
	test("displays the correct join date for each friend", () => {
		render(<BoxFriend />);

		const todayElements = screen.getAllByText("Added Today");
		const yesterdayElements = screen.getAllByText("Added Yesterday");

		expect(todayElements.length).toBe(4);
		expect(yesterdayElements.length).toBe(4);
	});
});
