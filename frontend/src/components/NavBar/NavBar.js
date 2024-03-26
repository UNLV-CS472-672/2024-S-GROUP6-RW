// 2024-S-GROUP6-RW\frontend\src\components\NavBar\NavBar.js

import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import {
  AppBar,
  Box,
  Container,
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

// pages that we will use In general
const pages = ["Expenses", "Itinerary", "Map", "My-Trips", "Friends"];
// settings that we will use for user
const userPages = ["Profile", "Account", "Dashboard", "Logout"];

const props = {
  userDetails: () => {},
};

function ResponsiveAppBar({ user }) {
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  // this is mean that the menu is not open for the 3 lines menu
  const [anchorElNav, setAnchorElNav] = useState(null);
  // this is mean that the menu is not open
  const [anchorElUser, setAnchorElUser] = useState(null);

  // get the current theme
  const theme = useTheme();
  // get the current color mode
  const colorMode = useContext(ColorModeContext);

  // handle the open and close of the menu
  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  // render the menu items
  // items is the array of items that we want to render
  // handleClose is the function that we want to call when we click on the item
  const renderMenuItems = (items, handleClose) =>
    // map the items and return the MenuItem component
    items.map((item) => (
      // key is the item that we want to render and onClick is the function that we want to call when we click on the item
      <MenuItem
        key={item}
        onClick={handleClose}
        component={Link}
        to={`/${item.toLowerCase().replace(" ", "")}`}
      >
        <Typography textAlign="center">{item}</Typography>
      </MenuItem>
    ));

  useEffect(() => {
    console.log(`navbar isAuth: ${isAuth}`);
  }, [isAuth, navigate]);

  return (
    // AppBar is the component that we use to create the app bar
    <AppBar position="static">
      {/* Container and Toolbar allows the Navbar to be responsive*/}
      <Container maxWidth="x1">
        <Toolbar disableGutters>
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

          {/* Add 3 lines menu for the responsive */}
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
              {/*Handle the way it display if user or not in the 3 lines menu*/}
            </Menu>
          </Box>

          {/* AbdIcon means the logo */}
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
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

          {/* Add link to pages for normal display*/}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex", ml: "auto" },
            }}
          >
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

          {/* if the user is logged in then we will show the user pages
            & if not -> display getting started page */}

          {!isAuth ? (
            <Box
              sx={{
                flexGrow: 0,
                display: { xs: "none", md: "flex", ml: "auto" },
              }}
            >
              <Button
                sx={{ my: 2, color: "white", display: "block" }}
                onClick={() => navigate("/login")}
              >
                Sign In
              </Button>
            </Box>
          ) : (
            <Box
              sx={{
                flexGrow: 0,
                display: { xs: "none", md: "flex", ml: "auto" },
              }}
            >
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, mr: 1 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
                {renderMenuItems(userPages, handleCloseUserMenu)}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
