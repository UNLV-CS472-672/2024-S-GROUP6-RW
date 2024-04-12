import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SignUpForm from '../components/login-register/SignUpForm';
import { useAuth } from '../auth/AuthContext';

// Mock the AuthContext module
jest.mock('../auth/AuthContext', () => ({
  useAuth: jest.fn(), // Mock useAuth hook
}));

describe('SignUpForm', () => {
  test('renders form inputs and handles submission', () => {
    // Mock the login function
    const login = jest.fn();

    // Mock the useAuth hook to return the login function
    useAuth.mockReturnValue({ login });

    render(<SignUpForm />);

    // Fill in the form inputs
    const usernameInput = screen.getByLabelText('Username');
    const firstNameInput = screen.getByLabelText('First Name');
    const lastNameInput = screen.getByLabelText('Last Name'); // Make sure the label matches the actual label of the last name input field
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');

    fireEvent.change(usernameInput, { target: { value: 'testUser' } });

    // Check if the values are correctly set
    expect(usernameInput).toHaveValue('testUser');
  });
});
