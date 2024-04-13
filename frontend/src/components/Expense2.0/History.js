import React, { useState, useEffect } from "react";
import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	List,
	ListItem,
	ListItemText,
	Typography,
	Paper,
	Card,
	CardContent,
	Box,
	useTheme,
	TextField,
	FormControl,
	Select,
	MenuItem,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function flattenTransactions(transactions) {
	return transactions && typeof transactions === "object"
		? Object.values(transactions).flat()
		: [];
}

function groupTransactionsByMonth(flatTransactions) {
	return flatTransactions.reduce((acc, transaction) => {
		if (transaction.date) {
			const month =
				transaction.date.split(" ")[1] +
				" " +
				transaction.date.split(" ")[3];
			if (!acc[month]) {
				acc[month] = [];
			}
			acc[month].push(transaction);
		}
		return acc;
	}, {});
}

function sortTransactionsByDate(monthSections) {
	Object.keys(monthSections).forEach((month) => {
		monthSections[month].sort((a, b) => {
			const dateA = new Date(a.date);
			const dateB = new Date(b.date);
			return dateB - dateA;
		});
	});
	return monthSections;
}

function filterTransactions(flatTransactions, searchTerm, searchField) {
	return flatTransactions.filter(
		(transaction) =>
			transaction[searchField] &&
			transaction[searchField]
				.toLowerCase()
				.includes(searchTerm.toLowerCase())
	);
}

function groupFilteredTransactionsByMonth(filteredTransactions) {
	return filteredTransactions.reduce((groups, transaction) => {
		const date = new Date(transaction.date);
		const month = date.toLocaleString("en-US", {
			month: "long",
			year: "numeric",
		});

		if (!groups[month]) {
			groups[month] = [];
		}

		groups[month].push(transaction);

		return groups;
	}, {});
}

const History = ({ transactions, sudoUser }) => {
	// Use the theme hook to get the current theme
	const theme = useTheme();
	//console.log("his:", transactions);

	const flatTransactions = flattenTransactions(transactions);
	const monthSections = groupTransactionsByMonth(flatTransactions);
	const sortedTransactions = sortTransactionsByDate(monthSections);

	// Add a new state variable for the search term
	const [searchTerm, setSearchTerm] = useState("");
	const [searchField, setSearchField] = useState("payer");

	// Function to handle changes to the search term
	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value);
	};

	// Function to handle changes to the search field
	const handleSearchFieldChange = (event, newField) => {
		if (newField !== null) {
			setSearchField(newField);
		}
	};

	const filteredTransactions = filterTransactions(
		flatTransactions,
		searchTerm,
		searchField
	);
	const transactionsByMonth =
		groupFilteredTransactionsByMonth(filteredTransactions);

	return (
		<Card
			sx={{
				background: theme.palette.background.paper,
				borderRadius: "16px",
				color: theme.palette.text.primary,
				overflow: "hidden",
			}}
		>
			<CardContent
				sx={{
					maxHeight: {
						xs: "auto",
						sm: "auto",
						md: "360px",
						lg: "400px",
					},
					overflowY: "auto",
				}}
			>
				<Box
					display="flex"
					justifyContent="space-between"
					alignItems="center"
					mb={2}
				>
					<Typography variant="h6" align="left">
						History
					</Typography>
					<Box display="flex" width="100%" justifyContent={"right"}>
						<Box width={150} marginRight={2} marginLeft={2}>
							<TextField
								fullWidth
								variant="outlined"
								label="Search"
								value={searchTerm}
								onChange={handleSearchChange}
							/>
						</Box>

						<FormControl>
							<Select
								labelId="search-field-label"
								id="search-field"
								value={searchField}
								onChange={handleSearchFieldChange}
							>
								<MenuItem value="payer">Payer</MenuItem>
								<MenuItem value="payee">Payee</MenuItem>
							</Select>
						</FormControl>
					</Box>
				</Box>
				<Paper
					elevation={3}
					sx={{
						overflow: "auto",
						maxHeight: "calc(100vh - 48px)",
						"&::-webkit-scrollbar": {
							display: "none",
						},
					}}
				>
					{Object.keys(transactionsByMonth)
						.sort((a, b) => new Date(b) - new Date(a))
						.map((month) => (
							<Accordion key={month}>
								<AccordionSummary expandIcon={<ExpandMoreIcon />}>
									<Typography>{month}</Typography>
								</AccordionSummary>
								<AccordionDetails
									sx={{
										maxHeight: "200px",
										overflow: "auto",
										"&::-webkit-scrollbar": {
											display: "none",
										},
									}}
								>
									<List>
										{transactionsByMonth[month].map(
											(transaction, index) => (
												<ListItem
													key={`${transaction.id}-${transaction.amount}-${transaction.date}-${index}`}
												>
													<ListItemText
														primary={
															transaction.payer === sudoUser
																? `You paid ${transaction.payee} $${transaction.amount}`
																: `${transaction.payer} paid you $${transaction.amount}`
														}
														secondary={transaction.date}
													/>
												</ListItem>
											)
										)}
									</List>
								</AccordionDetails>
							</Accordion>
						))}
				</Paper>
			</CardContent>
		</Card>
	);
};

export default History;
