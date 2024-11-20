import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, vi, expect } from "vitest";
import { BrowserRouter as Router } from "react-router-dom";
import CountryCard from "../CountryCard";

// Mock the JournalEntryModal component
vi.mock("../../JournalEntryModal/JournalEntryModal", () => ({
    __esModule: true,
    default: vi.fn(({ isOpen }: { isOpen: boolean }) => {
        return isOpen ? <div data-testid="journal-entry-modal">Journal Entry Modal</div> : null;
    }),
}));

describe("CountryCard", () => {
    const mockProps = {
        name: "France",
        image: "https://via.placeholder.com/150",
    };

    it("renders correctly with the given props", () => {
        const { asFragment } = render(
            <Router>
                <CountryCard {...mockProps} />
            </Router>,
        );

        // Check that the main elements are rendered correctly
        expect(screen.getByRole("region", { name: /country-name-france/i })).toBeInTheDocument();
        expect(screen.getByAltText(/image of the country france/i)).toHaveAttribute("src", mockProps.image);
        expect(screen.getByText(mockProps.name)).toBeInTheDocument();

        // Verify that the JournalEntryModal is not visible by default
        expect(screen.queryByTestId("journal-entry-modal")).not.toBeInTheDocument();

        // Take a snapshot of the rendered output
        expect(asFragment()).toMatchSnapshot();
    });

    it("opens the modal when the pencil icon is clicked", () => {
        const { asFragment } = render(
            <Router>
                <CountryCard {...mockProps} />
            </Router>,
        );

        const pencilIcon = screen.getByRole("button");
        fireEvent.click(pencilIcon);

        // Check if the modal is rendered after the click
        expect(screen.getByTestId("journal-entry-modal")).toBeInTheDocument();

        // Take a snapshot after the modal is opened
        expect(asFragment()).toMatchSnapshot();
    });
});