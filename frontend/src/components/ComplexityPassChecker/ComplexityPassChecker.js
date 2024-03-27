export default function ComplexityPassChecker({ value }) {
  // Password must be at least 8 characters long
  const hasMinLength = value.length >= 8;

  // Password must not contain spaces
  const hasNoSpaces = !/\s/.test(value);

  // Password must contain at least one capital letter
  const hasCapitalLetter = /[A-Z]/.test(value);

  // Password must contain at least one number
  const hasNumber = /\d/.test(value);

  // Check if password meets all criteria
  const isPasswordComplex = hasMinLength && hasNoSpaces && hasCapitalLetter && hasNumber;

  // Return true if password is complex, false otherwise
  return isPasswordComplex;
}
