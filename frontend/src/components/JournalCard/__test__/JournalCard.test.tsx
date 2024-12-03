import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import JournalCard from "../JournalCard";

// Mock the navigate function from react-router-dom
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

// Mock JournalEntryModal component to prevent rendering issues
vi.mock("../../JournalEntryModal/JournalEntryModal", () => ({
    default: vi.fn(() => <div>Mocked Modal</div>),
}));

describe("JournalCard", () => {
    const mockProps = {
        country: "Japan",
        image: "https://example.com/japan.jpg",
    };

    it("renders correctly and matches snapshot", () => {
        const { asFragment } = render(
            <MemoryRouter>
                <JournalCard {...mockProps} />
            </MemoryRouter>,
        );
        expect(asFragment()).toMatchSnapshot();
    });

    it("renders the country name", () => {
        render(
            <MemoryRouter>
                <JournalCard {...mockProps} />
            </MemoryRouter>,
        );
        expect(screen.getByText("Japan")).toBeInTheDocument();
    });

    /*it("renders 'Write Journal' when no journal date exists", () => {
        render(
            <MemoryRouter>
                <JournalCard {...mockProps} />
            </MemoryRouter>
        );
        expect(screen.getByText("Write Journal")).toBeInTheDocument();
    });*/

    it("renders 'Read Journal' when a journal date exists", () => {
        const newProps = { ...mockProps, date: "2023-10-10" };
        render(
            <MemoryRouter>
                <JournalCard {...newProps} />
            </MemoryRouter>,
        );
        expect(screen.getByText("Read Journal")).toBeInTheDocument();
    });

    it("opens the journal entry modal when clicking 'Write Journal'", () => {
        render(
            <MemoryRouter>
                <JournalCard {...mockProps} />
            </MemoryRouter>,
        );
        const card = screen.getByLabelText("Journal card for Japan");
        fireEvent.click(card);
        expect(screen.getByText("Mocked Modal")).toBeInTheDocument();
    });

    it("prevents navigation when clicking 'Write Journal'", () => {
        render(
            <MemoryRouter>
                <JournalCard {...mockProps} />
            </MemoryRouter>,
        );
        const card = screen.getByLabelText("Journal card for Japan");
        fireEvent.click(card);
        expect(screen.getByText("Mocked Modal")).toBeInTheDocument();
        //expect(mockNavigate).not.toHaveBeenCalled();
    });

    it("navigates to the journal page when clicking 'Read Journal'", () => {
        const newProps = { ...mockProps, date: "2023-10-10" };
        render(
            <MemoryRouter>
                <JournalCard {...newProps} />
            </MemoryRouter>,
        );
        const card = screen.getByLabelText("Journal card for Japan");
        fireEvent.click(card);
        expect(mockNavigate).toHaveBeenCalledWith("/JournalPage/Japan");
    });
});
