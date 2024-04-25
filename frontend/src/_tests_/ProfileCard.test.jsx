import React from "react";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter for routing
import { render, screen, waitFor, fireEvent } from "@testing-library/react"; // Import testing utilities
import ProfileCard from "../components/Profile/ProfileCard"; // Import the ProfileCard component
import userEvent from "@testing-library/user-event"; // Import userEvent for simulating user interactions

/**
 * ChatGPT was used to help teach me how
 * to unit tests certain elements of the profile,
 * such as mocking imported functions and how
 * to get components from text or test id. Also
 * used it to help document some of the test code.
 * (ChatGPT 3.5, 1)
 */

// Mocked authentication context
const mockAuthContext = {
  isAuth: true, 
};

// Mock the useAuth hook to return the mocked context
jest.mock("../auth/AuthContext", () => ({
  ...jest.requireActual("../auth/AuthContext"), // Preserve the actual implementation
  useAuth: () => mockAuthContext, // Provide the mocked context
}));

// Mocking the APIManager
jest.mock("../utils/ApiManager", () => ({
  saveProfile: jest.fn((dataString) => {}),
}));

// Mock the createObjectURL function
global.URL.createObjectURL = jest.fn(() => "fake-url");

describe("ProfileCard", () => {
  // Reset mocks and clear mock calls before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test rendering ProfileCard component without crashing
  test("renders ProfileCard component without crashing", () => {
    render(<ProfileCard />);
  });

  // Test rendering the correct username
  test("renders the correct username", () => {
    render(<ProfileCard name="TESTUSER" />);
    expect(screen.getByText("TESTUSER")).toBeInTheDocument();
  });

  // Test showing the user friend list
  test("show the user friend list", async () => {
    const { getByText, findByTestId } = render(
      <ProfileCard name="TESTUSER" allowEdit={true} />
    );

    userEvent.click(getByText("Friends"));

    const friendsTab = await findByTestId("friends-tab");
    expect(friendsTab).toBeInTheDocument();
  });

  // Test showing the user trip list
  test("show the user trip list", async () => {
    const { getByText, findByTestId } = render(
      <BrowserRouter>
        <ProfileCard name="TESTUSER" allowEdit={true} />
      </BrowserRouter>
    );

    userEvent.click(getByText("Trips"));

    const tripsTab = await findByTestId("trips-tab");
    expect(tripsTab).toBeInTheDocument();
  });

  // Test checking if customization appears
  test("check if customization appears", async () => {
    const { getByTestId } = render(
      <ProfileCard name="TESTUSER" allowEdit={true} />
    );

    userEvent.click(getByTestId("palette-button"));

    // Wait for the element to be removed from the DOM
    await waitFor(() => {
      expect(screen.getByText("Customize")).toBeInTheDocument();
    });
  });

  // Test user clicks on a different default picture and it changes
  test("user clicks on a different default picture and it changes", async () => {
    // Render the ProfileCard component
    const { getByText, getByTestId } = render(
      <ProfileCard name="TESTUSER" allowEdit={true} />
    );

    // Get the initial picture source
    const initialPicture = getByTestId("profile-picture").src;

    // Click the palette button to open the customization panel
    userEvent.click(getByTestId("palette-button"));

    // Wait for the customization panel to be displayed
    await waitFor(() => {
      expect(screen.getByText("Customize")).toBeInTheDocument();
    });

    // Get the picture to click (e.g., picture with test ID "picture-5")
    const pictureToClick = await getByTestId("picture-5");

    // Click the picture to change it
    userEvent.click(pictureToClick);

    // Wait for the profile picture to change
    await waitFor(() => {
      const newPicture = getByTestId("profile-picture").src;
      // Assert that the new picture source is different from the initial one
      expect(newPicture).not.toBe(initialPicture);
    });
  });

  // Test user saves their changes
  test("user saves their changes", async () => {
    // Render the ProfileCard component
    const { getByText, getByTestId, rerender } = render(
      <ProfileCard
        name="TESTUSER"
        allowEdit={true}
        setAlertMessage={(alertMessage) => {}}
        setAlertSucceeded={(alertSucceeded) => {}}
        setShowAlert={(showAlert) => {}}
      />
    );

    // Get the initial picture source
    const initialPicture = getByTestId("profile-picture").src;

    // Click the palette button to open the customization panel
    userEvent.click(getByTestId("palette-button"));

    // Wait for the customization panel to be displayed
    await waitFor(() => {
      expect(screen.getByText("Customize")).toBeInTheDocument();
    });

    // Get the picture to click (e.g., picture with test ID "picture-5")
    const pictureToClick = await getByTestId("picture-5");

    // Click the picture to change it
    userEvent.click(pictureToClick);

    // Wait for the profile picture to change
    await waitFor(() => {
      const newPicture = getByTestId("profile-picture").src;
      // Assert that the new picture source is different from the initial one
      expect(newPicture).not.toBe(initialPicture);
    });

    // Click the palette button to open the customization panel
    userEvent.click(getByTestId("palette-button"));

    // Wait for the customization panel to be displayed
    await waitFor(() => {
      expect(screen.getByText("Customize")).toBeInTheDocument();
    });

    // Click the picture to change it
    userEvent.click(screen.getByText("Save Changes..."));

    // Wait for some time
    await new Promise((resolve) => setTimeout(resolve, 200));

    // Simulate page refresh by re-rendering the component with the same props
    rerender(<ProfileCard name="TESTUSER" allowEdit={true} />);

    // Assert that the profile picture is back to its initial state
    const refreshedPicture = getByTestId("profile-picture").src;
    expect(refreshedPicture).not.toBe(initialPicture);
  });

  // Test user changes their backdrop
  test("user changes their backdrop", async () => {
    // Render the ProfileCard component
    const { getByText, getByTestId } = render(
      <ProfileCard name="TESTUSER" allowEdit={true} />
    );

    // Get the initial picture source
    const backdropElement = getByTestId("backdrop-image");

    const initialBackdrop = window
      .getComputedStyle(backdropElement)
      .getPropertyValue("background-image");

    // Click the palette button to open the customization panel
    userEvent.click(getByTestId("palette-button"));

    // Wait for the customization panel to be displayed
    await waitFor(() => {
      expect(screen.getByText("Customize")).toBeInTheDocument();
    });

    // Wait for the customization panel to be displayed
    await waitFor(() => {
      userEvent.click(screen.getByText("Backdrop"));
    });

    // Wait for some time
    await new Promise((resolve) => setTimeout(resolve, 200));

    // Get the picture to click (e.g., picture with test ID "picture-5")
    const pictureToClick = await getByTestId("backdrop-3");

    // Click the picture to change it
    userEvent.click(pictureToClick);

    // Wait for the profile picture to change
    await waitFor(() => {
      const newBackdrop = window
        .getComputedStyle(backdropElement)
        .getPropertyValue("background-image");
      // Assert that the new picture source is different from the initial one
      expect(newBackdrop).not.toBe(initialBackdrop);
    });
  });

  // Test parsing the user customization selections obtained by database fetch call
  test("Parse the user customization selections obtained by database fetch call", () => {
    // Render the ProfileCard component
    const { getByText, getByTestId } = render(
      <ProfileCard name="TESTUSER" selection={"1-0-#000000-0"} />
    );

    const selectedImg = getByTestId("profile-picture").src;
    const selectedColor = getByText("Default_Border.svg").getAttribute("fill");
    const backdropElement = getByTestId("backdrop-image");
    const selectedBackdrop = window
      .getComputedStyle(backdropElement)
      .getPropertyValue("background-image");

    expect(selectedImg).toContain("beagle");
    expect(screen.getByText("Default_Border.svg")).toBeInTheDocument;
    expect(selectedColor).toBe("#000000");
    expect(selectedBackdrop).toBe("url(grass.jpg)");
  });

  // Test allowing uploading profile picture
  test('allows uploading profile picture', async () => {
    // Mock the Image constructor
    window.Image = jest.fn().mockImplementation(() => ({
      onload: null, // Mocking onload to be null initially
      src: null, // Mocking src to be null initially
      addEventListener: jest.fn().mockImplementation((event, callback) => {
        if (event === 'load') {
          this.onload = callback; // Assigning the onload callback
        }
      }),
    }));

    // Render the ProfileCard component with some initial data
    const { getByTestId, queryByTestId } = render(
      <ProfileCard
        name="Test User"
        allowEdit={true}
        image=""
        about=""
        selection="1-0-black-2"
        setAlertMessage={() => {}}
        setAlertSucceeded={() => {}}
        setShowAlert={() => {}}
      />
    );
  
    // Click on the palette button to open the edit profile pic dialog
    userEvent.click(getByTestId('palette-button'));
  
    // Wait for the edit profile pic dialog to open
    await waitFor(() => {
      expect(queryByTestId('picture-1')).toBeInTheDocument();
    });
  
    const inputFile = getByTestId('avatar-uploading'); // Get the input element by test id
    
    // Create a fake image file
    const file = new File(['(⌐□_□)'], 'fake-image.png', { type: 'image/png' });
    const imageSrc = URL.createObjectURL(file);
  
    // Trigger the uploadAvatar function by changing the input file
    fireEvent.change(inputFile, { target: { files: [file] } });
    
    // Verify that the new picture has an id of 0
    expect(queryByTestId('picture-0')).toBeInTheDocument();
  });

  // Test getting different size name tags
  test("Get different size name tags", () => {
    // Render the ProfileCard component
    const { getByText, getByTestId, rerender } = render(
      <ProfileCard name="TESTUSERRRR" />
    );

    var backdropElement = getByText("TESTUSERRRR");
    const elevenCharsFontSize = window
      .getComputedStyle(backdropElement)
      .getPropertyValue("font-size");

    expect(elevenCharsFontSize).toBe("3.5vw");

    // Simulate page refresh by re-rendering the component with the same props
    rerender(<ProfileCard name="TESTUSERRR" />);

    backdropElement = getByText("TESTUSERRR");
    const tenCharsFontSize = window
      .getComputedStyle(backdropElement)
      .getPropertyValue("font-size");

    expect(tenCharsFontSize).toBe("3.9vw");
  });

  // Test user changes their border
  test("User changes their border", async () => {
    // Render the ProfileCard component
    const { container, getByText, getByTestId } = render(
      <ProfileCard name="TESTUSER" allowEdit={true} />
    );

    // Get the initial picture source
    const initialBorder = getByText("Default_Border.svg");

    // Click the palette button to open the customization panel
    userEvent.click(getByTestId("palette-button"));

    // Wait for the customization panel to be displayed
    await waitFor(() => {
      expect(screen.getByText("Customize")).toBeInTheDocument();
    });

    // Wait for the customization panel to be displayed
    await waitFor(() => {
      userEvent.click(screen.getByText("Border"));
    });

    // Wait for some time
    await new Promise((resolve) => setTimeout(resolve, 200));

    // Get the picture to click (e.g., picture with test ID "border-1")
    const borderToClick = await getByTestId("border-1");

    // Click the border to change it
    userEvent.click(borderToClick);

    // Wait for some time
    await new Promise((resolve) => setTimeout(resolve, 200));

    // Wait for the profile picture to change
    await waitFor(() => {
      const newBorder = getByText("Star_Border.svg");
      // Assert that the new picture source is different from the initial one
      expect(newBorder).not.toBe(initialBorder);
    });
  });
});
