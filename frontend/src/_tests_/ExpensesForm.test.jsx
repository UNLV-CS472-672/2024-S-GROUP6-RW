import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ExpensesForm from '../components/ExpensesForm/ExpensesForm'; // adjust this import as necessary

describe('ExpensesForm', () => {
  test('renders ExpensesForm component without crashing', () => {
    render(<ExpensesForm />);
  });

  test('adds and removes an expense correctly', () => {
    render(<ExpensesForm />);
    const addButton = screen.getByText(/NEW EXPENSE/i);
    fireEvent.click(addButton);
    expect(screen.getByText(/Add a new expense/i)).toBeInTheDocument();
  });
});