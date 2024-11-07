describe("Run the explore page on desktop", () => {
    beforeEach(() => {
        cy.viewport(1280, 720);
        cy.visit("http://localhost:5173/project2#/ExploreCountries");
    });

    it("Checks if the navbar is loaded", () => {
        cy.get("nav").should("be.visible");
    });

    it("Checks if everything is being displayed", () => {
        cy.get('[aria-label="Search countries"]').should("be.visible");
        cy.get('[aria-label="Filter based on continents"]').should("be.visible");
        cy.get('[aria-label="Sort countries alphabetically"]').should("be.visible");

        cy.get('[role="region"][aria-labelledby="country-list"]').should("be.visible");
        cy.get('[role="list"]').should("have.length.greaterThan", 0);

        cy.get(".MuiPagination-root").should("be.visible");
    });

    it("Checks if the search bar works", () => {
        cy.get('[aria-label="Search countries"]').type("India");
        cy.get('[role="list"]').contains("India").should("be.visible");
        cy.get('[role="list"]').should("have.length", 1);
    });

    it("Checks if the filter functionality works", () => {
        cy.get('[role="list"]').then((initialList) => {
            const initialCount = initialList.children().length;

            cy.get('[aria-label="Filter based on continents"]').contains("Europe").click();

            // Check if the count has descreased after applying "Europe" filter first and then increased after applying "Asia" filter too
            cy.get('[role="list"]')
                .should((updatedListAfterEurope) => {
                    const updatedCountAfterEurope = updatedListAfterEurope.children().length;
                    expect(updatedCountAfterEurope).to.be.lessThan(initialCount);
                })
                .then((updatedListAfterEurope) => {
                    const updatedCountAfterEurope = updatedListAfterEurope.children().length;

                    cy.get('[aria-label="Filter based on continents"]').contains("Asia").click();
                    cy.get('[role="list"]').should((updatedListAfterAsia) => {
                        const updatedCountAfterAsia = updatedListAfterAsia.children().length;
                        expect(updatedCountAfterAsia).to.be.greaterThan(updatedCountAfterEurope);
                    });
                });
        });
    });

    it("Checks if the sort functionality works", () => {
        // Checks if the original order of the list is A-z and then Z-A after clicking on the dropdown
        cy.get('[role="list"] [role="listitem"]').then((items) => {
            const originalOrder = [...items].map((item) => item.textContent);

            cy.get('[aria-label="Sort countries alphabetically"]').select("A-Z");

            // Verify that the list is sorted in ascending order (A-Z)
            cy.get('[role="list"] [role="listitem"]').then((sortedItemsAtoZ) => {
                const sortedOrderAtoZ = [...sortedItemsAtoZ].map((item) => item.textContent);
                expect(sortedOrderAtoZ).to.deep.equal([...sortedOrderAtoZ].sort());
            });

            cy.get('[aria-label="Sort countries alphabetically"]').select("Z-A");

            // Verify that the list is sorted in descending order (Z-A)
            cy.get('[role="list"] [role="listitem"]').then((sortedItemsZtoA) => {
                const sortedOrderZtoA = [...sortedItemsZtoA].map((item) => item.textContent);
                expect(sortedOrderZtoA).to.deep.equal([...sortedOrderZtoA].sort().reverse());
            });
        });
    });

    it("Checks if the pagination works", () => {
        // Checks if the original page is 1 and then changes to 2 after clicking on the next page button
        cy.get(".MuiPagination-root").contains("1").should("have.class", "Mui-selected");
        cy.get(".MuiPagination-root").contains("2").click();
        cy.get(".MuiPagination-root").contains("2").should("have.class", "Mui-selected");
    });

    it("Checks if the search, filter and sort functionaliity work together", () => {
        // Step 1: Apply the filter (e.g., continent filter for "Europe")
        cy.get('[aria-label="Filter based on continents"]').contains("Europe").click();

        // Verify that the filter is applied (check if at least one country is displayed)
        cy.get('[role="list"]').children().should("have.length.greaterThan", 0);

        // Step 2: Apply sorting (e.g., sort Z-A)
        cy.get('[aria-label="Sort countries alphabetically"]').select("Z-A");

        // Capture the sorted list order after filtering
        cy.get('[role="list"] [role="listitem"]').then((itemsAfterFilterAndSort) => {
            cy.get('[role="list"] [role="listitem"]').then((sortedItemsZtoA) => {
                const sortedOrderZtoA = [...sortedItemsZtoA].map((item) => item.textContent);
                expect(sortedOrderZtoA).to.deep.equal([...sortedOrderZtoA].sort().reverse());
            });

            cy.get('[aria-label="Search countries"]').type("India");
            cy.get('[role="list"]').children().should("have.length", 0);

            cy.get('[aria-label="Filter based on continents"]').contains("Asia").click();
            cy.get('[role="list"]').contains("India").should("be.visible");
            cy.get('[role="list"]').children().should("have.length", 1);
        });
    });
});

describe("Run the explore page on mobile", () => {
    beforeEach(() => {
        cy.viewport(375, 667);
        cy.visit("http://localhost:5173/project2#/ExploreCountries");
    });

    it("Checks if the navbar is loaded", () => {
        cy.get("nav").should("be.visible");
    });

    it("Checks if everything is being displayed", () => {
        cy.get('[aria-label="Search countries"]').should("be.visible");
        cy.get('[aria-label="Filter based on continents"]').should("be.visible");
        cy.get('[aria-label="Sort countries alphabetically"]').should("be.visible");

        cy.get('[role="region"][aria-labelledby="country-list"]').should("be.visible");
        cy.get('[role="list"]').should("have.length.greaterThan", 0);

        cy.get(".MuiPagination-root").should("be.visible");
    });

    it("Checks if the filter functionality works", () => {
        cy.get('[role="list"]').then((initialList) => {
            const initialCount = initialList.children().length;

            cy.get('[aria-label="Filter based on continents"]').contains("Africa").click();

            // Check if the count has descreased after applying "Europe" filter first and then increased after applying "Asia" filter too
            cy.get('[role="list"]')
                .should((updatedListAfterAfrica) => {
                    const updatedCountAfterAfrica = updatedListAfterAfrica.children().length;
                    expect(updatedCountAfterAfrica).to.be.lessThan(initialCount);
                })
                .then((updatedListAfterAfrica) => {
                    const updatedCountAfterAfrica = updatedListAfterAfrica.children().length;

                    cy.get('[aria-label="Filter based on continents"]').contains("Oceania").click();
                    cy.get('[role="list"]').should((updatedListAfterAsia) => {
                        const updatedCountAfterOceania = updatedListAfterAsia.children().length;
                        expect(updatedCountAfterOceania).to.be.greaterThan(updatedCountAfterAfrica);
                    });
                });
        });
    });

    it("Checks if the sort functionality works", () => {
        // Checks if the original order of the list is A-z and then Z-A after clicking on the dropdown
        cy.get('[role="list"] [role="listitem"]').then((items) => {
            const originalOrder = [...items].map((item) => item.textContent);

            cy.get('[aria-label="Sort countries alphabetically"]').select("A-Z");

            // Verify that the list is sorted in ascending order (A-Z)
            cy.get('[role="list"] [role="listitem"]').then((sortedItemsAtoZ) => {
                const sortedOrderAtoZ = [...sortedItemsAtoZ].map((item) => item.textContent);
                expect(sortedOrderAtoZ).to.deep.equal([...sortedOrderAtoZ].sort());
            });

            cy.get('[aria-label="Sort countries alphabetically"]').select("Z-A");

            // Verify that the list is sorted in descending order (Z-A)
            cy.get('[role="list"] [role="listitem"]').then((sortedItemsZtoA) => {
                const sortedOrderZtoA = [...sortedItemsZtoA].map((item) => item.textContent);
                expect(sortedOrderZtoA).to.deep.equal([...sortedOrderZtoA].sort().reverse());
            });
        });
    });

    it("Checks if the pagination works", () => {
        // Checks if the original page is 1 and then changes to 2 after clicking on the next page button
        cy.get(".MuiPagination-root").contains("1").should("have.class", "Mui-selected");
        cy.get(".MuiPagination-root").contains("3").click();
        cy.get(".MuiPagination-root").contains("3").should("have.class", "Mui-selected");
    });

    it("Checks if the search, filter and sort functionaliity work together", () => {
        // Step 1: Apply the filter (e.g., continent filter for "Europe")
        cy.get('[aria-label="Filter based on continents"]').contains("Europe").click();

        // Verify that the filter is applied (check if at least one country is displayed)
        cy.get('[role="list"]').children().should("have.length.greaterThan", 0);

        // Step 2: Apply sorting (e.g., sort Z-A)
        cy.get('[aria-label="Sort countries alphabetically"]').select("Z-A");

        // Capture the sorted list order after filtering
        cy.get('[role="list"] [role="listitem"]').then((itemsAfterFilterAndSort) => {
            cy.get('[role="list"] [role="listitem"]').then((sortedItemsZtoA) => {
                const sortedOrderZtoA = [...sortedItemsZtoA].map((item) => item.textContent);
                expect(sortedOrderZtoA).to.deep.equal([...sortedOrderZtoA].sort().reverse());
            });

            cy.get('[aria-label="Search countries"]').type("Japan");
            cy.get('[role="list"]').children().should("have.length", 0);

            cy.get('[aria-label="Filter based on continents"]').contains("Asia").click();
            cy.get('[role="list"]').contains("Japan").should("be.visible");
            cy.get('[role="list"]').children().should("have.length", 1);
        });
    });
});
