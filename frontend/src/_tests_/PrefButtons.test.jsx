import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PrefButtons from "../components/PrefSelect/PrefButtons";
import { BrowserRouter } from "react-router-dom";


const MockPrefButtons = () => (
  <BrowserRouter>
    <PrefButtons />
  </BrowserRouter>
);

it("renders category buttons correctly", () => {
    render(<MockPrefButtons />);
    const categories = [
      "Beaches",
      "Theme Parks",
      "Shopping",
      "Shows",
      "Museums",
    ];
    categories.forEach((category) => {
      expect(screen.getByText(category)).toBeInTheDocument();
    });
  });