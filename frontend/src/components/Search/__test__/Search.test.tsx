import {render, screen, fireEvent} from "@testing-library/react";
import "@testing-library/jest-dom";
import {describe, it, expect} from "vitest";
import {MemoryRouter} from "react-router-dom";
import Search from "../Search";
import {RecoilRoot} from "recoil";

describe("Search Component Tests", () => {
    it("renders the search input and icon correctly", () => {
        // Render the Search component
        const {asFragment} = render(
            <RecoilRoot>
                <MemoryRouter>
                    <Search />
                </MemoryRouter>
            </RecoilRoot>,
        );

        // Take a snapshot of the initial render
        expect(asFragment()).toMatchSnapshot();

        // Check if the search input field is present
        const inputElement = screen.getByPlaceholderText("Search after countries...");
        expect(inputElement).toBeInTheDocument();

        // Check if the search button (icon) is present
        const searchButton = screen.getByRole("button", {name: "Click to search"});
        expect(searchButton).toBeInTheDocument();
    });

    it("allows typing in the search input", () => {
        // Render the Search component
        render(
            <RecoilRoot>
                <MemoryRouter>
                    <Search />
                </MemoryRouter>
            </RecoilRoot>,
        );

        // Get the input element by its placeholder text
        const inputElement = screen.getByPlaceholderText("Search after countries...");

        // Simulate typing in the input field
        fireEvent.change(inputElement, {target: {value: "Canada"}});

        // Check if the input value has been updated
        expect(inputElement).toHaveValue("Canada");
    });
});
