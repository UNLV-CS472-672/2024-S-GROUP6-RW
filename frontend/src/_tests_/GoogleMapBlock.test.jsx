import React from 'react';
import { render } from '@testing-library/react';
import GoogleMapBlock from '../components/GoogleMapBlock/GoogleMapBlock';
describe('GoogleMapBlock Component', () => {
  test('renders without crashing', () => {
    render(<GoogleMapBlock />);
  });

  test('renders a Google Map', () => {
    const { container } = render(<GoogleMapBlock />);
    const googleMapElement = container.querySelector('.google-map'); // Having some issues
    expect(googleMapElement).toBeInTheDocument();
  });
});

