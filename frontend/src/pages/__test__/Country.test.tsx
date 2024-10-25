import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Country from "../Country";
import Countries from "../../data/Countries";

describe("Country Component Tests", () => {
    const mockCountry = {
        name: "CountryName",
        continent: "ContinentName",
        capital: "CapitalCity",
        language: "LanguageSpoken",
        currency: "CountryCurrency",
        forest_area: "20%",
        largest_city: "LargestCity",
        population: "10 million",
        land_area: "500,000",
        agriculture_area: "30%",
        co2_emissions: "100 million tons",
        image: "/path/to/image.jpg",
    };

    // Create a mock implementation of the find method
    beforeEach(() => {
        Countries.find = vi.fn().mockReturnValue(mockCountry);
    });

    it("renders the loading state correctly when no country is found", () => {
        Countries.find = vi.fn().mockReturnValue(null);
        render(
            <MemoryRouter initialEntries={["/Country/CountryName"]}>
                <Routes>
                    <Route path="/Country/:name" element={<Country />} />
                </Routes>
            </MemoryRouter>,
        );

        expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("renders the country information correctly", () => {
        render(
            <MemoryRouter initialEntries={["/Country/CountryName"]}>
                <Routes>
                    <Route path="/Country/:name" element={<Country />} />
                </Routes>
            </MemoryRouter>,
        );

        // Check if the Navbar is rendered
        expect(screen.getByRole("navigation")).toBeInTheDocument();

        // Check country name, continent, and other information
        expect(screen.getByRole("heading", { name: "CountryName" })).toBeInTheDocument();
        expect(screen.getByText("Continent: ContinentName")).toBeInTheDocument();
        expect(screen.getByText("Capital: CapitalCity")).toBeInTheDocument();
        expect(screen.getByText("Language: LanguageSpoken")).toBeInTheDocument();
        expect(screen.getByText("Currency: CountryCurrency")).toBeInTheDocument();
        expect(screen.getByText("Forest Area: 20%")).toBeInTheDocument();

        // Check for the information box
        expect(screen.getByRole("complementary")).toBeInTheDocument();
        expect(screen.getByText("About the Country")).toBeInTheDocument();

        // Check for the return link
        expect(screen.getByText("Return to Explore")).toBeInTheDocument();
    });

    it("renders the image with the correct alt text", () => {
        render(
            <MemoryRouter initialEntries={["/Country/CountryName"]}>
                <Routes>
                    <Route path="/Country/:name" element={<Country />} />
                </Routes>
            </MemoryRouter>,
        );

        const countryImage = screen.getByAltText("Image of CountryName");
        expect(countryImage).toBeInTheDocument();
        expect(countryImage).toHaveAttribute("src", mockCountry.image);
    });

    it("navigates back to explore countries when clicking the return link", () => {
        render(
            <MemoryRouter initialEntries={["/Country/CountryName"]}>
                <Routes>
                    <Route path="/Country/:name" element={<Country />} />
                    <Route path="/ExploreCountries" element={<p>Explore Countries Page</p>} />
                </Routes>
            </MemoryRouter>,
        );

        // Simulate clicking the return link
        const returnLink = screen.getByText("Return to Explore");
        fireEvent.click(returnLink);

        // Check if the Explore Countries page is displayed
        expect(screen.getByText("Explore Countries Page")).toBeInTheDocument();
    });
});
