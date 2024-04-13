import React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Grid, Card, CardActionArea, CardMedia } from "@mui/material";
//import useAuth from '../../auth/useAuth';
import { Redirect } from "react-router-dom";

const currTrip = [
	{
		url: "mchouse.jpg",
		title: "ur moms house",
		width: "50%",
		height: "50%",
		link: "/expensesform",
	},
];

const images = [
	{
		url: "/test.jpg",
		title: "Las Vegas",
		width: "50%",
		height: "50%",
	},
	{
		url: "hobbithome.jpg",
		title: "New Zealand",
		width: "50%",
		height: "50%",
	},
	{
		url: "seoul.jpg",
		title: "South Korea",
		width: "50%",
		height: "50%",
	},
	{
		url: "tokyo.jpg",
		title: "Japan",
		width: "50%",
		height: "50%",
	},
	{
		url: "paris.jpg",
		title: "France",
		width: "50%",
		height: "50%",
	},
];

export default function ButtonBaseDemo() {
	/*const { isAuth } = useAuth();

	if (!isAuth) {
		return <Redirect to="/login" />;
  	}*/

	return (
		<div>
			{/*This is for the drop down menu */}
			<Accordion>
				<AccordionSummary expandIcon={<ExpandMoreIcon />}>
					<h2>Current Trips</h2>
				</AccordionSummary>
				<AccordionDetails>
					{/*This is for the grid of images */}
					<Grid container spacing={5}>
						{currTrip.map((trip, index) => (
							// ai-gen start (ChatGPT-4.0, 1)
							<Grid item xs={12} sm={6} md={3} key={index}>
								<Card component={Link} to={trip.link}>
									{/* ai-gen end */}
									<CardActionArea>
										<CardMedia
											component="img"
											height="180"
											image={trip.url}
											alt={trip.title}
										/>
										{/* ai-gen start (ChatGPT-4.0, 1) */}
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
											{/* ai-gen end */}
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
					<h2>Past Trips</h2>
				</AccordionSummary>
				<AccordionDetails>
					<Grid container spacing={2}>
						{images.map((trip, index) => (
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
