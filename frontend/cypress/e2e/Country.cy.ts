describe("Run the country page on desktop", () => {
    const mockNorwayData = {
        data: {
            country: {
                name: "Norway",
                continent: "Europe",
                capital: "Oslo",
                largestcity: "Oslo",
                currency: "NOK",
                language: "Norwegian",
                population: 5378857,
                landarea: 385207,
                agriculturearea: "2.7%",
                forestarea: "37%",
                co2emission: 44.3,
                image: "https://example.com/norway.jpg",
            },
            filteredpublicreviews: [
                {
                id: "1",
                title: "My trip to Norway",
                date: "2023-01-15",
                rating: 5,
                text: "It was a fantastic experience with breathtaking views.",
                ispublic: true,
                journal: {
                    profile: {
                    username: "TravelerJoe",
                    },
                },
                },
            ],
        },
    };

    beforeEach(() => {
        cy.viewport(1280, 720); 
        cy.window().then((win) => {
            win.sessionStorage.setItem('auth-token', 'test-token');
            win.sessionStorage.setItem('user', 'test-user');
        });

        // Intercept the GraphQL request and mock the response
        cy.intercept("POST", "http://it2810-10.idi.ntnu.no:3001/", (req) => {
            if (req.body.operationName === "GetCountryAndReviews") {
                req.reply({ body: mockNorwayData });
            }
            if (req.body.operationName === "addReview") {
                req.reply({
                    data: {
                        addReview: {
                            ispublic: req.body.variables.ispublic,
                        },
                    },
                });
            }
        }).as("GraphQL");

        cy.visit('http://localhost:5173/project2#/Norway'); 
        cy.wait("@GraphQL", { timeout: 10000 });
    });

    afterEach(() => {
        cy.window().then((win) => {
            win.sessionStorage.removeItem('auth-token');
            win.sessionStorage.removeItem('user');
        });
    })

    it("Checks if the navbar is loaded", () => {
        cy.get("nav").should("be.visible");
    });

    it('Checks if all country information is correctly displayed', () => {
        cy.get('h1').contains('Norway');
        cy.contains('Continent: Europe');
    
        cy.contains('Capital: Oslo');
        cy.contains('Language: Norwegian');
        cy.contains('Currency: NOK');
        cy.contains('Forest Area: 37%');

        cy.get('img[alt="Image of Norway"]').should('be.visible').and('have.attr', 'src', 'https://example.com/norway.jpg');
    
        cy.contains('The name of the country is Norway, and it\'s in the continent Europe.');
        cy.contains('The capital of the country is Oslo, and the largest city is Oslo.');
        cy.contains('The population is 5378857 people, and the land area is 385207 km².');
        cy.contains('The CO2 emission produced by the country is 44.3 tons.');
    });
    
    it('Check if it displays all the public entries for a country', () => {
        cy.get('h3').contains('Public Journal Entries for Norway');
        cy.contains('My trip to Norway');
        cy.contains('It was a fantastic experience with breathtaking views.');
        cy.contains('TravelerJoe');
        cy.contains('5');
        cy.contains('2023-01-15'); 
    });

    it('Checks if a journal entry modal can be opened and closed', () => {
        cy.contains('Write a journal entry').click();
        cy.get('[role="dialog"]').should('be.visible'); 
    
        cy.get('[aria-label="Close modal"]').click();
        cy.get('[role="dialog"]').should('not.exist');
    });

    it("Checks if a journal entry can be written and submited", () => {
        cy.contains("Write a journal entry").click();
        cy.get('[role="dialog"]').should("be.visible");

        cy.get('input[aria-label="Title input"]').type("Norway Adventure");
        cy.get('input[aria-label="Date input"]').type("2023-11-16");
        cy.get('textarea[aria-label="Text area"]').type("Norway was beautiful with amazing fjords!");
        cy.get('[aria-label="Rate 5 stars"]').click();
        cy.get('input[aria-label="Public checkbox"]').check();

        cy.contains("Save your journal entry").click();

        cy.wait("@GraphQL").then((interception) => {
            expect(interception.request.body.operationName).to.equal("addReview");
            expect(interception.request.body.variables).to.deep.include({
                title: "Norway Adventure",
                date: "2023-11-16",
                rating: 5,
                text: "Norway was beautiful with amazing fjords!",
                ispublic: true,
                profileid: "test-user",
                countryid: "Norway",
            });
        });

        cy.get('[role="dialog"]').should("not.exist");
    });

    it('Checks if the navigate button maps to the right place', () => {
        cy.contains('Return to Explore').click();
        cy.url().should('include', '/ExploreCountries');
    });
});

describe("Run the country page on mobile", () => {
    const mockJapanData = {
        data: {
            country: {
                name: "Japan",
                continent: "Asia",
                capital: "Tokyo",
                largestcity: "Tokyo",
                currency: "JPY",
                language: "Japanese",
                population: 126476461,
                landarea: 377975,
                agriculturearea: "12%",
                forestarea: "68.5%",
                co2emission: 1009,
                image: "https://example.com/japan.jpg",
            },
            filteredpublicreviews: [
                {
                    id: "1",
                    title: "Cherry blossoms in Japan",
                    date: "2023-03-20",
                    rating: 4,
                    text: "The cherry blossoms were stunning, and the culture was fascinating.",
                    ispublic: true,
                    journal: {
                        profile: {
                            username: "Globetrotter123",
                        },
                    },
                },
            ],
        },
    };
    
    beforeEach(() => {
        cy.viewport(375, 667);
        cy.window().then((win) => {
            win.sessionStorage.setItem('auth-token', 'test-token');
            win.sessionStorage.setItem('user', 'test-user');
        });
    
        // Intercept the GraphQL request and mock the response
        cy.intercept("POST", "http://it2810-10.idi.ntnu.no:3001/", (req) => {
            if (req.body.operationName === "GetCountryAndReviews") {
                req.reply({ body: mockJapanData });
            }
            if (req.body.operationName === "addReview") {
                req.reply({
                    data: {
                        addReview: {
                            ispublic: req.body.variables.ispublic,
                        },
                    },
                });
            }
        }).as("GraphQL");

        cy.visit("http://localhost:5173/project2#/Japan");
        cy.wait("@GraphQL", { timeout: 10000 });
    });
    
    afterEach(() => {
        cy.window().then((win) => {
            win.sessionStorage.removeItem('auth-token');
            win.sessionStorage.removeItem('user');
        });
    });

    it("Checks if the navbar is loaded", () => {
        cy.get("nav").should("be.visible");
    });
    
    it('Checks if all country information is correctly displayed', () => {
        cy.get('h1').contains('Japan');
        cy.contains('Continent: Asia');
    
        cy.contains('Capital: Tokyo');
        cy.contains('Language: Japanese');
        cy.contains('Currency: JPY');
        cy.contains('Forest Area: 68.5%');
    
        cy.get('img[alt="Image of Japan"]').should('be.visible').and('have.attr', 'src', 'https://example.com/japan.jpg');
    
        cy.contains('The name of the country is Japan, and it\'s in the continent Asia.');
        cy.contains('The capital of the country is Tokyo, and the largest city is Tokyo.');
        cy.contains('The population is 126476461 people, and the land area is 377975 km².');
        cy.contains('The CO2 emission produced by the country is 1009 tons.');
    });
    
    it('Check if it displays all the public entries for a country', () => {
        cy.get('h3').contains('Public Journal Entries for Japan');
        cy.contains('Cherry blossoms in Japan');
        cy.contains('The cherry blossoms were stunning, and the culture was fascinating.');
        cy.contains('Globetrotter123');
        cy.contains('4');
        cy.contains('2023-03-20');
    });
    
    it('Checks if a journal entry modal can be opened and closed', () => {
        cy.contains('Write a journal entry').click();
        cy.get('[role="dialog"]').should('be.visible');
    
        cy.get('[aria-label="Close modal"]').click();
        cy.get('[role="dialog"]').should('not.exist');
    });

    it("Checks if a journal entry can be written and submited", () => {
        cy.contains("Write a journal entry").click();
        cy.get('[role="dialog"]').should("be.visible");

        cy.get('input[aria-label="Title input"]').type("Cherry Blossoms in Japan");
        cy.get('input[aria-label="Date input"]').type("2023-11-20");
        cy.get('textarea[aria-label="Text area"]').type("Japan was breathtaking with its cherry blossoms!");
        cy.get('[aria-label="Rate 4 stars"]').click();
        cy.get('input[aria-label="Public checkbox"]').check();

        cy.contains("Save your journal entry").click();

        cy.wait("@GraphQL").then((interception) => {
            expect(interception.request.body.operationName).to.equal("addReview");
            expect(interception.request.body.variables).to.deep.include({
                title: "Cherry Blossoms in Japan",
                date: "2023-11-20",
                rating: 4,
                text: "Japan was breathtaking with its cherry blossoms!",
                ispublic: true,
                profileid: "test-user",
                countryid: "Japan",
            });
        });

        cy.get('[role="dialog"]').should("not.exist");
    });
    
    it('Checks if the navigate button maps to the right place', () => {
        cy.contains('Return to Explore').click();
        cy.url().should('include', '/ExploreCountries');
    });    
});