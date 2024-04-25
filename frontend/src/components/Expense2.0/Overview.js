import React from "react";
import { Box, Grid, Card, CardContent, Typography } from "@mui/material";

// Overview card component

// Card component -> responsible for displaying the overview card
const OverviewCard = ({ title, amount, color }) => (
	<Card
		sx={{
			minWidth: 200,
			background: color,
			borderRadius: "15px",
			margin: 1,
			fontFamily: "Radley",
		}}
	>
		<CardContent>
			<Typography
				sx={{
					fontSize: 14,
					color: "text.secondary, fontFamily: 'Radley'",
					fontWeight: 500,
				}}
				gutterBottom // adds space at the bottom of the text
			>
				{title}
			</Typography>

			<Typography
				variant="h4" // use this to change the boldness of the text of the $$
				component="div"
				sx={{
					color: "text.primary",
					fontFamily: "Radley",
					fontWeight: 500,
				}}
			>
				${amount}
			</Typography>
		</CardContent>
	</Card>
);

function Overview({ totalSpend, totalOwe, totalGetBack }) {
	// this will take the data that pass in the expense dash board and update the overview card
	const cards = [
		{
			title: "Group Total:",
			amount: totalSpend.toFixed(2),
			color: "primary.main",
		},
		{
			title: "You owe:",
			amount: totalOwe.toFixed(2),
			color: "secondary.main",
		},
		{
			title: "You get back:",
			amount: totalGetBack.toFixed(2),
			color: "success.main",
		},
	];

	return (
		<Box
			sx={{
				flexGrow: 1,
				color: "text.primary",
				fontFamily: "Radley",
				backgroundColor: "background.default",
				padding: 1,
				marginLeft: -1,
			}}
		>
			{/* If scalling is not work, adjust the xs, sm, md, lg as this responsible for scalling */}
			<Grid container spacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
				{cards.map((card, index) => (
					<Grid item xs={12} sm={6} md={6} lg={4} key={index}>
						<OverviewCard {...card} />
					</Grid>
				))}
			</Grid>
		</Box>
	);
}

export default Overview;
