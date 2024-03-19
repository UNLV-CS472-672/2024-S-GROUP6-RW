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
			<DialogTitle>Person Details</DialogTitle>
			<Tabs value={tabValue} onChange={handleTabChange}>
				<Tab label="Overview" />
				<Tab label="Details" />
			</Tabs>
			<DialogContent>
				{tabValue === 0 && (
					<Box>
						<TextField
							label="Name"
							value={editedPerson?.name || ""}
							onChange={handleChange("name")}
							disabled={!isEditing}
							sx={{ mt: 2 }}
						/>
						<TextField
							label="Email"
							value={editedPerson?.email || ""}
							onChange={handleChange("email")}
							disabled={!isEditing}
							sx={{ mt: 2 }}
						/>
						<InputLabel id="split-method-label">Split Method</InputLabel>
						<Select
							labelId="split-method-label"
							value={editedPerson?.splitMethod}
							onChange={handleChange("splitMethod")}
							disabled={!isEditing}
							sx={{ mt: 2 }}
						>
							<MenuItem value="equal">Equal</MenuItem>
							<MenuItem value="percent">Percent</MenuItem>
							<MenuItem value="specific">Specific</MenuItem>
						</Select>
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
