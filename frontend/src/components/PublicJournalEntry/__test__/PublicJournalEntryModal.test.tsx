import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import PublicJournalEntryModal from "../PublicJournalEntryModal";
import { readReviewType } from "../../../types/JournalType";

describe("PublicJournalEntryModal Component", () => {
    const mockOnClose = vi.fn();
    const mockReview: readReviewType = {
        title: "Wonderful Journey",
        date: "2024-11-20",
        rating: 4,
        text: "This experience was truly amazing!",
        public: true,
        journal: {
            profile: {
                username: "traveler123",
            },
        },
    };

    beforeEach(() => {
        // Clear the mock function's call history before each test
        mockOnClose.mockClear();
    });

    it("renders correctly and matches snapshot", () => {
        const { asFragment } = render(<PublicJournalEntryModal review={mockReview} onClose={mockOnClose} />);
        expect(asFragment()).toMatchSnapshot();
    });

    it("displays the correct review details", () => {
        render(<PublicJournalEntryModal review={mockReview} onClose={mockOnClose} />);

        // Check that the title, date, rating, and username are rendered
        expect(screen.getByText(mockReview.title)).toBeInTheDocument();
        expect(screen.getByText(mockReview.date)).toBeInTheDocument();
        expect(screen.getByText(`${mockReview.rating}/5`)).toBeInTheDocument();
        expect(screen.getByText(mockReview.journal.profile.username)).toBeInTheDocument();
        expect(screen.getByText(mockReview.text)).toBeInTheDocument();
    });

    it("closes the modal when the close button is clicked", () => {
        render(<PublicJournalEntryModal review={mockReview} onClose={mockOnClose} />);

        const closeButton = screen.getByLabelText("Close modal");
        fireEvent.click(closeButton);

        // Ensure the onClose callback is called
        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it("closes the modal when the Escape key is pressed", () => {
        render(<PublicJournalEntryModal review={mockReview} onClose={mockOnClose} />);

        fireEvent.keyDown(document, { key: "Escape", code: "Escape" });

        // Ensure the onClose callback is called
        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it("closes the modal when clicking on the backdrop", () => {
        render(<PublicJournalEntryModal review={mockReview} onClose={mockOnClose} />);

        const backdrop = screen.getByRole("dialog");
        fireEvent.click(backdrop);

        // Ensure the onClose callback is called
        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it("does not close the modal when clicking inside the modal content", () => {
        render(<PublicJournalEntryModal review={mockReview} onClose={mockOnClose} />);

        const modalContent = screen.getByText(mockReview.title).closest("div");
        fireEvent.click(modalContent!);

        // Ensure the onClose callback is not called
        expect(mockOnClose).not.toHaveBeenCalled();
    });
});
