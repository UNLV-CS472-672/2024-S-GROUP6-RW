import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import ActComponent from '../components/Activities/Activities';

describe('ActComponent', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('fetches and renders selected place details', async () => {
    const mockData = [
      {
        name: 'Trattoria Sora Lella',
        address: 'Via di Ponte Quattro capi, 16, Roma',
        photoReference: 'ATplDJZcnQyEImDYBB-JLU-WOAq-cyoKiFihzFn3oUbKCb0nrdDBsgtQdCz0a6jcDapSy4StYqKPGaST1vGIfO0cTM3uF10IjWtYHptixBRXy6qcWVyO3vEhzmLni4FJ3JGeBbQtlv0FdCyQ9-n0HoeAjLgTdynWocMg82sKKVI3g4N0uTo3',
        rating: 4.1,
        priceLevel: 2,
        lat: 41.890803,
        lng: 12.478021
      },
      {
        name: 'Tiberino Ristorante',
        address: 'Via di Ponte Quattro capi, 18, Roma',
        photoReference: 'ATplDJbbXVjjdbB8-zFbkwp5UaWEn7JbP8W_rtJn6z57l1r1N1Vk3VhXwNP5R_RgRz_tJKAeN7UxQRjrBBUXnH0t9gWUmurr7xGxPHvDkOqCMMsf8bobSRbifJIXmdWpuHUtM1jcWJ9YKci-Z7yd1HS35dPCy8rb8vz6vHaqjOzr0hgo_eTV',
        rating: 4.4,
        priceLevel: 2,
        lat: 41.89072400000001,
        lng: 12.477899
      }
    ];

    //ai GEN used for commenting (chat gbt 3.5, 0)
  
    // Define the fetch mock implementation
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      }),
    );

    render(<ActComponent lat={41.8908} lng={12.4783} />);

    // Wait for the place to be fetched
    await waitFor(() => screen.getByText('Trattoria Sora Lella'));

    // Check that place details are rendered
    expect(screen.getByText('Trattoria Sora Lella')).toBeInTheDocument();

// Check that the correct number of elements with the text 'Price Level: 2' are rendered
    const priceLevelElements = screen.getAllByText('Price Level: 2');   
    expect(priceLevelElements.length).toBe(2); // Adjust this to the expected number of elements

    // Check that the image is rendered with the correct src
    const img = screen.getByAltText('Trattoria Sora Lella');
    expect(img).toBeInTheDocument();
  });
  //end
});