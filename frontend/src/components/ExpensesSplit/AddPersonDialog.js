import React, { useState, useEffect } from "react";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	Select,
	MenuItem,
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";

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

function AddPersonDialog({ open, onClose, onAdd }) {
	const [people, setPeople] = useState([]);
	const [selectedIDs, setSelectedIDs] = useState([]);

	useEffect(() => {
		// Initialize or fetch people when the dialog opens
		if (open) {
			const initialPeople = generateRandomPeople();
			setPeople(initialPeople);
			//console.log("People:", initialPeople);
		}
	}, [open]);

	const columns = [
		{ field: "id", headerName: "ID", width: 90, hide: true },
		{ field: "name", headerName: "Name", width: 150 },
		{ field: "email", headerName: "Email", width: 200 },
		{
			field: "splitMethod",
			headerName: "Split Method",
			width: 130,
			renderCell: (params) => (
				<Select
					value={params.row.splitMethod}
					onChange={(event) => handleSplitMethodChange(event, params.row)}
					style={{ width: "200px" }}
				>
					<MenuItem value="equal">Equal</MenuItem>
					<MenuItem value="specific">Specific</MenuItem>
				</Select>
			),
		},
	];

	const handleAddSelected = () => {
		// Assuming onAdd expects an array of person objects
		const selectedPeople = selectedIDs.map((id) =>
			people.find((person) => person.id === id)
		);
		onAdd(selectedPeople);
	};

	const handleSplitMethodChange = (event, person) => {
		const updatedPeople = people.map((p) =>
			p.id === person.id ? { ...p, splitMethod: event.target.value } : p
		);
		setPeople(updatedPeople);
	};

	return (
		<Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
			<DialogTitle>Add Person to Expense Split</DialogTitle>
			<DialogContent>
				<div style={{ height: 400, width: "100%" }}>
					<DataGrid
						rows={people}
						columns={columns}
						pageSize={5}
						checkboxSelection
						onRowSelectionModelChange={(newSelectionModel) => {
							setSelectedIDs(newSelectionModel);
						}}
					/>
				</div>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Cancel</Button>
				<Button
					color="primary"
					variant="contained"
					onClick={handleAddSelected}
				>
					Add Selected
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default AddPersonDialog;
