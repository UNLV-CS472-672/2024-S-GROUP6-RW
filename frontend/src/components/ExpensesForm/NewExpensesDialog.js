import React, { useState, useEffect } from "react";

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
	Tab,
	Tabs,
} from "@mui/material";

// icons for edit button
import EditIcon from "@mui/icons-material/Edit";

import ExpensesSplit from "../ExpensesSplit/ExpensesSplit";

const dialogContainerStyle = {
	backdropFilter: "blur(5px)",
	"& .MuiPaperRoot": {
		borderRadius: "10px",
	},
};

// AI generate code help to filter the data --------
const formatDateForInput = (date) => {
	const d = new Date(date);
	let month = "" + (d.getMonth() + 1),
		day = "" + d.getDate(),
		year = d.getFullYear();

	if (month.length < 2) month = "0" + month;
	if (day.length < 2) day = "0" + day;

	return [year, month, day].join("-");
};
// AI generate code help to filter the data --------

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
	const [name, setName] = useState(expense ? expense.name : "");
	const [amount, setAmount] = useState(
		expense ? expense.amount.toString() : ""
	);
	const [payer, setPayer] = useState(expense ? expense.payer : "");
	// state var for the date
	// Assuming formatDateForInput is imported or defined in this file
	const [date, setDate] = useState(
		expense
			? formatDateForInput(expense.date)
			: formatDateForInput(new Date())
	);

	// state var for the description
	const [description, setDescription] = useState(
		expense ? expense.description : ""
	);
	// state variable to manage the error message
	const [error, setError] = useState("");
	const [tabValue, setTabValue] = useState(0);
	const [detailsOpen, setDetailsOpen] = useState(false);

	// function to handle the open event of the dialog
	const handleClickOpen = () => {
		if (!expense) {
			// Also clear the form when opening in create mode
			clearForm();
		}
		setOpen(true);
	};

	// function to handle the close event of the dialog
	const handleClose = () => {
		if (!expense) {
			// Only clear the form if in create mode (no expense prop provided)
			clearForm();
		}
		setError("");
		setOpen(false);
	};

	const handleTabChange = (event, newValue) => {
		setTabValue(newValue);
		if (newValue === 1) {
			setDetailsOpen(true);
		}
	};

	// function to clear the form fields and error message
	const clearForm = () => {
		setName("");
		setAmount("");
		setPayer("");
		// AI generate code help to filter the data --------
		setDate(formatDateForInput(new Date()));
		// AI generate code help to filter the data --------
		setDescription("");
	};

	// function to handle the add event of the expense
	const handleAdd = () => {
		setError("");
		//data validation
		if (name === "") {
			setError("Name is required.");
			return;
		}

		if (amount === "") {
			setError("Amount is required.");
			return;
		}

		if (payer === "") {
			setError("Payer is required.");
			return;
		}

		if (date === "") {
			setError("Date is required.");
			return;
		}

		if (parseFloat(amount) <= 0) {
			setError("Amount must be greater than 0.");
			return;
		}

		if (error) {
			clearForm();
		}

		// Call the onAddExpense or onEditExpense function with the new expense details
		if (expense) {
			onEditExpense({
				id: expense.id,
				name,
				amount,
				payer,
				date,
				description,
			});
		} else {
			onAddExpense({
				id: Math.floor(Math.random() * 1000),
				name,
				amount,
				payer,
				date,
				description,
			});
		}

		// clear the form fields and close the dialog
		handleClose();
	};

	// Update state variables when expense prop changes
	useEffect(() => {
		//if it is add new expense, then clear the form
		if (newData) {
			clearForm();
		} else {
			//console.log("Expense:", expense);
			setName(expense ? expense.name : "");
			setAmount(expense ? expense.amount.toString() : "");
			setPayer(expense ? expense.payer : "");
			setDate(
				expense
					? formatDateForInput(expense.date)
					: formatDateForInput(new Date())
			);
			setDescription(expense ? expense.description : "");
		}
	}, [expense, newData]); //the [expense] array is the dependency array
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
					sx={{ mr: 1, mt: 1 }}
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

			<Dialog
				open={open}
				onClose={handleClose}
				style={dialogContainerStyle}
				maxWidth="xl"
			>
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

					<Tabs value={tabValue} onChange={handleTabChange}>
						<Tab label="Overview" />
						<Tab label="Expense Split" />
					</Tabs>

					{tabValue === 0 && (
						<div style={{ width: "900px", height: "500px" }}>
							{/* text field for the name */}
							<TextField
								autoFocus
								margin="dense"
								label="Name"
								type="text"
								fullWidth
								// AI generate code help to filter the data --------
								value={name || ""}
								// AI generate code help to filter the data --------
								onChange={(e) => setName(e.target.value)}
								sx={{ marginBottom: "20px", marginTop: "20px" }}
							/>
							{/* text field for the amount */}
							<TextField
								margin="dense"
								label="Amount"
								type="number"
								fullWidth
								// AI generate code help to filter the data --------
								value={amount || ""}
								// AI generate code help to filter the data --------
								onChange={(e) => setAmount(e.target.value)}
								sx={{ marginBottom: "20px" }}
							/>
							{/* text field for the payer */}
							<TextField
								margin="dense"
								label="Paid by:"
								type="text"
								fullWidth
								// AI generate code help to filter the data --------
								value={payer || ""}
								// AI generate code help to filter the data --------
								onChange={(e) => setPayer(e.target.value)}
								sx={{ marginBottom: "20px" }}
							/>

							{/* text field for the date */}
							<TextField
								margin="dense"
								type="date"
								fullWidth
								// AI generate code help to filter the data --------
								value={date || formatDateForInput(new Date())}
								onChange={(e) => setDate(e.target.value)}
								// AI generate code help to filter the data --------
								sx={{ marginBottom: "20px" }}
							/>

							{/* text field for the description */}
							<TextField
								margin="dense"
								label="Description"
								type="text"
								fullWidth
								value={description}
								onChange={(e) => {
									const words = e.target.value.split(" ");
									if (words.length <= 300) {
										setDescription(e.target.value);
									}
								}}
								// AI generate code help to filter the data --------
								helperText={`${
									description ? description.split(" ").length : 0
								}/300`}
								// AI generate code help to filter the data --------
								sx={{ marginBottom: "20px" }}
							/>
						</div>
					)}

					{tabValue === 1 && (
						<div style={{ width: "900px", height: "500px" }}>
							<ExpensesSplit />
						</div>
					)}
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
