import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import { MockedProvider } from "@apollo/client/testing";
import { RecoilRoot } from "recoil";
import { MemoryRouter } from "react-router-dom"; // Add this
import CountryCardList from "../CountryCardList";
import { gql } from "@apollo/client";

// Mock data for the GraphQL query
const mockCountriesData = {
    request: {
        query: gql`
            {
                filteredcountries(
                    skip: 0
                    name: ""
                    continents: ["Asia", "Africa", "Europe", "North America", "South America", "Oceania"]
                    sort: true
                ) {
                    name
                    capital
                    continent
                    image
                }
            }
        `,
    },
    result: {
        data: {
            filteredcountries: [
                { name: "Norway", capital: "Oslo", continent: "Europe", image: "/images/norway.png" },
                { name: "Japan", capital: "Tokyo", continent: "Asia", image: "/images/japan.png" },
                { name: "Canada", capital: "Ottawa", continent: "North America", image: "/images/canada.png" },
            ],
        },
    },
};

describe("CountryCardList Component Tests", () => {
    it("renders loading state initially", () => {
        render(
            <RecoilRoot>
                <MockedProvider mocks={[mockCountriesData]} addTypename={false}>
                    <MemoryRouter>
                        <CountryCardList />
                    </MemoryRouter>
                </MockedProvider>
            </RecoilRoot>,
        );

        // Check for loading text
        const loadingElement = screen.getByText("Loading...");
        expect(loadingElement).toBeInTheDocument();
    });

    /*it("renders the list of countries correctly", async () => {
        render(
            <RecoilRoot>
                <MockedProvider mocks={[mockCountriesData]} addTypename={false}>
                    <MemoryRouter>
                        <CountryCardList />
                    </MemoryRouter>
                </MockedProvider>
            </RecoilRoot>
        );

        // Wait for the data to load
        const countryItems = await screen.findAllByRole("listitem");

        // Assert the correct number of list items
        expect(countryItems).toHaveLength(12);

        // Assert specific countries are displayed
        expect(screen.getByText("Norway")).toBeInTheDocument();
        expect(screen.getByText("Japan")).toBeInTheDocument();
        expect(screen.getByText("Canada")).toBeInTheDocument();
    });*/

    it("renders an error message on query failure", async () => {
        const mockErrorData = {
            request: mockCountriesData.request,
            error: new Error("Something went wrong!"),
        };

        render(
            <RecoilRoot>
                <MockedProvider mocks={[mockErrorData]} addTypename={false}>
                    <MemoryRouter>
                        <CountryCardList />
                    </MemoryRouter>
                </MockedProvider>
            </RecoilRoot>,
        );

        // Wait for the error message
        const errorElement = await screen.findByText("Error: Something went wrong!");
        expect(errorElement).toBeInTheDocument();
    });
});
