import React, { useState } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Grid, Card, CardActionArea, CardMedia } from "@mui/material";
import SearchBar from "./SearchTrip";

const currTrip = [
	{
		url: "mchouse.jpg",
		title: "ur moms house",
		link: "/expensesform",
	},
];

const images = [
	{
		url: "/test.jpg",
		title: "Las Vegas",
	},
	{
		url: "/hobbithome.jpg",
		title: "New Zealand",
	},
	{
		url: "seoul.jpg",
		title: "South Korea",
	},
	{
		url: "tokyo.jpg",
		title: "Japan",
	},
	{
		url: "paris.jpg",
		title: "France",
	},
];

export default function ButtonBaseDemo() {
	const [searchCurrent, setSearchCurrent] = useState("");
	const [searchPast, setSearchPast] = useState("");

	const filteredCurrentTrips = currTrip.filter((trip) =>
		trip.title.toLowerCase().includes(searchCurrent.toLowerCase())
	);

	const filteredPastTrips = images.filter((trip) =>
		trip.title.toLowerCase().includes(searchPast.toLowerCase())
	);

	return (
		<div>
			{/*This is for the drop down menu */}
			<Accordion>
				<AccordionSummary expandIcon={<ExpandMoreIcon />}>
					<Box
						display="flex"
						justifyContent="space-between"
						alignItems="center"
						width="100%"
					>
						<h2>Current Trips</h2>
					</Box>
					<SearchBar search={searchCurrent} setSearch={setSearchCurrent} />
				</AccordionSummary>
				<AccordionDetails>
					{/*This is for the grid of images */}
					<Grid container spacing={5}>
						{filteredCurrentTrips.map((trip, index) => (
							<Grid item xs={12} sm={6} md={3} key={index}>
								<Card component={Link} to={trip.link}>
									<CardActionArea>
										<CardMedia
											component="img"
											height="180"
											image={trip.url}
											alt={trip.title}
										/>
										<Box
											component="div"
											sx={{
												position: "absolute",
												top: 0,
												bottom: 0,
												right: 0,
												left: 0,
												display: "flex",
												alignItems: "center",
												justifyContent: "center",
												bgcolor: "black",
												color: "white",
												opacity: 0.6,
											}}
										>
											<Typography variant="h5">
												{trip.title}
											</Typography>
										</Box>
									</CardActionArea>
								</Card>
							</Grid>
						))}
					</Grid>
				</AccordionDetails>
			</Accordion>

			<Accordion>
				<AccordionSummary expandIcon={<ExpandMoreIcon />}>
					<Box
						display="flex"
						justifyContent="space-between"
						alignItems="center"
						width="100%"
					>
						<h2>Past Trips</h2>
					</Box>
					<SearchBar search={searchPast} setSearch={setSearchPast} />
				</AccordionSummary>
				<AccordionDetails>
					<Grid container spacing={2}>
						{filteredPastTrips.map((trip, index) => (
							<Grid item xs={12} sm={6} md={3} key={index}>
								<Card component={Link} to={trip.link}>
									<CardActionArea>
										<CardMedia
											component="img"
											height="180"
											image={trip.url}
											alt={trip.title}
											style={{ position: "relative" }}
										/>
										<Box
											component="div"
											sx={{
												position: "absolute",
												top: 0,
												bottom: 0,
												right: 0,
												left: 0,
												display: "flex",
												alignItems: "center",
												justifyContent: "center",
												bgcolor: "black",
												color: "white",
												opacity: 0.6,
											}}
										>
											<Typography variant="h5">
												{trip.title}
											</Typography>
										</Box>
									</CardActionArea>
								</Card>
							</Grid>
						))}
					</Grid>
				</AccordionDetails>
			</Accordion>
		</div>
	);
}
