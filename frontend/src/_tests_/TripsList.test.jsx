import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import TripsList from "../components/ExpensesTripStuff/TripsList" // adjust this import as necessary

describe('TripsList', () => {
  test('renders TripsList component without crashing', () => {
    render(<Router><TripsList /></Router>);
  });

  test('renders the correct title for the trip', () => {
    render(<Router><TripsList /></Router>);
    expect(screen.getByText('ur moms house')).toBeInTheDocument();
  });
});