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

// Function to flatten the transactions object
// ai-gen start (chatGPT 4.0, 1)
function flattenTransactions(transactions) {
	return transactions && typeof transactions === "object" // Check if transactions is an object bc it can be null
		? Object.values(transactions).flat()
		: [];
}
// ai-gen end

// Function to group transactions by month and year
// fixing it cause it give undefined when test with unit test before
export function groupTransactionsByMonth(transactions) {
	return transactions.reduce((groups, transaction) => {
		const date = new Date(transaction.date); // we need to sue this to prevent the undefined
		const monthYear = `${date.toLocaleString("default", {
			month: "short",
		})} ${date.getFullYear()}`;

		if (!groups[monthYear]) {
			groups[monthYear] = [];
		}

		groups[monthYear].push(transaction);

		return groups;
	}, {});
}

// Function to sort transactions by date in descending order
export function sortTransactionsByDate(monthSections) {
	Object.keys(monthSections).forEach((month) => {
		monthSections[month].sort((a, b) => {
			const dateA = new Date(a.date);
			const dateB = new Date(b.date);
			return dateB - dateA;
		});
	});
	return monthSections;
}

// Function to filter transactions based on the search term and field
export function filterTransactions(flatTransactions, searchTerm, searchField) {
	return flatTransactions.filter(
		(transaction) =>
			// Check if the search field is payer or payee and if the search term is included in the field
			transaction[searchField] &&
			transaction[searchField]
				.toLowerCase()
				.includes(searchTerm.toLowerCase())
	);
}

// Function to group filtered transactions by month and year after filtering
export function groupFilteredTransactionsByMonth(filteredTransactions) {
	return filteredTransactions.reduce((groups, transaction) => {
		const date = new Date(transaction.date);
		// we are using en-US locale but this can be change
		const month = date.toLocaleString("en-US", {
			month: "long",
			year: "numeric",
		});

		// If the month doesn't exist in the groups object, create an empty array
		if (!groups[month]) {
			groups[month] = [];
		}

		groups[month].push(transaction);

		return groups;
	}, {}); // initial value is an empty object
}

// History component
const History = ({ transactions, sudoUser }) => {
	// Use the theme hook to get the current theme
	const theme = useTheme();
	//console.log("his:", transactions);

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

	// Flatten the transactions object
	const flatTransactions = flattenTransactions(transactions);

	// Filter the transactions based on the search term and field
	const filteredTransactions = filterTransactions(
		flatTransactions,
		searchTerm,
		searchField
	);

	// Group the filtered transactions by month and year
	const transactionsByMonth =
		groupFilteredTransactionsByMonth(filteredTransactions);

	return (
		<Card
			sx={{
				//ai-gen (ChatGPT-4.0, 1)
				background: theme.palette.background.paper,
				borderRadius: "16px",
				color: theme.palette.text.primary,
				overflow: "hidden",
				fontFamily: "Radley",
				// ai-gen end
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
					fontFamily: "Radley",
				}}
			>
				<Box
					display="flex"
					justifyContent="space-between"
					alignItems="center"
					mb={2}
					fontFamily="Radley"
					sx={{ fontFamily: "Radley" }}
				>
					<Typography
						variant="h6"
						align="left"
						fontFamily="Radley"
						sx={{ fontFamily: "Radley" }}
					>
						History
					</Typography>

					<Box
						display="flex"
						width="100%"
						justifyContent={"right"}
						fontFamily="Radley"
						sx={{ fontFamily: "Radley" }}
					>
						<Box
							width={150}
							marginRight={2}
							marginLeft={2}
							fontFamily="Radley"
							sx={{ fontFamily: "Radley" }}
						>
							{/* Search bar */}
							<TextField
								fontFamily="Radley"
								sx={{ fontFamily: "Radley" }}
								fullWidth
								variant="outlined"
								label="Search"
								value={searchTerm}
								onChange={handleSearchChange}
							/>
						</Box>

						{/* Dropdown to select search field */}
						<FormControl fontFamily="Radley">
							<Select
								labelId="search-field-label"
								id="search-field"
								value={searchField}
								onChange={handleSearchFieldChange}
								fontFamily="Radley"
								sx={{ fontFamily: "Radley" }}
							>
								<MenuItem
									fontFamily="Radley"
									sx={{ fontFamily: "Radley" }}
									value="payer"
								>
									Payer
								</MenuItem>
								<MenuItem
									fontFamily="Radley"
									sx={{ fontFamily: "Radley" }}
									value="payee"
								>
									Payee
								</MenuItem>
							</Select>
						</FormControl>
					</Box>
				</Box>
				{/*This will be the list of transactions by month and year
				Paper -> will be the container for the list of transactions
				Accordion -> will be the container for each month and year
				AccordionDetails -> will be the list of transactions for each month and year
				List -> will be the list of transactions
				ListItem -> will be each transaction
				ListItemText -> will be the text for each transaction
				*/}
				{/* ai-gen start (chatGPT 4, 2)*/}
				<Paper
					fontFamily="Radley"
					elevation={3}
					sx={{
						overflow: "auto",
						maxHeight: "calc(100vh - 48px)",
						"&::-webkit-scrollbar": {
							display: "none",
						},
						fontFamily: "Radley",
					}}
				>
					{/* ai-gen end */}
					{Object.keys(transactionsByMonth)
						.sort((a, b) => new Date(b) - new Date(a))
						.map((month) => (
							<Accordion
								key={month}
								fontFamily="Radley"
								sx={{ fontFamily: "Radley" }}
							>
								<AccordionSummary
									fontFamily="Radley"
									sx={{ fontFamily: "Radley" }}
									expandIcon={<ExpandMoreIcon />}
								>
									<Typography
										fontFamily="Radley"
										sx={{ fontFamily: "Radley" }}
									>
										{month}
									</Typography>
								</AccordionSummary>
								<AccordionDetails
									fontFamily="Radley"
									sx={{
										//ai-gen (ChatGPT-4.0, 1)
										maxHeight: "200px",
										overflow: "auto",
										"&::-webkit-scrollbar": {
											display: "none",
											// ai-gen end
										},
										fontFamily: "Radley",
									}}
								>
									<List
										fontFamily="Radley"
										sx={{ fontFamily: "Radley" }}
									>
										{transactionsByMonth[month].map(
											(transaction, index) => (
												// ai-gen start (ChatGPT-4.0, 1)
												<ListItem
													fontFamily="Radley"
													sx={{ fontFamily: "'Radley', serif" }}
													key={`${transaction.id}-${transaction.amount}-${transaction.date}-${index}`}
												>
													{/* ai-gen end */}
													<ListItemText
														fontFamily="Radley"
														sx={{ fontFamily: "'Radley', serif" }}
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
