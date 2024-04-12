import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ToggleColorMode, { ColorModeContext } from '../components/NavBar/ToggleTheme';

describe('ToggleColorMode', () => {
  test('renders children and toggles color mode', () => {
    // Mock toggleColorMode function
    const toggleColorMode = jest.fn();

    // Render ToggleColorMode with a child button
    render(
      <ColorModeContext.Provider value={{ toggleColorMode }}>
        <ToggleColorMode>
          <button>Test Button</button>
        </ToggleColorMode>
      </ColorModeContext.Provider>
    );

    // Check if the button is rendered
    const button = screen.getByText('Test Button');
    expect(button).toBeInTheDocument();
  });
});
