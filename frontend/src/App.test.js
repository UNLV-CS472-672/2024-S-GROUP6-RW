import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import App from './App'; // adjust this import as necessary

describe('App', () => {
  test('renders App component without crashing', () => {
    render(<App />);
  });

  test('toggles the user state when the button is clicked', () => {
    render(<App />);
    const button = screen.getByText(/Log in/i);
    fireEvent.click(button);
    expect(screen.getByText(/Log out/i)).toBeInTheDocument();
    fireEvent.click(button);
    expect(screen.getByText(/Log in/i)).toBeInTheDocument();
  });
});