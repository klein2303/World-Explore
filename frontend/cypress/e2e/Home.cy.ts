describe ("Run the home page on desktop", () => {
    beforeEach(() => {
        cy.viewport(1280, 720);
        cy.visit("http://localhost:5173/project2#/");
    });

    it("Checks if the navbar is loaded", () => {
        cy.get("nav").should("be.visible");
    });

    it("Checks if all the right information is loaded", () => {
        cy.get('[alt="Pink Purple Sunset"]').should("be.visible");

        cy.get("p").contains("All your special travels at one place").should("be.visible");
        cy.get("p").contains("Explore and write to your heart's content").should("be.visible");

        cy.get('[aria-description="Buttons with 10 most popular countries"]').should("be.visible"); 
        cy.get('[aria-label="Title"]').contains("Popular countries").should("be.visible");
    });
})

describe("Run the home page on mobile", () => {
    beforeEach(() => {
        cy.viewport(375, 667);
        cy.visit("http://localhost:5173/project2#/");
    });

    it("Checks if the navbar is loaded", () => {
        cy.get("nav").should("be.visible");
    });

    it("Checks if all the right information is loaded", () => {
        cy.get('[alt="Pink Purple Sunset"]').should("be.visible");

        cy.get("p").contains("All your special travels at one place").should("be.visible");
        cy.get("p").contains("Explore and write to your heart's content").should("be.visible");

        cy.get('[aria-description="Buttons with 10 most popular countries"]').should("be.visible"); 
        cy.get('[aria-label="Title"]').contains("Popular countries").should("be.visible");
    });
});