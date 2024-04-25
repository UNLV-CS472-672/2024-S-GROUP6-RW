import React from 'react';
import { render, screen } from '@testing-library/react';
import MapPageTemp from '../pages/map/MapPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return render(
    <Router>
      <Routes>
        <Route path={route} element={ui} />
      </Routes>
    </Router>
  );
};

describe('MapPageTemp', () => {
  it('renders the component correctly with routing context', () => {
    renderWithRouter(<MapPageTemp />, { route: '/some-route' });

    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByText(/activities/i)).toBeInTheDocument();
  });

  it('renders an error message when invalid lat and lng parameters are provided', () => {
    renderWithRouter(<MapPageTemp />, { route: '/map?lat=abc&lng=xyz' });

    expect(screen.getByText('Invalid coordinates provided in the URL')).toBeInTheDocument();
  });

  it('has correct style properties', () => {
    renderWithRouter(<MapPageTemp />, { route: '/some-route' });
    const mapElement = screen.getByTestId('map-block');
    expect(mapElement.style.height).toBe('100vh');
    expect(mapElement.style.width).toBe('100vw');
  });

  it('checks for specific settings from local storage', () => {
    localStorage.setItem('someSetting', 'someValue');
    renderWithRouter(<MapPageTemp />, { route: '/map?lat=40.7128&lng=-74.0060' });
    
  });
  
});

