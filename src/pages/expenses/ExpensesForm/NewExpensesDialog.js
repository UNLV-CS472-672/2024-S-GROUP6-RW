import React, { useState, useEffect } from "react";
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Alert,
	TextField,
	Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const NewExpenseDialog = ({ newData, expense, onAddExpense }) => {
	const [open, setOpen] = useState(false);
	const [name, setName] = useState(expense ? expense.name : "");
	const [amount, setAmount] = useState(expense ? expense.amount : "");
	const [payer, setPayer] = useState(expense ? expense.payer : "");
	const [error, setError] = useState("");

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		clearForm();
		setOpen(false);
	};

	const clearForm = () => {
		setName("");
		setAmount("");
		setPayer("");
		setError("");
	};

	const handleAdd = () => {
		if (name === "" || amount === "" || payer === "") {
			setError("All fields are required.");
			return;
		}

		if (parseFloat(amount) <= 0) {
			setError("Amount must be greater than 0.");
			return;
		}

		onAddExpense({
			id: expense ? expense.id : Math.random(),
			name,
			amount,
			payer,
		});

		handleClose();
	};

	// Update state variables when expense prop changes
	useEffect(() => {
		setName(expense ? expense.name : "");
		setAmount(expense ? expense.amount : "");
		setPayer(expense ? expense.payer : "");
	}, [expense]);

	return (
		// show the button only if the new data is true
		// if not then we will just show the dialog

		<div>
			{newData && (
				<Button
					color="primary"
					variant="outlined"
					sx={{ mr: 1 }}
					onClick={handleClickOpen}
				>
					New expense
				</Button>
			)}
			{!newData && (
				<Button onClick={handleClickOpen}>
					<EditIcon />
				</Button>
			)}

			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Add a new expense</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Please enter the name, the amount and the payer to add new
						expense.
					</DialogContentText>
					{error && <Alert severity="error">{error}</Alert>}
					<TextField
						autoFocus
						margin="dense"
						label="Name"
						type="text"
						fullWidth
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<TextField
						margin="dense"
						label="Amount"
						type="number"
						fullWidth
						value={amount}
						onChange={(e) => setAmount(e.target.value)}
					/>
					<TextField
						margin="dense"
						label="Payer"
						type="text"
						fullWidth
						value={payer}
						onChange={(e) => setPayer(e.target.value)}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleAdd} color="primary">
						Add
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default NewExpenseDialog;
