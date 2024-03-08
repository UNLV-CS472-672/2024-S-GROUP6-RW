// this page will open a dialog box that will show a data grid of people
// from the database and allow the user to select people to add to the
// expense split. The user can also add new people to the database from

import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
	Button,
	TextField,
	Radio,
	RadioGroup,
	FormControlLabel,
	FormControl,
	FormLabel,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Grid,
	Select,
	MenuItem,
	Typography,
} from "@mui/material";

const generateRandomPeople = () => {
	const people = [];
	for (let i = 0; i < 10; i++) {
		const person = {
			id: i,
			name: `Person ${i}`,
			email: `person${i}@example.com`,
			splitMethod: "equal",
		};
		people.push(person);
	}
	return people;
};

function AddPersonDialog({ open, onClose }) {
	const [people, setPeople] = useState([]);
	const [totalExpense, setTotalExpense] = useState(0);
	const [splitMethod, setSplitMethod] = useState("equal");

	const columns = [
		{ field: "name", headerName: "Name", width: 130 },
		{ field: "email", headerName: "Email", width: 200 },
		{
			field: "splitMethod",
			headerName: "Split Method",
			width: 200,
			renderCell: (params) => (
				<Select
					value={params.row.splitMethod}
					onChange={(event) =>
						handleSplitMethodChange(params.row.id, event.target.value)
					}
				>
					<MenuItem value="equal">Equal</MenuItem>
					<MenuItem value="unequal">Unequal</MenuItem>
				</Select>
			),
		},
	];

	const handleSplitMethodChange = (id, newSplitMethod) => {
		setPeople((prevPeople) =>
			prevPeople.map((person) =>
				person.id === id
					? { ...person, splitMethod: newSplitMethod }
					: person
			)
		);
	};

	const handleAddPerson = () => {
		// Add logic to add a new person
	};

	const handleCalculate = () => {
		// Add logic to calculate the split
	};

	useEffect(() => {
		setPeople(generateRandomPeople());
	}, []);

	return (
		<div>
			<Dialog open={open} onClose={onClose} maxWidth="xl">
				<DialogTitle>Add Person</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Add a person to the expense split.
					</DialogContentText>
					<DataGrid
						rows={people}
						columns={columns}
						pageSize={5}
						checkboxSelection
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={onClose}>Cancel</Button>
					<Button onClick={onClose}>Add</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default AddPersonDialog;
