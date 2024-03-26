import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ColorModeContext } from '../components/NavBar/ToggleTheme'; // adjust this import as necessary
import NavBar from '../components/NavBar/NavBar'; // adjust this import as necessary

describe('NavBar', () => {
  test('renders NavBar component without crashing', () => {
    render(
      <ColorModeContext.Provider value="light">
        <NavBar />
      </ColorModeContext.Provider>
    );
  });

  test('opens the user menu when the user menu button is clicked', () => {
    const { getByTestId } = render(
      <ColorModeContext.Provider value="light">
        <NavBar />
      </ColorModeContext.Provider>
    );

    fireEvent.click(getByTestId('user-menu-button'));

    expect(getByTestId('user-menu')).toBeVisible();
  });
});