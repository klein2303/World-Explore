import {render, screen, fireEvent, waitFor} from "@testing-library/react";
import "@testing-library/jest-dom";
import {describe, it, expect, beforeEach, vi} from "vitest";
import {MemoryRouter} from "react-router-dom";
import LoginOrRegister from "../LoginOrRegister";

describe("LoginOrRegister Component Tests", () => {
    beforeEach(() => {
        // Mock localStorage before each test to prevent actual browser interaction
        localStorage.clear();
        vi.spyOn(Storage.prototype, "getItem").mockReturnValue(null);
        vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {});
    });

    it("renders the registration form correctly", () => {
        const {asFragment} = render(
            <MemoryRouter>
                <LoginOrRegister />
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
                <LoginOrRegister />
            </MemoryRouter>,
        );

        // Fill out the form with valid values
        fireEvent.change(screen.getByLabelText("Name input field"), {target: {value: "John Doe"}});
        fireEvent.change(screen.getByLabelText("Email input field"), {target: {value: "john@example.com"}});
        fireEvent.change(screen.getByLabelText("Password input field"), {target: {value: "12345678"}});

        // Submit the form
        fireEvent.click(screen.getByLabelText("Submit to create a new account"));

        // Check if the feedback message updates to successful registration
        expect(screen.getByText("Account is made successfully")).toBeInTheDocument();
    });

    it("validates form and handles submission", async () => {
        render(
            <MemoryRouter>
                <LoginOrRegister />
            </MemoryRouter>,
        );

        // Fill out the form
        fireEvent.change(screen.getByLabelText("Name input field"), {target: {value: "John Doe"}});
        fireEvent.change(screen.getByLabelText("Email input field"), {target: {value: "john@example.com"}});
        fireEvent.change(screen.getByLabelText("Password input field"), {target: {value: "12345678"}});

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
                <LoginOrRegister />
            </MemoryRouter>,
        );

        // Fill out the form with an invalid password
        fireEvent.change(screen.getByLabelText("Name input field"), {target: {value: "John Doe"}});
        fireEvent.change(screen.getByLabelText("Email input field"), {target: {value: "john@example.com"}});
        fireEvent.change(screen.getByLabelText("Password input field"), {target: {value: "123"}}); // too short

        // Submit the form
        fireEvent.click(screen.getByLabelText("Submit to create a new account"));

        // Check if the feedback message updates to "Password is not valid"
        expect(screen.getByText("Password is not valid. Password must have 8 characters.")).toBeInTheDocument();
    });
});
