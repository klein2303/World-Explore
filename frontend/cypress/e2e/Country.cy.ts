describe("Run the country page on desttop", () => {
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
        cy.intercept('POST', 'http://it2810-10.idi.ntnu.no:3001/', (req) => {
        if (req.body.operationName === 'GetCountryAndReviews') {
            req.reply({ body: mockNorwayData });
        }
        }).as('GetCountryAndReviews');

        cy.visit('http://localhost:5173/project2#/Norway'); 
        cy.wait('@GetCountryAndReviews', { timeout: 10000 });
    });

    afterEach(() => {
        cy.window().then((win) => {
            win.sessionStorage.removeItem('auth-token');
            win.sessionStorage.removeItem('user');
        });
    })

    it('should display all country information correctly', () => {
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
    
    it('should display public journal entries for the country', () => {
        cy.get('h3').contains('Public Journal Entries for Norway');
        cy.contains('My trip to Norway');
        cy.contains('It was a fantastic experience with breathtaking views.');
        cy.contains('TravelerJoe');
        cy.contains('5');
        cy.contains('2023-01-15'); 
    });

    it('should allow the user to open and close the journal entry modal', () => {
        cy.contains('Write a journal entry').click();
        cy.get('[role="dialog"]').should('be.visible'); 
    
        cy.get('[aria-label="Close modal"]').click();
        cy.get('[role="dialog"]').should('not.exist');
    });

    it('should navigate back to Explore Countries when clicking the return button', () => {
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
        cy.intercept('POST', 'http://it2810-10.idi.ntnu.no:3001/', (req) => {
            if (req.body.operationName === 'GetCountryAndReviews') {
                req.reply({ body: mockJapanData });
            }
        }).as('GetCountryAndReviews');
    
        cy.visit('http://localhost:5173/project2#/Japan'); // Update route to match the country's name
        cy.wait('@GetCountryAndReviews', { timeout: 10000 });
    });
    
    afterEach(() => {
        cy.window().then((win) => {
            win.sessionStorage.removeItem('auth-token');
            win.sessionStorage.removeItem('user');
        });
    });
    
    it('should display all country information correctly', () => {
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
    
    it('should display public journal entries for the country', () => {
        cy.get('h3').contains('Public Journal Entries for Japan');
        cy.contains('Cherry blossoms in Japan');
        cy.contains('The cherry blossoms were stunning, and the culture was fascinating.');
        cy.contains('Globetrotter123');
        cy.contains('4');
        cy.contains('2023-03-20');
    });
    
    it('should allow the user to open and close the journal entry modal', () => {
        cy.contains('Write a journal entry').click();
        cy.get('[role="dialog"]').should('be.visible');
    
        cy.get('[aria-label="Close modal"]').click();
        cy.get('[role="dialog"]').should('not.exist');
    });
    
    it('should navigate back to Explore Countries when clicking the return button', () => {
        cy.contains('Return to Explore').click();
        cy.url().should('include', '/ExploreCountries');
    });    
});