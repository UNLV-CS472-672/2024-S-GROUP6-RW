import React from 'react';
import { render, screen } from '@testing-library/react';
import FriendsPage from '../pages/friends/FriendsPage';



describe('FriendsPage', () => {
  // Test to check if the FriendsPage renders without crashing
  it('renders without crashing', () => {
    render(<FriendsPage />);
    expect(screen.getByText('Friends')).toBeInTheDocument();
  });

  // Test to ensure the FriendList component is included
  it('includes the FriendList component', () => {
    render(<FriendsPage />);
    expect(screen.getByText('Mocked Friend List')).toBeInTheDocument();
  });

  // Test to check if the friends header is correct
  it('displays the correct header', () => {
    render(<FriendsPage />);
    expect(screen.getByText('Friends')).toBeInTheDocument();
    expect(screen.getByText('Friends').tagName).toBe('P');
  });
});

