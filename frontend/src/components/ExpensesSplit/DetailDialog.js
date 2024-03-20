import React, { useState, useEffect } from "react";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	Typography,
	TextField,
	Select,
	MenuItem,
	InputLabel,
	Box,
	Tabs,
	Tab,
} from "@mui/material";

const DetailDialog = ({ open, onClose, row, isEditing, onEdit }) => {
	const [editedPerson, setEditedPerson] = useState(
		row ? row : { splitMethod: "equal" }
	);

	const [tabValue, setTabValue] = useState(0);

	const handleTabChange = (event, newValue) => {
		setTabValue(newValue);
	};

	useEffect(() => {
		setEditedPerson(row ? row : { splitMethod: "equal" });
	}, [row]);

	const handleChange = (field) => (event) => {
		setEditedPerson({ ...editedPerson, [field]: event.target.value });
	};

	return (
		<Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
			<DialogTitle>Expense Details</DialogTitle>
			<Tabs value={tabValue} onChange={handleTabChange}>
				<Tab label="Overview" />
				<Tab label="Description" />
				<Tab label="Details" />
			</Tabs>
			<DialogContent>
				{tabValue === 0 && (
					<Box>
						<Typography variant="h6">Snapshot</Typography>
						<TextField
							label="Total Amount"
							value={editedPerson?.totalAmount || ""}
							onChange={handleChange("totalAmount")}
							disabled={!isEditing}
							margin="normal"
							type="number"
							style={{ marginRight: "10px" }}
						/>
						<TextField
							label="Date"
							type="date" // Add this line
							value={editedPerson?.date || ""}
							onChange={handleChange("date")}
							disabled={!isEditing}
							margin="normal"
							style={{ marginRight: "10px" }}
							InputLabelProps={{
								shrink: true,
							}}
						/>
						<TextField
							label="Paid By"
							value="User 1" // hard code
							onChange={handleChange("paidBy")}
							disabled={!isEditing}
							margin="normal"
							style={{ marginRight: "10px" }}
						/>
						<TextField
							label="Involved"
							value={editedPerson?.involved || ""}
							onChange={handleChange("involved")}
							disabled={!isEditing}
							margin="normal"
							style={{ marginRight: "10px" }}
						/>

						<Typography variant="h6">Current Status</Typography>
						<TextField
							label="Status"
							value={editedPerson?.status || ""}
							onChange={handleChange("status")}
							disabled={!isEditing}
							margin="normal"
							style={{ marginRight: "10px" }}
						/>
						<TextField
							label="Outstanding Amount"
							value={editedPerson?.outstandingAmount || ""}
							onChange={handleChange("outstandingAmount")}
							disabled={!isEditing}
							margin="normal"
							style={{ marginRight: "10px" }}
						/>

						<Typography variant="h6">Split Method</Typography>
						<Select
							labelId="split-method-label"
							value={editedPerson?.splitMethod}
							onChange={handleChange("splitMethod")}
							disabled={!isEditing}
						>
							<MenuItem value="equal">Equal</MenuItem>
							<MenuItem value="percent">Percent</MenuItem>
							<MenuItem value="specific">Specific</MenuItem>
						</Select>

						{/* Visual Indicators */}
						{/* You can use a library like react-chartjs-2 to create charts */}
					</Box>
				)}
				{tabValue === 1 && <Box>{/* Details content goes here */}</Box>}
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose} color="primary">
					Close
				</Button>
				{isEditing && (
					<Button
						onClick={() => {
							onEdit(editedPerson);
							onClose();
						}}
						color="primary"
					>
						Save
					</Button>
				)}
			</DialogActions>
		</Dialog>
	);
};

export default DetailDialog;
