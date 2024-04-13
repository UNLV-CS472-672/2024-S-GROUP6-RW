import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
	Button,
	Grid,
	Container,
	Paper,
	AppBar,
	Toolbar,
	Typography,
	Box,
} from "@mui/material";

import AddPersonDialog from "./AddPersonDialog";
import DetailDialog from "./DetailDialog";
// icons for edit button
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function ExpensesSplit() {
	const [people, setPeople] = useState([]);
	//const [totalExpense, setTotalExpense] = useState(0);
	const [open, setOpen] = useState(false);
	const [detailDialogOpen, setDetailDialogOpen] = React.useState(false);
	const [currentRow, setCurrentRow] = React.useState(null);

	const columns = [
		//{ field: "id", headerName: "ID", width: 70 },
		{ field: "name", headerName: "Name", width: 130 },
		{ field: "email", headerName: "Email", width: 200 },
		{ field: "splitMethod", headerName: "Split Method", width: 150 },
		{
			field: "actions",
			headerName: "",
			sortable: false,
			width: 150,
			renderCell: (params) => (
				<div>
					{/*/ ai-gen start (ChatGPT-4.0, 2)*/}
					<EditIcon
						color="primary"
						onClick={() => {
							const person = {
								...people.find((p) => p.id === params.row.id),
							};
							if (!person.splitMethod) {
								person.splitMethod = "equal"; // Set a default value
							}
							setCurrentRow({ ...person });
							setDetailDialogOpen(true);
						}}
						style={{ cursor: "pointer", marginRight: "30px" }}
					/>
					<DeleteIcon
						color="primary"
						onClick={() => handleDelete(params.row.id)}
						style={{ cursor: "pointer" }}
					/>
					{/*/ ai-gen end */}
				</div>
			),
		},
	];

	const handleAddPeople = (selectedPeople) => {
		const updatedPeople = [...people, ...selectedPeople];
		setPeople(updatedPeople);
		setOpen(false);
	};

	const handleDelete = (id) => {
		setPeople(people.filter((person) => person.id !== id));
	};

	const handleEditPerson = (editedPerson) => {
		setPeople(
			people.map((person) =>
				person.id === editedPerson.id ? editedPerson : person
			)
		);
	};

	return (
		// ai-gen start (ChatGPT-4.0, 1)
		<Container maxWidth="xl" sx={{ mt: 4 }}>
			<Paper elevation={3} sx={{ mb: 2 }}>
				<AppBar position="static" color="inherit" elevation={0}>
					<Toolbar>
						{/* ai-gen end */}
						<Grid container spacing={1}>
							<Grid item xs={12} sm={6}>
								<Typography variant="h6" sx={{ flexGrow: 1 }}>
									Split Menu
								</Typography>
							</Grid>
							<Grid item xs={12} sm={6}>
								<Button
									variant="contained"
									onClick={() => {
										setCurrentRow({}); // Set currentRow to an empty object
										//setDetailDialogOpen(true); // Open the DetailDialog
										setOpen(true);
									}}
								>
									Add Expense
								</Button>
							</Grid>
						</Grid>
					</Toolbar>
				</AppBar>
			</Paper>
			<Box style={{ height: 400, width: "100%" }}>
				<DataGrid
					key={people.length}
					rows={people}
					columns={columns}
					pageSize={5}
					//checkboxSelection
				/>
			</Box>

			<AddPersonDialog
				open={open}
				onClose={() => setOpen(false)}
				onAdd={handleAddPeople}
			/>

			<DetailDialog
				open={detailDialogOpen}
				onClose={() => setDetailDialogOpen(false)}
				row={currentRow}
				isEditing={true}
				onEdit={handleEditPerson}
			/>
		</Container>
	);
}

export default ExpensesSplit;
