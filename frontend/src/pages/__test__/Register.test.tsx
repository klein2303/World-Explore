import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Register from "../Register";

describe("Register Component", () => {
    it("renders the Register component correctly", () => {
        const { asFragment } = render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        );

        // Snapshot of the initial render
        expect(asFragment()).toMatchSnapshot();

        // Check if the main register page is rendered
        expect(screen.getByLabelText("Register page")).toBeInTheDocument();

        // Check if the logo link is present
        const logoLink = screen.getByLabelText("link to home page");
        expect(logoLink).toBeInTheDocument();

        // Check if the upper link to login is present
        const loginLinkOver = screen.getByLabelText("Already registered?");
        expect(loginLinkOver).toBeInTheDocument();

        // Check if the lower link to login is present
        const loginLinkUnder = screen.getByLabelText("Already registered");
        expect(loginLinkUnder).toBeInTheDocument();

        // Check if the image is present with correct alt text
        const image = screen.getByAltText("A beautiful landscape");
        expect(image).toBeInTheDocument();
    });
});
