import { isValidEmailAddress, isValidPassword } from './validation'; // Assuming these are the correct paths
global.fetch = jest.fn();

beforeEach(() => {
  fetch.mockClear();
});

test('calls fetch with correct data when email and password are valid', () => {
  const Email = 'test@example.com';
  const Password = 'password123';
  const apiUrl = "http://localhost:8080/signin";
  const userData = { Email, Password };

  // Assuming these functions are synchronous and return true for the provided data
  expect(isValidEmailAddress(Email)).toBe(true);
  expect(isValidPassword(Password)).toBe(true);

  // Call the function that makes the fetch request
  // Replace this with the actual function call
  // signIn(Email, Password);

  expect(fetch).toHaveBeenCalledWith(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
});