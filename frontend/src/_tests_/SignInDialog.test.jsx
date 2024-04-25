// frontend\src\_tests_\SignInDialog.test.jsx

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import SignInDialog from '../components/login-register/SignInDialog';
import axios from 'axios';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

jest.mock('axios');
jest.mock('../auth/AuthContext', () => ({
  useAuth: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('SignInDialog', () => {
  const setup = (open) => render(<SignInDialog open={open} />);

  it('renders correctly when open', () => {
    const { getByText } = setup(true);
    expect(getByText('Sign In')).toBeInTheDocument();
  });

  it('handles input changes', () => {
    const { getByLabelText } = setup(true);
    const emailInput = getByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput.value).toBe('test@example.com');

    const passwordInput = getByLabelText('Password');
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    expect(passwordInput.value).toBe('password123');
  });

  it('submits the form and handles server response', async () => {
    const mockLogin = jest.fn();
    useAuth.mockImplementation(() => ({
      login: mockLogin,
    }));
    axios.post.mockResolvedValue({ data: { token: 'fake_token' } });

    const { getByText } = setup(true);
    const submitButton = getByText('Submit');
    fireEvent.click(submitButton);

    await waitFor(() => expect(axios.post).toHaveBeenCalled());
    expect(mockLogin).toHaveBeenCalledWith('fake_token');
  });

  it('displays error message when submission fails', async () => {
    axios.post.mockRejectedValue({
      response: { data: { error: 'Invalid credentials' } }
    });

    const { getByText } = setup(true);
    fireEvent.click(getByText('Submit'));

    await waitFor(() => expect(getByText('Invalid credentials')).toBeInTheDocument());
  });
});
