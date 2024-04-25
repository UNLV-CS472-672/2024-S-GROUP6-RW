import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import AddRemoveFriends from "../components/FriendsPage/AddRemoveFriends";

// 1. Test the AddRemoveFriends component
describe("AddRemoveFriends", () => {
	// 1.1. Test the AddRemoveFriends component render
	test("renders without crashing", () => {
		render(<AddRemoveFriends />);
	});

	// 1.2. Test the AddRemoveFriends component add friend
	test("try add friend", () => {
		render(<AddRemoveFriends />);

		fireEvent.change(screen.getByPlaceholderText("Enter friend's name:"), {
			target: { value: "Amigo" },
		});
		fireEvent.click(screen.getByText("Add Friend"));

		expect(screen.getByText("Amigo")).toBeInTheDocument();
	});

	// 1.3. Test the AddRemoveFriends component remove friend
	test("try remove friend", () => {
		render(<AddRemoveFriends />);

		fireEvent.change(screen.getByPlaceholderText("Enter friend's name:"), {
			target: { value: "Amigo" },
		});
		fireEvent.click(screen.getByText("Add Friend"));
		fireEvent.click(screen.getByText("Remove"));

		expect(screen.queryByText("Amigo")).not.toBeInTheDocument();
	});
});
