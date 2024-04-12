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

const ActivityTabs = ({ value, onChange, labels }) => (
	<Tabs value={value} onChange={onChange}>
		{labels.map((label, index) => (
			<Tab key={index} label={label} />
		))}
	</Tabs>
);

const Activity = ({ activity, sudoUser }) => {
	let secondaryText = `$${activity.amount}`;
	const payerText = activity.payer === sudoUser ? "You" : activity.payer;
	const payeeText = activity.payee === sudoUser ? "You" : activity.payee;

	switch (activity.type) {
		case "owe":
			secondaryText += ` - ${payerText} paid ${payeeText}`;
			break;
		case "get back":
			secondaryText += ` - ${payeeText} get back from ${payerText}`;
			break;
		default:
			secondaryText += ` - ${payerText} paid ${payeeText}`;
	}

	return (
		<ListItem key={activity.id}>
			<ListItemText primary={activity.name} secondary={secondaryText} />
		</ListItem>
	);
};

const ActivityCategory = ({ category, activities, sudoUser }) => {
	const [tab, setTab] = useState(0);
	const labels = ["All", "You Paid", "Other Paid", "You Get Back"];

	const handleTabChange = (event, newValue) => {
		setTab(newValue);
	};

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
			</AccordionSummary>
			<AccordionDetails
				sx={{
					maxHeight: "600px",
					overflow: "auto",
					"&::-webkit-scrollbar": {
						display: "none",
					},
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
						/>
					))}
				</List>
			</AccordionDetails>
		</Accordion>
	);
};

const Activities = ({
	activitiesData,
	sudoUser,
	categories,
	setCategories,
}) => {
	const theme = useTheme();
	const [open, setOpen] = useState(false);
	const [newCategoryName, setNewCategoryName] = useState("");

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const newCategories = [...categories, [newCategoryName, []]];
		newCategories.sort((a, b) => a[0].localeCompare(b[0]));
		setCategories(newCategories);
		setNewCategoryName("");
		handleClose();
	};

	return (
		<Card
			sx={{
				background: theme.palette.background.paper,
				borderRadius: "16px",
				color: theme.palette.text.primary,
				overflow: "hidden",
				height: "600px",
			}}
		>
			<CardContent sx={{ height: "640px", overflowY: "auto" }}>
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
					/>
				))}
			</CardContent>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Add a new category</DialogTitle>
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
