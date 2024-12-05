import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Navbar from "../Navbar";
import { ThemeContext } from "../../../context/ThemeContext";

// Mock sessionStorage
const mockSessionStorage = (() => {
    let store: Record<string, string> = {};
    return {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => (store[key] = value.toString()),
        removeItem: (key: string) => delete store[key],
        clear: () => (store = {}),
    };
})();
vi.stubGlobal("sessionStorage", mockSessionStorage);

// Mock `window.matchMedia`
vi.stubGlobal("matchMedia", (query: string) => ({
    matches: query === "(max-width: 800px)",
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
}));

vi.mock("focus-trap-react", () => ({
    __esModule: true,
    default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe("Navbar Component", () => {
    const mockToggleTheme = vi.fn();
    const mockTheme = "light";

    beforeEach(() => {
        sessionStorage.clear();
    });

    const renderWithTheme = (ui: React.ReactElement) => {
        return render(
            <MemoryRouter>
                <ThemeContext.Provider value={{ theme: mockTheme, toggleTheme: mockToggleTheme }}>
                    {ui}
                </ThemeContext.Provider>
            </MemoryRouter>,
        );
    };

    it("renders correctly when user is logged in and matches snapshot", () => {
        sessionStorage.setItem("auth-token", "mock-token");

        const { asFragment } = renderWithTheme(<Navbar />);

        // Verify elements
        expect(screen.getByText("WorldExplore")).toBeInTheDocument();
        expect(screen.getByText("Explore Countries")).toBeInTheDocument();
        expect(screen.getByText("My Journals")).toBeInTheDocument();
        expect(screen.getByText("Sign Out")).toBeInTheDocument();

        // Match snapshot
        expect(asFragment()).toMatchSnapshot();
    });

    it("renders correctly when user is not logged in and matches snapshot", () => {
        const { asFragment } = renderWithTheme(<Navbar />);

        // Verify elements
        expect(screen.getByText("WorldExplore")).toBeInTheDocument();
        expect(screen.getByText("Log in")).toBeInTheDocument();

        // Match snapshot
        expect(asFragment()).toMatchSnapshot();
    });

    it("opens and closes the mobile menu", async () => {
        sessionStorage.setItem("auth-token", "mock-token");

        renderWithTheme(<Navbar />);

        // Open mobile menu using the test ID
        const hamburgerButton = screen.getByTestId("HamburgerMenu");
        fireEvent.click(hamburgerButton);

        // Wait for the mobile menu to appear
        await waitFor(() => expect(screen.getByRole("dialog", { name: "Mobile Navigation Menu" })).toBeInTheDocument());

        // Close mobile menu
        const closeButton = screen.getByTestId("Close-Mobile-Menu");
        fireEvent.click(closeButton);

        // Wait for the mobile menu to disappear
        await waitFor(() =>
            expect(screen.queryByRole("dialog", { name: "Mobile Navigation Menu" })).not.toBeInTheDocument(),
        );
    });

    it("calls sign out and clears session storage when clicking 'Sign Out'", () => {
        sessionStorage.setItem("auth-token", "mock-token");
        sessionStorage.setItem("user", "mock-user");

        renderWithTheme(<Navbar />);

        // Sign out
        const signOutButton = screen.getByText("Sign Out");
        fireEvent.click(signOutButton);

        // Verify session storage is cleared
        expect(sessionStorage.getItem("auth-token")).toBeNull();
        expect(sessionStorage.getItem("user")).toBeNull();
    });

    it("renders correctly in mobile view", async () => {
        // Simulate mobile viewport
        Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: 375 });
        window.dispatchEvent(new Event("resize"));

        sessionStorage.setItem("auth-token", "mock-token");

        const { asFragment } = renderWithTheme(<Navbar />);

        // Verify mobile elements using `data-testid`
        const hamburgerButton = screen.getByTestId("HamburgerMenu");
        expect(hamburgerButton).toBeInTheDocument();

        // Match snapshot
        expect(asFragment()).toMatchSnapshot();
    });
});
