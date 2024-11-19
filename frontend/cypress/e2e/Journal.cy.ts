describe("Run Journal page on desktop", () => {
    beforeEach(() => {
        cy.viewport(1280, 720);
        
        cy.window().then((win) => {
            win.sessionStorage.setItem('auth-token', 'test-token');
            win.sessionStorage.setItem('user', 'test-user');
        });

        cy.intercept('POST', 'http://it2810-10.idi.ntnu.no:3001/', (req) => {
            if (req.body.operationName === 'GetJournal') {
                req.reply({
                    data: {
                        writtenjournal: {
                            id: '1',
                            reviews: [
                                {
                                    id: 1,
                                    title: 'Amazing Trip!',
                                    date: '2024-11-01',
                                    text: 'The food and culture were incredible.',
                                    rating: 5,
                                    ispublic: true,
                                },
                                {
                                    id: 2,
                                    title: 'Good Experience',
                                    date: '2024-11-02',
                                    text: 'Enjoyed the landmarks but crowded.',
                                    rating: 4,
                                    ispublic: false,
                                },
                            ],
                        },
                    },
                });
            }
        }).as('GetJournalQuery');

        cy.visit('http://localhost:5173/project2#/JournalPage/Norway'); 
        cy.wait("@GetJournalQuery", { timeout: 10000 });
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

    it("Checks if the right information is displayed on desktop", () => {
        cy.get('a').contains('Return to all journals').should('be.visible');
        cy.get('p').contains('My Norway journals').should('be.visible'); 

        cy.get('.main').within(() => {
            cy.get('[aria-description="Section containing the journal entry"]').should('have.length', 2); 

            // Validate the first journal entry (index 0)
            cy.get('[aria-description="Section containing the journal entry"]')
                .eq(0)
                .within(() => {
                    cy.get('p').contains('Amazing Trip!').should('be.visible');
                    cy.get('p').contains('2024-11-01').should('be.visible');
                    cy.get('article').contains('The food and culture were incredible.').should('be.visible');
                    cy.get('[aria-label="rating"]').find('[aria-label="filled star"]').should('have.length', 5);
                    cy.get('p').contains('This journal entry is public').should('be.visible');
            });

            // Validate the second journal entry (index 1)
            cy.get('[aria-description="Section containing the journal entry"]')
                .eq(1) 
                .within(() => {
                    cy.get('p').contains('Good Experience').should('be.visible');
                    cy.get('p').contains('2024-11-02').should('be.visible');
                    cy.get('article').contains('Enjoyed the landmarks but crowded.').should('be.visible');
                    cy.get('[aria-label="rating"]').find('[aria-label="filled star"]').should('have.length', 4);
                    cy.get('p').contains('This journal entry is private').should('be.visible');
            });
        });
    });
});

describe("Run Journal page on mobile", () => {
    beforeEach(() => {
        cy.viewport(375, 667);
        
        cy.window().then((win) => {
            win.sessionStorage.setItem('auth-token', 'test-token');
            win.sessionStorage.setItem('user', 'test-user');
        });

        cy.intercept('POST', 'http://it2810-10.idi.ntnu.no:3001/', (req) => {
            if (req.body.operationName === 'GetJournal') {
                req.reply({
                    data: {
                        writtenjournal: {
                            id: '1',
                            reviews: [
                                {
                                    id: 1,
                                    title: 'Amazing Trip!',
                                    date: '2024-11-01',
                                    text: 'The food and culture were incredible.',
                                    rating: 5,
                                    ispublic: true,
                                },
                                {
                                    id: 2,
                                    title: 'Good Experience',
                                    date: '2024-11-02',
                                    text: 'Enjoyed the landmarks but crowded.',
                                    rating: 4,
                                    ispublic: false,
                                },
                            ],
                        },
                    },
                });
            }
        }).as('GetJournalQuery');

        cy.visit('http://localhost:5173/project2#/JournalPage/Norway'); 
        cy.wait("@GetJournalQuery", { timeout: 10000 });
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

    it("Checks if the right information is displayed on desktop", () => {
        cy.get('a').contains('Return to all journals').should('be.visible');
        cy.get('p').contains('My Norway journals').should('be.visible'); 

        cy.get('.main').within(() => {
            cy.get('[aria-description="Section containing the journal entry"]').should('have.length', 2); 

            // Validate the first journal entry (index 0)
            cy.get('[aria-description="Section containing the journal entry"]')
                .eq(0)
                .within(() => {
                    cy.get('p').contains('Amazing Trip!').should('be.visible');
                    cy.get('p').contains('2024-11-01').should('be.visible');
                    cy.get('article').contains('The food and culture were incredible.').should('be.visible');
                    cy.get('[aria-label="rating"]').find('[aria-label="filled star"]').should('have.length', 5);
                    cy.get('p').contains('This journal entry is public').should('be.visible');
            });

            // Validate the second journal entry (index 1)
            cy.get('[aria-description="Section containing the journal entry"]')
                .eq(1) 
                .within(() => {
                    cy.get('p').contains('Good Experience').should('be.visible');
                    cy.get('p').contains('2024-11-02').should('be.visible');
                    cy.get('article').contains('Enjoyed the landmarks but crowded.').should('be.visible');
                    cy.get('[aria-label="rating"]').find('[aria-label="filled star"]').should('have.length', 4);
                    cy.get('p').contains('This journal entry is private').should('be.visible');
            });
        });
    });
});