import React from 'react';
import { render, act } from '@testing-library/react';
import { AuthProvider, useAuth } from './AuthContext';
import * as authService from './authService';

// Mock the authService to control its behavior
jest.mock('./authService', () => ({
  isAuthenticated: jest.fn(),
  saveToken: jest.fn(),
  removeToken: jest.fn()
}));

// Helper component to access the context values
const ConsumerComponent = () => {
  const { isAuth, login, logout } = useAuth();
  return (
    <div>
      <p data-testid="isAuth">{String(isAuth)}</p>
      <button onClick={() => login('token')}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

it('initializes with the authentication state from authService', () => {
    authService.isAuthenticated.mockReturnValue(false);
    const { getByTestId } = render(
      <AuthProvider>
        <ConsumerComponent />
      </AuthProvider>
    );
    expect(getByTestId('isAuth').textContent).toBe('false');
  });

  it('updates authentication state on login', () => {
    authService.isAuthenticated.mockReturnValue(false);
    const { getByTestId, getByText } = render(
      <AuthProvider>
        <ConsumerComponent />
      </AuthProvider>
    );
    
    act(() => {
      getByText('Login').click();
    });
  
    expect(authService.saveToken).toHaveBeenCalledWith('token');
    expect(getByTestId('isAuth').textContent).toBe('true');
  });
  it('updates authentication state on logout', () => {
    authService.isAuthenticated.mockReturnValue(true);
    const { getByTestId, getByText } = render(
      <AuthProvider>
        <ConsumerComponent />
      </AuthProvider>
    );
  
    act(() => {
      getByText('Logout').click();
    });
  
    expect(authService.removeToken).toHaveBeenCalled();
    expect(getByTestId('isAuth').textContent).toBe('false');
  });
    