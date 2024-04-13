import React, { useState } from "react";
import {
	Card,
	CardContent,
	Typography,
	List,
	ListItem,
	ListItemText,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Button,
	Box,
	useTheme,
	Tabs,
	Tab,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// ActivityTabs component -> responsible for displaying the tabs for the activities
const ActivityTabs = ({ value, onChange, labels }) => (
	<Tabs value={value} onChange={onChange}>
		{labels.map((label, index) => (
			<Tab key={index} label={label} />
		))}
	</Tabs>
);

// Activity component -> responsible for displaying the activity
const Activity = ({ activity, sudoUser, onEditActivity, onDeleteActivity }) => {
	let secondaryText = `$${activity.amount}`; //set the amount of the activity
	const payerText = activity.payer === sudoUser ? "You" : activity.payer;
	const payeeText = activity.payee === sudoUser ? "You" : activity.payee;

	let color;

	//toggle the color of the activity based on the type of the activity
	switch (activity.type) {
		case "owe":
			secondaryText += ` - ${payerText} paid ${payeeText}`;
			//if it is sudo user who paid, then the color is default, else red
			color = activity.payer === sudoUser ? "default" : "red";
			break;
		case "get back":
			secondaryText += ` - ${payeeText} get back from ${payerText}`;
			color = "green";
			break;
		default:
			secondaryText += ` - ${payerText} paid ${payeeText}`;
			color = activity.payer === sudoUser ? "default" : "red";
	}

	return (
		<ListItem key={activity.id}>
			<ListItemText
				primary={activity.name}
				secondary={<Typography color={color}>{secondaryText}</Typography>}
			/>
			{/*
			<Button onClick={() => onEditActivity(activity.id)}>
				<EditIcon />
			</Button>
			<Button onClick={() => onDeleteActivity(activity.id)}>
				<DeleteIcon />
			</Button>
			*/}
		</ListItem>
	);
};

// ActivityCategory component -> responsible for displaying the activity category
const ActivityCategory = ({
	category,
	activities,
	sudoUser,
	onEditCategory,
	onDeleteCategory,
	onEditActivity,
	onDeleteActivity,
}) => {
	// set the tab and the label
	const [tab, setTab] = useState(0);
	//const labels = ["All", "You Paid", "Other Paid", "You Get Back"];
	const labels = ["All"];

	//handle the tab change
	const handleTabChange = (event, newValue) => {
		setTab(newValue);
	};

	//filter the activities based on the tab selected -> this is old code, need to comment uncomment line 93 to use this
	const filteredActivities = activities.filter((activity) => {
		switch (tab) {
			case 1:
				return activity.type === "paid";
			case 2:
				return activity.type === "owe";
			case 3:
				return activity.type === "get back";
			default:
				return true;
		}
	});

	return (
		<Accordion key={category}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<Typography>{category}</Typography>
				{/*
				<Button onClick={() => onEditCategory(category)}>
					<EditIcon />
				</Button>
				<Button onClick={() => onDeleteCategory(category)}>
					<DeleteIcon />
				</Button>
				*/}
			</AccordionSummary>

			<AccordionDetails
				sx={{
					// ai-gen (ChatGPT-4.0, 1)
					maxHeight: "600px",
					overflow: "auto",
					"&::-webkit-scrollbar": {
						display: "none",
					},
					// ai-gen end
				}}
			>
				<ActivityTabs
					value={tab}
					onChange={handleTabChange}
					labels={labels}
				/>
				<List>
					{filteredActivities.map((activity) => (
						<Activity
							key={activity.id}
							activity={activity}
							labels={labels}
							sudoUser={sudoUser}
							onEditActivity={onEditActivity}
							onDeleteActivity={onDeleteActivity}
						/>
					))}
				</List>
			</AccordionDetails>
		</Accordion>
	);
};

// Activities component -> responsible for displaying the activities this is the export default
const Activities = ({
	activitiesData,
	sudoUser,
	categories,
	setCategories,
	onEditActivity,
	onDeleteActivity,
	onEditCategory,
	onDeleteCategory,
}) => {
	// use the theme
	const theme = useTheme();

	// set the open and the new category name
	const [open, setOpen] = useState(false);
	const [newCategoryName, setNewCategoryName] = useState("");

	// handle the click open
	const handleClickOpen = () => {
		setOpen(true);
	};

	// handle the close
	const handleClose = () => {
		setOpen(false);
	};

	// handle the submit
	const handleSubmit = (event) => {
		event.preventDefault(); // need to do this to prevent the default behavior of the form
		// add the new category to the categories
		const newCategories = [...categories, [newCategoryName, []]];
		// sort and set the categories
		newCategories.sort((a, b) => a[0].localeCompare(b[0]));
		setCategories(newCategories);
		setNewCategoryName("");
		handleClose();
	};

	return (
		<Card
			sx={{
				// ai-gen (ChatGPT-4.0, 1)
				background: theme.palette.background.paper,
				borderRadius: "16px",
				color: theme.palette.text.primary,
				overflow: "hidden",
				height: "600px",
				// ai-gen end
			}}
		>
			{/*Struct is similar to History.js*/}
			<CardContent sx={{ height: "680px", overflowY: "auto" }}>
				<Box
					display="flex"
					justifyContent="space-between"
					alignItems="center"
					mb={2}
				>
					<Typography variant="h6">Activities</Typography>

					<Button
						variant="contained"
						startIcon={<AddIcon />}
						onClick={handleClickOpen}
					>
						Add Category
					</Button>
				</Box>

				{categories.map(([category, activities]) => (
					<ActivityCategory
						key={category}
						category={category}
						activities={activities}
						sudoUser={sudoUser}
						onEditCategory={onEditCategory}
						onDeleteCategory={onDeleteCategory}
						onEditActivity={onEditActivity}
						onDeleteActivity={onDeleteActivity}
					/>
				))}
			</CardContent>

			{/*Dialog for adding a new category*/}
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Add a new category</DialogTitle>

				{/*Use JS normal form isntead of MUI as we only need to ask for category name so no need to be fancy*/}
				<form onSubmit={handleSubmit}>
					<DialogContent>
						<DialogContentText>
							Please enter the name of the new category.
						</DialogContentText>
						<TextField
							autoFocus
							margin="dense"
							id="name"
							label="Category Name"
							type="text"
							fullWidth
							value={newCategoryName}
							onChange={(event) =>
								setNewCategoryName(event.target.value)
							}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose}>Cancel</Button>
						<Button type="submit">Add</Button>
					</DialogActions>
				</form>
			</Dialog>
		</Card>
	);
};

export default Activities;
