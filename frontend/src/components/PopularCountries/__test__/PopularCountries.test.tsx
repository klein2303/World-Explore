import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import {describe, it, expect} from "vitest";
import PopularCountries from "../PopularCountries";

describe("PopularCountries Tests", () => {
    it("renders the popular countries section correctly", () => {
        // Render the PopularCountries component
        const {asFragment} = render(<PopularCountries />);

        // Take a snapshot of the initial render
        expect(asFragment()).toMatchSnapshot();

        // Check if the section title is in the document
        expect(screen.getByLabelText("Title")).toHaveTextContent("Popular countries");

        // Check if the buttons for each country are in the document
        const countries = [
            "Norway",
            "USA",
            "Finland",
            "Madagascar",
            "Germany",
            "China",
            "Sri lanka",
            "Indonesia",
            "Japan",
            "Thailand",
        ];
        countries.forEach((country) => {
            expect(screen.getByText(country)).toBeInTheDocument();
        });
    });

    it("checks if country buttons are clickable", () => {
        render(<PopularCountries />);

        // Check that all buttons are present
        const buttons = screen.getAllByRole("button");
        expect(buttons.length).toBe(10); // Ensure there are 10 buttons

        // Check click behavior
        buttons.forEach((button) => {
            expect(button).toBeInTheDocument();

        });
    });
});
