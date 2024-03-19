
/*
# useAuth Hook

The `useAuth` hook is designed to manage authentication state across your React application. 
It provides methods to log in, log out, and check if the user is currently authenticated. 
It also provides access to the current authentication token.

# Return Value

The hook returns an object containing:

- `isAuth`: A boolean indicating whether the user is authenticated.
- `login(token)`: A function to log in the user by saving the authentication token and setting `isAuth` to `true`.
- `logout()`: A function to log out the user by removing the authentication token and setting `isAuth` to `false`.
- `token`: The current authentication token if the user is logged in, or `null` otherwise.

# Importing Hooks
const { isAuth, login, logout } = useAuth();

*/

// useAuth.js
import { useState, useEffect } from 'react';
import * as authService from './authService';

const useAuth = () => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    setIsAuth(authService.isAuthenticated());
  }, []);

  return {
    isAuth,
    login: (token) => {
      authService.saveToken(token);
      setIsAuth(true);
    },
    logout: () => {
      authService.removeToken();
      setIsAuth(false);
    },
    token: authService.getToken(),
  };
};

export default useAuth;
