describe("Run Login page on desktop", () => {
    beforeEach(() => {
        cy.viewport(1024, 720);
        cy.visit("http://localhost:5173/project2#/Login");
    });

    it("Check if the right information is displayed on desktop", () => {
        cy.get('[aria-label="Login page"').should("be.visible");
        cy.get('[aria-description="A section for inputs"]').should("be.visible");
        cy.get('[alt="A beautiful landscape"').should("be.visible");

        cy.get('a').contains('WorldExplore').should('be.visible');
        cy.get('a').contains('Create an account').should('be.visible');

        cy.get('h3').contains('Log in').should('be.visible');
        cy.get('h4').contains('Enter your WorldExplore account details').should('be.visible');
        cy.get('input').should('have.length', 2);
        cy.get('button').contains('Log in').should('be.visible');
    });

    it("Check if the create an account link works", () => {
        cy.get('a').contains('Create an account').click();
        cy.url().should("include", "/Register");
    });
});

describe("Run Login page on mobile", () => {
    beforeEach(() => {
        cy.viewport(375, 667);
        cy.visit("http://localhost:5173/project2#/Login");
    });

    it("Check if the right information is displayed on mobile", () => {
        cy.get('[aria-label="Login page"').should("be.visible");
        cy.get('[aria-description="A section for inputs"]').should("be.visible");

        cy.get('[aria-description="arrow to home page"]').should('be.visible');
        cy.get('[id="create-account-mobile"]').should('be.visible');

        cy.get('h3').contains('Log in').should('be.visible');
        cy.get('h4').contains('Enter your WorldExplore account details').should('be.visible');
        cy.get('input').should('have.length', 2);
        cy.get('button').contains('Log in').should('be.visible');
    });

    it("Check if the create an account link works", () => {
        cy.get('[id="create-account-mobile"]').click();
        cy.url().should("include", "/Register");
    });
});