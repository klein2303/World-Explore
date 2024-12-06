import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import PublicJournalEntryList from "../PublicJournalEntryList";
import { JournalTypeRead } from "../../../types/JournalType";

// Mock the PublicJournalEntry component
vi.mock("../PublicJournalEntry", () => ({
    default: vi.fn(() => <div data-testid="mock-public-journal-entry">Mock Entry</div>),
}));

describe("PublicJournalEntryList Component", () => {
    const mockJournal: JournalTypeRead = {
        country: "Wonderland",
        reviews: [
            {
                title: "Amazing Experience",
                date: "2024-11-19",
                rating: 5,
                text: "This was an unforgettable adventure!",
                public: true,
                journal: {
                    profile: {
                        username: "user1",
                    },
                },
            },
            {
                title: "Not bad",
                date: "2024-11-18",
                rating: 3,
                text: "It was a decent experience overall.",
                public: false,
                journal: {
                    profile: {
                        username: "user2",
                    },
                },
            },
        ],
    };

    it("renders correctly and matches snapshot", () => {
        const { asFragment } = render(<PublicJournalEntryList journal={mockJournal} />);
        expect(asFragment()).toMatchSnapshot();
    });

    it("displays the correct number of PublicJournalEntry components", () => {
        render(<PublicJournalEntryList journal={mockJournal} />);
        const entries = screen.getAllByTestId("mock-public-journal-entry");
        expect(entries).toHaveLength(mockJournal.reviews.length);
    });

    it("renders the grid with the role 'list'", () => {
        render(<PublicJournalEntryList journal={mockJournal} />);
        const articleElement = screen.getByRole("list");
        expect(articleElement).toBeInTheDocument();
    });
});
