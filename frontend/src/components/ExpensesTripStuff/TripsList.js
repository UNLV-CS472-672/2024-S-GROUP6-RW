import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const images = [
	{
		url: "/test.jpg",
		title: "Las Vegas",
		width: "50%",
		height: "50%",
	},
	{
		url: "/hobbithome.jpg",
		title: "New Zealand",
		width: "50%",
		height: "50%",
	},
	{
		url: "mchouse.jpg",
		title: "ur moms house",
		width: "50%",
		height: "50%",
		link: "/expensesform",
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

const ImageButton = styled(ButtonBase)(({ theme }) => ({
	position: "relative",
	height: "100%",
	margin: "35px", // Add margin to create space between buttons
	minWidth: "50%",
	[theme.breakpoints.down("sm")]: {
		width: "100% !important", // Overrides inline-style
		height: "100%",
	},
	"&:hover, &.Mui-focusVisible": {
		zIndex: 1,
		"& .MuiImageBackdrop-root": {
			opacity: 0.15,
		},
		"& .MuiImageMarked-root": {
			opacity: 0,
		},
		"& .MuiTypography-root": {
			border: "4px solid currentColor",
		},
	},
}));

//fill the image to the button container
const ImageSrc = styled("span")({
	position: "absolute",
	left: 3,
	right: 3,
	top: 3,
	bottom: 3,
	backgroundSize: "cover",
	backgroundPosition: "center 40%",
});

const Image = styled("span")(({ theme }) => ({
	position: "absolute",
	left: 0,
	right: 0,
	top: 0,
	bottom: 0,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	color: theme.palette.common.white,
}));

//hover over effect
const ImageBackdrop = styled("span")(({ theme }) => ({
	position: "absolute",
	left: 0,
	right: 0,
	top: 0,
	bottom: 0,
	backgroundColor: theme.palette.common.black,
	opacity: 0.4,
	transition: theme.transitions.create("opacity"),
}));

const ImageMarked = styled("span")(({ theme }) => ({
	height: 3,
	width: 18,
	backgroundColor: theme.palette.common.white,
	position: "absolute",
	bottom: -2,
	left: "calc(50% - 9px)",
	transition: theme.transitions.create("opacity"),
}));

export default function ButtonBaseDemo() {
	const scrollContainerRef = useRef();

	const scroll = (scrollOffset) => {
		scrollContainerRef.current.scrollLeft += scrollOffset;
	};

	return (
		<div style={{ position: "relative", width: "100%" }}>
			<Button
				onClick={() => scroll(-300)}
				style={{
					position: "absolute",
					left: 0,
					top: "50%",
					transform: "translateY(-50%)",
					zIndex: 2,
				}}
			>
				<ArrowBackIosIcon />
			</Button>
			<Box
				ref={scrollContainerRef}
				sx={{
					display: "flex",
					overflowX: "auto",
					flexWrap: "nowrap",
					minWidth: 300,
					width: "100%",
					height: "500px",
					scrollbarWidth: "none",
					gap: 2,
					"& > *": {
						flexShrink: 0,
						width: "50%",
					},
					"&::-webkit-scrollbar": {
						display: "none",
					},
					"-ms-overflow-style": "none",
					//"scrollbar-width": "none",
				}}
			>
				{images.map((image, index) => (
					<React.Fragment key={index}>
						{image.link ? (
							<Link to={image.link}>
								<ImageButton
									focusRipple
									style={{
										width: "100%",
									}}
								>
									<ImageSrc
										style={{ backgroundImage: `url(${image.url})` }}
									/>
									<ImageBackdrop className="MuiImageBackdrop-root" />
									<Image>
										<Typography
											component="span"
											variant="subtitle1"
											color="inherit"
											sx={{
												position: "relative",
												p: 4,
												pt: 2,
												pb: (theme) =>
													`calc(${theme.spacing(1)} + 6px)`,
											}}
										>
											{image.title}
											<ImageMarked className="MuiImageMarked-root" />
										</Typography>
									</Image>
								</ImageButton>
							</Link>
						) : (
							<ImageButton
								focusRipple
								key={image.title}
								style={{
									width: image.width,
								}}
							>
								<ImageSrc
									style={{ backgroundImage: `url(${image.url})` }}
								/>
								<ImageBackdrop className="MuiImageBackdrop-root" />
								<Image>
									<Typography
										component="span"
										variant="subtitle1"
										color="inherit"
										sx={{
											position: "relative",
											p: 4,
											pt: 2,
											pb: (theme) =>
												`calc(${theme.spacing(1)} + 6px)`,
										}}
									>
										{image.title}
										<ImageMarked className="MuiImageMarked-root" />
									</Typography>
								</Image>
							</ImageButton>
						)}
					</React.Fragment>
				))}
			</Box>
			<Button
				onClick={() => scroll(300)}
				style={{
					position: "absolute",
					right: 0,
					top: "50%",
					transform: "translateY(-50%)",
					zIndex: 2,
				}}
			>
				<ArrowForwardIosIcon />
			</Button>
		</div>
	);
}
