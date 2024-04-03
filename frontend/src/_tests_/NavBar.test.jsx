import React from 'react';
import { render, screen } from '@testing-library/react';
import { AuthContext } from '../auth/AuthContext'; // adjust this import as necessary
import NavBar from '../components/NavBar/NavBar'; // adjust this import as necessary

describe('NavBar', () => {
  test('renders NavBar component without crashing', () => {
    render(
      <AuthContext.Provider value={{}}>
        <NavBar />
      </AuthContext.Provider>
    );
  });

  test('renders the correct AppBar title', () => {
    render(
      <AuthContext.Provider value={{}}>
        <NavBar />
      </AuthContext.Provider>
    );
    expect(screen.getByText('App Title')).toBeInTheDocument(); // replace 'App Title' with your actual AppBar title
  });
});