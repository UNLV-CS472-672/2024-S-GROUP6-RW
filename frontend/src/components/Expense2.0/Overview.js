import React from "react";
import { Box, Grid, Card, CardContent, Typography } from "@mui/material";

// This is a reusable card component that takes in title, amount, and color as props
const OverviewCard = ({ title, amount, color }) => (
	<Card sx={{ minWidth: 220, background: color, borderRadius: "16px" }}>
		<CardContent>
			<Typography
				sx={{ fontSize: 14, color: "text.secondary" }}
				gutterBottom
			>
				{title}
			</Typography>
			<Typography
				variant="h5"
				component="div"
				sx={{ color: "text.primary" }}
			>
				${amount}
			</Typography>
		</CardContent>
	</Card>
);

function Overview({ totalSpend, totalOwe, totalGetBack }) {
	const cards = [
		{
			title: "Total spend",
			amount: totalSpend.toFixed(2),
			color: "primary.main",
		},
		{
			title: "You owe",
			amount: totalOwe.toFixed(2),
			color: "secondary.main",
		},
		{
			title: "You get back",
			amount: totalGetBack.toFixed(2),
			color: "success.main",
		},
	];

	return (
		<Box
			sx={{
				flexGrow: 1,
				color: "text.primary",
				backgroundColor: "background.default",
				padding: 2,
				marginLeft: -1,
			}}
		>
			<Grid container spacing={35}>
				{cards.map((card, index) => (
					<Grid item xs={12} sm={6} md={3} key={index}>
						<OverviewCard {...card} />
					</Grid>
				))}
			</Grid>
		</Box>
	);
}

export default Overview;
