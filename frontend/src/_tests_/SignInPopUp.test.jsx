import React from "react";
import { render, fireEvent } from "@testing-library/react";
import SignInPopUp from "../components/GatheringInfo/SignInPopUp";
import * as LocalStorageManager from "../utils/LocalStorageManager";
import { useNavigate } from "react-router-dom";

// Mock necessary imports
jest.mock("../utils/LocalStorageManager", () => ({
  getFromLocal: jest.fn(),
}));
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));
jest.mock("../components/login-register/SignInDialog", () => ({ open }) => (
  <div>SignInDialog Mock - Open: {open.toString()}</div>
));

it("should open the dialog when the open prop is true", () => {
  const handleClose = jest.fn();
  const { getByText } = render(
    <SignInPopUp open={true} handleClose={handleClose} />
  );
  expect(
    getByText(/would you like to sign in to save your data?/i)
  ).toBeInTheDocument();
});

it("should call handleClose when the dialog is requested to be closed", () => {
  const handleClose = jest.fn();
  const { getByRole } = render(
    <SignInPopUp open={true} handleClose={handleClose} />
  );
  fireEvent.click(getByRole("button", { name: /continue/i }));
  expect(handleClose).toHaveBeenCalled();
});

it("should open SignInDialog when Sign In button is clicked", () => {
  const handleClose = jest.fn();
  const { getByRole, getByText } = render(
    <SignInPopUp open={true} handleClose={handleClose} />
  );
  fireEvent.click(getByRole("button", { name: /sign in/i }));
  expect(getByText("SignInDialog Mock - Open: true")).toBeInTheDocument();
  expect(handleClose).toHaveBeenCalledTimes(1);
});

it("should navigate to map page with coordinates from local storage when Continue is clicked", () => {
  const handleClose = jest.fn();
  const navigate = jest.fn();
  useNavigate.mockReturnValue(navigate);
  LocalStorageManager.getFromLocal.mockReturnValue({ lat: "123", lon: "456" });

  const { getByRole } = render(
    <SignInPopUp open={true} handleClose={handleClose} />
  );
  fireEvent.click(getByRole("button", { name: /continue/i }));

  expect(handleClose).toHaveBeenCalledTimes(1);
  expect(navigate).toHaveBeenCalledWith("/map?lat=123&lng=456");
});
