import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import PublicJournalEntry from "../PublicJournalEntry";
import { readReviewType } from "../../../types/JournalType";

// Mocking the modal
vi.mock("../PublicJournalEntryModal", () => ({
    default: ({ onClose }: { onClose: () => void }) => (
        <div data-testid="mock-modal">
            <button onClick={onClose} aria-label="Close modal">
                Close
            </button>
        </div>
    ),
}));

describe("PublicJournalEntry Component", () => {
    const mockReview: readReviewType = {
        title: "Amazing Experience",
        date: "2024-11-20",
        rating: 5,
        text: "This experience was absolutely wonderful and unforgettable. The journey was packed with excitement and beauty!",
        public: true,
        journal: {
            profile: {
                username: "traveler123",
            },
        },
    };

    beforeEach(() => {
        // Reset window size before each test
        window.innerWidth = 1024;
        fireEvent.resize(window);
    });

    it("renders correctly and matches snapshot", () => {
        const { asFragment } = render(<PublicJournalEntry review={mockReview} />);
        expect(asFragment()).toMatchSnapshot();
    });

    it("displays truncated text and 'Read More' button on desktop", () => {
        render(<PublicJournalEntry review={mockReview} />);

        // Ensure truncated text is displayed
        expect(screen.getByText(/This experience was absolutely wonderful and unforgettable/)).toBeInTheDocument();
        expect(screen.queryByText(mockReview.text)).not.toBeInTheDocument();

        // Verify "Read More" button
        const readMoreButton = screen.getByRole("button", { name: "Expand review text" });
        expect(readMoreButton).toBeInTheDocument();
    });

    it("expands text on 'Read More' button click in mobile view", () => {
        window.innerWidth = 768; // Simulate mobile view
        fireEvent.resize(window);

        render(<PublicJournalEntry review={mockReview} />);

        const readMoreButton = screen.getByRole("button", { name: "Expand review text" });
        fireEvent.click(readMoreButton);

        // Verify full text is displayed
        expect(screen.getByText(mockReview.text)).toBeInTheDocument();

        // Verify "Read Less" button is now displayed
        expect(screen.getByRole("button", { name: "Collapse review text" })).toBeInTheDocument();
    });

    it("opens the modal when 'Read More' is clicked in desktop view", () => {
        render(<PublicJournalEntry review={mockReview} />);

        const readMoreButton = screen.getByRole("button", { name: "Expand review text" });
        fireEvent.click(readMoreButton);

        // Verify modal is displayed
        expect(screen.getByTestId("mock-modal")).toBeInTheDocument();
    });

    it("closes the modal when close button is clicked in the modal", () => {
        render(<PublicJournalEntry review={mockReview} />);

        const readMoreButton = screen.getByRole("button", { name: "Expand review text" });
        fireEvent.click(readMoreButton);

        const closeModalButton = screen.getByRole("button", { name: "Close modal" });
        fireEvent.click(closeModalButton);

        // Verify modal is no longer displayed
        expect(screen.queryByTestId("mock-modal")).not.toBeInTheDocument();
    });

    it("updates state on window resize", () => {
        const { rerender } = render(<PublicJournalEntry review={mockReview} />);

        // Verify initial desktop state (truncated text and no modal)
        const truncatedTextDesktop = screen.getByText(/This experience was absolutely wonderful and unforgettable/);
        expect(truncatedTextDesktop).toBeInTheDocument();
        expect(screen.queryByTestId("mock-modal")).not.toBeInTheDocument();

        // Simulate resizing to mobile
        window.innerWidth = 768;
        fireEvent.resize(window);
        rerender(<PublicJournalEntry review={mockReview} />);

        // Resize back to desktop
        window.innerWidth = 1024;
        fireEvent.resize(window);
        rerender(<PublicJournalEntry review={mockReview} />);

        // In desktop, click "Read More" to open modal
        const readMoreButtonDesktop = screen.getByRole("button", { name: "Expand review text" });
        fireEvent.click(readMoreButtonDesktop);

        // Verify modal is displayed
        expect(screen.getByTestId("mock-modal")).toBeInTheDocument();
    });
});