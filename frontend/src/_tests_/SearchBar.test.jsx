import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SearchBar from '../components/GatheringInfo/SearchBar';

describe('SearchBar Component', () => {
  // Test case to check if the SearchBar component renders without crashing
  test('renders without crashing', () => {
    render(<SearchBar LocationNameKey="location" />);
  });

  // Test case to check if the query state updates correctly on input change
  test('updates query state on input change', () => {
    // Render the SearchBar component
    const { getByPlaceholderText } = render(<SearchBar LocationNameKey="location" />);
    // Find the input element by placeholder text
    const inputElement = getByPlaceholderText('Enter destination..');
    // Simulate change event by typing 'New York' into the input field
    fireEvent.change(inputElement, { target: { value: 'New York' } });
    // Assert that the input value matches the expected value 'New York'
    expect(inputElement.value).toBe('New York');
  });
});

