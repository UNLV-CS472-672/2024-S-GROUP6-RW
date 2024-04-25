import React from 'react';
import { render } from '@testing-library/react';
import LoginPage from '../pages/Auth_Pages/LoginPage';
import SignInDialog from '../components/login-register/SignInDialog';

// Mock the SignInDialog to isolate the test to the LoginPage only
jest.mock('../components/login-register/SignInDialog', () => (props) => (
  <div>
    Mock SignInDialog - Open: {props.open.toString()}, From Getting Started Page: {props.fromGettingStartedPage.toString()}
  </div>
));

it('renders SignInDialog with correct props', () => {
    const { getByText } = render(<LoginPage />);
    const signInDialog = getByText(/mock signindialog/i); // Use a regular expression for case-insensitive matching
  
    expect(signInDialog).toBeInTheDocument();
    expect(signInDialog).toHaveTextContent('Open: true');
    expect(signInDialog).toHaveTextContent('From Getting Started Page: false');
  });
  