// src\App.js
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";

// Import your page components
import GettingStartedPage from "./pages/getting_started/GettingStartedPage";
import MapPage from "./pages/map/MapPage";
import ItineraryPage from "./pages/itinerary/ItineraryPage";
import ExpensesPage from "./pages/expenses/ExpensesPage";
import MyTripsPage from "./pages/my_trips/MyTripsPage";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";

// import nav components
import NavBar from "./components/NavBar/NavBar";
import ToggleColorMode from "./components/NavBar/ToggleTheme";

// import theme and stuff to deal with toggle
import { useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";

function App() {
	// hard code for testing as we not have databse/back end yet
	const [user, setUser] = useState(null);

	const toggleUser = () => {
		if (user) {
			setUser(null); // log out simulation
		} else {
			setUser({
				id: 1,
				username: "test User 1",
				email: "testUser1@example.com",
			}); // some fake user
		}
	};

	return (
		// Wrap the app in the ToggleColorMode component so that the theme can be toggled
		<ToggleColorMode>
			<button onClick={toggleUser}>{user ? "Log out" : "Log in"}</button>
			<AppContent user={user} />
			{/*Add some button to test the user by simulate log out*/}
		</ToggleColorMode>
	);
}

function AppContent({ user }) {
	// Get the current theme
	const theme = useTheme();

	//these 2 will make reload browser go to home page
	// but I comment it out for sake of testing easier
	//const navigate = useNavigate();
	//const [hasNavigated, setHasNavigated] = useState(false);

	// Apply the background color to the body element
	useEffect(() => {
		// Apply the background color to the body element
		document.body.style.backgroundColor = theme.palette.background.default;
		/*if (!hasNavigated) {
			// Navigate to the home page when the app first loads and when we click reload
			navigate("/");
			setHasNavigated(true);
		}*/
		// add naviagte and hasNavigated to the dependency array if you want to use it
	}, [theme.palette.background.default]);

	return (
		// Apply the theme to the app
		<div className="App" style={{ color: theme.palette.text.primary }}>
			<NavBar user={user} />
			<Routes>
				<Route path="/" element={<GettingStartedPage />} />
				<Route path="/map" element={<MapPage />} />
				<Route path="/itinerary" element={<ItineraryPage />} />
				<Route path="/expenses" element={<ExpensesPage />} />
				<Route path="/my-trips" element={<MyTripsPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
			</Routes>
		</div>
	);
}

export default App;
