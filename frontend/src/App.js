// src\App.js
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";

// Import page components
import GettingStartedPage from "./pages/getting_started/GettingStartedPage";
import MapPage from "./pages/map/MapPage";
import ItineraryPage from "./pages/itinerary/ItineraryPage";
import GatheringInfoPage from "./pages/getting_started/GatheringInfoPage";
import TripsExpensesPage from "./pages/expenses/TripsExpensesPage";
import MyTripsPage from "./pages/my_trips/MyTripsPage";
import LoginPage from "./pages/Auth_Pages/LoginPage";
import RegisterPage from "./pages/Auth_Pages/RegisterPage";
import LogoutPage from "./pages/Auth_Pages/LogoutPage";
import FriendsPage from "./pages/friends/FriendsPage";
import ProfilePage from "./pages/profile/ProfilePage";
import AccountPage from "./pages/account/AccountPage";

// import nav components
import NavBar from "./components/NavBar/NavBar";

// import theme and stuff to deal with toggle
import React, { useEffect, useState } from "react";
import ExpensesPage from "./pages/expenses/ExpensesPage";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: ["Questrial", "sans-serif"].join(","),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Questrial';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('Questrial'), local('Questrial-Regular'), url(https://fonts.googleapis.com/css2?family=Questrial&display=swap) format('woff2');
        }
      `,
    },
  },
});

function App() {
  const [openSignIn, setOpenSignIn] = useState(false);

  // Apply the background color to the body element
  useEffect(() => {
    // Apply the background color to the body element
    document.body.style.backgroundColor = theme.palette.background.default;
  }, [theme.palette.background.default]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <div className="App" style={{ color: theme.palette.text.primary }}>
          <NavBar />
          <Routes>
            <Route path="/" element={<GettingStartedPage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/gatheringinfo" element={<GatheringInfoPage />} />
            <Route path="/itinerary" element={<ItineraryPage />} />
            <Route path="/expenses" element={<ExpensesPage />} />
            <Route path="/expensesform" element={<ExpensesPage />} />
            <Route path="/my-trips" element={<MyTripsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/friends" element={<FriendsPage />} />
            <Route path="/logout" element={<LogoutPage />} />
          </Routes>
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
