import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { MockedProvider } from "@apollo/client/testing";
import { gql } from "@apollo/client";
import LoginOrRegister from "../LoginOrRegister";

// Mocked GraphQL Queries and Mutations
const LOGIN_MUTATION = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                email
            }
        }
    }
`;

const SIGNUP_MUTATION = gql`
    mutation Signup($username: String!, $email: String!, $password: String!) {
        signup(username: $username, email: $email, password: $password) {
            token
            user {
                email
            }
        }
    }
`;

// Mocked Responses for GraphQL Mutations
const mocks = [
    {
        request: {
            query: LOGIN_MUTATION,
            variables: { email: "testuser@example.com", password: "password123" },
        },
        result: {
            data: {
                login: {
                    token: "mock-token",
                    user: { email: "testuser@example.com" },
                },
            },
        },
    },
    {
        request: {
            query: SIGNUP_MUTATION,
            variables: { username: "John Doe", email: "john@example.com", password: "password123" },
        },
        result: {
            data: {
                signup: {
                    token: "mock-signup-token",
                    user: { email: "john@example.com" },
                },
            },
        },
    },
    {
        request: {
            query: LOGIN_MUTATION,
            variables: { email: "wronguser@example.com", password: "wrongpassword" },
        },
        error: new Error("Invalid credentials"),
    },
];

// Mock Session Storage
beforeEach(() => {
    sessionStorage.clear();
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => null);
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {});
});

describe("LoginOrRegister Component", () => {
    describe("Register Tests", () => {
        it("renders the registration form correctly", () => {
            const { asFragment } = render(
                <MockedProvider mocks={mocks} addTypename={false}>
                    <MemoryRouter>
                        <LoginOrRegister loginPage={false} />
                    </MemoryRouter>
                </MockedProvider>,
            );

            expect(screen.getByPlaceholderText("Please enter your name")).toBeInTheDocument();
            expect(screen.getByPlaceholderText("Please enter your email")).toBeInTheDocument();
            expect(screen.getByPlaceholderText("Please enter a password")).toBeInTheDocument();
            expect(screen.getByText("Create account")).toBeInTheDocument();

            // Snapshot for registration form
            expect(asFragment()).toMatchSnapshot();
        });

        it("handles registration form submission with valid data", async () => {
            const { asFragment } = render(
                <MockedProvider mocks={mocks} addTypename={false}>
                    <MemoryRouter>
                        <LoginOrRegister loginPage={false} />
                    </MemoryRouter>
                </MockedProvider>,
            );

            fireEvent.change(screen.getByPlaceholderText("Please enter your name"), { target: { value: "John Doe" } });
            fireEvent.change(screen.getByPlaceholderText("Please enter your email"), {
                target: { value: "john@example.com" },
            });
            fireEvent.change(screen.getByPlaceholderText("Please enter a password"), {
                target: { value: "password123" },
            });

            fireEvent.click(screen.getByText("Create account"));

            await waitFor(() => {
                expect(sessionStorage.setItem).toHaveBeenCalledWith("auth-token", "mock-signup-token");
                expect(sessionStorage.setItem).toHaveBeenCalledWith("user", JSON.stringify("john@example.com"));
            });

            // Snapshot for post-registration
            expect(asFragment()).toMatchSnapshot();
        });
    });

    describe("Login Tests", () => {
        it("renders the login form correctly", () => {
            const { asFragment } = render(
                <MockedProvider mocks={mocks} addTypename={false}>
                    <MemoryRouter>
                        <LoginOrRegister loginPage={true} />
                    </MemoryRouter>
                </MockedProvider>,
            );

            const heading = screen.getByRole("heading", { name: "Log in" });
            expect(heading).toBeInTheDocument();

            // Snapshot for login form
            expect(asFragment()).toMatchSnapshot();
        });

        it("handles login form submission with valid data", async () => {
            render(
                <MockedProvider mocks={mocks} addTypename={false}>
                    <MemoryRouter>
                        <LoginOrRegister loginPage={true} />
                    </MemoryRouter>
                </MockedProvider>,
            );

            fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "testuser@example.com" } });
            fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "password123" } });

            fireEvent.click(screen.getByRole("button", { name: "Log in" }));

            await waitFor(() => {
                expect(sessionStorage.setItem).toHaveBeenCalledWith("auth-token", "mock-token");
                expect(sessionStorage.setItem).toHaveBeenCalledWith("user", JSON.stringify("testuser@example.com"));
            });
        });

        it("displays an error message for invalid login credentials", async () => {
            render(
                <MockedProvider mocks={mocks} addTypename={false}>
                    <MemoryRouter>
                        <LoginOrRegister loginPage={true} />
                    </MemoryRouter>
                </MockedProvider>,
            );

            fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "wronguser@example.com" } });
            fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "wrongpassword" } });

            fireEvent.click(screen.getByRole("button", { name: "Log in" }));

            await waitFor(() => {
                expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
            });
        });

        it("renders correctly on mobile", async () => {
            Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: 375 });
            window.dispatchEvent(new Event("resize"));

            const { asFragment } = render(
                <MockedProvider mocks={mocks} addTypename={false}>
                    <MemoryRouter>
                        <LoginOrRegister loginPage={true} />
                    </MemoryRouter>
                </MockedProvider>,
            );

            await waitFor(() => expect(screen.getByPlaceholderText("Email")).toBeInTheDocument());

            // Snapshot for mobile rendering
            expect(asFragment()).toMatchSnapshot();
        });
    });
});
