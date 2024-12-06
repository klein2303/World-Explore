import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // Import MemoryRouter
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { MockedProvider } from "@apollo/client/testing";
import { gql } from "@apollo/client";
import ReviewBox from "../ReviewBox";

vi.mock("../../utils/utils", () => ({
    removeQuotes: (value: string) => value,
}));

// Mock `useNavigate` globally
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

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

const DELETE_REVIEW = gql`
    mutation DeleteReview($id: ID!, $journalid: Int!) {
        deleteReview(id: $id, journalid: $journalid)
    }
`;

describe("ReviewBox Component", () => {
    const mockUser = "mockUserId";
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    beforeEach(() => {
        sessionStorage.setItem("user", mockUser);
    });

    afterEach(() => {
        consoleErrorSpy.mockRestore();
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
                    data: null, // Simulate loading
                },
            },
        ];

        const { asFragment } = render(
            <MemoryRouter>
                <MockedProvider mocks={mocks} addTypename={false}>
                    <ReviewBox country="France" />
                </MockedProvider>
            </MemoryRouter>,
        );

        expect(screen.getByText(/loading.../i)).toBeInTheDocument();
        expect(asFragment()).toMatchSnapshot();
    });

    it("renders error state when query fails", async () => {
        const mocks = [
            {
                request: baseMock.request,
                result: {
                    errors: [{ message: "Query failed" }],
                },
            },
        ];

        const { asFragment } = render(
            <MemoryRouter>
                <MockedProvider mocks={mocks} addTypename={false}>
                    <ReviewBox country="France" />
                </MockedProvider>
            </MemoryRouter>,
        );

        await waitFor(() => expect(screen.getByText(/error: query failed/i)).toBeInTheDocument());
        expect(asFragment()).toMatchSnapshot();
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

        const { asFragment } = render(
            <MemoryRouter>
                <MockedProvider mocks={mocks} addTypename={false}>
                    <ReviewBox country="France" />
                </MockedProvider>
            </MemoryRouter>,
        );

        await waitFor(() => expect(screen.getByText("Amazing trip")).toBeInTheDocument());

        // Verify reviews
        expect(screen.getByText("Amazing trip")).toBeInTheDocument();
        expect(screen.getByText("Relaxing vacation")).toBeInTheDocument();
        expect(asFragment()).toMatchSnapshot();
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
            <MemoryRouter>
                <MockedProvider mocks={mocks} addTypename={false}>
                    <ReviewBox country="France" />
                </MockedProvider>
            </MemoryRouter>,
        );

        await waitFor(() => expect(screen.getByText("Mixed experience")).toBeInTheDocument());

        const stars = screen.getByLabelText("rating").querySelectorAll("[aria-label='filled star']");
        expect(stars).toHaveLength(3); // 3 filled stars
    });

    it("renders no reviews message when data contains no reviews", async () => {
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

        const { asFragment } = render(
            <MemoryRouter>
                <MockedProvider mocks={mocks} addTypename={false}>
                    <ReviewBox country="France" />
                </MockedProvider>
            </MemoryRouter>,
        );

        await waitFor(() => expect(screen.queryByText("Amazing trip")).not.toBeInTheDocument());
        expect(asFragment()).toMatchSnapshot();
    });

    it("handles review deletion correctly", async () => {
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
            {
                request: {
                    query: DELETE_REVIEW,
                    variables: { id: "103", journalid: 1 },
                },
                result: {
                    data: { deleteReview: 1 },
                },
            },
        ];

        render(
            <MemoryRouter>
                <MockedProvider mocks={mocks} addTypename={false}>
                    <ReviewBox country="France" />
                </MockedProvider>
            </MemoryRouter>,
        );

        // Wait for the review to load
        await waitFor(() => expect(screen.getByText("Mixed experience")).toBeInTheDocument());

        // Find the delete button
        const deleteButton = screen.getByLabelText("delete");

        // Simulate click event
        fireEvent.click(deleteButton);

        // Wait for the deletion to be handled
        await waitFor(() => expect(consoleErrorSpy).not.toHaveBeenCalled());
    });

    it("navigates to the country info page when 'Go to info page' button is clicked", async () => {
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
            <MemoryRouter>
                <MockedProvider mocks={mocks} addTypename={false}>
                    <ReviewBox country="France" />
                </MockedProvider>
            </MemoryRouter>,
        );

        // Wait for the reviews to load
        await waitFor(() => expect(screen.getByText("Mixed experience")).toBeInTheDocument());

        // Click the "Go to info page" button
        const infoButton = screen.getByRole("button", { name: "Go to info page" });
        fireEvent.click(infoButton);

        // Ensure navigation is called with the correct path
        expect(mockNavigate).toHaveBeenCalledWith("/Countries/France");
    });

    it("renders correctly on mobile", async () => {
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

        // Simulate mobile viewport
        Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: 375 });
        window.dispatchEvent(new Event("resize"));

        render(
            <MemoryRouter>
                <MockedProvider mocks={mocks} addTypename={false}>
                    <ReviewBox country="France" />
                </MockedProvider>
            </MemoryRouter>,
        );

        await waitFor(() => expect(screen.getByText("Mixed experience")).toBeInTheDocument());

        const ratingSection = screen.getByLabelText("rating");
        expect(ratingSection).toBeVisible();
        expect(window.innerWidth).toBe(375);
    });
});
