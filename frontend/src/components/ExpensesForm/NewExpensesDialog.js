import React, { useState, useEffect } from "react";
import NavigationIcon from '@mui/icons-material/Navigation';
import Fab from '@mui/material/Fab';

// dialog components as well as text field and button
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

// icons for edit button
import EditIcon from "@mui/icons-material/Edit";

const dialogContainerStyle = {
	backdropFilter: "blur(5px)",
	"& .MuiPaperRoot": {
		borderRadius: "10px",
	},
};

/**
 * NewExpenseDialog component is used to add new expense to the list of expenses.
    * It is a dialog component that opens when the user clicks on the "New expense" button.
    * It contains a form with three fields: name, amount, and payer.
    * The user can enter the details and click on the "Add" button to add the expense to the list.  
    * The user can also click on the "Cancel" button to close the dialog without adding the expense.
    * The component also handles the edit functionality. When the user clicks on the "Edit" button, the dialog opens with the details of the selected expense.

    * @param newData - boolean value to show the button only if the new data is true
    * @param expense - object containing the details of the selected expense
    * @param onAddExpense - function to add the new expense to the list
 */
const NewExpenseDialog = ({
	newData,
	expense,
	onAddExpense,
	onEditExpense,
}) => {
	// state variables to manage the dialog open and close
	const [open, setOpen] = useState(false);
	// state variables to manage the form fields
	const [test, setTest] = useState(expense ? expense.test : "");
	const [amount, setAmount] = useState(expense ? expense.amount : "");
	const [payer, setPayer] = useState(expense ? expense.payer : "");
	// state var for the date
	const [date, setDate] = useState(expense ? expense.date : "");
	// state variable to manage the error message
	const [error, setError] = useState("");

	// function to handle the open event of the dialog
	const handleClickOpen = () => {
		setOpen(true);
	};

	// function to handle the close event of the dialog
	const handleClose = () => {
		clearForm();
		setOpen(false);
	};

	// function to clear the form fields and error message
	const clearForm = () => {
		setTest("");
		setAmount("");
		setPayer("");
		setDate("");
	};

	// function to handle the add event of the expense
	const handleAdd = () => {
		//data validation
		if (test === "" || amount === "" || payer === "" || date === "") {
			setError("All fields are required.");
			clearForm();
			return;
		}

		if (parseFloat(amount) <= 0) {
			setError("Amount must be greater than 0.");
			clearForm();
			return;
		}

		if (error) {
			clearForm();
		}

		// Call the onAddExpense or onEditExpense function with the new expense details
		if (expense) {
			onEditExpense({
				id: expense.id,
				test,
				amount,
				payer,
				date,
			});
		} else {
			onAddExpense({
				id: Math.floor(Math.random() * 1000),
				test,
				amount,
				payer,
				date,
			});
		}

		// clear the form fields and close the dialog
		handleClose();
	};

	// Update state variables when expense prop changes
	useEffect(() => {
		setTest(expense ? expense.test : "");
		setAmount(expense ? expense.amount : "");
		setPayer(expense ? expense.payer : "");
		setDate(expense ? expense.date : "");
	}, [expense]); //the [expense] array is the dependency array
	// it means that the useEffect will run when the expense changes
	// and it will update the name, amount and payer state variables

	return (
		// show the button only if the new data is true
		// if not then we will just show the dialog

		<div>
			{/* show the new expense button if the new data is true */}
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
			{/* show the edit button if the new data is false */}
			{!newData && (
				<Button onClick={handleClickOpen}>
					<EditIcon />
				</Button>
			)}

			<Dialog open={open} onClose={handleClose} style={dialogContainerStyle}>
				<DialogTitle>
					{newData ? "Add a new expense" : "Edit expense"}
				</DialogTitle>
				<DialogContent>
					<DialogContentText>
						{newData
							? "Enter the details of the new expense."
							: "Edit the details of the expense."}
					</DialogContentText>
					{/* show the error message if there is any data validation fail */}
					{error && <Alert severity="error">{error}</Alert>}

					{/* text field for the name */}
					<TextField
						autoFocus
						margin="dense"
						label="description"
						type="text"
						fullWidth
						value={test}
						onChange={(e) => setTest(e.target.value)}
					/>
					{/* text field for the amount */}
					<TextField
						margin="dense"
						label="0.00"
						type="number"
						fullWidth
						value={amount}
						onChange={(e) => setAmount(e.target.value)}
					/>
					{/* text field for the payer */}
					<TextField
						margin="dense"
						label="paid by:"
						type="text"
						fullWidth
						value={payer}
						onChange={(e) => setPayer(e.target.value)}
					/>

					{/* text field for the date */}
					<TextField
						margin="dense"
						type="date"
						fullWidth
						value={date}
						onChange={(e) => setDate(e.target.value)}
					/>
				</DialogContent>
				{/* buttons for cancel and add */}
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
