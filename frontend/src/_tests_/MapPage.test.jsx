import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import MapPageTemp from '../pages/map/MapPage';

// Helper function to setup tests with router context
const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(ui, { wrapper: MemoryRouter });
};

describe('MapPageTemp', () => {
  it('renders the map and activity components with valid lat and lng parameters', () => {
    renderWithRouter(<Route path="/map"><MapPageTemp /></Route>, { route: '/map?lat=36.1173&lng=-115.1761' });

    expect(screen.getByText('100vh')).toBeInTheDocument(); // Mocked text from GoogleMapBlock
    expect(screen.getByText('100vw')).toBeInTheDocument(); // Mocked text from GoogleMapBlock
    expect(screen.getByRole('img')).toBeInTheDocument(); // Assuming GoogleMapBlock renders an image/map
    expect(screen.getByText(/activities/i)).toBeInTheDocument(); // Mocked text from ActComponent
  });

  it('renders an error message when invalid lat and lng parameters are provided', () => {
    renderWithRouter(<Route path="/map"><MapPageTemp /></Route>, { route: '/map?lat=abc&lng=xyz' });

    expect(screen.getByText('Invalid coordinates provided in the URL')).toBeInTheDocument();
    expect(screen.queryByText('100vh')).not.toBeInTheDocument(); // Mocked text from GoogleMapBlock
    expect(screen.queryByText('100vw')).not.toBeInTheDocument(); // Mocked text from GoogleMapBlock
    expect(screen.queryByText(/activities/i)).not.toBeInTheDocument(); // Mocked text from ActComponent
  });

});

