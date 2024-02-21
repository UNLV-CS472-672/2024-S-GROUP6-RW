import React, { useState, useContext } from "react";
import {
	AppBar,
	Box,
	Toolbar,
	IconButton,
	Typography,
	Menu,
	MenuItem,
	Avatar,
	Button,
	Tooltip,
	useTheme,
} from "@mui/material";
import {
	Menu as MenuIcon,
	Adb as AdbIcon,
	Brightness4 as Brightness4Icon,
	Brightness7 as Brightness7Icon,
} from "@mui/icons-material";
import { ColorModeContext } from "./ToggleTheme";
import { Link } from "react-router-dom";

const pages = [
	"Expenses",
	"Getting-Started",
	"Itinerary",
	"Map",
	"My-Trips",
	"Login",
	"Register",
];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function ResponsiveAppBar() {
	const [anchorElNav, setAnchorElNav] = useState(null);
	const [anchorElUser, setAnchorElUser] = useState(null);
	const theme = useTheme();
	const colorMode = useContext(ColorModeContext);

	const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
	const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
	const handleCloseNavMenu = () => setAnchorElNav(null);
	const handleCloseUserMenu = () => setAnchorElUser(null);

	const renderMenuItems = (items, handleClose) =>
		items.map((item) => (
			<MenuItem key={item} onClick={handleClose}>
				<Typography textAlign="center">{item}</Typography>
			</MenuItem>
		));

	return (
		<AppBar position="static">
			<Box maxWidth="xl" component={Toolbar} disableGutters>
				<AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
				<Typography
					variant="h6"
					noWrap
					component={Link}
					to="/"
					href="#app-bar-with-responsive-menu"
					sx={{
						mr: 2,
						display: { xs: "none", md: "flex" },
						fontFamily: "monospace",
						fontWeight: 700,
						letterSpacing: ".3rem",
						color: "inherit",
						textDecoration: "none",
					}}
				>
					LOGO
				</Typography>
				<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
					<IconButton
						size="large"
						aria-label="account of current user"
						aria-controls="menu-appbar"
						aria-haspopup="true"
						onClick={handleOpenNavMenu}
						color="inherit"
					>
						<MenuIcon />
					</IconButton>
					<Menu
						id="menu-appbar"
						anchorEl={anchorElNav}
						anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
						keepMounted
						transformOrigin={{ vertical: "top", horizontal: "left" }}
						open={Boolean(anchorElNav)}
						onClose={handleCloseNavMenu}
						sx={{
							display: {
								xs: "block",
								md: "none",
								textDecoration: "none",
							},
						}}
					>
						{renderMenuItems(pages, handleCloseNavMenu)}
					</Menu>
				</Box>
				<AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
				<Typography
					variant="h5"
					noWrap
					component="a"
					href="#app-bar-with-responsive-menu"
					sx={{
						mr: 2,
						display: { xs: "flex", md: "none" },
						flexGrow: 1,
						fontFamily: "monospace",
						fontWeight: 700,
						letterSpacing: ".3rem",
						color: "inherit",
						textDecoration: "none",
					}}
				>
					LOGO
				</Typography>

				{/* Add link to pages*/}
				<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
					{pages.map((page) => (
						<Link
							to={`/${page.toLowerCase().replace(" ", "")}`}
							key={page}
							sx={{ textDecoration: "none" }}
						>
							<Button
								onClick={handleCloseNavMenu}
								sx={{ my: 2, color: "white", display: "block" }}
							>
								{page}
							</Button>
						</Link>
					))}
				</Box>

				{/* Add theme color toggle */}
				<IconButton
					onClick={colorMode.toggleColorMode}
					color="inherit"
					sx={{ mr: 1 }}
				>
					{theme.palette.mode === "dark" ? (
						<Brightness7Icon />
					) : (
						<Brightness4Icon />
					)}
				</IconButton>

				<Box sx={{ flexGrow: 0 }}>
					<Tooltip title="Open settings">
						<IconButton onClick={handleOpenUserMenu} sx={{ p: 0, mr: 1 }}>
							<Avatar
								alt="Remy Sharp"
								src="/static/images/avatar/2.jpg"
							/>
						</IconButton>
					</Tooltip>
					<Menu
						sx={{ mt: "45px" }}
						id="menu-appbar"
						anchorEl={anchorElUser}
						anchorOrigin={{ vertical: "top", horizontal: "right" }}
						keepMounted
						transformOrigin={{ vertical: "top", horizontal: "right" }}
						open={Boolean(anchorElUser)}
						onClose={handleCloseUserMenu}
					>
						{renderMenuItems(settings, handleCloseUserMenu)}
					</Menu>
				</Box>
			</Box>
		</AppBar>
	);
}

export default ResponsiveAppBar;
