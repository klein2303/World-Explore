import {render, screen, fireEvent} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import {describe, it, expect} from "vitest";
import Login from "../LogIn"; // Assuming this is the correct path to your Login component

describe("Login Page", () => {
    const renderWithRouter = (ui: React.ReactElement) => {
        return render(ui, {wrapper: BrowserRouter});
    };

    it("renders the login page correctly", () => {
        renderWithRouter(<Login />);

        // Check that the logo and links are rendered
        expect(screen.getByLabelText("World explore")).toBeInTheDocument();
        expect(screen.getByLabelText("link to home page")).toBeInTheDocument();
        expect(screen.getByLabelText("Already registered?")).toBeInTheDocument();
        expect(screen.getByLabelText("Already registered")).toBeInTheDocument();

        // Check that the login form from LoginOrRegister component is rendered
        expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
        expect(screen.getByLabelText("Login button")).toBeInTheDocument();

        // Check that the image is rendered
        const image = screen.getByAltText("A beautiful landscape");
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute("src", expect.stringContaining("loginImagePurple.jpg"));
    });

    it("handles login input changes", () => {
        renderWithRouter(<Login />);

        const emailInput = screen.getByPlaceholderText("Email");
        const passwordInput = screen.getByPlaceholderText("Password");

        // Simulate typing into the email and password fields
        fireEvent.change(emailInput, {target: {value: "testuser@example.com"}});
        fireEvent.change(passwordInput, {target: {value: "password123"}});

        // Check that the values are updated
        expect(emailInput).toHaveValue("testuser@example.com");
        expect(passwordInput).toHaveValue("password123");
    });

    it("submits the login form with valid credentials", () => {
        // Mock localStorage to simulate existing users
        localStorage.setItem(
            "userProfiles",
            JSON.stringify([{email: "testuser@example.com", password: "password123"}]),
        );

        renderWithRouter(<Login />);

        const emailInput = screen.getByPlaceholderText("Email");
        const passwordInput = screen.getByPlaceholderText("Password");
        const loginButton = screen.getByLabelText("Login button");

        // Simulate typing valid login credentials
        fireEvent.change(emailInput, {target: {value: "testuser@example.com"}});
        fireEvent.change(passwordInput, {target: {value: "password123"}});

        // Simulate form submission
        fireEvent.click(loginButton);

        // Check the feedback message for successful login
        expect(screen.getByLabelText("Log in successful")).toBeInTheDocument();
    });

    it("shows error when submitting login with invalid credentials", () => {
        renderWithRouter(<Login />);

        const emailInput = screen.getByPlaceholderText("Email");
        const passwordInput = screen.getByPlaceholderText("Password");
        const loginButton = screen.getByLabelText("Login button");

        // Simulate typing invalid login credentials
        fireEvent.change(emailInput, {target: {value: "wronguser@example.com"}});
        fireEvent.change(passwordInput, {target: {value: "wrongpassword"}});

        // Simulate form submission
        fireEvent.click(loginButton);

        // Check the feedback message for invalid login
        expect(screen.getByLabelText("No such email")).toBeInTheDocument();
    });
});
