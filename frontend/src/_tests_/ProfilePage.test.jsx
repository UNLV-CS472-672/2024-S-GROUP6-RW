import React from "react";
import { render, screen, act } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom"; // Import MemoryRouter
import userEvent from "@testing-library/user-event";
import ProfilePage from "../pages/profile/ProfilePage";
import { shallow } from "enzyme"

// Import AuthContext and useAuth from the correct paths
import { AuthContext, useAuth } from "../auth/AuthContext";

// Inside your test file, provide a mocked context with the necessary properties
const mockAuthContext = {
  isAuth: true, // or provide a boolean value as per your test scenario
};

// Mock the useAuth hook to return the mocked context
jest.mock("../auth/AuthContext", () => ({
  ...jest.requireActual("../auth/AuthContext"), // Preserve the actual implementation
  useAuth: () => mockAuthContext, // Provide the mocked context
}));

// Mocking the APIManager
jest.mock("../utils/ApiManager", () => ({
  getProfile: jest.fn(),
}));

// Mocking the LocalStorageManager
jest.mock("../utils/LocalStorageManager", () => ({
  getFromLocal: jest.fn(),
}));

// Mock the useLocation hook
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: jest.fn(() => ({
      pathname: '/some/path/testuser',
    })),
  }));

describe("ProfilePage component", () => {
  // Mock data for testing
  const mockProfileData = {
    Username: "testuser",
    About: "%Test user description%1-0-#000000-0",
  };

  // Reset mocks and clear mock calls before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders ProfilePage component without crashing", () => {
    <Router>
      {/* Wrap ProfilePage in MemoryRouter */}
      <ProfilePage />
    </Router>;
  });

  test("renders profile card after data is fetched", async () => {
    // Mock the API response
    require("../utils/ApiManager").getProfile.mockResolvedValue(
      mockProfileData
    );

    render(
      <Router>
        {/* Wrap ProfilePage in MemoryRouter */}
        <ProfilePage />
      </Router>
    );
    await screen.findByText("TESTUSER");

    expect(screen.getByText("TESTUSER")).toBeInTheDocument();
    expect(screen.getByText("Test user description")).toBeInTheDocument();
  });

  test("display pallete button if this is user's profile", async () => {
    // Mock the API response
    require("../utils/ApiManager").getProfile.mockResolvedValue(
      mockProfileData
    );
    // Mock the local storage manager to return a specific username
    jest.spyOn(require("../utils/LocalStorageManager"), "getFromLocal").mockReturnValue("testuser");

    render(
        shallow(<ProfilePage />)
    );
    await screen.findByText("TESTUSER");

    expect(screen.getByText("TESTUSER")).toBeInTheDocument();
    expect(screen.getByText("Test user description")).toBeInTheDocument();

    // Assert that the palette button is displayed
    expect(screen.getByTestId("palette-button")).toBeInTheDocument();
  });

  test("show Alert message when it is set to true by Profile Card", async () => {
    // Mock the necessary dependencies and set up conditions for the alert to be shown
    const mockProfileData = {
      Username: "testuser",
      About: "",
    };
  
    require("../utils/ApiManager").getProfile.mockResolvedValue(
      mockProfileData
    );

    // Mock the location object with pathname containing the username
    const mockLocation = {
        pathname: "/some/path/testuser",
        };

    // Mock the useLocation hook to return the mocked location object
    jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: jest.fn(() => mockLocation),
    }));



    require("../utils/LocalStorageManager").getFromLocal.mockResolvedValue(
        "testuser"
      );

    // Render the ProfilePage component with MemoryRouter
    render(
      <Router>
        <ProfilePage />
      </Router>
    );
  
    // Expect the loading message to be present initially
    expect(screen.getByText("Loading Profile...")).toBeInTheDocument();
  
    // Wait for the loading message to disappear
    await screen.findByText("TESTUSER");
  
    // Expect the ProfileCard to be rendered
    expect(screen.getByText("TESTUSER")).toBeInTheDocument();

    // Simulate a click on the palette button
  userEvent.click(screen.getByTestId("palette-button"));

        // Simulate clicking the palette button
        userEvent.click(screen.getByText("Save"));
  
    // Expect the Alert message to appear
    await screen.findByText("Hello");
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });
});
