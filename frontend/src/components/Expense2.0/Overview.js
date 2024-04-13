import React from "react";
import { Box, Grid, Card, CardContent, Typography } from "@mui/material";

// This is a reusable card component that takes in title, amount, and color as props
const OverviewCard = ({ title, amount, color }) => (
	<Card
		sx={{ minWidth: 220, background: color, borderRadius: "16px", margin: 1 }}
	>
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
				padding: 1,
				marginLeft: -1,
			}}
		>
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
