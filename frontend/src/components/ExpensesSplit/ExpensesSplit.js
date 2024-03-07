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
	Grid,
	Select,
	MenuItem,
} from "@mui/material";

function ExpensesSplit() {
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
			<Grid container justifyContent="flex-end" spacing={2}>
				<Grid item>
					<Button variant="contained" onClick={handleAddPerson}>
						Add Person
					</Button>
				</Grid>
				<Grid item>
					<FormControl>
						<Select
							value={splitMethod}
							onChange={(e) => setSplitMethod(e.target.value)}
							sx={{ height: 40, width: 200, textAlign: "left" }}
						>
							<MenuItem value="equal">Split Equally</MenuItem>
							<MenuItem value="amount">Split by Amount</MenuItem>
						</Select>
					</FormControl>
				</Grid>
			</Grid>
			<div style={{ height: 400, width: "100%" }}>
				<DataGrid
					rows={people}
					columns={columns}
					pageSize={15}
					pageSizeOptions={[10, 25, 50, 100]}
				/>
			</div>
		</div>
	);
}

export default ExpensesSplit;
