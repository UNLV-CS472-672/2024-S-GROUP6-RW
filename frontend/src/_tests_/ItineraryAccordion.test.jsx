import React from 'react';
import { render, screen } from '@testing-library/react';
import ItineraryAccordion from '../components/ItineraryForm/ItineraryAccordion';

describe('ItineraryAccordion', () => {
  test('renders ItineraryAccordion component without crashing', () => {
    render(<ItineraryAccordion day="Day 1" />);
  });

  test('renders the correct day', () => {
    render(<ItineraryAccordion day="Day 1" />);
    expect(screen.getByText('Day 1')).toBeInTheDocument();
  });
});