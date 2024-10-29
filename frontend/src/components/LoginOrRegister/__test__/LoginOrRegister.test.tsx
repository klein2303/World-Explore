import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import LoginOrRegister from "../LoginOrRegister";

describe("LoginOrRegister Component - Register tests", () => {
    beforeEach(() => {
        // Mock localStorage before each test to prevent actual browser interaction
        localStorage.clear();
        vi.spyOn(Storage.prototype, "getItem").mockReturnValue(null);
        vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {});
    });

    it("renders the registration form correctly", () => {
        const { asFragment } = render(
            <MemoryRouter>
                <LoginOrRegister login={false} />
            </MemoryRouter>,
        );

        // Snapshot the initial render
        expect(asFragment()).toMatchSnapshot();

        // Check if the form is rendered correctly with input fields and button
        expect(screen.getByLabelText("Name input field")).toBeInTheDocument();
        expect(screen.getByLabelText("Email input field")).toBeInTheDocument();
        expect(screen.getByLabelText("Password input field")).toBeInTheDocument();
        expect(screen.getByLabelText("Submit to create a new account")).toBeInTheDocument();
    });

    it("validates form and handles submission", () => {
        render(
            <MemoryRouter>
                <LoginOrRegister login={false} />
            </MemoryRouter>,
        );

        // Fill out the form with valid values
        fireEvent.change(screen.getByLabelText("Name input field"), { target: { value: "John Doe" } });
        fireEvent.change(screen.getByLabelText("Email input field"), { target: { value: "john@example.com" } });
        fireEvent.change(screen.getByLabelText("Password input field"), { target: { value: "12345678" } });

        // Submit the form
        fireEvent.click(screen.getByLabelText("Submit to create a new account"));

        // Check if the feedback message updates to successful registration
        expect(screen.getByText("Account is made successfully")).toBeInTheDocument();
    });

    it("validates form and handles submission", async () => {
        render(
            <MemoryRouter>
                <LoginOrRegister login={false} />
            </MemoryRouter>,
        );

        // Fill out the form
        fireEvent.change(screen.getByLabelText("Name input field"), { target: { value: "John Doe" } });
        fireEvent.change(screen.getByLabelText("Email input field"), { target: { value: "john@example.com" } });
        fireEvent.change(screen.getByLabelText("Password input field"), { target: { value: "12345678" } });

        // Submit the form
        fireEvent.click(screen.getByLabelText("Submit to create a new account"));

        // Wait for the feedback message to appear
        await waitFor(() => {
            expect(screen.getByText("Account is made successfully")).toBeInTheDocument();
        });
    });

    it("shows password validation error", () => {
        render(
            <MemoryRouter>
                <LoginOrRegister login={false} />
            </MemoryRouter>,
        );

        // Fill out the form with an invalid password
        fireEvent.change(screen.getByLabelText("Name input field"), { target: { value: "John Doe" } });
        fireEvent.change(screen.getByLabelText("Email input field"), { target: { value: "john@example.com" } });
        fireEvent.change(screen.getByLabelText("Password input field"), { target: { value: "123" } }); // too short

        // Submit the form
        fireEvent.click(screen.getByLabelText("Submit to create a new account"));

        // Check if the feedback message updates to "Password is not valid"
        expect(screen.getByText(/Password is not valid.*8 characters/i)).toBeInTheDocument();
    });
});

// Mock localStorage
beforeEach(() => {
    const mockLocalStorage = (() => {
        let store: { [key: string]: string } = {};
        return {
            getItem: (key: string) => store[key] || null,
            setItem: (key: string, value: string) => {
                store[key] = value.toString();
            },
            clear: () => {
                store = {};
            },
        };
    })();
    Object.defineProperty(window, "localStorage", { value: mockLocalStorage });
});

describe("Login functionality tests", () => {
    test("renders the login form correctly", () => {
        render(<LoginOrRegister login={true} />);

        // Check if the title and input fields are rendered
        expect(screen.getByLabelText("Login page")).toBeInTheDocument();
        expect(screen.getByLabelText("Enter account details")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
        expect(screen.getByLabelText("Login button")).toBeInTheDocument();
    });

    test("displays 'No such email' when logging in with non-existent email", () => {
        render(<LoginOrRegister login={true} />);

        // Simulate entering an email and password
        fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "nonexistent@example.com" } });
        fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "password123" } });

        // Simulate clicking the login button
        fireEvent.click(screen.getByLabelText("Login button"));

        // Check if the error message is displayed
        expect(screen.getByLabelText("No such email")).toBeInTheDocument();
    });

    test("displays 'Wrong password' when email is correct but password is wrong", () => {
        // Mock a user in localStorage
        const mockUser = [{ name: "Test User", email: "testuser@example.com", password: "correctpassword" }];
        window.localStorage.setItem("userProfiles", JSON.stringify(mockUser));

        render(<LoginOrRegister login={true} />);

        // Simulate entering the correct email but wrong password
        fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "testuser@example.com" } });
        fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "wrongpassword" } });

        // Simulate clicking the login button
        fireEvent.click(screen.getByLabelText("Login button"));

        // Check if the wrong password message is displayed
        expect(screen.getByLabelText("Wrong password")).toBeInTheDocument();
    });

    test("displays 'Log in successful' when email and password are correct", () => {
        // Mock a user in localStorage
        const mockUser = [{ name: "Test User", email: "testuser@example.com", password: "correctpassword" }];
        window.localStorage.setItem("userProfiles", JSON.stringify(mockUser));

        render(<LoginOrRegister login={true} />);

        // Simulate entering the correct email and password
        fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "testuser@example.com" } });
        fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "correctpassword" } });

        // Simulate clicking the login button
        fireEvent.click(screen.getByLabelText("Login button"));

        // Check if the success message is displayed
        expect(screen.getByLabelText("Log in successful")).toBeInTheDocument();
    });

    test("clears the form after successful login", () => {
        // Mock a user in localStorage
        const mockUser = [{ name: "Test User", email: "testuser@example.com", password: "correctpassword" }];
        window.localStorage.setItem("userProfiles", JSON.stringify(mockUser));

        render(<LoginOrRegister login={true} />);

        // Simulate entering the correct email and password
        const emailInput = screen.getByPlaceholderText("Email");
        const passwordInput = screen.getByPlaceholderText("Password");

        fireEvent.change(emailInput, { target: { value: "testuser@example.com" } });
        fireEvent.change(passwordInput, { target: { value: "correctpassword" } });

        // Simulate clicking the login button
        fireEvent.click(screen.getByLabelText("Login button"));

        // Check if the inputs are cleared
        expect(emailInput).toHaveValue("");
        expect(passwordInput).toHaveValue("");
    });
});
