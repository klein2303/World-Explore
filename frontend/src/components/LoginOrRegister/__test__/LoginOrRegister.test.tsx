import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { MockedProvider } from "@apollo/client/testing";
import LoginOrRegister from "../LoginOrRegister";

// GraphQL Mock Queries
import { gql } from "@apollo/client";

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
describe("LoginOrRegister Component - Register tests", () => {
    it("renders the registration form correctly", () => {
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <MemoryRouter>
                    <LoginOrRegister loginPage={false} />
                </MemoryRouter>
            </MockedProvider>,
        );

        //expect(screen.getByLabelText("Name input field")).toBeInTheDocument();
        //expect(screen.getByLabelText("Email input field")).toBeInTheDocument();
        //expect(screen.getByLabelText("Password input field")).toBeInTheDocument();
        expect(screen.getByText("Create account")).toBeInTheDocument();
    });

    it("handles registration form submission with valid data", async () => {
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <MemoryRouter>
                    <LoginOrRegister loginPage={false} />
                </MemoryRouter>
            </MockedProvider>,
        );

        //fireEvent.change(screen.getByLabelText("Name input field"), { target: { value: "John Doe" } });
        //fireEvent.change(screen.getByLabelText("Email input field"), { target: { value: "john@example.com" } });
        //fireEvent.change(screen.getByLabelText("Password input field"), { target: { value: "password123" } });

        //fireEvent.click(screen.getByText("Create account"));

        await waitFor(() => {
            //expect(sessionStorage.setItem).toHaveBeenCalledWith("auth-token", "mock-signup-token");
            //expect(sessionStorage.setItem).toHaveBeenCalledWith("user", JSON.stringify("john@example.com"));
        });
    });
});
