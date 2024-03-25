// src\App.js
import "./App.css";
import { Routes, Route } from "react-router-dom";

// Import your page components
import GettingStartedPage from "./pages/getting_started/GettingStartedPage";
import MapPage from "./pages/map/MapPage";
import ItineraryPage from "./pages/itinerary/ItineraryPage";
import TripsExpensesPage from "./pages/expenses/TripsExpensesPage";
import MyTripsPage from "./pages/my_trips/MyTripsPage";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";
import FriendsPage from "./pages/friends/FriendsPage";
import ProfilePage from "./pages/profile/ProfilePage";

// import nav components
import NavBar from "./components/NavBar/NavBar";
import ToggleColorMode from "./components/NavBar/ToggleTheme";

import SignInDialog from "./components/NavBar/SignInDialog";

// import theme and stuff to deal with toggle
import { useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import ExpensesPage from "./pages/expenses/ExpensesPage";
import useAuth from "./auth/useAuth";

function App() {
  const { isAuth } = useAuth()
  // Get the current theme
  const theme = useTheme();
  const [openSignIn, setOpenSignIn] = useState(false);

  // Apply the background color to the body element
  useEffect(() => {
    // Apply the background color to the body element
    document.body.style.backgroundColor = theme.palette.background.default;
  }, [theme.palette.background.default]);
  return (
    // Apply the theme to the app
    <div className="App" style={{ color: theme.palette.text.primary }}>
      <NavBar/>
      <Routes>
        <Route path="/" element={<GettingStartedPage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/itinerary" element={<ItineraryPage />} />
        <Route path="/expenses" element={<ExpensesPage />} />
        <Route path="/expensesform" element={<ExpensesPage />} />
        <Route path="/my-trips" element={<MyTripsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/friends" element={<FriendsPage />} />
      </Routes>
    </div>
  );
}

export default App;
