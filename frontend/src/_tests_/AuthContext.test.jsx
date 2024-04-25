import React from 'react';
import { render, act } from '@testing-library/react';
import { AuthProvider, useAuth } from '../auth/AuthContext';
import * as authService from '../auth/authService';

// Mock the authService to control its behavior
jest.mock('../auth/authService', () => ({
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

describe('useEffect behavior', () => {
    // Mock for adding and removing event listeners
    beforeEach(() => {
      jest.spyOn(window, 'addEventListener');
      jest.spyOn(window, 'removeEventListener');
    });
  
    afterEach(() => {
      jest.restoreAllMocks();
    });
  
    it('sets up and cleans up an authentication listener', () => {
      const { unmount } = render(
        <AuthProvider>
          <ConsumerComponent />
        </AuthProvider>
      );
  
      // Assuming the listener is for 'storage' event
      expect(window.addEventListener).toHaveBeenCalledWith('storage', expect.any(Function));
  
      // Cleanup on component unmount
      unmount();
  
      expect(window.removeEventListener).toHaveBeenCalledWith('storage', expect.any(Function));
    });
  });

  it('responds to external auth state changes', () => {
    authService.isAuthenticated.mockReturnValue(false);
    const { getByTestId } = render(
      <AuthProvider>
        <ConsumerComponent />
      </AuthProvider>
    );
  
    // Simulate external change leading to auth state change
    authService.isAuthenticated.mockReturnValue(true);
    act(() => {
      // Simulate an event that would trigger the handler
      window.dispatchEvent(new Event('storage'));
    });
  
    expect(getByTestId('isAuth').textContent).toBe('true');
  });
  
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

  it('handles errors during login gracefully', () => {
    authService.saveToken.mockImplementation(() => { throw new Error('Failed to save token'); });
    const { getByText } = render(
      <AuthProvider>
        <ConsumerComponent />
      </AuthProvider>
    );
  
    expect(() => {
      act(() => {
        getByText('Login').click();
      });
    }).not.toThrow();
  });

  it('useAuth returns the correct auth state', () => {
    authService.isAuthenticated.mockReturnValue(true);
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });
  
    expect(result.current.isAuth).toBe(true);
    expect(typeof result.current.login).toBe('function');
    expect(typeof result.current.logout).toBe('function');
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
    