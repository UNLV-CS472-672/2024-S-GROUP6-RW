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

function ExpensesSplit() {
	const [people, setPeople] = useState([]);
	//const [totalExpense, setTotalExpense] = useState(0);
	const [open, setOpen] = useState(false);

	const columns = [
		//{ field: "id", headerName: "ID", width: 70 },
		{ field: "name", headerName: "Name", width: 130 },
		{ field: "email", headerName: "Email", width: 200 },
		{ field: "splitMethod", headerName: "Split Method", width: 150 },
		{ field: "amount", headerName: "Amount", width: 150 },
	];

	const handleAddPeople = (selectedPeople) => {
		const updatedPeople = [...people, ...selectedPeople];
		setPeople(updatedPeople);
		setOpen(false);
	};

	const handleCalculate = () => {
		// Add logic to calculate the split
	};

	return (
		<Container maxWidth="md" sx={{ mt: 4 }}>
			<Paper elevation={3} sx={{ mb: 2 }}>
				<AppBar position="static" color="inherit" elevation={0}>
					<Toolbar>
						<Grid container spacing={1}>
							<Grid item xs={12} sm={6}>
								<Typography variant="h6" sx={{ flexGrow: 1 }}>
									Split Method
								</Typography>
							</Grid>
							<Grid item xs={12} sm={6}>
								<Button
									variant="contained"
									onClick={() => setOpen(true)}
								>
									Add Person
								</Button>
							</Grid>
						</Grid>
					</Toolbar>
				</AppBar>
			</Paper>
			<Box style={{ height: 400, width: "100%" }}>
				<DataGrid
					rows={people}
					columns={columns}
					pageSize={5}
					checkboxSelection
				/>
			</Box>
			<AddPersonDialog
				open={open}
				onClose={() => setOpen(false)}
				onAdd={handleAddPeople}
			/>
		</Container>
	);
}

export default ExpensesSplit;
