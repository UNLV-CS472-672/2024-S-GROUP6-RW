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
	Container,
	Paper,
	AppBar,
	Toolbar,
	Typography,
	Box,
} from "@mui/material";

import AddPersonDialog from "./AddPersonDialog";

function ExpensesSplit() {
	const [splitMethod, setSplitMethod] = useState("equal");
	const [people, setPeople] = useState([]);
	const [totalExpense, setTotalExpense] = useState(0);
	const [open, setOpen] = useState(false);

	const columns = [
		//{ field: "id", headerName: "ID", width: 70 },
		{ field: "name", headerName: "Name", width: 130 },
		{ field: "email", headerName: "Email", width: 200 },
		{ field: "share", headerName: "Share", width: 130 },
	];

	const handleClose = () => {
		setOpen(false);
	};

	const handleCalculate = () => {
		// Add logic to calculate the split
	};

	return (
		<Container maxWidth="md" sx={{ mt: 4 }}>
			<Paper elevation={3} sx={{ mb: 2 }}>
				<AppBar
					position="static"
					color="inherit"
					elevation={0}
					sx={{
						border: "inherit",
						borderColor: "text.primary",
						borderRadius: 2,
						maxHeight: "400px",
						paddingBottom: 2,
						paddingTop: 2,
					}}
				>
					<Toolbar>
						<Grid container spacing={1}>
							<Grid item xs={12} sm={6}>
								<Typography
									variant="h6"
									color="inherit"
									sx={{ flexGrow: 1 }}
								>
									Split Method
								</Typography>
							</Grid>

							<Grid item xs={12} sm={2}>
								<FormControl>
									<Select
										value={splitMethod}
										onChange={(e) => setSplitMethod(e.target.value)}
										sx={{ height: 40, width: 200, textAlign: "left" }}
									>
										<MenuItem value="equal">Split Equally</MenuItem>
										<MenuItem value="amount">
											Split by Amount
										</MenuItem>
									</Select>
								</FormControl>
							</Grid>

							<Grid item xs={12} sm={2} sx={{ marginLeft: 12 }}>
								<AddPersonDialog open={open} onClose={handleClose} />
							</Grid>
						</Grid>
					</Toolbar>
				</AppBar>
			</Paper>

			<Box style={{ height: 400, width: "100%" }}>
				<DataGrid
					rows={people}
					columns={columns}
					pageSize={15}
					pageSizeOptions={[10, 25, 50, 100]}
				/>
			</Box>
		</Container>
	);
}

export default ExpensesSplit;
