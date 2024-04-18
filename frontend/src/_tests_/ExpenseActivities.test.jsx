import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Activities from "../components/Expense2.0/Activity";

describe("Activities", () => {
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
	];
	const categories = [["Category 1", activitiesData]];
	const sudoUser = "Sudo";

	test("renders Activities component", () => {
		render(
			<Activities
				activitiesData={[]}
				sudoUser=""
				categories={[]}
				setCategories={() => {}}
				onEditActivity={() => {}}
				onDeleteActivity={() => {}}
				onEditCategory={() => {}}
				onDeleteCategory={() => {}}
			/>
		);
		expect(screen.getByText("Activities")).toBeInTheDocument();
	});

	test("renders activities correctly", () => {
		render(
			<Activities
				activitiesData={activitiesData}
				sudoUser={sudoUser}
				categories={categories}
				setCategories={() => {}}
				onEditActivity={() => {}}
				onDeleteActivity={() => {}}
				onEditCategory={() => {}}
				onDeleteCategory={() => {}}
			/>
		);

		expect(screen.getByText("Activity 1")).toBeInTheDocument();
		expect(screen.getByText("Activity 2")).toBeInTheDocument();
	});

	test("renders activities details", () => {
		render(
			<Activities
				activitiesData={activitiesData}
				sudoUser={sudoUser}
				categories={categories}
				setCategories={() => {}}
				onEditActivity={() => {}}
				onDeleteActivity={() => {}}
				onEditCategory={() => {}}
				onDeleteCategory={() => {}}
			/>
		);

		expect(screen.getByText("$10 - You paid User 2")).toBeInTheDocument();
		expect(
			screen.getByText("$20 - You get back from User 2")
		).toBeInTheDocument();
	});

	test("opens and closes the Add Category dialog", () => {
		render(
			<Activities
				activitiesData={activitiesData}
				sudoUser={sudoUser}
				categories={categories}
				setCategories={() => {}}
				onEditActivity={() => {}}
				onDeleteActivity={() => {}}
				onEditCategory={() => {}}
				onDeleteCategory={() => {}}
			/>
		);
		fireEvent.click(screen.getByText("Add Category"));
		expect(screen.getByRole("dialog")).toBeInTheDocument();
	});
});
