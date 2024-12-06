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

const registeringAccounts = {
    alreadyExistingUser: {
        name: "natha",
        email: "natha@gmail.com", 
        password: "12345678"
    },
    invalidEmail1: {
        name: "some",
        email:"someone",
        password: "cdehbcuehcunbd"
    }, 
    invalidEmail2: {
        name: "some",
        email: "someone@",
        password: "ewjdhuidhiudh"
    },
    invalidEmail3: {
        name: "some",
        email: "someone@gmail",
        password: "siwjsxiojxosix"
    }, 
    invalidPassword: {
        name: "noone",
        email: "noone@gmail.com", 
        password: "dshd"
    },
    validUser: {
        name: "noone", 
        email: "noone@gmail.com",
        password: "12345678"
    }
};

const registerNewUser = (registeringAccount) => {
    cy.get('[data-cy=registername]').type(registeringAccount.name)
    cy.get('[data-cy=registeremail]').type(registeringAccount.email);
    cy.get('[data-cy=registerpassword]').type(registeringAccount.password);
    cy.get('[data-cy=submitregister]').click();
}

describe("Check registering functionality", () => {
    beforeEach(() => {
        cy.viewport(1280, 720);
        cy.visit("http://localhost:5173/project2#/Register");
    });
    it('prints error and does not redirect if user already exists', () => {
        registerNewUser(registeringAccounts.alreadyExistingUser);
        cy.get('[data-cy=registererror]').should('contain', 'User already exists');
        cy.url().should('include', "/Register");
    });
    it('prints error and does not redirect if invalid email with only name is inserted', () => {
        registerNewUser(registeringAccounts.invalidEmail1);
        cy.get('[data-cy=registererror]').should('contain', 'Invalid email');
        cy.url().should('include', '/Register');
    });
    it('prints error and does not redirect if invalid email with only name and @ is inserted', () => {
        registerNewUser(registeringAccounts.invalidEmail2);
        cy.get('[data-cy=registererror]').should('contain', 'Invalid email');
        cy.url().should('include', '/Register');
    });
    it('prints error and does not redirect if invalid email without domain is inserted', () => {
        registerNewUser(registeringAccounts.invalidEmail3);
        cy.get('[data-cy=registererror]').should('contain', 'Invalid email');
        cy.url().should('include', '/Register');
    });
    it('prints error and does not redirect if invalid password is inserted', () => {
        registerNewUser(registeringAccounts.invalidPassword);
        cy.get('[data-cy=registererror]').should('contain', 'Password must be at least 8 characters');
        cy.url().should('include', '/Register');
    });
    it('redirects valid user to home page when successfully register', () => {
        registerNewUser(registeringAccounts.validUser);
        cy.url().should('include', 'http://localhost:5173/project2#/');
    });  

});
