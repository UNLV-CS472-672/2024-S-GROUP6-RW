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
import { ColorModeContext } from "../../components/NavBar/ToggleTheme";
import { Link } from "react-router-dom";

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
  //console.log("Color Mode Context:", colorMode);

  // handle the open and close of the menu
  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  // pages that we will use In general
  const generalPages = ["About Us", "How it works"];
  // settings that we will use for user
  const authPages = [
    "My Trips",
    "Itinerary",
    "Expenses",
    "Map",
    "Friends",
    "Profile",
    "Account",
    "Dashboard",
    "Logout",
  ];

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
    <AppBar
      position="fixed"
      sx={{
        background:
          "linear-gradient( rgba(155, 155, 155, 1.0)10%, rgba(0, 0, 0, 0))",
        boxShadow: "none",
        fontFamily: "'Radley', serif",
      }}
    >
      {/* Container and Toolbar allows the Navbar to be responsive*/}
      <Container maxWidth="x1">
        <Toolbar disableGutters>
          {/*<AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />*/}
          {/*<img src="newlogo.jpg" />*/}
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            href="#app-bar-with-responsive-menu"
            sx={{
              ml: 3,
              mr: 4,
              display: { xs: "none", md: "flex" },
              fontFamily: "'Radley', serif",
              color: "black",
              textDecoration: "none",
            }}
          >
            RightWay
          </Typography>

          {/* Add 3 lines menu for the responsive */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="black"
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
              {/*renderMenuItems(pages, handleCloseNavMenu)*/}
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
              fontFamily: "'Radley', serif",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "black",
              textDecoration: "none",
            }}
          >
            RightWay
          </Typography>

          {/* Add link to pages for normal display*/}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex", ml: "auto" },
            }}
          >
            {(isAuth ? authPages : generalPages).map((page) => (
              <Link
                to={`/${page.toLowerCase().replace(/\s+/g, "-")}`}
                key={page}
                style={{ textDecoration: "none", marginRight: "2px"}}
              >
                <Button sx={{ textTransform: "none", my: 2, mr: 3, color: "white", display: "block", fontFamily: "Radley", fontSize: "15px"}}>
                  {page}
                </Button>
              </Link>
            ))}
          </Box>

          {/* Add theme color toggle */}
          <IconButton
            onClick={colorMode.toggleColorMode}
            color="black"
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
                display: { xs: "flex", md: "flex", ml: "auto" },
              }}
            >
              <Button
                sx={{
                  textTransform: "none",
                  my: 2,
                  fontFamily: "Radley",
                  color: "black",
                  display: "block",
                }}
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
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {renderMenuItems(authPages, handleCloseUserMenu)}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
