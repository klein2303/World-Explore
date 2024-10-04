import { render, screen, fireEvent} from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, beforeEach} from "vitest";
import { MemoryRouter } from "react-router-dom";
import Filter from "../Filter";

describe("Filter Component Tests (Desktop)", () => {
  it("renders the filter component correctly", () => {
   
    const { asFragment } = render(
      <MemoryRouter>
        <Filter />
      </MemoryRouter>
    );

    // Snapshot the initial render
    expect(asFragment()).toMatchSnapshot();

    // Check if the title and description are in the document
    expect(screen.getByText("Filters")).toBeInTheDocument();
    expect(screen.getByText("Continents")).toBeInTheDocument();

    // Check if all continent checkboxes are rendered
    expect(screen.getByLabelText("Africa")).toBeInTheDocument();
    expect(screen.getByLabelText("Asia")).toBeInTheDocument();
    expect(screen.getByLabelText("Europe")).toBeInTheDocument();
    expect(screen.getByLabelText("North America")).toBeInTheDocument();
    expect(screen.getByLabelText("Oceania")).toBeInTheDocument();
    expect(screen.getByLabelText("South America")).toBeInTheDocument();
  });

  it("handles checkbox clicks and updates state", () => {
    render(
      <MemoryRouter>
        <Filter />
      </MemoryRouter>
    );

    // Select the Africa checkbox and check if it's originally not checked
    const africaCheckbox = screen.getByLabelText("Africa");
    expect(africaCheckbox).not.toBeChecked(); 

    // Simulate a click event on the Africa checkbox and check if it's checked
    fireEvent.click(africaCheckbox);
    expect(africaCheckbox).toBeChecked(); 

    // Uncheck the Africa checkbox and check if it's unchecked
    fireEvent.click(africaCheckbox);
    expect(africaCheckbox).not.toBeChecked(); 
  });
});

describe("Filter Component Tests (Mobile)", () => {
  // Simulate a mobile screen size before each test
  beforeEach(() => {
    window.innerWidth = 375; 
    window.dispatchEvent(new Event("resize"));
  });

  it("renders the filter component correctly in mobile view", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <Filter />
      </MemoryRouter>
    );

    // Snapshot the mobile render
    expect(asFragment()).toMatchSnapshot();

    // Check that the filter container is present
    expect(screen.getByText("Filters")).toBeInTheDocument();
    expect(screen.getByText("Continents")).toBeInTheDocument();

    // Check if all checkboxes are rendered in mobile view
    expect(screen.getByLabelText("Africa")).toBeInTheDocument();
    expect(screen.getByLabelText("Asia")).toBeInTheDocument();
    expect(screen.getByLabelText("Europe")).toBeInTheDocument();
    expect(screen.getByLabelText("North America")).toBeInTheDocument();
    expect(screen.getByLabelText("Oceania")).toBeInTheDocument();
    expect(screen.getByLabelText("South America")).toBeInTheDocument();
  });

  it("handles checkbox interactions in mobile view", () => {
    render(
      <MemoryRouter>
        <Filter />
      </MemoryRouter>
    );

    // Select the Oceania checkbox
    const oceaniaCheckbox = screen.getByLabelText("Oceania");
    expect(oceaniaCheckbox).not.toBeChecked(); // Initially not checked

    // Simulate a click event on the Oceania checkbox and check if it's checked
    fireEvent.click(oceaniaCheckbox);
    expect(oceaniaCheckbox).toBeChecked(); 

    // Uncheck the Oceania checkbox and check if it's unchecked
    fireEvent.click(oceaniaCheckbox);
    expect(oceaniaCheckbox).not.toBeChecked(); 
  });
});
