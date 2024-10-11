import {render, screen, fireEvent, within} from "@testing-library/react";
import "@testing-library/jest-dom";
import {describe, it, expect, vi} from "vitest";
import ReviewBox from "../ReviewBox";

// Mock data
vi.mock("../../data/JournalReviews", () => ({
    JournalReviews: [
        {
            country: "Japan",
            reviews: [
                {
                    id: 3,
                    title: "Cherry Blossom Festival",
                    date: "2024.04.05",
                    rating: 5,
                    text: "Attending the cherry blossom festival was one of the most serene experiences ever.",
                    public: true,
                },
                {
                    id: 4,
                    title: "Amazing Sushi",
                    date: "2023.11.10",
                    rating: 4,
                    text: "The sushi in Japan is unparalleled! Highly recommend visiting Tsukiji Market.",
                    public: false,
                },
            ],
        },
    ],
}));

describe("ReviewBox Component", () => {
    it("renders reviews for Japan", () => {
        const {container} = render(<ReviewBox country="Japan" />);

        // Check if the correct reviews are rendered (those corresponding to Japan)
        expect(screen.getByText("Cherry Blossom Festival")).toBeInTheDocument();
        expect(screen.getByText("Amazing Sushi")).toBeInTheDocument();

        // Snapshot the rendered component
        expect(container).toMatchSnapshot();
    });

    it("toggles review public/private state when clicking the checkbox", () => {
        const {container} = render(<ReviewBox country="Japan" />);

        // Find the review section for the "Amazing Sushi"-entry
        const sushiReviewSection = screen.getByText("Amazing Sushi").closest("section");
        if (!sushiReviewSection) {
            throw new Error("Could not find the review section for Amazing Sushi");
        }

        const {getByLabelText} = within(sushiReviewSection);

        // Check the initial state of the checkbox (public: false)
        const sushiCheckBox = getByLabelText("Make journey public");
        expect(sushiCheckBox).toBeInTheDocument();

        // Click the checkbox to make the review public
        fireEvent.click(sushiCheckBox);

        // After click, the aria-label should change to 'Make journey private'
        const updatedCheckBox = getByLabelText("Make journey private");
        expect(updatedCheckBox).toBeInTheDocument();

        // Snapshot after the checkbox click
        expect(container).toMatchSnapshot();
    });

    it("renders the correct number of stars based on the rating", () => {
        const {container} = render(<ReviewBox country="Japan" />);

        // Find the review section for the "Amazing Sushi"-entry
        const sushiReviewSection = screen.getByText("Amazing Sushi").closest("section");
        if (!sushiReviewSection) {
            throw new Error("Could not find the review section for Amazing Sushi");
        }

        // Query for the filled stars within the "Amazing Sushi" review
        const filledStars = within(sushiReviewSection).getAllByLabelText("filled star");
        expect(filledStars).toHaveLength(4); // Sushi review has a rating of 4

        // Query for the empty stars within the "Amazing Sushi" review
        const emptyStars = within(sushiReviewSection).getAllByLabelText("empty star");
        expect(emptyStars).toHaveLength(1); // 1 out of 5 stars should be empty star

        // Snapshot the star rendering
        expect(container).toMatchSnapshot();
    });

    it("displays a message if no reviews are found for the country", () => {
        const {container} = render(<ReviewBox country="UnknownCountry" />);

        // Check if the "No reviews found" message is displayed
        expect(screen.getByText("No reviews found for UnknownCountry")).toBeInTheDocument();

        // Snapshot the no reviews state
        expect(container).toMatchSnapshot();
    });
});
