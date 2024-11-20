describe("Run Register page on desktop", () => {
    beforeEach(() => {
        cy.viewport(1280, 720);
        cy.visit("http://localhost:5173/project2#/Register");
    });

    it("Check if the right information is displayed on desktop", () => {
        cy.get('[aria-label="Register page"').should("be.visible");
        cy.get('[aria-description="A section for inputs"]').should("be.visible");
        cy.get('[alt="A beautiful landscape"').should("be.visible");

        cy.get("a").contains("WorldExplore").should("be.visible");
        cy.get('[aria-describedby="registered"]').should("be.visible");

        cy.get("h5").contains("Create an account").should("be.visible");
        cy.get("input").should("have.length", 3);
        cy.get("button").contains("Create account").should("be.visible");
    });

    it("Check if the already registered link works", () => {
        cy.get('[aria-describedby="registered"]').click();
        cy.url().should("include", "/LogIn");
    });
});

describe("Run Register page on mobile", () => {
    beforeEach(() => {
        cy.viewport(375, 667);
        cy.visit("http://localhost:5173/project2#/Register");
    });

    it("Check if the right information is displayed on mobile", () => {
        cy.get('[aria-label="Register page"').should("be.visible");
        cy.get('[aria-description="A section for inputs"]').should("be.visible");

        cy.get('[aria-label="arrow to home page"]').should("be.visible");
        // cy.get('a[aria-describedby="registered-mobile"]').should('be.visible');

        cy.get("h5").contains("Create an account").should("be.visible");
        cy.get("input").should("have.length", 3);
        cy.get("button").contains("Create account").should("be.visible");
    });
});
