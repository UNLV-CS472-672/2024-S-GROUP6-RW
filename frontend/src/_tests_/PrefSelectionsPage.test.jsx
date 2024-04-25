import React from 'react';
import { render, screen } from '@testing-library/react';
import PrefSelectionPage from '../pages/getting_started/PrefSelectionsPage';

describe('PrefSelectionPage', () => {
  test('renders the preference selection and date availability sections correctly', () => {
    render(<PrefSelectionPage />);

    // Check for the presence of headings
    expect(screen.getByText('What are you interested in?')).toBeInTheDocument();
    expect(screen.getByText('What are your availabilities?')).toBeInTheDocument();

    // Check if PrefButtons is rendered
    expect(screen.getByText('Preferences')).toBeInTheDocument(); // Assuming PrefButtons renders this text

    // Check if DateAvailability is rendered
    expect(screen.getByText('Calendar')).toBeInTheDocument(); // Assuming DateAvailability renders this text
  });

});
