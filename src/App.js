// src\App.js
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";

// Import your page components
import GettingStartedPage from "./pages/getting_started/GettingStartedPage";
import MapPage from "./pages/map/MapPage";
import ItineraryPage from "./pages/itinerary/ItineraryPage";
import ExpensesPage from "./pages/expenses/ExpensesPage";
import MyTripsPage from "./pages/my_trips/MyTripsPage";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";

function App() {
  return (
    <div className="App">
      <nav>
        <Link to="/getting-started">Getting Started</Link> |
        <Link to="/map">Map</Link> |<Link to="/itinerary">Itinerary</Link> |
        <Link to="/expenses">Expenses</Link> |
        <Link to="/my-trips">My Trips</Link> |<Link to="/login">Login</Link> |
        <Link to="/register">Register</Link>
      </nav>
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
