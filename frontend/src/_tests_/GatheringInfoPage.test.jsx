import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import GatheringInfoPage from '../pages/getting_started/GatheringInfoPage';

const renderGatheringInfoPage = () => 
  render(
    <Router>
      <GatheringInfoPage />
    </Router>
  );

describe("Test for GatheringInfoPage", () => {
  test("renders without crashing", () => {
    renderGatheringInfoPage();
    expect(screen.getByText("Let's plan your next trip together")).toBeInTheDocument();
  });
});
