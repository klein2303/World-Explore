import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MockedProvider } from "@apollo/client/testing";
import gql from "graphql-tag"; // Import gql separately if not from Apollo Client
import JournalEntryModal from "../JournalEntryModal";
import userEvent from "@testing-library/user-event";

const mockClose = vi.fn();
const mockSubmit = vi.fn();
const mockNavigate = vi.fn();

vi.mock("react-router-dom", () => ({
    useNavigate: () => mockNavigate,
    useLocation: () => ({
        pathname: "/ExploreCountries",
    }),
}));

const mockSessionStorage = (() => {
    let store: Record<string, string> = {};
    return {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => {
            store[key] = value;
        },
        clear: () => {
            store = {};
        },
    };
})();
Object.defineProperty(window, "sessionStorage", { value: mockSessionStorage });

const CREATE_REVIEW = gql`
    mutation addReview(
        $title: String!
        $date: String!
        $rating: Int!
        $text: String!
        $ispublic: Boolean!
        $profileid: String!
        $countryid: String!
    ) {
        addReview(
            title: $title
            date: $date
            rating: $rating
            text: $text
            ispublic: $ispublic
            profileid: $profileid
            countryid: $countryid
        ) {
            ispublic
        }
    }
`;

describe("JournalEntryModal", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        sessionStorage.setItem("user", '"mockUserId"');
    });

    it("renders modal content correctly", () => {
        render(
            <MockedProvider mocks={[]} addTypename={false}>
                <JournalEntryModal country="France" isOpen={true} onClose={mockClose} onSubmit={mockSubmit} />
            </MockedProvider>,
        );

        expect(screen.getByText("Write your journal entry for France")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Title")).toBeInTheDocument();
        expect(screen.getByLabelText("Date input")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Relive the moment...")).toBeInTheDocument();
        expect(screen.getByText(/Rating:/i)).toBeInTheDocument();
        expect(screen.getByLabelText("Public checkbox")).toBeInTheDocument();
        expect(screen.getByText(/Save your journal entry/i)).toBeInTheDocument();
    });

    it("traps focus within the modal when open", async () => {
        render(
            <MockedProvider mocks={[]} addTypename={false}>
                <JournalEntryModal country="France" isOpen={true} onClose={mockClose} onSubmit={mockSubmit} />
            </MockedProvider>,
        );

        const closeButton = screen.getByRole("button", { name: /close modal/i });
        const titleInput = screen.getByPlaceholderText("Title");

        closeButton.focus();
        expect(document.activeElement).toBe(closeButton);

        await userEvent.tab();
        expect(document.activeElement).toBe(titleInput);

        await userEvent.tab();
        expect(document.activeElement).not.toBeNull(); // Ensure focus is cycling
    });

    it("handles star rating keyboard accessibility", async () => {
        render(
            <MockedProvider mocks={[]} addTypename={false}>
                <JournalEntryModal country="France" isOpen={true} onClose={mockClose} onSubmit={mockSubmit} />
            </MockedProvider>,
        );

        const stars = screen.getAllByRole("button", { name: /Rate \d stars?/ });
        expect(stars.length).toBe(5);

        await userEvent.type(stars[2], "{Enter}");
        expect(stars[2]).toHaveAttribute("aria-pressed", "true");

        await userEvent.type(stars[3], "{Space}");
        expect(stars[3]).toHaveAttribute("aria-pressed", "true");
    });

    it("displays validation errors for missing fields", async () => {
        const mocks = [
            {
                request: {
                    query: CREATE_REVIEW,
                    variables: {
                        title: "",
                        date: "",
                        rating: 0,
                        text: "",
                        ispublic: false,
                        profileid: "mockUserId",
                        countryid: "France",
                    },
                },
                error: new Error("Validation failed"),
            },
        ];

        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <JournalEntryModal country="France" isOpen={true} onClose={mockClose} onSubmit={mockSubmit} />
            </MockedProvider>,
        );

        fireEvent.click(screen.getByText(/save your journal entry/i));
        expect(await screen.findByText("Validation failed")).toBeInTheDocument();
    });

    it("clears error message after successful submission", async () => {
        const mocks = [
            {
                request: {
                    query: CREATE_REVIEW,
                    variables: {
                        title: "My Journey",
                        date: "2024-11-20",
                        rating: 5,
                        text: "A beautiful experience.",
                        ispublic: true,
                        profileid: "mockUserId",
                        countryid: "France",
                    },
                },
                result: {
                    data: {
                        addReview: {
                            ispublic: true,
                        },
                    },
                },
            },
        ];

        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <JournalEntryModal country="France" isOpen={true} onClose={mockClose} onSubmit={mockSubmit} />
            </MockedProvider>,
        );

        // Fill the form
        await userEvent.type(screen.getByPlaceholderText("Title"), "My Journey");
        await userEvent.type(screen.getByLabelText("Date input"), "2024-11-20");
        await userEvent.type(screen.getByPlaceholderText("Relive the moment..."), "A beautiful experience.");
        fireEvent.click(screen.getAllByRole("button", { name: /Rate 5 stars/i })[0]);
        fireEvent.click(screen.getByLabelText("Public checkbox"));

        // Submit the form
        fireEvent.click(screen.getByText(/save your journal entry/i));

        // Wait for mutation to complete
        await screen.findByText("Write your journal entry for France");

        // Assert onClose is called
        expect(mockClose).toHaveBeenCalled();
    });
});
