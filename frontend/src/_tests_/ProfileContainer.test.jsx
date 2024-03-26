import React from 'react';
import { render, screen } from '@testing-library/react';
import ProfileContainer from '../components/Profile/ProfileContainer'; // adjust this import as necessary

describe('ProfileContainer', () => {
  test('renders ProfileContainer component without crashing', () => {
    render(<ProfileContainer />);
  });

  test('renders the correct username', () => {
    render(<ProfileContainer />);
    expect(screen.getByText('USERNAME')).toBeInTheDocument();
  });
});