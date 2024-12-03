import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MockedProvider } from "@apollo/client/testing";
import gql from "graphql-tag"; // Import gql separately if not from Apollo Client
import ReviewBox from "../ReviewBox";

vi.mock("../../utils/utils", () => ({
    removeQuotes: (value: string) => value,
}));

const JOURNAL = gql`
    query GetJournal($countryid: String!, $profileid: String!) {
        writtenjournal(countryid: $countryid, profileid: $profileid) {
            id
            reviews {
                id
                title
                date
                text
                rating
                ispublic
            }
        }
    }
`;

describe("ReviewBox", () => {
    const mockUser = "mockUserId";
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    beforeEach(() => {
        sessionStorage.setItem("user", mockUser);
    });

    afterEach(() => {
        consoleErrorSpy.mockRestore(); // Restore console.error after each test
    });

    const baseMock = {
        request: {
            query: JOURNAL,
            variables: { countryid: "France", profileid: mockUser },
        },
    };

    it("renders loading state initially", () => {
        const mocks = [
            {
                ...baseMock,
                result: {
                    data: null, // Simulate loading by not resolving immediately
                },
            },
        ];

        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <ReviewBox country="France" />
            </MockedProvider>,
        );

        expect(screen.getByText(/loading.../i)).toBeInTheDocument();
    });

    it("renders error state when query fails", async () => {
        const mocks = [
            {
                request: {
                    query: JOURNAL,
                    variables: { countryid: "France", profileid: mockUser },
                },
                result: {
                    errors: [
                        {
                            message: "Query failed",
                            locations: [{ line: 2, column: 3 }],
                            path: ["writtenjournal"],
                        },
                    ],
                },
            },
        ];

        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <ReviewBox country="France" />
            </MockedProvider>,
        );

        await waitFor(() => expect(screen.getByText(/error: query failed/i)).toBeInTheDocument());
    });

    it("renders reviews correctly when data is fetched", async () => {
        const mocks = [
            {
                ...baseMock,
                result: {
                    data: {
                        writtenjournal: {
                            id: "1",
                            reviews: [
                                {
                                    id: "101",
                                    title: "Amazing trip",
                                    date: "2024-11-20",
                                    text: "Loved the Eiffel Tower and the food!",
                                    rating: 5,
                                    ispublic: true,
                                },
                                {
                                    id: "102",
                                    title: "Relaxing vacation",
                                    date: "2024-11-15",
                                    text: "The countryside was peaceful and refreshing.",
                                    rating: 4,
                                    ispublic: false,
                                },
                            ],
                        },
                    },
                },
            },
        ];

        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <ReviewBox country="France" />
            </MockedProvider>,
        );

        // Wait for the reviews to load
        await waitFor(() => expect(screen.getByText("Amazing trip")).toBeInTheDocument());

        // Verify the first review
        expect(screen.getByText("Amazing trip")).toBeInTheDocument();
        expect(screen.getByText("2024-11-20")).toBeInTheDocument();
        expect(screen.getByText("Loved the Eiffel Tower and the food!")).toBeInTheDocument();

        // Verify the second review
        expect(screen.getByText("Relaxing vacation")).toBeInTheDocument();
        expect(screen.getByText("2024-11-15")).toBeInTheDocument();
        expect(screen.getByText("The countryside was peaceful and refreshing.")).toBeInTheDocument();
    });

    it("renders no content if there are no reviews", async () => {
        const mocks = [
            {
                ...baseMock,
                result: {
                    data: {
                        writtenjournal: {
                            id: "1",
                            reviews: [],
                        },
                    },
                },
            },
        ];

        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <ReviewBox country="France" />
            </MockedProvider>,
        );

        await waitFor(() => expect(screen.queryByText("Amazing trip")).not.toBeInTheDocument());
        expect(screen.queryByText(/relaxing vacation/i)).not.toBeInTheDocument();
    });

    it("renders stars correctly for different ratings", async () => {
        const mocks = [
            {
                ...baseMock,
                result: {
                    data: {
                        writtenjournal: {
                            id: "1",
                            reviews: [
                                {
                                    id: "103",
                                    title: "Mixed experience",
                                    date: "2024-10-10",
                                    text: "Some great moments, but also some issues.",
                                    rating: 3,
                                    ispublic: false,
                                },
                            ],
                        },
                    },
                },
            },
        ];

        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <ReviewBox country="France" />
            </MockedProvider>,
        );

        // Wait for the data to load
        await waitFor(() => expect(screen.getByText("Mixed experience")).toBeInTheDocument());

        // Verify the star rendering for a 3-star review
        const ratingSection = screen.getByLabelText("rating");
        const stars = Array.from(ratingSection.childNodes);
        expect(stars).toHaveLength(5);

        const filledStars = stars.filter((star) => (star as Element).getAttribute("aria-label") === "filled star");
        expect(filledStars).toHaveLength(3); // 3 filled stars for the 3-star review
    });
});
