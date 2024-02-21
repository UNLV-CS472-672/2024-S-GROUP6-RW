// src\App.js
import "./App.css";
import { Routes, Route } from "react-router-dom";

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
import React, { useEffect } from "react";

function App() {
	return (
		<ToggleColorMode>
			<AppContent />
		</ToggleColorMode>
	);
}

function AppContent() {
	const theme = useTheme();

	useEffect(() => {
		// Apply the background color to the body element
		document.body.style.backgroundColor = theme.palette.background.default;
	}, [theme.palette.background.default]);

	return (
		<div className="App">
			<NavBar />
			<Routes>
				<Route path="/getting-started" element={<GettingStartedPage />} />
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
