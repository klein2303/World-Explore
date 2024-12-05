import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { describe, it, expect, vi } from "vitest";
import Search from "../Search";

// Mock `setFilters` from `FilterStorage` to track calls
vi.mock("../../../utils/FilterStorage", async () => {
    const originalModule = await vi.importActual("../../../utils/FilterStorage");
    return {
        ...originalModule, // Include all original exports
        setFilters: vi.fn(), // Mock only `setFilters`
    };
});

describe("Search Component", () => {

    it("renders correctly and matches snapshot", () => {
        const { asFragment } = render(
            <RecoilRoot>
                <Search />
            </RecoilRoot>,
        );

        // Verify input and search icon are rendered
        expect(screen.getByPlaceholderText("Search after countries...")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Search button" })).toBeInTheDocument();

        // Match snapshot for initial render
        expect(asFragment()).toMatchSnapshot();
    });

    it("updates input value when typing", () => {
        render(
            <RecoilRoot>
                <Search />
            </RecoilRoot>,
        );

        const input = screen.getByPlaceholderText("Search after countries...");

        // Simulate typing
        fireEvent.change(input, { target: { value: "Norway" } });

        // Verify the input value is updated
        expect(input).toHaveValue("Norway");
    });

    it("renders correctly in a snapshot after typing", async () => {
        const { asFragment } = render(
            <RecoilRoot>
                <Search />
            </RecoilRoot>,
        );

        const input = screen.getByPlaceholderText("Search after countries...");

        // Simulate typing
        fireEvent.change(input, { target: { value: "Denmark" } });

        // Wait for debounce to finish
        await waitFor(() => {
            // Verify the component matches the snapshot after typing
            expect(asFragment()).toMatchSnapshot();
        });
    });
});
