import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import DateAvailability from "../components/GatheringInfo/DateAvailability";
import userEvent from "@testing-library/user-event";

/**
 * ChatGPT was not used in the writing of these tests. This is due to the fact
 * that ChatGPT did not have the proper context to understand how the
 * main DateAvailability component worked, and thus, would not be able to
 * provide the proper insight necessary to create comprehensive tests
 */

describe("DateAvailability", () => {
  test("renders DateAvailability component without crashing", () => {
    render(<DateAvailability />);
  });

  test("tests input fields of the DateAvailability component", async () => {
    const { getByTestId } = render(<DateAvailability />);
    const startDateInput = getByTestId("startDate");
    const endDateInput = getByTestId("endDate");
    const nameInput = getByTestId("name");

    fireEvent.change(startDateInput, { target: { value: "2024-06-13" } });
    fireEvent.change(endDateInput, { target: { value: "2024-06-14" } });
    fireEvent.change(nameInput, { target: { value: "JohnDoe" } });

    userEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(screen.getByText("April 2024")).toBeInTheDocument();
    });
    userEvent.click(screen.getByText("Next"));
    await waitFor(() => {
      expect(screen.getByText("May 2024")).toBeInTheDocument();
    });
    userEvent.click(screen.getByText("Next"));
    await waitFor(() => {
      expect(screen.getByText("June 2024")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("JohnDoe")).toBeInTheDocument();
    });
  });

  test("tests that the program properly detects date overlaps", async () => {
    const { getByTestId } = render(<DateAvailability />);
    const startDateInput = getByTestId("startDate");
    const endDateInput = getByTestId("endDate");
    const nameInput = getByTestId("name");

    fireEvent.change(startDateInput, { target: { value: "2024-06-13" } });
    fireEvent.change(endDateInput, { target: { value: "2024-06-14" } });
    fireEvent.change(nameInput, { target: { value: "JohnDoe" } });

    userEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(screen.getByText("April 2024")).toBeInTheDocument();
    });
    userEvent.click(screen.getByText("Next"));
    await waitFor(() => {
      expect(screen.getByText("May 2024")).toBeInTheDocument();
    });
    userEvent.click(screen.getByText("Next"));
    await waitFor(() => {
      expect(screen.getByText("June 2024")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("JohnDoe")).toBeInTheDocument();
    });

    fireEvent.change(startDateInput, { target: { value: "2024-06-13" } });
    fireEvent.change(endDateInput, { target: { value: "2024-06-14" } });
    fireEvent.change(nameInput, { target: { value: "JaneDoe" } });

    userEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(screen.getByText("JaneDoe")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("June 13, 2024")).toBeInTheDocument();
    });
  });

  test("tests the dialog box appearance when clicking on an event", async () => {
    const { getByTestId } = render(<DateAvailability />);
    const startDateInput = getByTestId("startDate");
    const endDateInput = getByTestId("endDate");
    const nameInput = getByTestId("name");

    fireEvent.change(startDateInput, { target: { value: "2024-06-13" } });
    fireEvent.change(endDateInput, { target: { value: "2024-06-14" } });
    fireEvent.change(nameInput, { target: { value: "JohnDoe" } });

    userEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(screen.getByText("April 2024")).toBeInTheDocument();
    });
    userEvent.click(screen.getByText("Next"));
    await waitFor(() => {
      expect(screen.getByText("May 2024")).toBeInTheDocument();
    });
    userEvent.click(screen.getByText("Next"));
    await waitFor(() => {
      expect(screen.getByText("June 2024")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("JohnDoe")).toBeInTheDocument();
    });

    userEvent.click(screen.getByText("JohnDoe"));

    await waitFor(() => {
      expect(screen.getByText("Edit Event")).toBeInTheDocument();
    });
  });

  test("tests the editability of an event", async () => {
    const { getByTestId } = render(<DateAvailability />);
    const startDateInput = getByTestId("startDate");
    const endDateInput = getByTestId("endDate");
    const nameInput = getByTestId("name");

    fireEvent.change(startDateInput, { target: { value: "2024-06-13" } });
    fireEvent.change(endDateInput, { target: { value: "2024-06-14" } });
    fireEvent.change(nameInput, { target: { value: "JohnDoe" } });

    userEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(screen.getByText("April 2024")).toBeInTheDocument();
    });
    userEvent.click(screen.getByText("Next"));
    await waitFor(() => {
      expect(screen.getByText("May 2024")).toBeInTheDocument();
    });
    userEvent.click(screen.getByText("Next"));
    await waitFor(() => {
      expect(screen.getByText("June 2024")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("JohnDoe")).toBeInTheDocument();
    });

    userEvent.click(screen.getByText("JohnDoe"));

    await waitFor(() => {
      expect(screen.getByText("Edit Event")).toBeInTheDocument();
    });

    const editStartDate = getByTestId("editStartDate");
    const editEndDate = getByTestId("editEndDate");

    fireEvent.change(editStartDate, { target: { value: "2024-06-17" } });
    fireEvent.change(editEndDate, { target: { value: "2024-06-17" } });

    userEvent.click(screen.getByText("Save"));

    await waitFor(() => {
      expect(screen.getByText("JohnDoe")).toBeInTheDocument();
    });

    userEvent.click(screen.getByText("17"));

    await waitFor(() => {
      expect(screen.getByText("JohnDoe")).toBeInTheDocument();
    });
  });

  test("tests the deletability of an event", async () => {
    const { getByTestId } = render(<DateAvailability />);
    const startDateInput = getByTestId("startDate");
    const endDateInput = getByTestId("endDate");
    const nameInput = getByTestId("name");

    fireEvent.change(startDateInput, { target: { value: "2024-06-13" } });
    fireEvent.change(endDateInput, { target: { value: "2024-06-14" } });
    fireEvent.change(nameInput, { target: { value: "JohnDoe" } });

    userEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(screen.getByText("April 2024")).toBeInTheDocument();
    });
    userEvent.click(screen.getByText("Next"));
    await waitFor(() => {
      expect(screen.getByText("May 2024")).toBeInTheDocument();
    });
    userEvent.click(screen.getByText("Next"));
    await waitFor(() => {
      expect(screen.getByText("June 2024")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("JohnDoe")).toBeInTheDocument();
    });

    userEvent.click(screen.getByText("JohnDoe"));

    await waitFor(() => {
      expect(screen.getByText("Edit Event")).toBeInTheDocument();
    });

    userEvent.click(screen.getByText("Delete"));

    await waitFor(() => {
      const element = screen.queryByText("JohnDoe");
      expect(element).toBeNull();
    });
  });
});
