import {render, screen, fireEvent} from "@testing-library/react";
import {describe, it, expect, vi} from "vitest";
import JournalEntryModal from "../JournalEntryModal";

describe("JournalEntryModal", () => {
    const mockOnClose = vi.fn();
    const mockOnSubmit = vi.fn();

    const setup = (isOpen = true) => {
        render(<JournalEntryModal country="Norway" isOpen={isOpen} onClose={mockOnClose} onSubmit={mockOnSubmit} />);
    };

    it("renders correctly when open", () => {
        setup(true);
        expect(screen.getByText(/Write your journal entry for Norway/i)).toBeInTheDocument();
    });

    it("does not render when closed", () => {
        setup(false);
        expect(screen.queryByText(/Write your journal entry for Norway/i)).toBeNull();
    });

    it("calls onClose when the close button is clicked", () => {
        setup();
        const closeButton = screen.getByLabelText(/Close modal/i);
        fireEvent.click(closeButton);
        expect(mockOnClose).toHaveBeenCalled();
    });

    it("calls onSubmit with the correct data when the form is submitted", () => {
        setup();

        const titleInput = screen.getByLabelText("Title input");
        const dateInput = screen.getByLabelText("Date input");
        const textArea = screen.getByLabelText("Journal entry text area");
        const submitButton = screen.getByLabelText(/Submit journal entry/i);

        // Fill out the form
        fireEvent.change(titleInput, {target: {value: "My Trip to Norway"}});
        fireEvent.change(dateInput, {target: {value: "2023-01-01"}});
        fireEvent.change(textArea, {target: {value: "It was an amazing trip!"}});

        // Submit the form
        fireEvent.click(submitButton);

        // Expect the mock onSubmit function to be called with the correct arguments
        expect(mockOnSubmit).toHaveBeenCalledWith({
            country: "Norway",
            reviews: [
                {
                    id: expect.any(Number),
                    title: "My Trip to Norway",
                    date: "2023-01-01",
                    rating: 0, // Default rating
                    text: "It was an amazing trip!",
                    public: false, // Default public status
                },
            ],
        });
    });

    it("allows the user to rate the trip", () => {
        setup();

        const starElement = screen.getByLabelText("Rate 5 stars");
        fireEvent.click(starElement); // Simulate clicking 5-star rating

        const submitButton = screen.getByLabelText(/Submit journal entry/i);
        fireEvent.click(submitButton);

        // Expect the mock onSubmit function to be called with the correct rating
        expect(mockOnSubmit).toHaveBeenCalledWith({
            country: "Norway",
            reviews: [
                {
                    id: expect.any(Number),
                    title: "",
                    date: "",
                    rating: 5, // Rating should be updated to 5
                    text: "",
                    public: false,
                },
            ],
        });
    });

    // Snapshot test using @testing-library/react
    it("matches the snapshot when modal is open", () => {
        const {asFragment} = render(
            <JournalEntryModal country="Norway" isOpen={true} onClose={mockOnClose} onSubmit={mockOnSubmit} />,
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
