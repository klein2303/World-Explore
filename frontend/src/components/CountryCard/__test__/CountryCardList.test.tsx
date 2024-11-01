import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import CountryCardList from "../CountryCardList";
import { MemoryRouter } from "react-router-dom";

describe("CountryCardList Tests", () => {
    it("renders the country card list correctly", () => {
        // Render the component
        const { asFragment } = render(
            <MemoryRouter>
                <CountryCardList />
            </MemoryRouter>,
        );

        // Take a snapshot of the initial render
        expect(asFragment()).toMatchSnapshot();

        // Check if the country cards are in the document
        expect(screen.getByText("Australia")).toBeInTheDocument();
        expect(screen.getByText("Brazil")).toBeInTheDocument();

        // Check if the images are in the document
        const australiaImage = screen.getByAltText("image of the country Australia");
        expect(australiaImage).toBeInTheDocument();
        expect(australiaImage).toHaveAttribute("src", "https://example.com/australia.jpg");

        const brazilImage = screen.getByAltText("image of the country Brazil");
        expect(brazilImage).toBeInTheDocument();
        expect(brazilImage).toHaveAttribute("src", "https://example.com/brazil.jpg");
    });
});
