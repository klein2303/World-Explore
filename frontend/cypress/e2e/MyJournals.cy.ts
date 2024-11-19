describe("Run My Journals page on desktop", () => {
    beforeEach(() => {
        cy.viewport(1024, 720);

        cy.window().then((win) => {
            win.sessionStorage.setItem("auth-token", "test-token");
            win.sessionStorage.setItem("user", "test-user");
        });

        cy.intercept("POST", "http://it2810-10.idi.ntnu.no:3001/", (req) => {
            if (req.body.operationName === "GetWrittenJournals") {
                req.reply({
                    data: {
                        writtenjournals: [
                            { countryid: "US", countryimage: "usa.jpg" },
                            { countryid: "FR", countryimage: "france.jpg" },
                            { countryid: "JP", countryimage: "japan.jpg" },
                        ],
                    },
                });
            }
        }).as("GraphQL");

        cy.visit("http://localhost:5173/project2#/MyJournals");
        cy.wait("@GraphQL", { timeout: 10000 });
    });

    afterEach(() => {
        cy.window().then((win) => {
            win.sessionStorage.removeItem("auth-token");
            win.sessionStorage.removeItem("user");
        });
    });

    it("Checks if the navbar is loaded", () => {
        cy.get("nav").should("be.visible");
    });

    it("Checks if the right information is displayed", () => {
        cy.get("h2").contains("Your travel stories, captured and cherished forever.").should("be.visible");

        cy.get("#journals-panel").within(() => {
            cy.get("img").should("have.length", 3);
            cy.contains("US");
            cy.contains("FR");
            cy.contains("JP");
        });

        cy.get(".MuiPagination-root").should("be.visible");
    });
});

describe("Run My Journals page on mobile", () => {
    beforeEach(() => {
        cy.viewport(375, 667);

        cy.window().then((win) => {
            win.sessionStorage.setItem("auth-token", "test-token");
            win.sessionStorage.setItem("user", "test-user");
        });

        cy.intercept("POST", "http://it2810-10.idi.ntnu.no:3001/", (req) => {
            if (req.body.operationName === "GetWrittenJournals") {
                req.reply({
                    data: {
                        writtenjournals: [
                            { countryid: "SW", countryimage: "sweden.jpg" },
                            { countryid: "NR", countryimage: "norway.jpg" },
                            { countryid: "GR", countryimage: "germany.jpg" },
                        ],
                    },
                });
            }
        }).as("GraphQL");

        cy.visit("http://localhost:5173/project2#/MyJournals");
        cy.wait("@GraphQL", { timeout: 10000 });
    });

    afterEach(() => {
        cy.window().then((win) => {
            win.sessionStorage.removeItem("auth-token");
            win.sessionStorage.removeItem("user");
        });
    });

    it("Checks if the navbar is loaded", () => {
        cy.get("nav").should("be.visible");
    });

    it("Checks if the right information is displayed", () => {
        cy.get("h2").contains("Tap the images to dive into your adventures!").should("be.visible");

        cy.get("#journals-panel").within(() => {
            cy.get("img").should("have.length", 3);
            cy.contains("SW");
            cy.contains("NR");
            cy.contains("GR");
        });

        cy.get(".MuiPagination-root").should("be.visible");
    });
});

describe("Run My Journals page on desktop with no journals", () => {
    beforeEach(() => {
        cy.window().then((win) => {
            win.sessionStorage.setItem("auth-token", "test-token");
            win.sessionStorage.setItem("user", "test-user");
        });

        cy.intercept("POST", "http://it2810-10.idi.ntnu.no:3001/", (req) => {
            if (req.body.operationName === "GetWrittenJournals") {
                req.reply({
                    data: {
                        writtenjournals: [],
                    },
                });
            }
        }).as("GraphQL");

        cy.visit("http://localhost:5173/project2#/MyJournals");
        cy.wait("@GraphQL", { timeout: 10000 });
    });

    afterEach(() => {
        cy.window().then((win) => {
            win.sessionStorage.removeItem("auth-token");
            win.sessionStorage.removeItem("user");
        });
    });

    it("Checks if the right information is displayed on desktop", () => {
        cy.viewport(1024, 720);

        cy.get("p")
            .contains("You haven´t written any journal entries yet. Explore all the countries in the world here:")
            .should("be.visible");
        cy.get("a").contains("Explore Countries Page").should("be.visible");
    });

    it("Checks if the right information is displayed on mobile", () => {
        cy.viewport(375, 667);

        cy.get("p")
            .contains("You haven´t written any journal entries yet. Explore all the countries in the world here:")
            .should("be.visible");
        cy.get("a").contains("Explore Countries Page").should("be.visible");
    });
});
