import React from 'react';
import { render } from '@testing-library/react';
import RegisterPage from '../pages/Auth_Pages/RegisterPage';
import SignUpForm from '../components/login-register/SignUpForm';

// Mock the SignUpForm to isolate the test to the RegisterPage only
jest.mock('../components/login-register/SignUpForm', () => () => <div>Mock SignUpForm</div>);

it('renders the Register header', () => {
    const { getByText } = render(<RegisterPage />);
    const header = getByText('Register');
  
    expect(header).toBeInTheDocument();
    expect(header.tagName).toBe('H2');
  });
  
  it('renders the SignUpForm component', () => {
    const { getByText } = render(<RegisterPage />);
    const signUpForm = getByText('Mock SignUpForm');
  
    expect(signUpForm).toBeInTheDocument();
  });
  