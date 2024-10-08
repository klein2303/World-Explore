import {render, screen, fireEvent} from "@testing-library/react";
import {expect, it, describe} from "vitest";
import JournalCard from "../JournalCard";

describe("JournalCard", () => {
    const mockProps = {
        country: "France",
        date: "2023-01-12",
        image: "https://example.com/france.jpg",
    };

    const mockPropsUnwritten = {
        country: "Spain",
        date: null,
        image: "https://example.com/spain.jpg",
    };

    it("renders correctly with a journal entry", () => {
        const {asFragment} = render(<JournalCard {...mockProps} />);
        expect(asFragment()).toMatchSnapshot();
    });

    it("renders correctly without a journal entry", () => {
        const {asFragment} = render(<JournalCard {...mockPropsUnwritten} />);
        expect(asFragment()).toMatchSnapshot();
    });

    it("displays the correct overlay text based on the date", () => {
        render(<JournalCard {...mockProps} />);
        expect(screen.getByText("Read Journal")).toBeInTheDocument();

        render(<JournalCard {...mockPropsUnwritten} />);
        expect(screen.getByText("Write Journal")).toBeInTheDocument();
    });

    it("toggles the modal visibility when clicked", () => {
        render(<JournalCard {...mockPropsUnwritten} />);
        const card = screen.getByLabelText("Journal card for Spain");
        fireEvent.click(card);
        expect(screen.getByRole("dialog")).toBeInTheDocument();

        const closeButton = screen.getByLabelText("Close modal");
        fireEvent.click(closeButton);
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("does not toggle the modal visibility when there is a date", () => {
        render(<JournalCard {...mockProps} />);
        const card = screen.getByLabelText("Journal card for France");
        fireEvent.click(card);
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
});
