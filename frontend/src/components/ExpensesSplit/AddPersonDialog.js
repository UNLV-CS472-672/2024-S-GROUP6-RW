// this page will open a dialog box that will show a data grid of people
// from the database and allow the user to select people to add to the
// expense split. The user can also add new people to the database from

import React, { useState } from "react";
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
} from "@mui/material";

function AddPersonDialog() {
	const [open, setOpen] = useState(false);
	const [splitMethod, setSplitMethod] = useState("equal");
	const [people, setPeople] = useState([]);
	const [totalExpense, setTotalExpense] = useState(0);

	const columns = [
		//{ field: "id", headerName: "ID", width: 70 },
		{ field: "name", headerName: "Name", width: 130 },
		{ field: "email", headerName: "Email", width: 200 },
		{ field: "share", headerName: "Share", width: 130 },
	];

	const handleAddPerson = () => {
		// Add logic to add a new person
	};

	const handleCalculate = () => {
		// Add logic to calculate the split
	};

	return (
		<div>
			<Button variant="contained" onClick={() => setOpen(true)}>
				Add Person
			</Button>
			<Dialog open={open} onClose={() => setOpen(false)}>
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
					<Button onClick={() => setOpen(false)}>Cancel</Button>
					<Button onClick={() => setOpen(false)}>Add</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default AddPersonDialog;
