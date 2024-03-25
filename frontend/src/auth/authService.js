// 2024-S-GROUP6-RW\frontend\src\auth\authService.js
const TOKEN_KEY = "jwt";

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const saveToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const isAuthenticated = () => {
  const token = getToken();
  if (token) {
    return true;
  }
  return false;
};
