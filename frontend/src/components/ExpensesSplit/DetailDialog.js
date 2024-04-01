import React, { useState, useEffect } from "react";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
} from "@mui/material";

const DetailDialog = ({ open, onClose, row, isEditing, onEdit }) => {
	const [editedPerson, setEditedPerson] = useState(
		row ? row : { splitMethod: "equal" }
	);

	useEffect(() => {
		setEditedPerson(row ? row : { splitMethod: "equal" });
	}, [row]);

	return (
		<Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
			<DialogTitle>Expense Details</DialogTitle>
			<DialogContent></DialogContent>
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
