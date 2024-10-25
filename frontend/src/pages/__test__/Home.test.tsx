import { render, screen } from "@testing-library/react";
import Home from "../Home";
import { vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

// Mock the image import
vi.mock("/homepage.svg", () => ({
    default: "mocked-homepage-image-path",
}));

describe("Home Component", () => {
    it("should render the image component", () => {
        const { container } = render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>,
        );

        // Snapshot of the rendered Home component
        expect(container).toMatchSnapshot();

        // Assert that the image is rendered with the correct alt text
        const homepageImage = screen.getByAltText(/The ocean in a tropical landscape/i);
        expect(homepageImage).toBeInTheDocument();
        expect(homepageImage).toHaveAttribute("src", "mocked-homepage-image-path");

        // Assert that the top and bottom texts are rendered
        expect(screen.getByText(/All your special travels at one place/i)).toBeInTheDocument();
        expect(screen.getByText(/Explore and write to your heart's content/i)).toBeInTheDocument();
    });

    it("should have appropriate roles and aria-labels", () => {
        const { container } = render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>,
        );

        // Snapshot of the rendered Home component
        expect(container).toMatchSnapshot();

        // Assert that the main element has the role of 'main'
        const mainElement = screen.getByRole("main", { name: /Homepage/i });
        expect(mainElement).toBeInTheDocument();

        // Assert that the article has the aria-label 'Homepage image'
        const articleElement = screen.getByLabelText("Homepage image");
        expect(articleElement).toBeInTheDocument();
    });
});
