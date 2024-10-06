import { render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect} from "vitest";
import { RecoilRoot } from "recoil";
import ExploreCountries from "../ExploreCountries";
import { MemoryRouter } from "react-router-dom";

describe("ExploreCountries Component", () => {
  it("renders the ExploreCountries component correctly", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <RecoilRoot>
          <ExploreCountries />
        </RecoilRoot>
      </MemoryRouter>
    );

    // Snapshot of the initial render
    expect(asFragment()).toMatchSnapshot();

    // Check if the title is in the document
    expect(screen.getByText("Discover your dream vacations")).toBeInTheDocument();

    // Check if filter section is present
    const filterSection = screen.getByLabelText("Filter based on continents");
    expect(filterSection).toBeInTheDocument(); 
    
    // Check if the search input is present
    const searchInput = screen.getByLabelText("Search countries");
    expect(searchInput).toBeInTheDocument();

    // Check if the sort dropdown is present
    const sortDropdown = screen.getByLabelText("Sort countries alphabetically");
    expect(sortDropdown).toBeInTheDocument();
  });
});
