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

        cy.get("p").contains("Welcome to World Explore!");
        cy.get("p").contains("All your special travels at one place").should("be.visible");
        cy.get("p").contains("Explore and write to your heart's content").should("be.visible");

        cy.get("p").contains("Hello World!").should("be.visible");
        cy.get('[alt="Fjords in Norway"]').should("be.visible");

        cy.get("p").contains("Explore Countries!").should("be.visible");
        cy.get('[alt="Taj Mahal"]').should("be.visible");

        cy.get("p").contains("Write your own journals!").should("be.visible");
        cy.get('[alt="Switzerland nature"]').should("be.visible");

        cy.get("p").contains("Create an account to start your exploration, create unforgettable memories, and let your journal entries bring the world to life.").should("be.visible");
        cy.get("button").contains("Start now").should("be.visible");
    });

    it("Checks if the user can click the start now button", () => {
        cy.get("button").contains("Start now").click();
        cy.url().should("include", "/Register");
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

        cy.get("p").contains("Welcome to World Explore!");
        cy.get("p").contains("All your special travels at one place").should("be.visible");
        cy.get("p").contains("Explore and write to your heart's content").should("be.visible");

        cy.get("p").contains("Hello World!").should("be.visible");
        cy.get('[alt="Fjords in Norway"]').should("not.be.visible");

        cy.get("p").contains("Explore Countries!").should("be.visible");
        cy.get('[alt="Taj Mahal"]').should("not.be.visible");

        cy.get("p").contains("Write your own journals!").should("be.visible");
        cy.get('[alt="Switzerland nature"]').should("not.be.visible");

        cy.get("p").contains("Create an account to start your exploration, create unforgettable memories, and let your journal entries bring the world to life.").should("be.visible");
        cy.get("button").contains("Start now").should("be.visible");
    });

    it("Checks if the user can click the start now button", () => {
        cy.get("button").contains("Start now").click();
        cy.url().should("include", "/Register");
    });
});