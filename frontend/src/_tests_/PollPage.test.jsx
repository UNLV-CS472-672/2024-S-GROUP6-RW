import React from 'react';
import { render } from '@testing-library/react';
import PollPage from '../pages/getting_started/PollPage';
import DateAvailability from '../../components/GatheringInfo/DateAvailability';

// Mock the DateAvailability component
jest.mock('../../components/GatheringInfo/DateAvailability', () => () => <div>DateAvailabilityMock</div>);

it('renders the header text correctly', () => {
    const { getByText } = render(<PollPage />);
    expect(getByText('What days are you available?')).toBeInTheDocument();
  });

  it('renders the poll page with correct class names', () => {
    const { getByText, container } = render(<PollPage />);
    const pollDiv = container.querySelector('.poll-div');
    expect(pollDiv).toBeInTheDocument();
    expect(pollDiv).toContainElement(getByText('What days are you available?'));
  });

  it('includes the DateAvailability component', () => {
    const { getByText } = render(<PollPage />);
    expect(getByText('DateAvailabilityMock')).toBeInTheDocument(); // This checks that our mocked DateAvailability component is rendered
  });
  