import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import CountryCard from "../CountryCard";
import { MemoryRouter } from "react-router-dom";

describe("CountryCard Tests", () => {
    it("renders the country card correctly", () => {
        // Render the component
        const { asFragment } = render(
            <MemoryRouter>
                <CountryCard name="Australia" image="https://example.com/australia.jpg" />,
            </MemoryRouter>,
        );

        // Take a snapshot of the initial render
        expect(asFragment()).toMatchSnapshot();

        // Check if the country name is in the document
        expect(screen.getByText("Australia")).toBeInTheDocument();

        // Check if the image is in the document
        const countryImage = screen.getByAltText("image of the country Australia");
        expect(countryImage).toBeInTheDocument();
        expect(countryImage).toHaveAttribute("src", "https://example.com/australia.jpg");

        // Check if the map pin icon is in the document
        const mapPinIcon = screen.getByLabelText("Mark Australia as visited");
        expect(mapPinIcon).toBeInTheDocument();
    });

    it("toggles the map pin icon when clicked", () => {
        render(
            <MemoryRouter>
                <CountryCard name="Australia" image="https://example.com/australia.jpg" />,
            </MemoryRouter>,
        );

        // Check if the map pin icon is in the document
        const mapPinIcon = screen.getByLabelText("Mark Australia as visited");
        expect(mapPinIcon).toBeInTheDocument();

        // Fire event to mark the map pin icon
        fireEvent.click(mapPinIcon);

        // Check if the map pin icon is toggled
        const filledMapPinIcon = screen.getByLabelText("Unmark Australia from visited");
        expect(filledMapPinIcon).toBeInTheDocument();

        // Fire event to unmark the map pin icon
        fireEvent.click(filledMapPinIcon);

        // Check if the map pin icon is toggled back
        const unfilledMapPinIcon = screen.getByLabelText("Mark Australia as visited");
        expect(unfilledMapPinIcon).toBeInTheDocument();
    });
});
